import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { TimedSyllable, SvaraType } from '@/data/mantraTimings';
import { getConfirmedSyllables, initMantraConfigs } from '@/utils/mantraStorage';

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
  const [configsReady, setConfigsReady] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const highlightIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize configs from JSON file on mount
  useEffect(() => {
    initMantraConfigs().then(() => setConfigsReady(true));
  }, []);

  // Use confirmed syllables from admin if available
  const syllables = mantraId && configsReady
    ? getConfirmedSyllables(mantraId, defaultSyllables)
    : defaultSyllables;

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
      return <p className="font-sanskrit text-center text-2xl md:text-3xl lg:text-4xl leading-relaxed">{originalText}</p>;
    }

    return (
      <div className="font-sanskrit text-center text-2xl md:text-3xl lg:text-4xl leading-relaxed">
        {syllables.map((syllable, index) => {
          const isActive = index === activeIndex;
          const dur = syllable.endTime - syllable.startTime;
          const animationClass = isActive ? getSvaraAnimationClass(syllable.svara, dur) : '';

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
              {syllable.text}
            </span>
          );
        })}
      </div>
    );
  };

  // Render the transliteration with highlighting and svara animation
  const renderSyncedTransliteration = () => {
    if (!transliteration) return null;

    if (transliterationSyllables && transliterationSyllables.length === syllables.length) {
      return (
        <div className="text-center text-xl md:text-2xl text-gray-600 italic font-medium leading-relaxed">
          {transliterationSyllables.map((syllable, index) => {
            const isActive = index === activeIndex;
            const source = syllables[index];
            const dur = source ? source.endTime - source.startTime : 0;
            const animationClass = isActive ? getSvaraAnimationClass(source?.svara, dur) : '';

            const highlightClasses = isActive
              ? 'bg-indian-saffron/20 text-indian-saffron font-bold'
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
                {syllable}
              </span>
            );
          })}
        </div>
      );
    }

    // Only render full transliteration if syllables are not available
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-indian-cream/50 to-white/50 border border-indian-saffron/30 p-4 rounded mb-4 min-h-[60px] flex flex-col items-center justify-center">
        {renderSyncedText()}
        {transliteration && (
          <div className="mt-3 pt-3 border-t border-indian-saffron/20 w-full">
            {renderSyncedTransliteration()}
          </div>
        )}
      </div>

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

