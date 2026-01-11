import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import SocialShareButtons from '../../components/shared/SocialShareButtons';
import MalaBeads from '../../components/games/MalaBeads';

const getTodayString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

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
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-chant state
  const [isAutoChantModalVisible, setIsAutoChantModalVisible] = useState<boolean>(false);
  const [autoChantInputValue, setAutoChantInputValue] = useState<string>('');
  const [isAutoChanting, setIsAutoChanting] = useState<boolean>(false);
  const [autoChantRemaining, setAutoChantRemaining] = useState<number>(0);
  const autoChantIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Backend stats - will be fetched from Digital Ocean server
  const [globalChants, setGlobalChants] = useState<number>(0);
  const [recordChants, setRecordChants] = useState<number>(0);
  const [avgChantsPerUser, setAvgChantsPerUser] = useState<number>(0);
  const [uniqueUsers, setUniqueUsers] = useState<number>(0);
  const [uniqueCountries, setUniqueCountries] = useState<number>(0);
  const [statsLoading, setStatsLoading] = useState<boolean>(true);

  // Check audio element on mount
  useEffect(() => {
    if (audioRef.current) {
      console.log("🎵 Audio element mounted");
      console.log("Audio src:", audioRef.current.src);

      const handleCanPlay = () => console.log("✅ Audio can play");
      const handleError = (e: Event) => {
        console.error("❌ Audio error:", (e.target as HTMLAudioElement).error);
      };
      const handleLoadStart = () => console.log("📥 Audio loading started");
      const handleLoadedMetadata = () => console.log("✅ Audio metadata loaded");

      audioRef.current.addEventListener('canplay', handleCanPlay);
      audioRef.current.addEventListener('error', handleError);
      audioRef.current.addEventListener('loadstart', handleLoadStart);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('canplay', handleCanPlay);
          audioRef.current.removeEventListener('error', handleError);
          audioRef.current.removeEventListener('loadstart', handleLoadStart);
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        }
      };
    }
  }, []);

  // Fetch stats from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStatsLoading(true);
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
        const response = await fetch(`${BACKEND_URL}/api/aum-stats`);
        if (response.ok) {
          const data = await response.json();
          setGlobalChants(data.globalChants || 0);
          setRecordChants(data.recordChants || 0);
          setAvgChantsPerUser(data.avgChantsPerUser || 0);
          setUniqueUsers(data.uniqueUsers || 0);
          setUniqueCountries(data.uniqueCountries || 0);
        }
      } catch (error) {
        console.error("Failed to fetch Aum stats:", error);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
    // Refresh stats every 1 second
    const interval = setInterval(fetchStats, 1000);
    return () => clearInterval(interval);
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

  const playChantSound = useCallback(() => {
    if (audioRef.current) {
      console.log("🔊 Attempting to play audio...");
      console.log("Audio element:", audioRef.current);
      console.log("Audio src:", audioRef.current.src);
      console.log("Audio readyState:", audioRef.current.readyState);
      console.log("Audio networkState:", audioRef.current.networkState);

      audioRef.current.currentTime = 0;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("✅ Audio playing successfully");
          })
          .catch(err => {
            console.error("❌ Audio play failed:", err);
            console.error("Error name:", err.name);
            console.error("Error message:", err.message);
            console.error("Audio src:", audioRef.current?.src);
            console.error("Audio readyState:", audioRef.current?.readyState);
            console.error("Audio networkState:", audioRef.current?.networkState);
            console.error("Audio paused:", audioRef.current?.paused);
          });
      }
    } else {
      console.error("❌ Audio ref is null");
    }
  }, []);

  const handleChant = useCallback(() => {
    playChantSound();

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

    // Send chant to backend
    const userId = localStorage.getItem('userId') || `user-${Date.now()}`;
    if (!localStorage.getItem('userId')) {
      localStorage.setItem('userId', userId);
    }

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    fetch(`${BACKEND_URL}/api/aum-chant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    }).catch(err => console.error('Failed to record chant on backend:', err));

    setIsChanted(true);
    setTimeout(() => setIsChanted(false), 150);

    const newId = Date.now() + Math.random();
    setChantEffects(prev => [...prev, { id: newId, active: false }]);
    setTimeout(() => setChantEffects(prev => prev.filter(effect => effect.id !== newId)), 700);
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
    handleChant();
    autoChantRemainingRef.current--;
    setAutoChantRemaining(autoChantRemainingRef.current);

    // If more chants remaining, wait for audio to end then pause 0.5s
    if (autoChantRemainingRef.current > 0 && autoChantActiveRef.current) {
      const audio = audioRef.current;
      if (audio) {
        const onEnded = () => {
          audio.removeEventListener('ended', onEnded);
          // Wait 0.5 seconds after audio ends, then chant again
          autoChantIntervalRef.current = setTimeout(() => {
            performAutoChant();
          }, 500);
        };
        audio.addEventListener('ended', onEnded);
      } else {
        // Fallback if no audio ref
        autoChantIntervalRef.current = setTimeout(() => {
          performAutoChant();
        }, 2000);
      }
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
  const progressPercent = dailyGoal && dailyGoal > 0 ? Math.min((todaysChants / dailyGoal) * 100, 100) : 0;
  const goalMet = progressPercent >= 100;

  const progressRingRadius = 45;
  const progressRingCircumference = 2 * Math.PI * progressRingRadius;
  const strokeDashoffset = progressRingCircumference * (1 - progressPercent / 100);

  return (
    <PageLayout title="Aum Chanter" className="no-top-padding">
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

          {/* Main Chant Button + Daily Goal */}
          <div className="flex flex-col items-center gap-3 mt-2">
	            <div className="relative flex items-center justify-center">
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
	                className={`relative flex items-center justify-center w-[clamp(7.5rem,40vmin,16rem)] h-[clamp(7.5rem,40vmin,16rem)] rounded-full bg-gradient-radial from-spiritual-700/20 via-spiritual-900/10 to-transparent border-2 border-spiritual-400/20 shadow-[0_0_30px_rgba(217,119,6,0.2),inset_0_0_15px_rgba(251,146,60,0.1)] cursor-pointer transition-all duration-150 ease-in-out hover:shadow-[0_0_45px_rgba(217,119,6,0.4),inset_0_0_20px_rgba(251,146,60,0.2)] hover:border-spiritual-400/40 active:scale-95 ${isChanted ? 'scale-95' : 'scale-100'}`}
	                aria-label="Chant to increase count"
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
	                  <img
	                    src="/om.jpg"
	                    alt="Om"
	                    className="w-[clamp(7.5rem,40vmin,16rem)] h-[clamp(7.5rem,40vmin,16rem)] object-cover rounded-full drop-shadow-[0_0_15px_rgba(253,224,71,0.4)]"
	                  />
	                  {chantEffects.map(effect => (
	                    <img
	                      key={effect.id}
	                      src="/om.jpg"
	                      alt=""
	                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(7.5rem,40vmin,16rem)] h-[clamp(7.5rem,40vmin,16rem)] object-cover rounded-full drop-shadow-[0_0_15px_rgba(253,224,71,0.4)] pointer-events-none transition-all duration-700 ease-out ${effect.active ? 'scale-150 opacity-0' : 'scale-100 opacity-70'}`}
	                    />
	                  ))}
	                </div>
	              </div>
	            </div>

          </div>

          {/* Mala Beads Visualization */}
          <div className="w-full flex flex-col items-center mt-4 mb-8">
            <h3 className="text-sm sm:text-base text-spiritual-300/70 font-sans mb-4">Your Mala Progress</h3>
            <MalaBeads litBeads={todaysChants} size="md" className="mb-4" />
          </div>

          {/* Stats row: Today's progress + Secondary stats */}
          <div className="w-full flex flex-col items-center gap-1 text-sm sm:text-base text-spiritual-300/70">
            {dailyGoal && (
              <span className="font-mono">Today: {todaysChants.toLocaleString()} / {dailyGoal.toLocaleString()}</span>
            )}
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
              title={`I've chanted 'Aum' ${count.toLocaleString()} times. Join the global meditation.`}
              description="Join the Aum Chanter meditation game and contribute to our global chanting community."
              twitterText={`I've chanted 'Aum' ${count.toLocaleString()} times. Join the global meditation. #Aum #Meditation`}
              whatsappText={`I've chanted 'Aum' ${count.toLocaleString()} times. Join the global meditation.`}
              className="justify-center"
            />
          </div>
        </div>
	
	        {/* Hidden Audio Element */}
	        <audio
	          ref={audioRef}
	          src="/aum.mp3"
	          preload="auto"
	          crossOrigin="anonymous"
	        />

        {/* History Modal */}
        {isHistoryVisible && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300" onClick={() => setIsHistoryVisible(false)}>
            <div className="bg-slate-800/80 border border-spiritual-400/20 rounded-lg shadow-2xl w-11/12 max-w-md max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center p-4 border-b border-spiritual-400/20">
                <h2 className="text-xl font-sans text-spiritual-200">Chant History</h2>
                <button onClick={() => setIsHistoryVisible(false)} className="text-spiritual-300/60 hover:text-spiritual-200 text-2xl leading-none" aria-label="Close history view">&times;</button>
              </div>
              <div className="p-4 overflow-y-auto">
                {history.length > 0 ? (
                  <ul className="space-y-3">
                    {[...history].reverse().map(entry => (
                      <li key={entry.date} className="flex justify-between items-baseline text-white/90 font-mono text-lg">
                        <span className="text-base text-spiritual-300/80">{entry.date}</span>
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
                  Enter the number of times to chant Om automatically (max 1000).
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

