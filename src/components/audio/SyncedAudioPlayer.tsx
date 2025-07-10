import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface TimedSyllable {
  text: string;
  startTime: number;
  endTime: number;
}

interface SyncedAudioPlayerProps {
  src: string;
  title?: string;
  syllables: TimedSyllable[];
  originalText: string;
  transliteration?: string;
  transliterationSyllables?: string[];
}

const SyncedAudioPlayer: React.FC<SyncedAudioPlayerProps> = ({
  src,
  title,
  syllables,
  originalText,
  transliteration,
  transliterationSyllables
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

  useEffect(() => {
    // Reset state when src changes
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
        
        // Start the highlighting interval
        startHighlightInterval();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const startHighlightInterval = () => {
    if (highlightIntervalRef.current) {
      clearInterval(highlightIntervalRef.current);
    }
    
    // Check every 100ms which syllable should be highlighted
    highlightIntervalRef.current = setInterval(() => {
      if (audioRef.current) {
        const currentAudioTime = audioRef.current.currentTime;
        
        // Find the syllable that should be active at the current time
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
      
      // Update the highlighted syllable immediately
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
      if (newVolume === 0) {
        setIsMuted(true);
      } else {
        setIsMuted(false);
      }
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
        // If already playing, restart the highlighting
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

  // Render the text with highlighting
  const renderSyncedText = () => {
    if (syllables.length === 0) {
      return <p className="font-mono text-center text-lg">{originalText}</p>;
    }

    // If we have timing data, render with highlighting
    return (
      <div className="font-mono text-center text-lg leading-relaxed">
        {syllables.map((syllable, index) => (
          <span
            key={index}
            className={`transition-colors duration-200 ${
              index === activeIndex
                ? 'bg-indian-saffron/30 text-indian-saffron font-bold'
                : ''
            }`}
          >
            {syllable.text}
          </span>
        ))}
      </div>
    );
  };

  // Render the transliteration with highlighting
  const renderSyncedTransliteration = () => {
    if (!transliteration) return null;

    // If we have transliteration syllables that match the Sanskrit syllables, render with highlighting
    if (transliterationSyllables && transliterationSyllables.length === syllables.length) {
      return (
        <div className="text-center text-sm text-gray-600 italic font-medium leading-relaxed">
          {transliterationSyllables.map((syllable, index) => (
            <span
              key={index}
              className={`transition-colors duration-200 ${
                index === activeIndex
                  ? 'bg-indian-saffron/20 text-indian-saffron font-bold'
                  : ''
              }`}
            >
              {syllable}
            </span>
          ))}
        </div>
      );
    }

    // Fallback to simple transliteration display
    return (
      <p className="text-center text-sm text-gray-600 italic font-medium">
        {transliteration}
      </p>
    );
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
          onCanPlay={() => {
            console.log('Audio can play:', src);
            setIsLoaded(true);
          }}
          onLoadStart={() => {
            console.log('Audio load started:', src);
          }}
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
