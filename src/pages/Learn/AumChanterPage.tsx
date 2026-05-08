import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import SocialShareButtons from '../../components/shared/SocialShareButtons';
import MalaBeads from '../../components/games/MalaBeads';
import { getAumStats, recordChant, subscribeToAumStats } from '../../services/aumStatsService';

const getTodayString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const MALA_BEAD_COUNT = 108;
const CHANT_AUDIO_POOL_SIZE = 4;
const CHANT_AUDIO_MAX_POLYPHONY = 8;
const CHANT_AUDIO_MIN_GAP_MS = 180;
const AUTO_CHANT_PAUSE_MS = 500;
const AUTO_CHANT_FALLBACK_DURATION_MS = 2500;

type ChantOption = {
  id: string;
  name: string;
  shortLabel: string;
  symbol: string;
  shareTag?: string;
  imageSrc?: string;
  audioSrc: string;
  isAlwaysAvailable?: boolean;
  isEnabled?: boolean;
};

const CHANT_OPTIONS: ChantOption[] = [
  {
    id: 'om',
    name: 'Om',
    shortLabel: 'Om',
    symbol: 'ॐ',
    shareTag: '#Om',
    imageSrc: '/om.jpg',
    audioSrc: '/aum.mp3',
    isAlwaysAvailable: true,
    isEnabled: true,
  },
  {
    id: 'sri-ram',
    name: 'Jai Sri Ram',
    shortLabel: 'Jai Sri Ram',
    symbol: 'राम',
    shareTag: '#RamNavami',
    imageSrc: '/jsr.png',
    audioSrc: '/aum.mp3',
    isEnabled: true,
  },
];

