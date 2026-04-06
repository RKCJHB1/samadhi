import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { TimedSyllable, SvaraType } from '@/data/mantraTimings';

interface SyncedAudioPlayerProps {
  src: string;
  title?: string;
  syllables: TimedSyllable[];
  originalText: string;
  transliteration?: string;
  transliterationSyllables?: string[];
  mantraId?: string;
}

const SyncedAudioPlayer: React.FC<SyncedAudioPlayerProps> = ({
  src,
  title,
  syllables: defaultSyllables,
  originalText,
  transliteration,
  transliterationSyllables,
  mantraId
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
	  const [activeIndex, setActiveIndex] = useState(-1);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const highlightIntervalRef = useRef<NodeJS.Timeout | null>(null);

	  // Use the syllables passed in from the parent (Learn page / Admin).
	  // Any admin-confirmed configs should be resolved BEFORE calling this
	  // component, so we don't override the carefully tuned timings here.
	  const syllables = defaultSyllables;

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setIsLoaded(false);
    setError(null);
    setActiveIndex(-1);
  }, [src]);

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsLoaded(true);
    }
  };

  const handleLoadError = (e: any) => {
    console.error('Audio load error:', e, 'for file:', src);
    setError(`Could not load audio file: ${src}`);
    setIsLoaded(false);
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        if (highlightIntervalRef.current) {
          clearInterval(highlightIntervalRef.current);
          highlightIntervalRef.current = null;
        }
      } else {
        audioRef.current.play().catch(err => {
          console.error("Error playing audio:", err);
          setError("Could not play audio");
        });
        startHighlightInterval();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const startHighlightInterval = () => {
    if (highlightIntervalRef.current) {
      clearInterval(highlightIntervalRef.current);
    }
    highlightIntervalRef.current = setInterval(() => {
      if (audioRef.current) {
        const currentAudioTime = audioRef.current.currentTime;
        const activeIdx = syllables.findIndex(
          syllable =>
            currentAudioTime >= syllable.startTime &&
            currentAudioTime <= syllable.endTime
        );
        setActiveIndex(activeIdx);
      }
    }, 100);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleProgressChange = (values: number[]) => {
    if (audioRef.current && values.length > 0) {
      const newTime = values[0];
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      const activeIdx = syllables.findIndex(
        syllable =>
          newTime >= syllable.startTime &&
          newTime <= syllable.endTime
      );
      setActiveIndex(activeIdx);
    }
  };

  const handleVolumeChange = (values: number[]) => {
    if (audioRef.current && values.length > 0) {
      const newVolume = values[0];
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setActiveIndex(-1);
      if (!isPlaying) {
        togglePlayPause();
      } else {
        startHighlightInterval();
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (highlightIntervalRef.current) {
        clearInterval(highlightIntervalRef.current);
      }
    };
  }, []);

  // Get animation class based on explicit svara or fallback to duration-based
  const getSvaraAnimationClass = (svara: SvaraType | undefined, dur: number): string => {
    // If svara is explicitly set, use it (including 'neutral' which means no animation)
    if (svara) {
      switch (svara) {
        case 'udatta': return 'svara-syllable-udatta';
        case 'anudatta': return 'svara-syllable-anudatta';
        case 'svarita': return 'svara-syllable-svarita';
        case 'dirgha-svarita': return 'svara-syllable-dirgha';
        case 'neutral': return ''; // Explicitly no animation
      }
    }
    // Fallback to duration-based inference only if no svara is set
    const isShort = dur <= 0.35;
    const isDirgha = dur >= 1.0;
    if (isShort) return '';
    return isDirgha ? 'svara-syllable-dirgha' : 'svara-syllable-active';
  };

  // Render the text with highlighting and svara animation
  const renderSyncedText = () => {
    if (syllables.length === 0) {
      return <p className="text-center text-xl md:text-2xl text-gray-600 italic font-medium leading-relaxed">{transliteration || originalText}</p>;
    }

    const hasAlignedTransliterationSyllables =
      Array.isArray(transliterationSyllables) && transliterationSyllables.length === syllables.length;

    const displayTokens = syllables.map((syllable, idx) => {
      if (hasAlignedTransliterationSyllables) {
        return transliterationSyllables![idx] ?? syllable.text;
      }
      return syllable.text;
    });

    // Check if tokens have trailing spaces (word-level spacing)
    const hasTrailingSpaces = displayTokens.some(t => /\s$/.test(t));
    // Only auto-insert spaces when tokens don't have trailing spaces
    const shouldAutoSpace = !hasTrailingSpaces && displayTokens.every(t => !/\s/.test(t));

    const currentHighlightedToken = activeIndex >= 0 && activeIndex < displayTokens.length
      ? displayTokens[activeIndex].trim()
      : '';

    // Check if we have an active syllable (even if it's just whitespace)
    const hasActiveSyllable = activeIndex >= 0 && activeIndex < displayTokens.length;

    // Svara animation for the large centre syllable & circle
    const activeSyllable = hasActiveSyllable ? syllables[activeIndex] : undefined;
    const activeDur = activeSyllable
      ? (activeSyllable.endTime - activeSyllable.startTime) || 0
      : 0;

    // Use whatever svara is set on the syllable. If it's explicitly
    // 'neutral', we want NO svara animation (flat). Only when there is
    // truly no svara at all (undefined) do we fall back to duration-based
    // inference for a gentle motion.
    const explicitSvara = activeSyllable?.svara;
    let activeSvaraClass = hasActiveSyllable
      ? getSvaraAnimationClass(explicitSvara, activeDur)
      : '';

    // If there is NO svara information at all (undefined) and the
    // duration-based logic returns no animation (e.g. very short
    // syllable), use a gentle fallback bounce for the large centre
    // display so it still "moves" with the chant. Do NOT apply this
    // when the syllable is explicitly marked 'neutral'.
    if (hasActiveSyllable && !activeSvaraClass && typeof explicitSvara === 'undefined') {
      activeSvaraClass = 'svara-syllable-active';
    }
    const activeSvaraStyle = hasActiveSyllable && activeSvaraClass
      ? { animationDuration: `${Math.max(activeDur, 0.2)}s` }
      : undefined;

    return (
      <div className="space-y-6">
        {/* Large centered display of highlighted syllable with svara-based motion and circle */}
        <div className="flex items-center justify-center min-h-32 py-4">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex items-center justify-center">
            {/* Circle background - always render but with opacity transition */}
            <div
              className={`absolute inset-0 rounded-full border-4 border-indian-saffron bg-indian-saffron/10 shadow-md transition-opacity duration-200 ${hasActiveSyllable ? 'opacity-100' : 'opacity-0'} ${activeSvaraClass}`}
              style={activeSvaraStyle}
            ></div>
            {/* Syllable text */}
            <div
              className={`relative text-5xl md:text-6xl lg:text-7xl font-bold text-indian-saffron text-center transition-all duration-200 z-10 svara-syllable ${activeSvaraClass}`}
              style={activeSvaraStyle}
            >
              {currentHighlightedToken || ''}
            </div>
          </div>
        </div>

        {/* Normal-sized transliteration text below */}
        <div className="text-center text-xl md:text-2xl text-gray-600 italic font-medium leading-relaxed whitespace-pre-wrap">
          {displayTokens.map((token, index) => {
            const isActive = index === activeIndex;
            const dur = syllables[index]?.endTime - syllables[index]?.startTime || 0;
            const animationClass = isActive ? getSvaraAnimationClass(syllables[index]?.svara, dur) : '';

            const highlightClasses = isActive
              ? 'bg-indian-saffron/30 text-indian-saffron font-bold'
              : '';

            const animationStyle = isActive && animationClass
              ? { animationDuration: `${Math.max(dur, 0.2)}s` }
              : undefined;

            return (
              <span
                key={index}
                className={`svara-syllable transition-colors duration-200 ${highlightClasses} ${animationClass}`}
                style={animationStyle}
              >
                {token}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  // Render the transliteration with highlighting and svara animation
  const renderSyncedTransliteration = () => {
    if (!transliteration) return null;

    // Always render the full transliteration with proper spacing
    return (
      <p className="text-center text-xl md:text-2xl text-gray-600 italic font-medium whitespace-pre-wrap">
        {transliteration}
      </p>
    );
  };

  return (
    <div className="space-y-4">
      {/* Show synced text with syllable highlighting if syllables are available */}
      {syllables.length > 0 && (
        <div className="bg-gradient-to-br from-white to-indian-cream/30 rounded-xl p-6 shadow-sm border border-indian-saffron/20">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Follow Along</h3>
          {renderSyncedText()}
        </div>
      )}

      {/* Show initial transliteration display when no syllables or before audio plays */}
      {syllables.length === 0 && renderSyncedTransliteration()}

      <div className="bg-gradient-to-br from-indian-cream/30 to-white rounded-lg p-4 shadow-sm border border-indian-saffron/20">
        {title && (
          <div className="mb-2 text-center font-medium text-gray-700">{title}</div>
        )}

        <audio
          ref={audioRef}
          src={src}
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onError={handleLoadError}
          onCanPlay={() => setIsLoaded(true)}
          onLoadStart={() => console.log('Audio load started:', src)}
          onEnded={() => {
            setIsPlaying(false);
            if (highlightIntervalRef.current) {
              clearInterval(highlightIntervalRef.current);
              highlightIntervalRef.current = null;
            }
            setActiveIndex(-1);
          }}
        />

        {error ? (
          <div className="text-red-500 text-center py-4">
            <p>{error}</p>
            <p className="text-sm mt-1">Please check back later for audio guides.</p>
          </div>
        ) : !isLoaded ? (
          <div className="text-gray-500 text-center py-4">Loading audio...</div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">{formatTime(currentTime)}</span>
              <div className="flex-1 mx-2">
                <Slider
                  value={[currentTime]}
                  min={0}
                  max={duration}
                  step={0.01}
                  onValueChange={handleProgressChange}
                  className="cursor-pointer"
                />
              </div>
              <span className="text-xs text-gray-500">{formatTime(duration)}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={togglePlayPause}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-indian-saffron text-white hover:bg-indian-saffron/90 transition-colors"
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button
                  onClick={resetAudio}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                >
                  <RotateCcw size={14} />
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMute}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
                <div className="w-20">
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    min={0}
                    max={1}
                    step={0.01}
                    onValueChange={handleVolumeChange}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SyncedAudioPlayer;

