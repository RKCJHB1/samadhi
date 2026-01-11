import React, { useState, useEffect, useRef } from 'react';

interface AudioPlayerProps {
  audioBuffer: AudioBuffer | null;
  onPlayStart?: () => void;
  onPlayEnd?: () => void;
  onProgress?: (progress: number) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioBuffer, onPlayStart, onPlayEnd, onProgress }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  
  // Refs to track progress correctly when playback rate changes
  const anchorTimeRef = useRef<number>(0);
  const offsetRef = useRef<number>(0);
  const rateRef = useRef<number>(1.0);
  
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      stopAudio();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(console.error);
      }
      audioContextRef.current = null;
    };
  }, []);

  // Update playback rate dynamically if playing
  useEffect(() => {
    if (isPlaying && sourceNodeRef.current && audioContextRef.current) {
        const now = audioContextRef.current.currentTime;
        // Calculate the current position in buffer based on the previous rate
        const elapsedSinceAnchor = now - anchorTimeRef.current;
        const currentBufferPos = offsetRef.current + (elapsedSinceAnchor * rateRef.current);
        
        // Update anchor points for the new rate
        offsetRef.current = currentBufferPos;
        anchorTimeRef.current = now;
        rateRef.current = playbackRate;
        
        // Apply new rate to the audio source
        try {
            sourceNodeRef.current.playbackRate.value = playbackRate;
        } catch (e) {
            console.error("Error setting playback rate", e);
        }
    } else {
        // If not playing, just update the ref so the next play starts with this rate
        rateRef.current = playbackRate;
    }
  }, [playbackRate, isPlaying]);

  const stopAudio = () => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
      } catch (e) {
        // Ignore errors if already stopped
      }
      sourceNodeRef.current = null;
    }
    
    // Reset offset tracking
    offsetRef.current = 0;
    
    setIsPlaying(false);
    if (onProgress) onProgress(0);
  };

  const playAudio = async () => {
    if (!audioBuffer) return;

    // Stop any existing playback
    stopAudio();

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    if (audioContextRef.current?.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    const source = audioContextRef.current!.createBufferSource();
    source.buffer = audioBuffer;
    source.playbackRate.value = playbackRate;
    source.connect(audioContextRef.current!.destination);
    
    source.onended = () => {
      setIsPlaying(false);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (onProgress) {
        onProgress(1);
        // Reset highlight after a short delay
        setTimeout(() => onProgress(0), 500);
      }
      if (onPlayEnd) onPlayEnd();
    };

    sourceNodeRef.current = source;
    
    // Initialize tracking refs
    anchorTimeRef.current = audioContextRef.current!.currentTime;
    offsetRef.current = 0;
    rateRef.current = playbackRate;
    
    source.start(0);
    setIsPlaying(true);
    if (onPlayStart) onPlayStart();

    // Start progress loop
    const tick = () => {
      if (!sourceNodeRef.current || !audioContextRef.current) return;
      
      const now = audioContextRef.current.currentTime;
      const elapsedSinceAnchor = now - anchorTimeRef.current;
      // Calculate buffer position: initial offset + (time passed * speed)
      const currentPos = offsetRef.current + (elapsedSinceAnchor * rateRef.current);
      
      const duration = audioBuffer.duration;
      
      if (duration > 0) {
        // Calculate progress (0 to 1)
        const progress = Math.min(Math.max(currentPos / duration, 0), 1);
        
        if (onProgress) onProgress(progress);

        if (progress < 1) {
          rafIdRef.current = requestAnimationFrame(tick);
        }
      }
    };
    rafIdRef.current = requestAnimationFrame(tick);
  };

  if (!audioBuffer) return null;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={isPlaying ? stopAudio : playAudio}
        className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
          isPlaying 
            ? 'bg-orange-200 text-orange-800 animate-pulse' 
            : 'bg-orange-600 text-white hover:bg-orange-700 shadow-md'
        }`}
      >
        {isPlaying ? (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
            </svg>
            Stop
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
            Listen
          </>
        )}
      </button>

      <div className="flex items-center gap-1 px-3 py-2 bg-white rounded-full border border-orange-200 shadow-sm" title="Playback Speed">
         <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
         </svg>
         <select 
           value={playbackRate} 
           onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
           className="bg-transparent text-sm font-bold text-orange-800 outline-none cursor-pointer appearance-none text-center min-w-[3.5rem]"
         >
           <option value="0.5">0.5x</option>
           <option value="0.75">0.75x</option>
           <option value="1.0">1.0x</option>
           <option value="1.25">1.25x</option>
           <option value="1.5">1.5x</option>
         </select>
      </div>
    </div>
  );
};