const AumChanterPage = () => {
  const [history, setHistory] = useState<{ date: string; chants: number }[]>(() => {
    try {
      const savedHistory = localStorage.getItem('aumChantHistory');
      if (savedHistory) {
        return JSON.parse(savedHistory);
      }
      return [];
    } catch (error) {
      console.error("Could not read history from localStorage:", error);
      return [];
    }
  });

  const [dailyGoal, setDailyGoal] = useState<number | null>(() => {
    try {
      const savedGoal = localStorage.getItem('aumChantGoal');
      return savedGoal ? parseInt(savedGoal, 10) : null;
    } catch (error) {
      console.error("Could not read goal from localStorage:", error);
      return null;
    }
  });

  const count = useMemo(() => {
    return history.reduce((total, entry) => total + entry.chants, 0);
  }, [history]);

  const [isChanted, setIsChanted] = useState<boolean>(false);
  const [chantEffects, setChantEffects] = useState<{ id: number; active: boolean }[]>([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState<boolean>(false);
  const [isGoalModalVisible, setIsGoalModalVisible] = useState<boolean>(false);
  const [goalInputValue, setGoalInputValue] = useState<string>('');
  const audioPoolRef = useRef<HTMLAudioElement[]>([]);
  const nextAudioIndexRef = useRef<number>(0);
  const lastAudioPlayAtRef = useRef<number>(0);
  const chantDurationMsRef = useRef<number>(AUTO_CHANT_FALLBACK_DURATION_MS);
  const [selectedChantId, setSelectedChantId] = useState<string>('om');

  // Auto-chant state
  const [isAutoChantModalVisible, setIsAutoChantModalVisible] = useState<boolean>(false);
  const [autoChantInputValue, setAutoChantInputValue] = useState<string>('');
  const [isAutoChanting, setIsAutoChanting] = useState<boolean>(false);
  const [autoChantRemaining, setAutoChantRemaining] = useState<number>(0);
  const autoChantIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Batching chant logic
  const pendingChantsRef = useRef(0);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Backend stats - will be fetched from Digital Ocean server
  const [globalChants, setGlobalChants] = useState<number>(0);
  const [recordChants, setRecordChants] = useState<number>(0);
  const [avgChantsPerUser, setAvgChantsPerUser] = useState<number>(0);
  const [uniqueUsers, setUniqueUsers] = useState<number>(0);
  const [uniqueCountries, setUniqueCountries] = useState<number>(0);
  const [statsLoading, setStatsLoading] = useState<boolean>(true);
  const statsRef = useRef({
    globalChants: 0,
    recordChants: 0,
    avgChantsPerUser: 0,
    uniqueUsers: 0,
    uniqueCountries: 0,
  });

  const availableChants = useMemo(
    () => CHANT_OPTIONS.filter((chant) => chant.isAlwaysAvailable || chant.isEnabled),
    []
  );

  const currentChant = useMemo(
    () => availableChants.find((chant) => chant.id === selectedChantId) ?? availableChants[0] ?? CHANT_OPTIONS[0],
    [availableChants, selectedChantId]
  );

  const createChantAudio = useCallback((src: string) => {
    const audio = new Audio(src);
    audio.preload = 'auto';
    audio.crossOrigin = 'anonymous';
    audio.onloadedmetadata = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        chantDurationMsRef.current = audio.duration * 1000;
      }
    };
    audio.onerror = () => {
      console.error('❌ Audio error:', audio.error);
    };
    audio.load();
    return audio;
  }, []);

	  useEffect(() => {
	  	  const previousVoices = audioPoolRef.current;
	  
	  	  previousVoices.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
      audio.onloadedmetadata = null;
      audio.onerror = null;
    });

    audioPoolRef.current = Array.from(
      { length: CHANT_AUDIO_POOL_SIZE },
      () => createChantAudio(currentChant.audioSrc)
    );
    nextAudioIndexRef.current = 0;
    lastAudioPlayAtRef.current = 0;
    chantDurationMsRef.current = AUTO_CHANT_FALLBACK_DURATION_MS;

    return () => {
      audioPoolRef.current.forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
        audio.onloadedmetadata = null;
        audio.onerror = null;
      });
    };
  }, [createChantAudio, currentChant.audioSrc]);

  useEffect(() => {
    if (!availableChants.some((chant) => chant.id === selectedChantId)) {
      setSelectedChantId(availableChants[0]?.id ?? 'om');
    }
  }, [availableChants, selectedChantId]);

  // Fetch initial stats and subscribe to real-time updates
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const initializeStats = async () => {
      try {
        const stats = await getAumStats();
        if (stats) {
          setGlobalChants(stats.globalChants || 0);
          setRecordChants(stats.recordChants || 0);
          setAvgChantsPerUser(stats.avgChantsPerUser || 0);
          setUniqueUsers(stats.uniqueUsers || 0);
          setUniqueCountries(stats.uniqueCountries || 0);
        }
      } catch (error) {
        console.error("Failed to fetch initial Aum stats:", error);
      } finally {
        setStatsLoading(false);
      }
    };

    initializeStats();

    // Subscribe to real-time updates from Supabase
    unsubscribe = subscribeToAumStats((newStats) => {
      setGlobalChants(newStats.globalChants || 0);
      setRecordChants(newStats.recordChants || 0);
      setAvgChantsPerUser(newStats.avgChantsPerUser || 0);
      setUniqueUsers(newStats.uniqueUsers || 0);
      setUniqueCountries(newStats.uniqueCountries || 0);
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // Save local data to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aumChantHistory', JSON.stringify(history));
      if (dailyGoal === null) {
        localStorage.removeItem('aumChantGoal');
      } else {
        localStorage.setItem('aumChantGoal', dailyGoal.toString());
      }
    } catch (error) {
      console.error("Could not write to localStorage:", error);
    }
  }, [history, dailyGoal]);

  const playChantSound = useCallback((options?: { bypassThrottle?: boolean }) => {
    const now = Date.now();
    if (!options?.bypassThrottle && now - lastAudioPlayAtRef.current < CHANT_AUDIO_MIN_GAP_MS) {
      return null;
    }

    const voices = audioPoolRef.current;
    if (voices.length === 0) {
      return null;
    }

    let selectedIndex = -1;
    for (let i = 0; i < voices.length; i++) {
      const voiceIndex = (nextAudioIndexRef.current + i) % voices.length;
      const voice = voices[voiceIndex];
      if (voice.paused || voice.ended) {
        selectedIndex = voiceIndex;
        break;
      }
    }

    if (selectedIndex === -1 && voices.length < CHANT_AUDIO_MAX_POLYPHONY) {
      const extraVoice = createChantAudio(currentChant.audioSrc);
      voices.push(extraVoice);
      selectedIndex = voices.length - 1;
    }

    if (selectedIndex === -1) {
      return null;
    }

    const selectedVoice = voices[selectedIndex];
    nextAudioIndexRef.current = (selectedIndex + 1) % voices.length;
    lastAudioPlayAtRef.current = now;

    try {
      selectedVoice.pause();
      selectedVoice.currentTime = 0;
      const playPromise = selectedVoice.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.error('❌ Audio play failed:', err);
        });
      }
    } catch (err) {
      console.error('❌ Audio play failed:', err);
      return null;
    }

    return selectedVoice;
  }, [createChantAudio, currentChant.audioSrc]);

  const handleChant = useCallback((options?: { bypassAudioThrottle?: boolean } | React.MouseEvent<HTMLDivElement>) => {
    // Handle both direct calls and React event calls
    const opts = options && 'bypassAudioThrottle' in options ? options : undefined;
    const playedVoice = playChantSound({ bypassThrottle: opts?.bypassAudioThrottle });

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(50);
      } catch (e) {}
    }

    // Update history
    setHistory(currentHistory => {
      const today = getTodayString();
      const todayEntryIndex = currentHistory.findIndex(entry => entry.date === today);
      const newHistory = [...currentHistory];

      if (todayEntryIndex > -1) {
        const updatedEntry = { ...newHistory[todayEntryIndex], chants: newHistory[todayEntryIndex].chants + 1 };
        newHistory[todayEntryIndex] = updatedEntry;
      } else {
        newHistory.push({ date: today, chants: 1 });
      }
      return newHistory;
    });

    // Send chant to Supabase (Batched)
    const userId = localStorage.getItem('userId') || `user-${Date.now()}`;
    if (!localStorage.getItem('userId')) {
      localStorage.setItem('userId', userId);
    }

    // Get country from browser (or use Cloudflare header server-side if needed)
    const country = (navigator as any).geolocation ? 'Unknown' : undefined;

    pendingChantsRef.current += 1;

    // Clear existing timer
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    // Set a new timer to flush chants after 2 seconds of inactivity
    debounceTimerRef.current = setTimeout(() => {
      const chantsToRecord = pendingChantsRef.current;
      if (chantsToRecord > 0) {
        pendingChantsRef.current = 0; // reset
        recordChant(userId, chantsToRecord, country).catch(err =>
          console.error('Failed to record chant in Supabase:', err)
        );
      }
    }, 2000);

    setIsChanted(true);
    setTimeout(() => setIsChanted(false), 150);

    const newId = Date.now() + Math.random();
    setChantEffects(prev => [...prev, { id: newId, active: false }]);
    setTimeout(() => setChantEffects(prev => prev.filter(effect => effect.id !== newId)), 700);
    return playedVoice;
  }, [playChantSound]);

  const handleSetGoal = () => {
    const newGoal = parseInt(goalInputValue, 10);
    if (!isNaN(newGoal) && newGoal > 0) {
      setDailyGoal(newGoal);
    } else {
      setDailyGoal(null);
    }
    setIsGoalModalVisible(false);
  };

  // Auto-chant ref to track if we should continue
  const autoChantActiveRef = useRef<boolean>(false);
  const autoChantRemainingRef = useRef<number>(0);

  // Function to perform one auto-chant and schedule the next
  const performAutoChant = useCallback(() => {
    if (!autoChantActiveRef.current || autoChantRemainingRef.current <= 0) {
      setIsAutoChanting(false);
      setAutoChantRemaining(0);
      return;
    }

    // Perform the chant
    const playedVoice = handleChant({ bypassAudioThrottle: true });
    autoChantRemainingRef.current--;
    setAutoChantRemaining(autoChantRemainingRef.current);

    // If more chants remain, wait roughly one chant-length plus a short pause.
    if (autoChantRemainingRef.current > 0 && autoChantActiveRef.current) {
      const audioDurationMs = playedVoice && Number.isFinite(playedVoice.duration) && playedVoice.duration > 0
        ? playedVoice.duration * 1000
        : chantDurationMsRef.current;

      autoChantIntervalRef.current = setTimeout(() => {
        performAutoChant();
      }, Math.round(audioDurationMs) + AUTO_CHANT_PAUSE_MS);
    } else {
      // Done chanting
      autoChantActiveRef.current = false;
      setIsAutoChanting(false);
      setAutoChantRemaining(0);
    }
  }, [handleChant]);

  // Start auto-chant
  const startAutoChant = useCallback(() => {
    const count = parseInt(autoChantInputValue, 10);
    if (isNaN(count) || count <= 0 || count > 1000) {
      return;
    }

    setIsAutoChantModalVisible(false);
    setIsAutoChanting(true);
    setAutoChantRemaining(count);
    autoChantRemainingRef.current = count;
    autoChantActiveRef.current = true;

    // Start the first chant
    performAutoChant();
  }, [autoChantInputValue, performAutoChant]);

  const stopAutoChant = useCallback(() => {
    autoChantActiveRef.current = false;
    if (autoChantIntervalRef.current) {
      clearTimeout(autoChantIntervalRef.current);
      autoChantIntervalRef.current = null;
    }
    setIsAutoChanting(false);
    setAutoChantRemaining(0);
  }, []);

  // Cleanup auto-chant on unmount
  useEffect(() => {
    return () => {
      autoChantActiveRef.current = false;
      if (autoChantIntervalRef.current) {
        clearTimeout(autoChantIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (chantEffects.some(effect => !effect.active)) {
      const frameId = requestAnimationFrame(() => {
        setChantEffects(prev =>
          prev.map(effect =>
            !effect.active ? { ...effect, active: true } : effect
          )
        );
      });
      return () => cancelAnimationFrame(frameId);
    }
  }, [chantEffects]);

  const todaysChants = history.find(entry => entry.date === getTodayString())?.chants || 0;
  const completedMalas = Math.floor(count / MALA_BEAD_COUNT);
  const todaysCompletedMalas = Math.floor(todaysChants / MALA_BEAD_COUNT);
  const chantsIntoCurrentMala = count % MALA_BEAD_COUNT;
  const progressPercent = dailyGoal && dailyGoal > 0 ? Math.min((todaysChants / dailyGoal) * 100, 100) : 0;
  const goalMet = progressPercent >= 100;

  const progressRingRadius = 45;
  const progressRingCircumference = 2 * Math.PI * progressRingRadius;
  const strokeDashoffset = progressRingCircumference * (1 - progressPercent / 100);

  const shareTitle = currentChant.id === 'om'
    ? `I've chanted ${count.toLocaleString()} times on Aum Chanter. Join the global meditation.`
    : `I've chanted ${count.toLocaleString()} times on Aum Chanter and I'm using the ${currentChant.name} festival mode. Join the global meditation.`;

  const shareDescription = currentChant.id === 'om'
    ? 'Join the Aum Chanter meditation game and contribute to our global chanting community.'
    : `Join the Aum Chanter meditation game and explore special festival modes like ${currentChant.name}.`;

  const shareTwitterText = `${shareTitle} #Meditation ${currentChant.shareTag ?? '#Aum'}`;

  return (
    <PageLayout title={currentChant.id === 'om' ? 'Aum Chanter' : `${currentChant.name} • Aum Chanter`} className="no-top-padding">
      <main className="relative flex min-h-screen bg-gradient-to-br from-gray-900 via-spiritual-900 to-slate-900 text-gray-100 select-none antialiased pt-16 pb-6">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4">
          {/* Compact Stats Bar */}
          <div className="w-full flex items-center justify-between mt-1">
            {/* History button (left) */}
            <button
              onClick={() => setIsHistoryVisible(true)}
              className="flex items-center gap-1.5 text-spiritual-300/60 hover:text-spiritual-200 transition-colors text-xs font-sans tracking-wide"
              aria-label="View chant history"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="hidden sm:inline">History</span>
            </button>

            {/* Center Stats */}
            <div className="flex items-center gap-6 sm:gap-10">
              <div className="text-center">
                <p className="text-[10px] sm:text-xs font-sans tracking-wider text-spiritual-300/50 uppercase">You</p>
                <p className="text-lg sm:text-2xl font-mono text-white/80">{count.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] sm:text-xs font-sans tracking-wider text-spiritual-300/50 uppercase">Global</p>
                <p className="text-lg sm:text-2xl font-mono text-white/80">
                  {statsLoading ? '...' : globalChants.toLocaleString()}
                </p>
              </div>
              <div className="text-center">
                <p className="text-[10px] sm:text-xs font-sans tracking-wider text-spiritual-300/50 uppercase">Record</p>
                <p className="text-lg sm:text-2xl font-mono text-white/80">
                  {statsLoading ? '...' : recordChants.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Goal button (right) */}
            <button
              onClick={() => { setGoalInputValue(dailyGoal?.toString() || ''); setIsGoalModalVisible(true); }}
              className="flex items-center gap-1.5 text-spiritual-300/60 hover:text-spiritual-200 transition-colors text-xs font-sans tracking-wide"
              aria-label="Set daily goal"
            >
              <span className="hidden sm:inline">Goal</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>

          <div className="w-full max-w-2xl">
            <div className="flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Available chants">
              {availableChants.map((chant) => {
                const isActive = chant.id === currentChant.id;

                return (
                  <button
                    key={chant.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedChantId(chant.id)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${isActive
                      ? 'border-spiritual-300/60 bg-spiritual-500/20 text-white shadow-[0_0_20px_rgba(251,191,36,0.18)]'
                      : 'border-spiritual-400/20 bg-slate-800/50 text-spiritual-200/80 hover:border-spiritual-300/40 hover:text-white'}`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base leading-none">{chant.symbol}</span>
                      <span>{chant.shortLabel}</span>
                      {!chant.isAlwaysAvailable && (
                        <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.22em] text-amber-200">
                          Special
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Chant Button + Mala */}
          <div className="flex flex-col items-center mt-2 mb-12">
            <div className="relative">
              <MalaBeads
                litBeads={count}
                size="chant"
                showCenterLabel={false}
                className="z-0"
              />

              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                {dailyGoal && (
                  <svg
                    className="absolute w-[clamp(9rem,48vmin,19.2rem)] h-[clamp(9rem,48vmin,19.2rem)] -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r={progressRingRadius}
                      strokeWidth="3"
                      className="text-spiritual-500/10"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r={progressRingRadius}
                      strokeWidth="3"
                      className={`transition-all duration-500 ease-in-out ${goalMet ? 'text-cyan-400' : 'text-spiritual-400'}`}
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={progressRingCircumference}
                      strokeDashoffset={strokeDashoffset}
                      style={{ filter: goalMet ? 'drop-shadow(0 0 5px currentColor)' : 'none' }}
                    />
                  </svg>
                )}

                <div
                  onClick={handleChant}
                  className={`pointer-events-auto relative flex items-center justify-center w-[clamp(7.5rem,40vmin,16rem)] h-[clamp(7.5rem,40vmin,16rem)] rounded-full bg-gradient-radial from-spiritual-700/20 via-spiritual-900/10 to-transparent border-2 border-spiritual-400/20 shadow-[0_0_30px_rgba(217,119,6,0.2),inset_0_0_15px_rgba(251,146,60,0.1)] cursor-pointer transition-all duration-150 ease-in-out hover:shadow-[0_0_45px_rgba(217,119,6,0.4),inset_0_0_20px_rgba(251,146,60,0.2)] hover:border-spiritual-400/40 active:scale-95 ${isChanted ? 'scale-95' : 'scale-100'}`}
                  aria-label={`Chant ${currentChant.name} to increase count`}
                  role="button"
                >
                  {/* Aura Effects */}
                  {chantEffects.map(effect => (
                    <div
                      key={`aura-${effect.id}`}
                      className={`absolute inset-0 rounded-full border border-spiritual-400/30 shadow-[0_0_60px_rgba(217,119,6,0.5)] pointer-events-none transition-all duration-700 ease-out ${effect.active ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}
                    />
                  ))}

                  <div className="relative flex items-center justify-center z-10 w-full h-full">
                    {currentChant.imageSrc ? (
                      <div className="w-[clamp(7.5rem,40vmin,16rem)] h-[clamp(7.5rem,40vmin,16rem)] rounded-full overflow-hidden drop-shadow-[0_0_15px_rgba(253,224,71,0.4)] flex items-center justify-center">
                        <img
                          src={currentChant.imageSrc}
                          alt={currentChant.name}
                          className={`w-full h-full object-cover ${
                            currentChant.id === 'sri-ram' ? 'scale-[1.331]' : ''
                          }`}
                        />
                      </div>
                    ) : (
                      <div className="flex h-[clamp(7.5rem,40vmin,16rem)] w-[clamp(7.5rem,40vmin,16rem)] flex-col items-center justify-center rounded-full border border-white/40 bg-gradient-to-br from-amber-100 via-orange-200 to-rose-300 shadow-[0_0_25px_rgba(251,146,60,0.35)]">
                        <span className="text-[clamp(2.5rem,11vmin,4.75rem)] font-serif leading-none text-orange-950 drop-shadow-sm">{currentChant.symbol}</span>
                        <span className="mt-2 text-[10px] uppercase tracking-[0.35em] text-orange-950/80 sm:text-xs">{currentChant.shortLabel}</span>
                      </div>
                    )}
                    {chantEffects.map(effect => (
                      currentChant.imageSrc ? (
                        <div
                          key={effect.id}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[clamp(7.5rem,40vmin,16rem)] w-[clamp(7.5rem,40vmin,16rem)] rounded-full overflow-hidden drop-shadow-[0_0_15px_rgba(253,224,71,0.4)] pointer-events-none transition-all duration-700 ease-out flex items-center justify-center"
                        >
                          <img
                            src={currentChant.imageSrc}
                            alt=""
                            className={`w-full h-full object-cover ${
                              currentChant.id === 'sri-ram' ? 'scale-[1.331]' : ''
                            } ${effect.active ? 'scale-150 opacity-0' : 'opacity-70'}`}
                          />
                        </div>
                      ) : (
                        <div
                          key={effect.id}
                          aria-hidden="true"
                          className={`absolute top-1/2 left-1/2 flex h-[clamp(7.5rem,40vmin,16rem)] w-[clamp(7.5rem,40vmin,16rem)] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/40 bg-gradient-to-br from-amber-100 via-orange-200 to-rose-300 shadow-[0_0_25px_rgba(251,146,60,0.35)] pointer-events-none transition-all duration-700 ease-out ${effect.active ? 'scale-150 opacity-0' : 'scale-100 opacity-70'}`}
                        >
                          <span className="text-[clamp(2.5rem,11vmin,4.75rem)] font-serif leading-none text-orange-950 drop-shadow-sm">{currentChant.symbol}</span>
                          <span className="mt-2 text-[10px] uppercase tracking-[0.35em] text-orange-950/80 sm:text-xs">{currentChant.shortLabel}</span>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-spiritual-200/70">
              {currentChant.id === 'om'
                ? 'Tap the center to chant Om.'
                : `Tap the center to chant ${currentChant.name}. Counts and stats remain shared for this first preview.`}
            </p>
          </div>

          {/* Stats row: Today's progress + Secondary stats */}
          <div className="w-full flex flex-col items-center gap-1 text-sm sm:text-base text-spiritual-300/70">
            {dailyGoal && (
              <span className="font-mono">Today: {todaysChants.toLocaleString()} / {dailyGoal.toLocaleString()}</span>
            )}
            <span className="text-center">
              1 mala = <span className="font-mono">{MALA_BEAD_COUNT}</span> chants • Completed malas:{' '}
              <span className="font-mono text-spiritual-200">{completedMalas.toLocaleString()}</span>
              <span className="mx-2 text-spiritual-400/50">•</span>
              Current cycle:{' '}
              <span className="font-mono text-spiritual-200">{chantsIntoCurrentMala.toLocaleString()}</span>
              <span className="mx-1">/</span>
              <span className="font-mono">{MALA_BEAD_COUNT}</span>
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
              <span>Average Chants / User: <span className="font-mono">{statsLoading ? '...' : avgChantsPerUser.toFixed(0)}</span></span>
              <span>Total chanters: <span className="font-mono">{statsLoading ? '...' : uniqueUsers.toLocaleString()}</span></span>
              <span>Countries: <span className="font-mono">{statsLoading ? '...' : uniqueCountries.toLocaleString()}</span></span>
            </div>
          </div>

          {/* Auto Chant Button */}
          <div className="w-full flex justify-center mt-2">
            {isAutoChanting ? (
              <button
                onClick={stopAutoChant}
                className="flex items-center gap-2 px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-sans"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Stop ({autoChantRemaining} remaining)
              </button>
            ) : (
              <button
                onClick={() => { setAutoChantInputValue('108'); setIsAutoChantModalVisible(true); }}
                className="flex items-center gap-2 px-4 py-2 bg-spiritual-600/80 hover:bg-spiritual-600 text-white rounded-lg transition-colors text-sm font-sans"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Auto Chant
              </button>
            )}
          </div>

          {/* Social Sharing */}
          <div className="w-full flex justify-center mt-1">
            <SocialShareButtons
              path="/learn/games/aum-chanter"
              title={shareTitle}
              description={shareDescription}
              twitterText={shareTwitterText}
              whatsappText={shareTitle}
              className="justify-center"
            />
          </div>
        </div>
	
        {/* History Modal */}
        {isHistoryVisible && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300" onClick={() => setIsHistoryVisible(false)}>
            <div className="bg-slate-800/80 border border-spiritual-400/20 rounded-lg shadow-2xl w-11/12 max-w-md max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center p-4 border-b border-spiritual-400/20">
                <h2 className="text-xl font-sans text-spiritual-200">Chant History</h2>
                <button onClick={() => setIsHistoryVisible(false)} className="text-spiritual-300/60 hover:text-spiritual-200 text-2xl leading-none" aria-label="Close history view">&times;</button>
              </div>
              <div className="p-4 overflow-y-auto">
                <div className="mb-4 rounded-lg border border-spiritual-400/20 bg-slate-900/40 p-3 text-sm text-spiritual-200/80">
                  <p className="text-xs uppercase tracking-wider text-spiritual-300/50">Mala summary</p>
                  <p className="mt-1">1 mala = <span className="font-mono">{MALA_BEAD_COUNT}</span> chants</p>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                    <span>Total malas: <span className="font-mono text-white">{completedMalas.toLocaleString()}</span></span>
                    <span>Today's malas: <span className="font-mono text-white">{todaysCompletedMalas.toLocaleString()}</span></span>
                  </div>
                </div>
                {history.length > 0 ? (
                  <ul className="space-y-3">
                    {[...history].reverse().map(entry => (
                      <li key={entry.date} className="flex justify-between items-baseline gap-4 text-white/90 font-mono text-lg">
                        <div>
                          <span className="text-base text-spiritual-300/80">{entry.date}</span>
                          <p className="text-xs font-sans text-spiritual-300/60 mt-1">
                            Completed malas: {Math.floor(entry.chants / MALA_BEAD_COUNT).toLocaleString()}
                          </p>
                        </div>
                        <span>{entry.chants.toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-spiritual-300/70 py-8">No chant history yet. Start chanting!</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Goal Modal */}
        {isGoalModalVisible && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300" onClick={() => setIsGoalModalVisible(false)}>
            <div className="bg-slate-800/80 border border-spiritual-400/20 rounded-lg shadow-2xl w-11/12 max-w-md flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center p-4 border-b border-spiritual-400/20">
                <h2 className="text-xl font-sans text-spiritual-200">Set Daily Goal</h2>
                <button onClick={() => setIsGoalModalVisible(false)} className="text-spiritual-300/60 hover:text-spiritual-200 text-2xl leading-none" aria-label="Close goal view">&times;</button>
              </div>
              <div className="p-4 space-y-4">
                <label htmlFor="goal-input" className="text-spiritual-300/90 text-sm">Set a target for your daily chants.</label>
                <input
                  id="goal-input"
                  type="number"
                  value={goalInputValue}
                  onChange={e => setGoalInputValue(e.target.value)}
                  placeholder="e.g., 108"
                  className="w-full p-2 bg-slate-900/50 border border-spiritual-400/30 rounded text-white font-mono text-lg"
                />
                <div className="flex justify-end gap-3 pt-2">
                  <button onClick={() => { setDailyGoal(null); setIsGoalModalVisible(false); }} className="px-4 py-2 rounded bg-slate-700/50 text-spiritual-200/80 hover:bg-slate-700 text-sm font-sans">Clear Goal</button>
                  <button onClick={handleSetGoal} className="px-4 py-2 rounded bg-spiritual-600/80 text-white hover:bg-spiritual-600 text-sm font-sans">Save Goal</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Auto Chant Modal */}
        {isAutoChantModalVisible && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300" onClick={() => setIsAutoChantModalVisible(false)}>
            <div className="bg-slate-800/80 border border-spiritual-400/20 rounded-lg shadow-2xl w-11/12 max-w-md flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center p-4 border-b border-spiritual-400/20">
                <h2 className="text-xl font-sans text-spiritual-200">Auto Chant</h2>
                <button onClick={() => setIsAutoChantModalVisible(false)} className="text-spiritual-300/60 hover:text-spiritual-200 text-2xl leading-none" aria-label="Close auto chant modal">&times;</button>
              </div>
              <div className="p-4 space-y-4">
                <label htmlFor="auto-chant-input" className="text-spiritual-300/90 text-sm">
                  Enter the number of times to chant {currentChant.name} automatically (max 1000).
                </label>
                <input
                  id="auto-chant-input"
                  type="number"
                  value={autoChantInputValue}
                  onChange={e => setAutoChantInputValue(e.target.value)}
                  placeholder="e.g., 108"
                  min="1"
                  max="1000"
                  className="w-full p-2 bg-slate-900/50 border border-spiritual-400/30 rounded text-white font-mono text-lg"
                />
                <p className="text-spiritual-300/60 text-xs">
                  Common counts: 108 (sacred number), 21, 51, or 1008
                </p>
                <div className="flex justify-end gap-3 pt-2">
                  <button onClick={() => setIsAutoChantModalVisible(false)} className="px-4 py-2 rounded bg-slate-700/50 text-spiritual-200/80 hover:bg-slate-700 text-sm font-sans">Cancel</button>
                  <button onClick={startAutoChant} className="px-4 py-2 rounded bg-spiritual-600/80 text-white hover:bg-spiritual-600 text-sm font-sans">Start Chanting</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </PageLayout>
  );
};

export default AumChanterPage;

