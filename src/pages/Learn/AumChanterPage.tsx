import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import SocialShareButtons from '../../components/shared/SocialShareButtons';

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

  // Backend stats - will be fetched from Digital Ocean server
  const [globalChants, setGlobalChants] = useState<number>(0);
  const [recordChants, setRecordChants] = useState<number>(0);
  const [avgChantsPerUser, setAvgChantsPerUser] = useState<number>(0);
  const [uniqueUsers, setUniqueUsers] = useState<number>(0);
  const [statsLoading, setStatsLoading] = useState<boolean>(true);

  // Fetch stats from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStatsLoading(true);
        // TODO: Replace with your Digital Ocean backend URL
        const response = await fetch('/api/aum-stats');
        if (response.ok) {
          const data = await response.json();
          setGlobalChants(data.globalChants || 0);
          setRecordChants(data.recordChants || 0);
          setAvgChantsPerUser(data.avgChantsPerUser || 0);
          setUniqueUsers(data.uniqueUsers || 0);
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
      audioRef.current.currentTime = 0;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("✅ Audio playing successfully");
          })
          .catch(err => {
            console.error("❌ Audio play failed:", err);
            console.error("Audio src:", audioRef.current?.src);
            console.error("Audio readyState:", audioRef.current?.readyState);
          });
      }
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
      <main className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-spiritual-900 to-slate-900 text-gray-100 select-none overflow-hidden antialiased pt-16 sm:pt-20">
        {/* Top Stats - Three Column Layout */}
        <div className="absolute top-3 sm:top-4 w-full flex justify-center items-start gap-8 sm:gap-12 md:gap-16 z-10">
          {/* Left: Your Chants */}
          <div className="text-left flex flex-col gap-0 sm:gap-0.5">
            <div className="mt-3 leading-tight">
              <p className="text-xs sm:text-sm font-sans tracking-widest text-spiritual-300/70 uppercase">Your Chants</p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-mono tracking-wider text-white/70">{count.toLocaleString()}</p>
            </div>
          </div>

          {/* Center: Global Chants */}
          <div className="text-center flex flex-col gap-0 sm:gap-0.5">
            <div className="mt-3 leading-tight">
              <p className="text-xs sm:text-sm font-sans tracking-widest text-spiritual-300/70 uppercase">Global Chants</p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-mono tracking-wider text-white/70">
                {statsLoading ? '...' : globalChants.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Right: Record Chants */}
          <div className="text-right flex flex-col gap-0 sm:gap-0.5">
            <div className="mt-3 leading-tight">
              <p className="text-xs sm:text-sm font-sans tracking-widest text-spiritual-300/70 uppercase">Record Chants</p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-mono tracking-wider text-white/70">
                {statsLoading ? '...' : recordChants.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Top Right Buttons */}
        <div className="absolute top-4 sm:top-8 right-4 sm:right-8 z-10 flex gap-4">
          <button onClick={() => setIsHistoryVisible(true)} className="text-spiritual-300/70 hover:text-spiritual-200 transition-colors uppercase text-xs sm:text-sm font-sans tracking-widest" aria-label="View chant history">History</button>
          <button onClick={() => { setGoalInputValue(dailyGoal?.toString() || ''); setIsGoalModalVisible(true); }} className="text-spiritual-300/70 hover:text-spiritual-200 transition-colors uppercase text-xs sm:text-sm font-sans tracking-widest" aria-label="Set daily goal">Goal</button>
        </div>

        {/* Main Chant Button */}
        <div className="relative flex items-center justify-center -mt-[20vh]">
          {dailyGoal && (
            <svg className="absolute w-[clamp(9rem,48vmin,19.2rem)] h-[clamp(9rem,48vmin,19.2rem)] -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r={progressRingRadius} strokeWidth="3" className="text-spiritual-500/10" fill="none" />
              <circle
                cx="50" cy="50"
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
          <div onClick={handleChant} className={`relative flex items-center justify-center w-[clamp(7.5rem,40vmin,16rem)] h-[clamp(7.5rem,40vmin,16rem)] rounded-full bg-gradient-radial from-spiritual-700/20 via-spiritual-900/10 to-transparent border-2 border-spiritual-400/20 shadow-[0_0_30px_rgba(217,119,6,0.2),inset_0_0_15px_rgba(251,146,60,0.1)] cursor-pointer transition-all duration-150 ease-in-out hover:shadow-[0_0_45px_rgba(217,119,6,0.4),inset_0_0_20px_rgba(251,146,60,0.2)] hover:border-spiritual-400/40 active:scale-95 ${isChanted ? 'scale-95' : 'scale-100'}`} aria-label="Chant to increase count" role="button">

            {/* Aura Effects */}
            {chantEffects.map(effect => (
              <div
                key={`aura-${effect.id}`}
                className={`absolute inset-0 rounded-full border border-spiritual-400/30 shadow-[0_0_60px_rgba(217,119,6,0.5)] pointer-events-none transition-all duration-700 ease-out ${effect.active ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}
              />
            ))}

            <div className="relative flex items-center justify-center z-10">
              <div className="text-[clamp(3.75rem,20vmin,8rem)] leading-none font-serif text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.4)]">ॐ</div>
              {chantEffects.map(effect => (
                <div key={effect.id} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(3.75rem,20vmin,8rem)] leading-none font-serif text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.4)] pointer-events-none transition-all duration-700 ease-out ${effect.active ? 'scale-150 opacity-0' : 'scale-100 opacity-70'}`}>ॐ</div>
              ))}
            </div>
          </div>
        </div>

        {dailyGoal && (
          <div className="mt-6 text-center font-mono text-lg text-spiritual-300/80">
            Today: {todaysChants.toLocaleString()} / {dailyGoal.toLocaleString()}
          </div>
        )}

        {/* Social Sharing - Below Aum Sign */}
        <div className="mt-6 text-center z-10">
          <SocialShareButtons
            path="/learn/games/aum-chanter"
            title={`I've chanted 'Aum' ${count.toLocaleString()} times. Join the global meditation.`}
            description="Join the Aum Chanter meditation game and contribute to our global chanting community."
            twitterText={`I've chanted 'Aum' ${count.toLocaleString()} times. Join the global meditation. #Aum #Meditation`}
            whatsappText={`I've chanted 'Aum' ${count.toLocaleString()} times. Join the global meditation.`}
            className="justify-center"
          />
        </div>



        {/* Bottom Stats */}
        <div className="absolute bottom-6 sm:bottom-10 w-full px-4 sm:px-8">
          <div className="flex justify-center items-end gap-12 sm:gap-16 max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-[10px] sm:text-xs font-sans tracking-widest text-spiritual-300/70 uppercase">Avg Chants/User</p>
              <p className="text-xl sm:text-2xl md:text-4xl font-mono tracking-wider text-white/70">
                {statsLoading ? '...' : avgChantsPerUser.toFixed(1)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-[10px] sm:text-xs font-sans tracking-widest text-spiritual-300/70 uppercase">Unique Users</p>
              <p className="text-xl sm:text-2xl md:text-4xl font-mono tracking-wider text-white/70">
                {statsLoading ? '...' : uniqueUsers.toLocaleString()}
              </p>
            </div>
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
      </main>
    </PageLayout>
  );
};

export default AumChanterPage;

