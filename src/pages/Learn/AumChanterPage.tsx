import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import PageLayout from '../../components/layout/PageLayout';
import SocialShareButtons from '../../components/shared/SocialShareButtons';
import MalaBeads from '../../components/games/MalaBeads';
import { getAumStats, recordChant, subscribeToAumStats } from '../../services/aumStatsService';
import { formatRecordingTime, useChantVideo } from '../../components/games/useChantVideo';

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

type ChantHistoryEntry = {
  date: string;
  chants: number;
  chantId: string;
};

const DEFAULT_CHANT_ID = 'om';

const readChantHistory = (): ChantHistoryEntry[] => {
  try {
    const savedHistory = localStorage.getItem('aumChantHistory');
    if (!savedHistory) return [];
    const parsed = JSON.parse(savedHistory);
    if (!Array.isArray(parsed)) return [];

    const merged = new Map<string, ChantHistoryEntry>();
    for (const entry of parsed) {
      if (!entry || typeof entry.date !== 'string' || typeof entry.chants !== 'number' || !Number.isFinite(entry.chants)) {
        continue;
      }
      const chantId = typeof entry.chantId === 'string' && entry.chantId ? entry.chantId : DEFAULT_CHANT_ID;
      const key = `${chantId}|${entry.date}`;
      const existing = merged.get(key);
      if (existing) {
        existing.chants += entry.chants;
      } else {
        merged.set(key, { date: entry.date, chants: entry.chants, chantId });
      }
    }
    return Array.from(merged.values());
  } catch (error) {
    console.error("Could not read history from localStorage:", error);
    return [];
  }
};

const readChantGoals = (): Record<string, number> => {
  try {
    const goals: Record<string, number> = {};
    const savedGoals = localStorage.getItem('aumChantGoals');
    if (savedGoals) {
      const parsed = JSON.parse(savedGoals);
      if (parsed && typeof parsed === 'object') {
        for (const [chantId, value] of Object.entries(parsed as Record<string, unknown>)) {
          const goal = Number(value);
          if (Number.isFinite(goal) && goal > 0) goals[chantId] = goal;
        }
      }
    }
    if (goals[DEFAULT_CHANT_ID] == null) {
      const legacyGoal = localStorage.getItem('aumChantGoal');
      const goal = legacyGoal ? parseInt(legacyGoal, 10) : NaN;
      if (Number.isFinite(goal) && goal > 0) goals[DEFAULT_CHANT_ID] = goal;
    }
    return goals;
  } catch (error) {
    console.error("Could not read goal from localStorage:", error);
    return {};
  }
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
  {
    id: 'jai-ma',
    name: 'Jai Ma',
    shortLabel: 'Jai Ma',
    symbol: 'माँ',
    shareTag: '#JaiMa',
    audioSrc: '/aum.mp3',
    isEnabled: true,
  },
];

