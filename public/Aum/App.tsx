import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';

// --- CONFIGURATION ---
// 1. Create a free project at https://supabase.com
// 2. Go to the SQL Editor and run the setup script (see comments or AI response).
// 3. Paste your Project URL and Anon Key below.
const SUPABASE_URL = ""; 
const SUPABASE_ANON_KEY = "";

// Initialize Supabase only if keys are present
const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY) 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
  : null;

// Helper to get today's date in YYYY-MM-DD format
const getTodayString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper to generate or retrieve a persistent anonymous User ID
const getAnonymousUserId = () => {
  try {
    let userId = window.localStorage.getItem('aumUserId');
    if (!userId) {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        userId = crypto.randomUUID();
      } else {
        userId = Date.now().toString(36) + Math.random().toString(36).substring(2);
      }
      window.localStorage.setItem('aumUserId', userId);
    }
    return userId;
  } catch (error) {
    console.error("Error managing user ID:", error);
    return 'unknown-user';
  }
};

const App: React.FC = () => {
  const [history, setHistory] = useState<{ date: string; chants: number }[]>(() => {
    try {
      const savedHistory = window.localStorage.getItem('aumChantHistory');
      if (savedHistory) {
        return JSON.parse(savedHistory);
      }
      const savedCount = window.localStorage.getItem('aumChantCount');
      if (savedCount) {
        const numericCount = parseInt(savedCount, 10);
        if (!isNaN(numericCount) && numericCount > 0) {
            return [{ date: getTodayString(), chants: numericCount }];
        }
      }
      return [];
    } catch (error) {
      console.error("Could not read history from localStorage:", error);
      return [];
    }
  });

  const [dailyGoal, setDailyGoal] = useState<number | null>(() => {
    try {
      const savedGoal = window.localStorage.getItem('aumChantGoal');
      return savedGoal ? parseInt(savedGoal, 10) : null;
    } catch (error) {
      console.error("Could not read goal from localStorage:", error);
      return null;
    }
  });

  const count = useMemo(() => {
    return history.reduce((total, entry) => total + entry.chants, 0);
  }, [history]);

  // We use a float for internal global count to allow smooth interpolation
  const [globalCount, setGlobalCount] = useState<number>(() => {
    try {
      const savedGlobalCount = window.localStorage.getItem('aumGlobalChantCount');
      return savedGlobalCount ? parseFloat(savedGlobalCount) : 123456789;
    } catch (error) {
      return 123456789;
    }
  });
  
  const [uniqueUsers, setUniqueUsers] = useState<number>(() => {
    try {
        const savedUniqueUsers = window.localStorage.getItem('aumUniqueUsers');
        return savedUniqueUsers ? parseInt(savedUniqueUsers, 10) : 45873;
    } catch (error) {
        return 45873;
    }
  });

  const [highScore, setHighScore] = useState<number>(() => {
    try {
        const savedHighScore = window.localStorage.getItem('aumHighScore');
        return savedHighScore ? parseInt(savedHighScore, 10) : 12345;
    } catch (error) {
        return 12345;
    }
  });

  const [isChanted, setIsChanted] = useState<boolean>(false);
  const [chantEffects, setChantEffects] = useState<{ id: number; active: boolean }[]>([]);
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');
  const [sharedChantInfo, setSharedChantInfo] = useState<string | null>(null);
  const [isHistoryVisible, setIsHistoryVisible] = useState<boolean>(false);
  const [isGoalModalVisible, setIsGoalModalVisible] = useState<boolean>(false);
  const [goalInputValue, setGoalInputValue] = useState<string>('');
  const [isShareModalVisible, setIsShareModalVisible] = useState<boolean>(false);
  const [shareableLink, setShareableLink] = useState<string>('');
  const [modalCopySuccess, setModalCopySuccess] = useState<boolean>(false);
  
  const userId = useMemo(() => getAnonymousUserId(), []);
  const hasSyncedRef = useRef(false);
  const chantBufferRef = useRef(0);
  
  // Interpolation Refs
  const lastServerCountRef = useRef<number>(globalCount);
  const lastFetchTimeRef = useRef<number>(Date.now());
  const chantRateRef = useRef<number>(0); // Chants per millisecond

  // --- SUPABASE OPTIMIZATION STRATEGY: SMART POLLING WITH JITTER ---
  // To handle unlimited users for free:
  // 1. No Websockets (Realtime): Avoids the 200 concurrent user limit.
  // 2. Slow Polling: Checks DB every ~20s. Very low load.
  // 3. Jitter: Adds random 0-5s delay so users don't hit DB all at once.
  // 4. Interpolation: Animates the number locally between checks to look "live".

  // 1. Sync User Presence (Upsert) - Once per session
  useEffect(() => {
    if (!supabase || !userId || hasSyncedRef.current) return;

    const syncUser = async () => {
      try {
        const { error } = await supabase
          .from('visitors')
          .upsert({ id: userId, last_seen_at: new Date().toISOString() }, { onConflict: 'id' });

        if (error) console.error("Supabase user sync error:", error);
        hasSyncedRef.current = true;
      } catch (err) {
        console.error("Supabase connection failed:", err);
      }
    };
    syncUser();
  }, [userId]);

  // 2. Smart Polling & Interpolation Calculation with Jitter
  useEffect(() => {
    if (!supabase) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    let isMounted = true;

    const fetchCounts = async () => {
      try {
        const now = Date.now();

        // Fetch Global Chants
        const { data: globalData, error: globalError } = await supabase
          .from('global_stats')
          .select('total_chants')
          .single();
        
        if (!globalError && globalData) {
          const newServerCount = Number(globalData.total_chants);
          
          // Calculate Rate (Chants per ms)
          const timeDiff = now - lastFetchTimeRef.current;
          const countDiff = newServerCount - lastServerCountRef.current;

          if (timeDiff > 0 && countDiff >= 0) {
            // Apply a simple smoothing factor to avoid wild jumps
            const instantRate = countDiff / timeDiff;
            // Weighted average: 70% new rate, 30% old rate (smoothing)
            chantRateRef.current = (instantRate * 0.7) + (chantRateRef.current * 0.3);
          }

          lastServerCountRef.current = newServerCount;
          lastFetchTimeRef.current = now;

          // Sync state to server truth (prevent backward jumps if local went too fast)
          setGlobalCount(prev => Math.max(prev, newServerCount));
        }

        // Fetch Unique Users (less frequent updates needed, but we do it together)
        const { count: userCount, error: userError } = await supabase
          .from('visitors')
          .select('*', { count: 'exact', head: true });
        
        if (!userError && userCount !== null) setUniqueUsers(userCount);

      } catch (err) {
        console.error("Error fetching stats:", err);
      }

      if (isMounted) {
        // JITTER LOGIC:
        // Base delay 20s + Random delay 0-5s
        // This spreads out requests so thousands of users don't hit the API at the exact same millisecond.
        const jitter = Math.random() * 5000;
        timeoutId = setTimeout(fetchCounts, 20000 + jitter);
      }
    };

    fetchCounts();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  // 3. Animation Loop (Interpolation)
  // This makes the counter tick up smoothly between DB checks
  useEffect(() => {
    if (!supabase) return;

    const animationInterval = setInterval(() => {
      const rate = chantRateRef.current;
      if (rate > 0) {
        // Update every 100ms
        const increment = rate * 100; 
        setGlobalCount(prev => prev + increment);
      }
    }, 100);

    return () => clearInterval(animationInterval);
  }, []);

  // 4. Flush Chant Buffer (Batched Writes)
  useEffect(() => {
    if (!supabase) return;

    const flushInterval = setInterval(async () => {
      const quantity = chantBufferRef.current;
      if (quantity > 0) {
        chantBufferRef.current = 0; // Reset immediately
        try {
          const { error } = await supabase.rpc('increment_global_chants', { quantity });
          
          if (error) {
            // Fallback: Unsafe increment if RPC not set up
            const { data } = await supabase.from('global_stats').select('total_chants').single();
            if (data) {
                await supabase.from('global_stats').update({ total_chants: Number(data.total_chants) + quantity }).eq('id', 1);
            }
          }
        } catch (err) {
          console.error("Flush failed:", err);
          // If failed, we might lose these clicks. Retrying logic omitted for simplicity/safety.
        }
      }
    }, 3000); // Sync local clicks every 3 seconds

    return () => clearInterval(flushInterval);
  }, []);


  // --- EXISTING LOGIC & FALLBACKS ---

  // Handle incoming share links
  useEffect(() => {
    try {
        const params = new URLSearchParams(window.location.search);
        const sharedChants = params.get('chants');
        if (sharedChants) {
            const chantValue = parseInt(sharedChants, 10);
            if (!isNaN(chantValue)) {
                setSharedChantInfo(`A friend has shared their progress of ${chantValue.toLocaleString()} chants. Start your own journey!`);
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.delete('chants');
                window.history.replaceState({}, document.title, newUrl.pathname);
                const timer = setTimeout(() => setSharedChantInfo(null), 10000);
                return () => clearTimeout(timer);
            }
        }
    } catch (error) {
        console.error("Error processing URL parameters:", error);
    }
  }, []);

  // Save local data to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem('aumChantHistory', JSON.stringify(history));
      window.localStorage.setItem('aumHighScore', highScore.toString());
      if (dailyGoal === null) {
        window.localStorage.removeItem('aumChantGoal');
      } else {
        window.localStorage.setItem('aumChantGoal', dailyGoal.toString());
      }
      
      // Save the integer part of global count
      if (!supabase) {
        window.localStorage.setItem('aumGlobalChantCount', Math.floor(globalCount).toString());
        window.localStorage.setItem('aumUniqueUsers', uniqueUsers.toString());
      }
    } catch (error) {
      console.error("Could not write to localStorage:", error);
    }
  }, [history, globalCount, uniqueUsers, highScore, dailyGoal]);

  // Fallback Simulation: Global Chants (Only if no Supabase)
  useEffect(() => {
    if (supabase) return;

    const chantInterval = setInterval(() => {
      const randomIncrement = Math.floor(Math.random() * 11) + 5;
      setGlobalCount(prev => prev + randomIncrement);
    }, 3000);
    return () => clearInterval(chantInterval);
  }, []);

  // Fallback Simulation: Unique Users (Only if no Supabase)
  useEffect(() => {
    if (supabase) return;

    const userInterval = setInterval(() => {
      setUniqueUsers(prev => prev + (Math.random() > 0.6 ? 1 : 0));
    }, 8000);
    return () => clearInterval(userInterval);
  }, []);
  
  // High Score Logic
  useEffect(() => {
    if (!supabase) {
        const highScoreInterval = setInterval(() => {
            if (Math.random() > 0.95) {
                const increment = Math.floor(Math.random() * 5) + 1;
                setHighScore(prev => prev + increment);
            }
        }, 3000);
        return () => clearInterval(highScoreInterval);
    }
  }, []);

  useEffect(() => {
    if (count > highScore) {
        setHighScore(count);
    }
  }, [count, highScore]);

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

  const playChantSound = useCallback(() => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();
      const now = ctx.currentTime;
      const duration = 4.5;

      const masterGain = ctx.createGain();
      masterGain.connect(ctx.destination);
      
      const osc1 = ctx.createOscillator(); 
      const osc2 = ctx.createOscillator(); 
      const osc3 = ctx.createOscillator(); 

      osc1.type = 'sine';
      osc2.type = 'sine';
      osc3.type = 'sine';

      osc1.frequency.setValueAtTime(136.1, now);
      osc2.frequency.setValueAtTime(68.05, now);
      osc3.frequency.setValueAtTime(204.15, now);

      const gain1 = ctx.createGain();
      const gain2 = ctx.createGain();
      const gain3 = ctx.createGain();

      osc1.connect(gain1);
      osc2.connect(gain2);
      osc3.connect(gain3);

      gain1.connect(masterGain);
      gain2.connect(masterGain);
      gain3.connect(masterGain);

      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.4, now + 0.5);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + duration);

      gain2.gain.setValueAtTime(0, now);
      gain2.gain.linearRampToValueAtTime(0.3, now + 0.5);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + duration);

      gain3.gain.setValueAtTime(0, now);
      gain3.gain.linearRampToValueAtTime(0.1, now + 0.5);
      gain3.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc1.start(now);
      osc2.start(now);
      osc3.start(now);

      osc1.stop(now + duration);
      osc2.stop(now + duration);
      osc3.stop(now + duration);

      setTimeout(() => {
        if (ctx.state !== 'closed') {
            ctx.close();
        }
      }, (duration * 1000) + 100);

    } catch (error) {
      console.error("Audio synthesis failed:", error);
    }
  }, []);

  const handleChant = useCallback(async () => {
    playChantSound();

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try {
            navigator.vibrate(50);
        } catch (e) {}
    }

    // Optimistic UI update for Local Count
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

    // Optimistic UI update for Global Count
    // We update the float state, but the visual integer increments by 1
    setGlobalCount(prevGlobalCount => prevGlobalCount + 1);
    
    // Add to buffer for batched sending
    if (supabase) {
        chantBufferRef.current += 1;
    }

    setIsChanted(true);
    setTimeout(() => setIsChanted(false), 150);
    
    const newId = Date.now() + Math.random();
    setChantEffects(prev => [...prev, { id: newId, active: false }]);
    setTimeout(() => setChantEffects(prev => prev.filter(effect => effect.id !== newId)), 700);

  }, [playChantSound]);

  const handleShare = async () => {
    const shareUrl = new URL(window.location.href);
    shareUrl.searchParams.set('chants', count.toString());
    const urlString = shareUrl.toString();
    setShareableLink(urlString);
    
    const shareText = `I've chanted 'Aum' ${count.toLocaleString()} times. Join the global meditation.`;
    const shareData = { title: 'Aum Chanter', text: shareText, url: urlString };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return; 
      } catch (error) {
        console.log('Web Share API failed or cancelled, falling back.', error);
      }
    }
    setModalCopySuccess(false);
    setIsShareModalVisible(true);
  };
  
  const handleModalCopy = async () => {
    if (modalCopySuccess) return;
    try {
      await navigator.clipboard.writeText(shareableLink);
      setModalCopySuccess(true);
      setTimeout(() => {
        setModalCopySuccess(false); 
      }, 3000);
    } catch (err) {
      console.error("Failed to copy from modal:", err);
    }
  };

  const handleSetGoal = () => {
    const newGoal = parseInt(goalInputValue, 10);
    if (!isNaN(newGoal) && newGoal > 0) {
      setDailyGoal(newGoal);
    } else {
      setDailyGoal(null);
    }
    setIsGoalModalVisible(false);
  };

  const todaysChants = history.find(entry => entry.date === getTodayString())?.chants || 0;
  const progressPercent = dailyGoal && dailyGoal > 0 ? Math.min((todaysChants / dailyGoal) * 100, 100) : 0;
  const goalMet = progressPercent >= 100;

  const avgChants = uniqueUsers > 0 ? (globalCount / uniqueUsers).toFixed(1) : '0.0';
  
  const progressRingRadius = 45;
  const progressRingCircumference = 2 * Math.PI * progressRingRadius;
  const strokeDashoffset = progressRingCircumference * (1 - progressPercent / 100);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-slate-900 text-gray-100 select-none overflow-hidden antialiased">
      <div className="absolute top-4 sm:top-8 text-center flex flex-col gap-2 sm:gap-4 z-10">
        <div>
            <p className="text-xs sm:text-sm font-sans tracking-widest text-indigo-300/70 uppercase">Global Chants</p>
            {/* Display formatted integer, hiding the fractional interpolation */}
            <p className="text-3xl sm:text-4xl md:text-5xl font-mono tracking-wider text-white/70">{Math.floor(globalCount).toLocaleString()}</p>
        </div>
        <div>
            <p className="text-xs sm:text-sm font-sans tracking-widest text-indigo-300/70 uppercase">Record Chants</p>
            <p className="text-2xl sm:text-3xl font-mono tracking-wider text-white/70">{highScore.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="absolute top-4 sm:top-8 right-4 sm:right-8 z-10 flex gap-4">
        <button onClick={() => setIsHistoryVisible(true)} className="text-indigo-300/70 hover:text-indigo-200 transition-colors uppercase text-xs sm:text-sm font-sans tracking-widest" aria-label="View chant history">History</button>
        <button onClick={() => { setGoalInputValue(dailyGoal?.toString() || ''); setIsGoalModalVisible(true); }} className="text-indigo-300/70 hover:text-indigo-200 transition-colors uppercase text-xs sm:text-sm font-sans tracking-widest" aria-label="Set daily goal">Goal</button>
      </div>

      {sharedChantInfo && (
        <div className="absolute top-36 sm:top-48 w-11/12 max-w-md mx-auto p-4 bg-indigo-900/50 backdrop-blur-sm border border-indigo-400/30 rounded-lg text-center text-sm text-indigo-200 shadow-xl transition-opacity duration-500 z-20">
            <p className="pr-4">{sharedChantInfo}</p>
            <button onClick={() => setSharedChantInfo(null)} className="absolute top-1.5 right-2 text-indigo-300/60 hover:text-indigo-200 text-2xl leading-none" aria-label="Dismiss message">&times;</button>
        </div>
      )}
      
      <div className="relative flex items-center justify-center">
        {dailyGoal && (
          <svg className="absolute w-[clamp(9rem,48vmin,19.2rem)] h-[clamp(9rem,48vmin,19.2rem)] -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={progressRingRadius} strokeWidth="3" className="text-indigo-500/10" fill="none" />
            <circle 
              cx="50" cy="50" 
              r={progressRingRadius} 
              strokeWidth="3" 
              className={`transition-all duration-500 ease-in-out ${goalMet ? 'text-cyan-400' : 'text-indigo-400'}`} 
              fill="none" 
              strokeLinecap="round"
              strokeDasharray={progressRingCircumference}
              strokeDashoffset={strokeDashoffset}
              style={{ filter: goalMet ? 'drop-shadow(0 0 5px currentColor)' : 'none' }}
            />
          </svg>
        )}
        <div onClick={handleChant} className={`relative flex items-center justify-center w-[clamp(7.5rem,40vmin,16rem)] h-[clamp(7.5rem,40vmin,16rem)] rounded-full bg-gradient-radial from-indigo-700/20 via-indigo-900/10 to-transparent border-2 border-indigo-400/20 shadow-[0_0_30px_rgba(129,140,248,0.2),inset_0_0_15px_rgba(165,180,252,0.1)] cursor-pointer transition-all duration-150 ease-in-out hover:shadow-[0_0_45px_rgba(129,140,248,0.4),inset_0_0_20px_rgba(165,180,252,0.2)] hover:border-indigo-400/40 active:scale-95 ${isChanted ? 'scale-95' : 'scale-100'}`} aria-label="Chant to increase count" role="button">
          
          {/* Aura Effects */}
          {chantEffects.map(effect => (
            <div 
                key={`aura-${effect.id}`}
                className={`absolute inset-0 rounded-full border border-indigo-400/30 shadow-[0_0_60px_rgba(129,140,248,0.5)] pointer-events-none transition-all duration-700 ease-out ${effect.active ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}
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
        <div className="mt-6 text-center font-mono text-lg text-indigo-300/80">
          Today: {todaysChants.toLocaleString()} / {dailyGoal.toLocaleString()}
        </div>
      )}
      
      <div className="absolute bottom-6 sm:bottom-10 w-full px-4 sm:px-8">
        <div className="flex justify-evenly items-end max-w-4xl mx-auto">
          <div className="text-center">
            <div className="relative h-6">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex items-center justify-center gap-2">
                    <p className="text-[10px] sm:text-sm font-sans tracking-widest text-indigo-300 uppercase">Your Chants</p>
                    <button onClick={handleShare} aria-label="Share your chant count" className="text-indigo-300/60 hover:text-indigo-300 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/><path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/></svg>
                    </button>
                </div>
                <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 transition-opacity duration-300 ${shareStatus === 'copied' ? 'opacity-100' : 'opacity-0'}`}><p className="text-xs text-indigo-300">Copied!</p></div>
            </div>
            <p className="text-xl sm:text-2xl md:text-4xl font-mono tracking-wider text-white/90">{count.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] sm:text-xs font-sans tracking-widest text-indigo-300/70 uppercase">Avg Chants/User</p>
            <p className="text-xl sm:text-2xl md:text-4xl font-mono tracking-wider text-white/70">{avgChants}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] sm:text-xs font-sans tracking-widest text-indigo-300/70 uppercase">Unique Users</p>
            <p className="text-xl sm:text-2xl md:text-4xl font-mono tracking-wider text-white/70">{uniqueUsers.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {isHistoryVisible && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 animate-[fade-in_0.2s_ease-out]" onClick={() => setIsHistoryVisible(false)}>
            <style>{`@keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }`}</style>
            <div className="bg-slate-800/80 border border-indigo-400/20 rounded-lg shadow-2xl w-11/12 max-w-md max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b border-indigo-400/20">
                    <h2 className="text-xl font-sans text-indigo-200">Chant History</h2>
                    <button onClick={() => setIsHistoryVisible(false)} className="text-indigo-300/60 hover:text-indigo-200 text-2xl leading-none" aria-label="Close history view">&times;</button>
                </div>
                <div className="p-4 overflow-y-auto">
                    {history.length > 0 ? (
                        <ul className="space-y-3">
                            {[...history].reverse().map(entry => (
                                <li key={entry.date} className="flex justify-between items-baseline text-white/90 font-mono text-lg">
                                    <span className="text-base text-indigo-300/80">{entry.date}</span>
                                    <span>{entry.chants.toLocaleString()}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-indigo-300/70 py-8">No chant history yet. Start chanting to see your progress!</p>
                    )}
                </div>
            </div>
        </div>
      )}
      
      {isGoalModalVisible && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 animate-[fade-in_0.2s_ease-out]" onClick={() => setIsGoalModalVisible(false)}>
            <style>{`@keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }`}</style>
            <div className="bg-slate-800/80 border border-indigo-400/20 rounded-lg shadow-2xl w-11/12 max-w-md flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b border-indigo-400/20">
                    <h2 className="text-xl font-sans text-indigo-200">Set Daily Goal</h2>
                    <button onClick={() => setIsGoalModalVisible(false)} className="text-indigo-300/60 hover:text-indigo-200 text-2xl leading-none" aria-label="Close goal view">&times;</button>
                </div>
                <div className="p-4 space-y-4">
                    <label htmlFor="goal-input" className="text-indigo-300/90 text-sm">Set a target for your daily chants.</label>
                    <input 
                        id="goal-input"
                        type="number" 
                        value={goalInputValue}
                        onChange={e => setGoalInputValue(e.target.value)}
                        placeholder="e.g., 108"
                        className="w-full p-2 bg-slate-900/50 border border-indigo-400/30 rounded text-white font-mono text-lg" 
                    />
                    <div className="flex justify-end gap-3 pt-2">
                        <button onClick={() => { setDailyGoal(null); setIsGoalModalVisible(false); }} className="px-4 py-2 rounded bg-slate-700/50 text-indigo-200/80 hover:bg-slate-700 text-sm font-sans">Clear Goal</button>
                        <button onClick={handleSetGoal} className="px-4 py-2 rounded bg-indigo-600/80 text-white hover:bg-indigo-600 text-sm font-sans">Save Goal</button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {isShareModalVisible && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 animate-[fade-in_0.2s_ease-out]" onClick={() => setIsShareModalVisible(false)}>
            <style>{`@keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }`}</style>
            <div className="bg-slate-800/90 border border-indigo-400/20 rounded-lg shadow-2xl w-11/12 max-w-md flex flex-col p-6" onClick={e => e.stopPropagation()}>
                
                <div className="flex justify-between items-center mb-4 border-b border-indigo-400/20 pb-2">
                    <h2 className="text-xl font-sans text-indigo-200">Share your journey</h2>
                    <button onClick={() => setIsShareModalVisible(false)} className="text-indigo-300/60 hover:text-indigo-200 text-2xl leading-none" aria-label="Close share view">&times;</button>
                </div>
                
                <div className="space-y-6">
                    {/* Social Buttons */}
                    <div>
                        <p className="text-indigo-300/90 text-sm mb-3">Share directly:</p>
                        <div className="flex gap-4 justify-center">
                            <a 
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I've chanted 'Aum' ${count.toLocaleString()} times. Join the global meditation.`)}&url=${encodeURIComponent(shareableLink)}&hashtags=Aum,Meditation,Mindfulness`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-700/50 border border-indigo-400/30 text-white hover:bg-indigo-600/50 hover:border-indigo-400 transition-all duration-200 group"
                            aria-label="Share on X"
                            >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            </a>
                            <a 
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareableLink)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-700/50 border border-indigo-400/30 text-white hover:bg-indigo-600/50 hover:border-indigo-400 transition-all duration-200"
                            aria-label="Share on Facebook"
                            >
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/></svg>
                            </a>
                            <a 
                            href={`https://wa.me/?text=${encodeURIComponent(`I've chanted 'Aum' ${count.toLocaleString()} times. Join the global meditation. ${shareableLink}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-700/50 border border-indigo-400/30 text-white hover:bg-indigo-600/50 hover:border-indigo-400 transition-all duration-200"
                            aria-label="Share on WhatsApp"
                            >
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>
                            </a>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-indigo-400/20"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="bg-slate-800 px-2 text-indigo-300/60">OR COPY LINK</span>
                        </div>
                    </div>

                    {/* Manual Copy */}
                    <div>
                        <div className="flex items-center gap-2">
                             <input 
                                type="text" 
                                readOnly 
                                value={shareableLink} 
                                className="flex-grow w-full p-3 bg-slate-900/50 border border-indigo-400/30 rounded-lg text-indigo-100 font-mono text-sm focus:outline-none focus:border-indigo-400/60 transition-colors" 
                                onFocus={e => e.target.select()}
                            />
                            <button
                              onClick={handleModalCopy}
                              disabled={modalCopySuccess}
                              className={`px-4 py-3 rounded-lg text-sm font-bold tracking-wide transition-all shrink-0 ${
                                modalCopySuccess
                                  ? 'bg-green-600/80 text-white cursor-default'
                                  : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20'
                              }`}
                            >
                              {modalCopySuccess ? 'COPIED' : 'COPY'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </main>
  );
};

export default App;