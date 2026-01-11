import React, { useState, useEffect } from 'react';
import { COLORS, SPEECH_CHUNKS, MODE_DESCRIPTIONS } from './constants';
import { MemorizationMode } from './types';
import { MemorizationTools } from './components/MemorizationTools';
import { AudioPlayer } from './components/AudioPlayer';
import { generateSpeechAudio, decodeAudioData } from './services/geminiService';
import { getAudioData, saveAudioData } from './utils/db';

const App: React.FC = () => {
  const [currentChunkId, setCurrentChunkId] = useState(1);
  const [mode, setMode] = useState<MemorizationMode>(MemorizationMode.READ);
  
  // In-memory cache for the current session to avoid re-decoding needlessly
  const [audioCache, setAudioCache] = useState<Record<number, AudioBuffer>>({});
  
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [isCheckingDB, setIsCheckingDB] = useState(true);
  
  const [error, setError] = useState<string | null>(null);
  
  // Audio Progress State
  const [audioProgress, setAudioProgress] = useState(0);
  
  const currentChunk = SPEECH_CHUNKS.find(c => c.id === currentChunkId) || SPEECH_CHUNKS[0];

  // Derive current data from local cache
  const currentAudioBuffer = audioCache[currentChunkId] || null;

  // Reset audio progress when chunk changes
  useEffect(() => {
    setAudioProgress(0);
    setError(null);
  }, [currentChunkId]);

  // Attempt to load audio from DB on chunk change if not in memory
  useEffect(() => {
    let isMounted = true;

    const checkCacheAndDB = async () => {
      // 1. Check Memory Cache
      if (audioCache[currentChunkId]) {
        setIsCheckingDB(false);
        return;
      }

      // 2. Check IndexedDB
      setIsCheckingDB(true);
      try {
        const storedAudio = await getAudioData(currentChunkId);
        if (isMounted && storedAudio) {
          const buffer = decodeAudioData(storedAudio);
          setAudioCache(prev => ({ ...prev, [currentChunkId]: buffer }));
        }
      } catch (e) {
        console.error("Failed to load from DB", e);
      } finally {
        if (isMounted) setIsCheckingDB(false);
      }
    };

    checkCacheAndDB();

    return () => { isMounted = false; };
  }, [currentChunkId, audioCache]);

  const handleNext = () => {
    if (currentChunkId < SPEECH_CHUNKS.length) {
      setCurrentChunkId(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentChunkId > 1) {
      setCurrentChunkId(prev => prev - 1);
    }
  };

  const handleFetchAudio = async () => {
    if (currentAudioBuffer) return; // Use memory cache
    
    setError(null);
    setIsLoadingAudio(true);

    try {
        // 1. Double check DB (in case of race condition or previous error)
        const storedAudio = await getAudioData(currentChunkId);
        if (storedAudio) {
            const buffer = decodeAudioData(storedAudio);
            setAudioCache(prev => ({ ...prev, [currentChunkId]: buffer }));
            setIsLoadingAudio(false);
            return;
        }

        // 2. Fetch from API
        const result = await generateSpeechAudio(currentChunkId, currentChunk.text);
        if (result) {
            setAudioCache(prev => ({ ...prev, [currentChunkId]: result.buffer }));
            // 3. Save to DB
            await saveAudioData(currentChunkId, result.rawData);
        } else {
            setError("Unable to generate audio. The service may be busy or the daily quota reached.");
        }
    } catch (err) {
        console.error(err);
        setError("Error fetching audio.");
    }
    setIsLoadingAudio(false);
  };

  return (
    <div className={`min-h-screen bg-${COLORS.bg} text-gray-800 pb-20`}>
      {/* Header */}
      <header className={`bg-${COLORS.primary} text-white sticky top-0 z-50 shadow-md`}>
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl md:text-2xl font-bold font-serif tracking-wide">Swamiji's Speech</h1>
            <p className="text-xs md:text-sm opacity-90">Chicago, 1893</p>
          </div>
          <div className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
            Chunk {currentChunkId} / {SPEECH_CHUNKS.length}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">

        {/* Introduction / Context */}
        <div className="bg-white/60 backdrop-blur-sm border border-orange-200 rounded-lg p-5 shadow-sm">
             <p className="text-gray-700 leading-relaxed font-serif text-sm md:text-base">
                Welcome to the <strong>Vivekananda Speech Memorizer</strong>. This tool is designed to help you commit Swami Vivekananda's historic 1893 Chicago address to memory. 
                Using the technique of "chunking," the speech is broken down into small, manageable parts. 
                Switch between different interactive modes below—like <em>Sentence Builder</em> or <em>Vanishing Text</em>—to test your recall and master each section step-by-step.
             </p>
        </div>
        
        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-sm flex justify-between items-center animate-fade-in">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">
              <span className="sr-only">Dismiss</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Navigation & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-2">
            <button 
              onClick={handlePrev} 
              disabled={currentChunkId === 1}
              className="px-4 py-2 rounded-lg bg-white border border-orange-200 text-orange-800 disabled:opacity-50 hover:bg-orange-50 transition"
            >
              &larr; Previous
            </button>
            <button 
              onClick={handleNext} 
              disabled={currentChunkId === SPEECH_CHUNKS.length}
              className="px-4 py-2 rounded-lg bg-white border border-orange-200 text-orange-800 disabled:opacity-50 hover:bg-orange-50 transition"
            >
              Next &rarr;
            </button>
          </div>

          <div className="flex items-center gap-2 min-w-[140px] justify-end">
             {isCheckingDB ? (
                <span className="text-sm text-gray-500 flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Checking storage...
                </span>
             ) : !currentAudioBuffer && !isLoadingAudio ? (
                <button 
                  onClick={handleFetchAudio}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-800 rounded-full hover:bg-orange-200 transition"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  Load Audio
                </button>
             ) : isLoadingAudio ? (
                <span className="text-sm text-orange-600 animate-pulse flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-orange-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
             ) : (
                <AudioPlayer 
                  key={currentChunkId} // Force remount when changing chunks
                  audioBuffer={currentAudioBuffer} 
                  onProgress={setAudioProgress}
                />
             )}
          </div>
        </div>

        {/* Mode Selector */}
        <div className="bg-white p-2 rounded-xl shadow-sm border border-orange-100 flex flex-col gap-3">
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { id: MemorizationMode.READ, label: "Read" },
              { id: MemorizationMode.VANISHING, label: "Vanishing" },
              { id: MemorizationMode.SCRAMBLE, label: "Scramble" },
              { id: MemorizationMode.WORD_SCRAMBLE, label: "Sentence Builder" },
              { id: MemorizationMode.BLUR, label: "Blur" },
              { id: MemorizationMode.FIRST_LETTER, label: "First Letter" },
              { id: MemorizationMode.CLOZE, label: "Fill Blanks" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setMode(m.id as MemorizationMode);
                  setAudioProgress(0);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  mode === m.id 
                    ? 'bg-orange-600 text-white shadow-md transform scale-105' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Description Banner */}
          <div className="text-center py-3 px-6 border-t border-orange-50 bg-orange-50/50 rounded-b-lg">
             <p className="text-sm text-orange-800 flex items-center justify-center gap-3">
                 <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
                 <span className="leading-relaxed">{MODE_DESCRIPTIONS[mode]}</span>
             </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative">
          <h2 className="text-xl font-bold text-orange-900 mb-2 pl-2 border-l-4 border-orange-500">
            {currentChunk.title}
          </h2>
          
          <MemorizationTools 
            chunk={currentChunk} 
            mode={mode} 
            audioProgress={audioProgress}
          />
        </div>
      </main>
    </div>
  );
};

export default App;