const AumChanterPage = () => {
  const [history, setHistory] = useState<ChantHistoryEntry[]>(readChantHistory);
  const [goalsByChant, setGoalsByChant] = useState<Record<string, number>>(readChantGoals);

  const [isChanted, setIsChanted] = useState<boolean>(false);
  const [chantEffects, setChantEffects] = useState<{ id: number; active: boolean }[]>([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState<boolean>(false);
  const [isGoalModalVisible, setIsGoalModalVisible] = useState<boolean>(false);
  const [goalInputValue, setGoalInputValue] = useState<string>('');
  const audioPoolRef = useRef<HTMLAudioElement[]>([]);
  const nextAudioIndexRef = useRef<number>(0);
  const lastAudioPlayAtRef = useRef<number>(0);
  const chantDurationMsRef = useRef<number>(AUTO_CHANT_FALLBACK_DURATION_MS);
  const [selectedChantId, setSelectedChantId] = useState<string>(() => {
    try {
      return localStorage.getItem('aumSelectedChant') || DEFAULT_CHANT_ID;
    } catch (error) {
      console.error("Could not read selected chant from localStorage:", error);
      return DEFAULT_CHANT_ID;
    }
  });
  const selectedChantIdRef = useRef(selectedChantId);
  selectedChantIdRef.current = selectedChantId;

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

  const countsByChant = useMemo(() => {
    const totals: Record<string, number> = {};
    for (const entry of history) {
      totals[entry.chantId] = (totals[entry.chantId] || 0) + entry.chants;
    }
    return totals;
  }, [history]);

  const chantHistory = useMemo(
    () => history.filter((entry) => entry.chantId === currentChant.id),
    [history, currentChant.id]
  );

  const count = countsByChant[currentChant.id] || 0;
  const dailyGoal = goalsByChant[currentChant.id] ?? null;
  const {
    phase: videoPhase,
    elapsedMs: videoElapsedMs,
    error: videoError,
    videoUrl,
    sessionCount: videoSessionCount,
    canShare,
    notice: videoNotice,
    setCanvasNode,
    syncFrame,
    noteChant,
    startRecording,
    stopRecording,
    discardVideo,
    downloadVideo,
    shareVideo,
  } = useChantVideo();
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const noteChantRef = useRef(noteChant);
  noteChantRef.current = noteChant;

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
      localStorage.setItem('aumChantGoals', JSON.stringify(goalsByChant));
      localStorage.setItem('aumSelectedChant', selectedChantId);
      const omGoal = goalsByChant[DEFAULT_CHANT_ID];
      if (omGoal) {
        localStorage.setItem('aumChantGoal', omGoal.toString());
      } else {
        localStorage.removeItem('aumChantGoal');
      }
    } catch (error) {
      console.error("Could not write to localStorage:", error);
    }
  }, [history, goalsByChant, selectedChantId]);

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
      const chantId = selectedChantIdRef.current;
      const todayEntryIndex = currentHistory.findIndex(entry => entry.date === today && entry.chantId === chantId);
      const newHistory = [...currentHistory];

      if (todayEntryIndex > -1) {
        const updatedEntry = { ...newHistory[todayEntryIndex], chants: newHistory[todayEntryIndex].chants + 1 };
        newHistory[todayEntryIndex] = updatedEntry;
      } else {
        newHistory.push({ date: today, chants: 1, chantId });
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

    noteChantRef.current();
    setIsChanted(true);
    setTimeout(() => setIsChanted(false), 150);

    const newId = Date.now() + Math.random();
    setChantEffects(prev => [...prev, { id: newId, active: false }]);
    setTimeout(() => setChantEffects(prev => prev.filter(effect => effect.id !== newId)), 700);
    return playedVoice;
  }, [playChantSound]);

  const handleSetGoal = () => {
    const newGoal = parseInt(goalInputValue, 10);
    const chantId = currentChant.id;
    setGoalsByChant(currentGoals => {
      const nextGoals = { ...currentGoals };
      if (!isNaN(newGoal) && newGoal > 0) {
        nextGoals[chantId] = newGoal;
      } else {
        delete nextGoals[chantId];
      }
      return nextGoals;
    });
    setIsGoalModalVisible(false);
  };

  const clearCurrentGoal = () => {
    const chantId = currentChant.id;
    setGoalsByChant(currentGoals => {
      const nextGoals = { ...currentGoals };
      delete nextGoals[chantId];
      return nextGoals;
    });
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
    syncFrame({
      chantName: currentChant.name,
      symbol: currentChant.symbol,
      imageSrc: currentChant.imageSrc,
      audioSrc: currentChant.audioSrc,
      imageScale: currentChant.id === 'sri-ram' ? 1.331 : 1,
    });
  }, [currentChant, syncFrame]);

  useEffect(() => {
    if (videoPhase === 'ready') setIsVideoVisible(true);
  }, [videoPhase, videoUrl]);

  useEffect(() => {
    if (!isVideoVisible) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsVideoVisible(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isVideoVisible]);

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

  const todaysChants = chantHistory.find(entry => entry.date === getTodayString())?.chants || 0;
  const completedMalas = Math.floor(count / MALA_BEAD_COUNT);
  const todaysCompletedMalas = Math.floor(todaysChants / MALA_BEAD_COUNT);
  const chantsIntoCurrentMala = count % MALA_BEAD_COUNT;
  const progressPercent = dailyGoal && dailyGoal > 0 ? Math.min((todaysChants / dailyGoal) * 100, 100) : 0;
  const goalMet = progressPercent >= 100;

  const progressRingRadius = 45;
  const progressRingCircumference = 2 * Math.PI * progressRingRadius;
  const strokeDashoffset = progressRingCircumference * (1 - progressPercent / 100);

  const shareTitle = `I've chanted ${currentChant.name} ${count.toLocaleString()} times on Aum Chanter. Join the global meditation.`;

  const shareDescription = currentChant.id === 'om'
    ? 'Join the Aum Chanter meditation game and contribute to our global chanting community.'
    : `Join the Aum Chanter meditation game and explore special festival modes like ${currentChant.name}.`;

  const shareTwitterText = `${shareTitle} #Meditation ${currentChant.shareTag ?? '#Aum'}`;

  return (
    <PageLayout title="Aum Chanter" className="no-top-padding">
      <main className="relative flex min-h-screen bg-gradient-to-br from-gray-900 via-spiritual-900 to-slate-900 text-gray-100 select-none antialiased pt-2 pb-4 sm:pt-16 sm:pb-6">
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
                <p className="text-[10px] text-spiritual-200/70">{currentChant.shortLabel}</p>
                <p className="text-lg sm:text-2xl font-mono text-white/80">{count.toLocaleString()}</p>
              </div>
              <div className="hidden text-center sm:block">
                <p className="text-[10px] sm:text-xs font-sans tracking-wider text-spiritual-300/50 uppercase">Global</p>
                <p className="text-[10px] text-spiritual-300/40">all chants</p>
                <p className="text-lg sm:text-2xl font-mono text-white/80">
                  {statsLoading ? '...' : globalChants.toLocaleString()}
                </p>
              </div>
              <div className="hidden text-center sm:block">
                <p className="text-[10px] sm:text-xs font-sans tracking-wider text-spiritual-300/50 uppercase">Record</p>
                <p className="text-[10px] text-spiritual-300/40">all chants</p>
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
            <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center" role="tablist" aria-label="Available chants">
              {availableChants.map((chant) => {
                const isActive = chant.id === currentChant.id;

                return (
                  <button
                    key={chant.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      if (chant.id !== currentChant.id) {
                        stopAutoChant();
                        setSelectedChantId(chant.id);
                      }
                    }}
                    className={`min-w-0 rounded-full border px-2 py-2 text-sm font-medium transition-all duration-200 sm:px-4 ${isActive
                      ? 'border-spiritual-300/60 bg-spiritual-500/20 text-white shadow-[0_0_20px_rgba(251,191,36,0.18)]'
                      : 'border-spiritual-400/20 bg-slate-800/50 text-spiritual-200/80 hover:border-spiritual-300/40 hover:text-white'}`}
                  >
                    <span className="flex flex-col items-center gap-0.5 sm:flex-row sm:gap-2">
                      <span className="text-base leading-none">{chant.symbol}</span>
                      <span className="text-[11px] leading-tight sm:text-sm">{chant.shortLabel}</span>
                      <span className="font-mono text-xs text-spiritual-100/80">{(countsByChant[chant.id] || 0).toLocaleString()}</span>
                      {!chant.isAlwaysAvailable && (
                        <span className="hidden rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.22em] text-amber-200 sm:inline">
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
          <div className="flex flex-col items-center mt-2 mb-4 sm:mb-12">
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
            <p className="mt-2 px-3 text-center text-xs text-spiritual-200/70 sm:mt-4 sm:text-sm">
              Tap the center to chant {currentChant.name}.
              <span className="hidden sm:inline"> This count is kept separately from the other chants.</span>
            </p>
          </div>

          {/* Stats row: Today's progress + Secondary stats */}
          <div className="w-full flex flex-col items-center gap-1 text-sm sm:text-base text-spiritual-300/70">
            {dailyGoal && (
              <span className="font-mono">Today: {todaysChants.toLocaleString()} / {dailyGoal.toLocaleString()}</span>
            )}
            <span className="hidden text-center sm:inline">
              1 mala = <span className="font-mono">{MALA_BEAD_COUNT}</span> chants • Completed malas:{' '}
              <span className="font-mono text-spiritual-200">{completedMalas.toLocaleString()}</span>
              <span className="mx-2 text-spiritual-400/50">•</span>
              Current cycle:{' '}
              <span className="font-mono text-spiritual-200">{chantsIntoCurrentMala.toLocaleString()}</span>
              <span className="mx-1">/</span>
              <span className="font-mono">{MALA_BEAD_COUNT}</span>
            </span>
            <span className="text-center text-xs sm:hidden">
              Mala <span className="font-mono text-spiritual-200">{chantsIntoCurrentMala.toLocaleString()}</span>
              <span className="mx-1">/</span>
              <span className="font-mono">{MALA_BEAD_COUNT}</span>
              <span className="mx-2 text-spiritual-400/50">·</span>
              <span className="font-mono text-spiritual-200">{completedMalas.toLocaleString()}</span> done
            </span>
            <div className="hidden flex-wrap items-center justify-center gap-3 sm:flex sm:gap-6">
              <span>Average Chants / User: <span className="font-mono">{statsLoading ? '...' : avgChantsPerUser.toFixed(0)}</span></span>
              <span>Total chanters: <span className="font-mono">{statsLoading ? '...' : uniqueUsers.toLocaleString()}</span></span>
              <span>Countries: <span className="font-mono">{statsLoading ? '...' : uniqueCountries.toLocaleString()}</span></span>
            </div>
            <details className="w-full text-center text-xs text-spiritual-300/70 sm:hidden">
              <summary className="cursor-pointer text-spiritual-300/50">Community totals</summary>
              <div className="mt-2 flex flex-col gap-1">
                <span>Global: <span className="font-mono">{statsLoading ? '...' : globalChants.toLocaleString()}</span></span>
                <span>Record: <span className="font-mono">{statsLoading ? '...' : recordChants.toLocaleString()}</span></span>
                <span>Average per person: <span className="font-mono">{statsLoading ? '...' : avgChantsPerUser.toFixed(0)}</span></span>
                <span>Chanters: <span className="font-mono">{statsLoading ? '...' : uniqueUsers.toLocaleString()}</span></span>
                <span>Countries: <span className="font-mono">{statsLoading ? '...' : uniqueCountries.toLocaleString()}</span></span>
              </div>
            </details>
          </div>

          {videoPhase === 'recording' && createPortal(
            <div className="fixed bottom-36 right-3 z-[70] flex w-24 flex-col gap-2 sm:bottom-6 sm:left-6 sm:right-auto sm:w-36">
              <canvas
                ref={setCanvasNode}
                className="block h-28 w-full rounded-xl border border-white/20 bg-black object-cover shadow-2xl sm:h-36"
              />
              <button
                type="button"
                onClick={stopRecording}
                className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-sans text-white shadow-lg"
                aria-label="Stop video recording"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-white" />
                {formatRecordingTime(videoElapsedMs)}
              </button>
            </div>,
            document.body
          )}

          <div className="mt-2 flex w-full flex-wrap items-center justify-center gap-2">
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
            {videoPhase === 'recording' ? null : videoPhase === 'ready' ? (
              <button
                type="button"
                onClick={() => setIsVideoVisible(true)}
                className="flex items-center gap-2 rounded-lg bg-amber-700/80 px-4 py-2 text-sm font-sans text-white transition-colors hover:bg-amber-700"
                aria-label="View the recorded video"
              >
                Your video
              </button>
            ) : (
              <button
                type="button"
                onClick={() => { void startRecording(); }}
                disabled={videoPhase === 'starting' || videoPhase === 'recording'}
                className="flex items-center gap-2 rounded-lg bg-slate-700/80 px-4 py-2 text-sm font-sans text-white transition-colors hover:bg-slate-700 disabled:opacity-60"
                aria-label={`Record a ${currentChant.name} video to share`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V8z" />
                </svg>
                {videoPhase === 'starting' ? 'Starting…' : videoPhase === 'recording' ? 'Recording…' : 'Record video'}
              </button>
            )}
          </div>
          {videoError && videoPhase !== 'ready' && (
            <p className="max-w-md text-center text-sm text-red-200" role="alert">{videoError}</p>
          )}
          {videoNotice && videoPhase !== 'idle' && (
            <p className="max-w-md text-center text-sm text-amber-100/90" role="status">{videoNotice}</p>
          )}

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
                <h2 className="text-xl font-sans text-spiritual-200">{currentChant.name} History</h2>
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
                {chantHistory.length > 0 ? (
                  <ul className="space-y-3">
                    {[...chantHistory].reverse().map(entry => (
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
                  <p className="text-center text-spiritual-300/70 py-8">No {currentChant.name} history yet. Start chanting!</p>
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
                <h2 className="text-xl font-sans text-spiritual-200">Set Daily Goal for {currentChant.name}</h2>
                <button onClick={() => setIsGoalModalVisible(false)} className="text-spiritual-300/60 hover:text-spiritual-200 text-2xl leading-none" aria-label="Close goal view">&times;</button>
              </div>
              <div className="p-4 space-y-4">
                <label htmlFor="goal-input" className="text-spiritual-300/90 text-sm">Set a daily target for {currentChant.name}. Each chant keeps its own goal.</label>
                <input
                  id="goal-input"
                  type="number"
                  value={goalInputValue}
                  onChange={e => setGoalInputValue(e.target.value)}
                  placeholder="e.g., 108"
                  className="w-full p-2 bg-slate-900/50 border border-spiritual-400/30 rounded text-white font-mono text-lg"
                />
                <div className="flex justify-end gap-3 pt-2">
                  <button onClick={clearCurrentGoal} className="px-4 py-2 rounded bg-slate-700/50 text-spiritual-200/80 hover:bg-slate-700 text-sm font-sans">Clear Goal</button>
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

        {isVideoVisible && videoUrl && createPortal(
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setIsVideoVisible(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="chant-video-title"
              className="flex max-h-[90vh] w-11/12 max-w-md flex-col rounded-lg border border-spiritual-400/20 bg-slate-800/80 shadow-2xl"
              onClick={event => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-spiritual-400/20 p-4">
                <h2 id="chant-video-title" className="font-sans text-xl text-spiritual-200">Your video</h2>
                <button onClick={() => setIsVideoVisible(false)} className="text-2xl leading-none text-spiritual-300/60 hover:text-spiritual-200" aria-label="Close video">&times;</button>
              </div>
              <div className="space-y-4 overflow-y-auto p-4">
                <video
                  key={videoUrl}
                  src={videoUrl}
                  controls
                  playsInline
                  className="max-h-[50vh] w-full rounded-lg bg-black"
                />
                <p className="text-sm text-spiritual-300/90">
                  {videoSessionCount.toLocaleString()} {videoSessionCount === 1 ? 'chant' : 'chants'} of {currentChant.name} in this clip.
                  Download it, or share the file. Nothing is uploaded.
                </p>
                {videoNotice && (
                  <p className="text-sm text-amber-100/90" role="status">{videoNotice}</p>
                )}
                {videoError && (
                  <p className="rounded-lg border border-red-400/30 bg-red-950/40 px-3 py-2 text-sm text-red-100" role="alert">
                    {videoError}
                  </p>
                )}
                <div className="flex flex-wrap justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      discardVideo();
                      setIsVideoVisible(false);
                    }}
                    className="rounded bg-slate-700/50 px-4 py-2 text-sm font-sans text-spiritual-200/80 hover:bg-slate-700"
                  >
                    Discard
                  </button>
                  <button
                    type="button"
                    onClick={downloadVideo}
                    className="rounded bg-slate-700/80 px-4 py-2 text-sm font-sans text-white hover:bg-slate-700"
                  >
                    Download
                  </button>
                  {canShare && (
                    <button
                      type="button"
                      onClick={() => { void shareVideo(); }}
                      className="rounded bg-spiritual-600/80 px-4 py-2 text-sm font-sans text-white hover:bg-spiritual-600"
                    >
                      Share
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </main>
    </PageLayout>
  );
};

export default AumChanterPage;

