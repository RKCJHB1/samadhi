import React, { useState, useEffect, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';
import PageLayout from '../../components/layout/PageLayout';
import SectionHeader from '../../components/shared/SectionHeader';
import Button from '../../components/shared/Button';
import { Link } from 'react-router-dom';
import { BookOpen, PenTool, MessageSquare, Lightbulb, Music, Gamepad2, ExternalLink, CheckCircle2, X, Expand, Play, Pause, RotateCcw, Repeat, Maximize2, Minimize2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { enhancedLessonsData as lessonsData } from '../../data/lessonsDataNew';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SyncedAudioPlayer from '../../components/audio/SyncedAudioPlayer';
import { gayatriMantraSyllables, sahaNavatuMantraSyllables, TimedSyllable } from '../../data/mantraTimings';
import { getMantraConfig } from '../../utils/mantraStorage';
import LearnHero from '../../components/learn/LearnHero';
import LessonCard from '../../components/learn/LessonCard';
import BookmarksPanel from '../../components/learn/BookmarksPanel';
import { useLearningProgress } from '../../hooks/useLearningProgress';
import { cn } from '@/lib/utils';
import SocialShareButtons from '../../components/shared/SocialShareButtons';

// Mantra type definition
interface Mantra {
  id: string;
  title: string;
  description: string;
  audio: string;
  text: string;
  transliteration: string;
  englishMeaning: string;
  transliterationSyllables: string[];
}

// Suktam type definition (collection of mantras)
interface SuktamMantra {
  number: number;
  text: string;
  transliteration: string;
  meaning: string;
}

interface Suktam {
  id: string;
  title: string;
  description: string;
  mantras: SuktamMantra[];
}

// Syllable Practice Component
const SyllablePractice = ({
  mantra,
  syllables,
  transliterationSyllables
}: {
  mantra: Mantra;
  syllables: TimedSyllable[];
  transliterationSyllables: string[];
}) => {
  const [startSyllable, setStartSyllable] = useState(1);
  const [endSyllable, setEndSyllable] = useState(1);
  const [repeatCount, setRepeatCount] = useState(3);
  const [pauseDuration, setPauseDuration] = useState(0.5); // seconds between repetitions
  const [currentRepeat, setCurrentRepeat] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSyllableIndex, setActiveSyllableIndex] = useState(-1);
  const [error, setError] = useState<string | null>(null);

  // Use ref for the Audio object
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Refs for values needed in the animation loop
  const isPlayingRef = useRef(false);
  const pauseDurationRef = useRef(0.5);
  const currentRepeatRef = useRef(0);
  const repeatCountRef = useRef(3);
  const startSyllableRef = useRef(1);
  const endSyllableRef = useRef(1);

  const totalSyllables = syllables.length;

  // Keep refs in sync with state
  useEffect(() => {
    repeatCountRef.current = repeatCount;
  }, [repeatCount]);

  useEffect(() => {
    pauseDurationRef.current = pauseDuration;
  }, [pauseDuration]);

  useEffect(() => {
    startSyllableRef.current = startSyllable;
    endSyllableRef.current = endSyllable;
  }, [startSyllable, endSyllable]);

  // Get time range for selected syllables
  const getTimeRange = (startIdx: number, endIdx: number) => {
    const sIdx = Math.max(0, startIdx - 1);
    const eIdx = Math.min(totalSyllables - 1, endIdx - 1);
    return {
      start: syllables[sIdx]?.startTime || 0,
      end: syllables[eIdx]?.endTime || 0
    };
  };

  // Stop playback helper
  const stopPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    isPlayingRef.current = false;
    currentRepeatRef.current = 0;
    setIsPlaying(false);
    setCurrentRepeat(0);
    setActiveSyllableIndex(-1);
  };

  // Animation loop to check time
  const checkTime = () => {
    if (!audioRef.current || !isPlayingRef.current) return;

    const currentTime = audioRef.current.currentTime;
    const { start, end } = getTimeRange(startSyllableRef.current, endSyllableRef.current);

    // Update active syllable index
    const startIdx = startSyllableRef.current - 1;
    const endIdx = endSyllableRef.current - 1;
    let activeIdx = -1;
    for (let i = startIdx; i <= endIdx; i++) {
      if (currentTime >= syllables[i]?.startTime && currentTime < syllables[i]?.endTime) {
        activeIdx = i;
        break;
      }
    }
    setActiveSyllableIndex(activeIdx);

    // Check if we've reached the end of the selection
    if (currentTime >= end - 0.05) {
      if (currentRepeatRef.current < repeatCountRef.current) {
        // Pause audio and wait before looping
        audioRef.current.pause();
        currentRepeatRef.current += 1;
        setCurrentRepeat(currentRepeatRef.current);

        setTimeout(() => {
          if (audioRef.current && isPlayingRef.current) {
            audioRef.current.currentTime = start;
            audioRef.current.play();
            animationFrameRef.current = requestAnimationFrame(checkTime);
          }
        }, pauseDurationRef.current * 1000); // Convert seconds to milliseconds
        return;
      } else {
        // Stop playing
        stopPlayback();
        return;
      }
    }

    // Continue the loop
    animationFrameRef.current = requestAnimationFrame(checkTime);
  };

  // Handle play/pause
  const handlePlayPause = async () => {
    if (isPlayingRef.current) {
      stopPlayback();
      return;
    }

    const { start, end } = getTimeRange(startSyllable, endSyllable);

    try {
      // Create a new Audio object each time
      if (audioRef.current) {
        audioRef.current.pause();
      }

      const audio = new Audio(mantra.audio);
      audioRef.current = audio;

      // Wait for audio to be ready
      await new Promise<void>((resolve, reject) => {
        audio.oncanplaythrough = () => resolve();
        audio.onerror = () => reject(new Error('Failed to load audio'));
        audio.load();
      });

      audio.currentTime = start;

      isPlayingRef.current = true;
      currentRepeatRef.current = 1;
      setIsPlaying(true);
      setCurrentRepeat(1);
      setError(null);

      await audio.play();

      // Start the time checking loop
      animationFrameRef.current = requestAnimationFrame(checkTime);

    } catch (err) {
      console.error('Play error:', err);
      setError('Could not play audio. Please try again.');
      stopPlayback();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Reset when selection changes
  useEffect(() => {
    if (isPlayingRef.current) {
      stopPlayback();
    }
  }, [startSyllable, endSyllable, repeatCount]);

  // Ensure end >= start
  useEffect(() => {
    if (endSyllable < startSyllable) {
      setEndSyllable(startSyllable);
    }
  }, [startSyllable, endSyllable]);

  return (
    <div className="bg-gradient-to-br from-spiritual-100 to-white rounded-xl p-6 shadow-sm border border-spiritual-300">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
        <Repeat className="w-4 h-4" />
        Practice Mode
      </h3>

      {/* Syllable Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Syllable Selection Row */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Syllable
          </label>
          <select
            value={startSyllable}
            onChange={(e) => setStartSyllable(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spiritual-500 focus:border-spiritual-500"
          >
            {Array.from({ length: totalSyllables }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}. {transliterationSyllables[i]?.trim() || `Syllable ${i + 1}`}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To Syllable
          </label>
          <select
            value={endSyllable}
            onChange={(e) => setEndSyllable(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spiritual-500 focus:border-spiritual-500"
          >
            {Array.from({ length: totalSyllables }, (_, i) => (
              <option key={i} value={i + 1} disabled={i + 1 < startSyllable}>
                {i + 1}. {transliterationSyllables[i]?.trim() || `Syllable ${i + 1}`}
              </option>
            ))}
          </select>
        </div>

        {/* Repeat Count Slider */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Repeat: <span className="font-bold text-spiritual-600">{repeatCount}</span> {repeatCount === 1 ? 'time' : 'times'}
          </label>
          <div className="pt-2">
            <input
              type="range"
              min="1"
              max="21"
              step="1"
              value={repeatCount}
              onChange={(e) => setRepeatCount(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-spiritual-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1</span>
              <span>5</span>
              <span>10</span>
              <span>15</span>
              <span>21</span>
            </div>
          </div>
        </div>

        {/* Pause Duration Slider */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pause: <span className="font-bold text-spiritual-600">{pauseDuration}</span> {pauseDuration === 1 ? 'second' : 'seconds'}
          </label>
          <div className="pt-2">
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={pauseDuration}
              onChange={(e) => setPauseDuration(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-spiritual-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0s</span>
              <span>1s</span>
              <span>2s</span>
              <span>3s</span>
              <span>4s</span>
              <span>5s</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Syllables Preview */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-spiritual-200">
        <p className="text-sm text-gray-500 mb-2">Selected syllables:</p>
        <div className="flex flex-wrap gap-1 justify-center">
          {transliterationSyllables.slice(startSyllable - 1, endSyllable).map((syl, idx) => (
            <span
              key={idx}
              className={cn(
                "px-2 py-1 rounded text-lg font-medium transition-all duration-200",
                activeSyllableIndex === startSyllable - 1 + idx
                  ? "bg-indian-saffron text-white scale-110"
                  : "bg-spiritual-100 text-gray-700"
              )}
            >
              {syl}
            </span>
          ))}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="text-red-500 text-center mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Play Controls */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-4">
          <button
            onClick={handlePlayPause}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200",
              isPlaying
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-spiritual-500 hover:bg-spiritual-600 text-white"
            )}
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5" />
                Stop
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Practice
              </>
            )}
          </button>

          {isPlaying && (
            <div className="text-sm text-gray-600">
              Repeat: <span className="font-bold text-spiritual-600">{currentRepeat}</span> / {repeatCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Full-page Mantra Modal Component
const MantraModal = ({
  mantra,
  onClose,
  syllables,
  transliterationSyllables
}: {
  mantra: Mantra;
  onClose: () => void;
  syllables: TimedSyllable[];
  transliterationSyllables: string[];
}) => {
  // State for hide/show Sanskrit (disabled - always hidden)
  const [isSanskritVisible, setIsSanskritVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const hasAlignedTransliterationFollowAlong =
    syllables.length > 0 && transliterationSyllables.length === syllables.length;

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  // Use portal to render modal at document body level (above navbar)
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className={`relative overflow-y-auto bg-gradient-to-br from-indian-cream via-white to-spiritual-50 shadow-2xl border-2 border-indian-saffron/30 ${
          isFullscreen
            ? 'fixed inset-0 w-full h-full rounded-none'
            : 'w-full max-w-4xl max-h-[90vh] rounded-2xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close and Fullscreen buttons */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-all duration-200 hover:scale-110"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-6 h-6 text-gray-700" />
            ) : (
              <Maximize2 className="w-6 h-6 text-gray-700" />
            )}
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-all duration-200 hover:scale-110"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-indian-saffron/20 to-spiritual-100/50 p-6 md:p-8 border-b border-indian-saffron/20">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 pr-12">
            {mantra.title}
          </h2>
          <p className="text-lg text-gray-600 mt-2">{mantra.description}</p>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-8">
          {/* Sanskrit Text */}
          <div className="bg-gradient-to-br from-indian-cream/50 to-white rounded-xl p-6 shadow-sm border border-indian-saffron/20">
            <button
              onClick={() => setIsSanskritVisible(!isSanskritVisible)}
              className="w-full flex items-center justify-between text-left group"
            >
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Sanskrit</h3>
              <svg
                className={`w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-transform duration-200 ${isSanskritVisible ? 'rotate-0' : '-rotate-90'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isSanskritVisible && (
              <p className="font-sanskrit text-center text-2xl md:text-3xl leading-relaxed text-gray-800 mt-4">
                {mantra.text}
              </p>
            )}
          </div>

          {/* Audio Player - Only show if audio is available */}
          {mantra.audio && (
            <div className="bg-gradient-to-br from-spiritual-50 to-white rounded-xl p-6 shadow-sm border border-spiritual-200">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Listen & Learn</h3>
              <div className="flex justify-center">
                <SyncedAudioPlayer
                  src={mantra.audio}
                  title={`${mantra.title} Pronunciation`}
                  syllables={syllables}
                  originalText={mantra.text}
                  transliteration={mantra.transliteration}
                  transliterationSyllables={transliterationSyllables}
                  mantraId={mantra.id}
                />
              </div>
            </div>
          )}

          {/* Syllable Practice Mode */}
          {hasAlignedTransliterationFollowAlong && (
            <SyllablePractice
              mantra={mantra}
              syllables={syllables}
              transliterationSyllables={transliterationSyllables}
            />
          )}

          {/* English Meaning */}
          <div className="bg-gradient-to-br from-indian-cream to-white rounded-xl p-6 md:p-8 shadow-sm border border-indian-saffron/20">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">English Meaning</h3>
            <p className="text-lg md:text-xl text-center text-gray-700 leading-relaxed italic">
              "{mantra.englishMeaning}"
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <SocialShareButtons
            path={`/learn#mantras`}
            title={`Learn to chant the ${mantra.title} - ${mantra.description}`}
            twitterText={`I'm learning to chant the ${mantra.title}! 🙏 Practice with synchronized audio on the Ramakrishna Centre website.`}
            whatsappText={`I'm learning to chant the ${mantra.title}! 🙏 Practice with synchronized audio:`}
          />
          <button
            onClick={onClose}
            className="px-6 py-2 bg-indian-saffron text-white rounded-lg hover:bg-indian-saffron/90 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

// Full-page Suktam Modal Component (for collections of mantras)
const SuktamModal = ({
  suktam,
  onClose
}: {
  suktam: Suktam;
  onClose: () => void;
}) => {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-indian-cream via-white to-spiritual-50 rounded-2xl shadow-2xl border-2 border-indian-saffron/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-all duration-200 hover:scale-110"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-indian-saffron/20 to-spiritual-100/50 p-6 md:p-8 border-b border-indian-saffron/20">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 pr-12">
            {suktam.title}
          </h2>
          <p className="text-lg text-gray-600 mt-2">{suktam.description}</p>
          <p className="text-sm text-indian-saffron mt-2 font-medium">{suktam.mantras.length} Mantras</p>
        </div>

        {/* Content - All Mantras */}
        <div className="p-6 md:p-8 space-y-6">
          {suktam.mantras.map((mantra) => (
            <div key={mantra.number} className="bg-gradient-to-br from-white to-indian-cream/30 rounded-xl p-5 shadow-sm border border-indian-saffron/20">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 flex items-center justify-center bg-indian-saffron text-white rounded-full text-sm font-bold">
                  {mantra.number}
                </span>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Mantra {mantra.number}</h3>
              </div>

              {/* Sanskrit */}
              <div className="mb-4">
                <p className="font-sanskrit text-xl md:text-2xl leading-relaxed text-gray-800 text-center">
                  {mantra.text}
                </p>
              </div>

              {/* Transliteration */}
              <div className="mb-4 bg-spiritual-50/50 rounded-lg p-3">
                <p className="text-center text-lg text-gray-700 italic leading-relaxed">
                  {mantra.transliteration}
                </p>
              </div>

              {/* Meaning */}
              <div className="bg-indian-cream/30 rounded-lg p-4">
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  <span className="font-semibold text-gray-600">Meaning: </span>
                  {mantra.meaning}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <SocialShareButtons
            path={`/learn#mantras`}
            title={`Learn the ${suktam.title} - ${suktam.mantras.length} Vedic mantras`}
            twitterText={`I'm learning the ${suktam.title}! 🙏 ${suktam.mantras.length} sacred mantras on the Ramakrishna Centre website.`}
            whatsappText={`I'm learning the ${suktam.title}! 🙏 ${suktam.mantras.length} sacred mantras:`}
          />
          <button
            onClick={onClose}
            className="px-6 py-2 bg-indian-saffron text-white rounded-lg hover:bg-indian-saffron/90 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

const LearnPage = () => {
  // State for managing active tabs
  const [activeMainTab, setActiveMainTab] = useState('lessons');
  const [activeLessonTab, setActiveLessonTab] = useState('philosophy');

  // State for mantra modal
  const [selectedMantra, setSelectedMantra] = useState<Mantra | null>(null);

  // State for suktam modal
  const [selectedSuktam, setSelectedSuktam] = useState<Suktam | null>(null);

  // Learning progress
  const {
    state: progressState,
    isLessonComplete,
    toggleBookmark,
    isBookmarked,
    updateBookmarkNotes,
    getLastLesson
  } = useLearningProgress();

  // Calculate total lessons
  const totalLessons = useMemo(() => {
    return lessonsData.reduce((acc, group) => acc + group.lessons.length, 0);
  }, []);

  // Get completed lesson IDs
  const completedLessonIds = useMemo(() => {
    return progressState.completedLessons.map(l => l.lessonId);
  }, [progressState.completedLessons]);

  // Get last lesson with title
  const lastLesson = useMemo(() => {
    const last = getLastLesson();
    if (!last) return null;
    const topic = lessonsData.find(t => t.topicId === last.topicId);
    const lesson = topic?.lessons.find(l => l.id === last.lessonId);
    return lesson ? { ...last, title: lesson.title } : last;
  }, [getLastLesson]);

  // Get lesson title by ID
  const getLessonTitle = (topicId: string, lessonId: string) => {
    const topic = lessonsData.find(t => t.topicId === topicId);
    return topic?.lessons.find(l => l.id === lessonId)?.title;
  };



  // Check if we're in a local development environment
  const isLocalDevelopment = () => {
    // Check if running on localhost or 127.0.0.1
    const hostname = window.location.hostname;
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes('.local');
  };

  // Handle URL hash for direct tab navigation
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      // If hash matches a lesson tab, set both main tab and lesson tab
      if (['philosophy', 'holy-trinity', 'deities', 'scriptures', 'practices'].includes(hash)) {
        setActiveMainTab('lessons');
        setActiveLessonTab(hash);
      }
      // If hash matches a main tab, set it
      else if (['lessons', 'games'].includes(hash)) {
        setActiveMainTab(hash);
      }
    }
  }, []);

  // Update URL hash when lesson tab changes
  const handleLessonTabChange = (value: string) => {
    setActiveLessonTab(value);
    window.history.replaceState(null, '', `#${value}`);
  };

  // Update URL hash when main tab changes
  const handleMainTabChange = (value: string) => {
    setActiveMainTab(value);
    if (value === 'lessons') {
      window.history.replaceState(null, '', `#${activeLessonTab}`);
    } else {
      window.history.replaceState(null, '', `#${value}`);
    }
  };



  // Shanti Mantras for display - all mantras
  const allMantras: Mantra[] = [
    {
      id: 'ganapati-prarthana',
      title: 'Ganapati Prarthana',
      description: 'Invocation to Lord Ganesha, the remover of obstacles and lord of beginnings',
      audio: '/audio/ganapati.MP3',
      text: 'ॐ गणानां त्वा गणपतिं हवामहे कविं कवीनामुपमश्रवस्तमम् । ज्येष्ठराजं ब्रह्मणां ब्रह्मणस्पत आ नः शृण्वन्नूतिभिस्सीद सादनम् । महागणपतये नमः ॥',
      transliteration: 'Om gaṇānāṃ tvā gaṇapatiṃ havāmahe kaviṃ kavīnāmupamaśravastamam. Jyeṣṭharājaṃ brahmaṇāṃ brahmaṇaspata ā naḥ śṛṇvannūtibhissīda sādanam. Mahāgaṇapataye namaḥ.',
      englishMeaning: 'We invoke you, lord & leader of the heavenly hosts, the wise among the wise, endowed with incomparable fame, the supreme king, the lord of all mantras. Hear us and come to us ready to protect us. Salutations to Mahaganapati.',
      transliterationSyllables: []
    },
    {
      id: 'saraswati-prarthana',
      title: 'Saraswati Prarthana',
      description: 'Invocation to Goddess Saraswati, the divine source of wisdom, speech and learning',
      audio: '',
      text: 'प्रणो देवी सरस्वती वाज॑भिर्वाजिनीवती । धीनामवित्र्यवतु । आ नो दिवो बृहतः पर्वतादा सरस्वती यजता गन्तु यज्ञम् । वाग्देव्यै नमः ॥',
      transliteration: 'Praṇo devī sarasvatī vājebhirvājinīvatī. Dhīnāmavitryavatu. Ā no divo bṛhataḥ parvatādā sarasvatī yajatā gantu yajñam. Vāgdevyai namaḥ.',
      englishMeaning: 'May the goddess Saraswati, rich in power and who protects her devotees, protect us. May she awaken our intuitive faculties. From high heavens and vast mountains may holy Saraswati come to our sacrifice. Salutations to the Goddess of Speech.',
      transliterationSyllables: []
    },
    {
      id: 'saha-navavatu',
      title: 'Saha Navavatu',
      description: 'A peace mantra invoking protection and harmony for teacher and student',
      audio: '/audio/sahana.mp3',
      text: 'ॐ सह नाववतु । सह नौ भुनक्तु । सह वीर्यं करवावहै । तेजस्विनावधीतमस्तु मा विद्विषावहै । ॐ शान्तिः शान्तिः शान्तिः ॥',
	      transliteration: 'Oṃ saha nāvavatu saha nau bhunaktu saha vīryaṃ karavāvahai tejasvināvadhītamastu mā vidviṣāvahai oṃ śāntiḥ śāntiḥ śāntiḥ',
      englishMeaning: 'May He protect us both (the teacher and the taught) together. May He nourish us both together. May we both together acquire strength (arising from knowledge, etc). Let our study be brilliant. May we not have ill-feeling against each other.',
	      transliterationSyllables: [
	        'Oṃ ', 'sa', 'ha ', 'nā', 'va', 'va', 'tu ', 'sa', 'ha ', 'nau ',
	        'bhu', 'na', 'ktu ', 'sa', 'ha ', 'vī', 'rya', 'ṃ ', 'ka', 'ra',
	        'vā', 'va', 'hai ', 'te', 'ja', 'svi', 'nā', 'va', 'dhī', 'ta',
	        'ma', 'stu ', 'mā ', 'vi', 'dvi', 'ṣā', 'va', 'hai ', 'oṃ ', 'śān',
	        'tiḥ ', '', 'śān', 'tiḥ ', '', 'śān', 'tiḥ ', '',
	      ]
    },
    {
      id: 'sham-no-mitrah',
      title: 'Sham No Mitrah',
      description: 'A peace invocation calling upon cosmic forces for well-being and truth',
      audio: '/audio/shannomitra.mp3',
      text: 'ॐ शं नो मित्रः शं वरुणः । शं नो भवत्वर्यमा । शं न इन्द्रो बृहस्पतिः । शं नो विष्णुरुरुक्रमः । नमो ब्रह्मणे । नमस्ते वायो । त्वमेव प्रत्यक्षं ब्रह्मासि । त्वमेव प्रत्यक्षं ब्रह्म वदिष्यामि । ऋतं वदिष्यामि । सत्यं वदिष्यामि । तन्मामवतु । तद्वक्तारमवतु । अवतु माम् । अवतु वक्तारम् ॥ ॐ शान्तिः शान्तिः शान्तिः ॥',
      transliteration: 'Om śaṃ no mitraḥ śaṃ varuṇaḥ. Śaṃ no bhavatvaryamā. Śaṃ na indro bṛhaspatiḥ. Śaṃ no viṣṇururukramaḥ. Namo brahmaṇe. Namaste vāyo. Tvameva pratyakṣaṃ brahmāsi. Tvameva pratyakṣaṃ brahma vadiṣyāmi. Ṛtaṃ vadiṣyāmi. Satyaṃ vadiṣyāmi. Tanmāmavatu. Tadvaktāramavatu. Avatu mām. Avatu vaktāram. Om śāntiḥ śāntiḥ śāntiḥ.',
      englishMeaning: 'May Mitra be propitious to us. May Varuna be propitious to us. May Aryaman be propitious to us. May Indra and Brhaspati be propitious to us. May Vishnu of long strides be propitious to us. Salutation to Brahman. Salutation to you, O Vayu. You indeed are the immediate Brahman. You alone I shall call the direct Brahman. I shall call you righteousness. I shall call you truth. May He protect me. May He protect the teacher. May He protect me. May He protect the teacher. Om Peace! Peace! Peace!',
      transliterationSyllables: []
    },
    {
      id: 'bhadram-karnebhih',
      title: 'Bhadram Karnebhih',
      description: 'A prayer for auspiciousness, good health and divine blessings',
      audio: '/audio/bhadramkarNebhi.mp3',
      text: 'ॐ भद्रं कर्णेभिश्शृणुयाम देवाः। भद्रं पश्येमाक्षभिर्यजत्राः । स्थिरैरङ्गैस्तुष्टुवांसस्तनूर्भिः । व्यशेम देवहितं यदायुः । स्वस्ति न इन्द्रो वृद्धश्रवाः । स्वस्ति नः पूषा विश्ववेदाः । स्वस्ति नस्तार्थ्यो अरिष्टनेमिः । स्वस्ति नो बृहस्पतिर्दधातु ॥ ॐ शान्तिः शान्तिः शान्तिः ॥',
      transliteration: 'Om bhadraṃ karṇebhiḥ śṛṇuyāma devāḥ. Bhadraṃ paśyemākṣabhiryajatrāḥ. Sthirairaṅgaistuṣṭuvāṃsastanūbhiḥ. Vyaśema devahitaṃ yadāyuḥ. Svasti na indro vṛddhaśravāḥ. Svasti naḥ pūṣā viśvavedāḥ. Svasti nastārkṣyo ariṣṭanemiḥ. Svasti no bṛhaspatirdadhātu. Om śāntiḥ śāntiḥ śāntiḥ.',
      englishMeaning: 'O gods! May we hear auspicious words with the ears, O worshipful ones! May we see the auspicious things with the eyes; May we be endowed with strong limbs and a healthy body; May we live our life praising the Supreme Lord; May we obtain the full life span granted to us by the Lord. May Indra of great fortune do good to us. May the all knowing Sun do good to us. May Garuda who traverses the path of righteousness do good to us; May Brhaspati bestow good to us. Om Peace! Peace! Peace!',
      transliterationSyllables: []
    },
    {
      id: 'namo-brahmane',
      title: 'Namo Brahmane',
      description: 'Salutations to the cosmic forces - Brahman, fire, earth, plants and speech',
      audio: '/audio/namobrahmaNe.mp3',
      text: 'ॐ नमो ब्रह्मणे नमो अस्त्वग्नये नमः पृथिव्यै नम ओषधीभ्यः । नमो वाचे नमो वाचस्पतये नमो विष्णवे बृहते करोमि ॥ ॐ शान्तिः शान्तिः शान्तिः ॥',
      transliteration: 'Om namo brahmaṇe namo astvagnaye namaḥ pṛthivyai nama oṣadhībhyaḥ. Namo vāce namo vācaspataye namo viṣṇave bṛhate karomi. Om śāntiḥ śāntiḥ śāntiḥ.',
      englishMeaning: 'Salutations to Brahma. Salutations to Agnideva, the god of fire. Salutations to Bhudevi, the goddess of the earth. Salutation to the goddess who is in the form of plants-trees-creepers. Salutations to the goddess of speech. Salutations to Brhaspati who is the lord of Vedic mantras. Salutations to Maha Vishnu who is all pervading.',
      transliterationSyllables: []
    },
    {
      id: 'tachchamyoravrinimahe',
      title: 'Tachchhamyoravrinimahe',
      description: 'A prayer for divine blessings, healing and welfare for all beings',
      audio: '',
      text: 'ॐ तच्छंयोरावृणीमहे । गातुं यज्ञाय । गातुं यज्ञपतये । दैवी स्वस्तिरस्तु नः । स्वस्तिर्मानुषेभ्यः । ऊर्ध्वं जिगातु भेषजम् । शं नो अस्तु द्विपदे । शं चतुष्पदे ॥ ॐ शान्तिः शान्तिः शान्तिः ॥',
      transliteration: 'Om tacchhaṃyorāvṛṇīmahe. Gātuṃ yajñāya. Gātuṃ yajñapataye. Daivī svastirastu naḥ. Svastirmānuṣebhyaḥ. Ūrdhvaṃ jigātu bheṣajam. Śaṃ no astu dvipade. Śaṃ catuṣpade. Om śāntiḥ śāntiḥ śāntiḥ.',
      englishMeaning: 'To remedy the already contracted ailments and to check the diseases in future, we turn to and pray to the God who is the Lord of sacrifices. We pray the way (the course) for the sacrifice. We pray that the intended results (fruits) should come to the sacrificer. Let there be the divine well-being for us. May there be well being for men. Henceforth may they (i.e. men) always find the means of warding off misfortunes and calamities. Welfare be to our fellow human beings (bipeds). Welfare be to all other animals (quadrupeds).',
      transliterationSyllables: []
    },
    {
      id: 'yaschandasam',
      title: 'Yaschandasam',
      description: 'A prayer for wisdom, knowledge retention and spiritual illumination',
      audio: '/audio/yashcchandasAm.mp3',
      text: 'ॐ यश्छन्दसामृषभो विश्वरूपः । छन्दोभ्योऽध्यमृताथ्सम्बभूव । स मेन्द्रो मेधया स्पृणोतु । अमृतस्य देव धारणो भूयासम् । शरीरं मे विचर्षणम् । जिह्वा मे मधुमत्तमा । कर्णाभ्यां भूरि विश्रुवम् । ब्रह्मणः कोशोऽसि मेधया पिहितः । श्रुतं मे गोपाय ॥ ॐ शान्तिः शान्तिः शान्तिः ॥',
      transliteration: 'Om yaśchandasāmṛṣabho viśvarūpaḥ. Chandobhyo\'dhyamṛtāthsambabhūva. Sa mendro medhayā spṛṇotu. Amṛtasya deva dhāraṇo bhūyāsam. Śarīraṃ me vicarṣaṇam. Jihvā me madhumattamā. Karṇābhyāṃ bhūri viśruvam. Brahmaṇaḥ kośo\'si medhayā pihitaḥ. Śrutaṃ me gopāya. Om śāntiḥ śāntiḥ śāntiḥ.',
      englishMeaning: 'He (i.e. Omkara) who is a bull (i.e. preeminent) among the Vedas; He who permeates speech; He who was born from the immortal Vedas; He who is the chief among the Vedas (even as Indra is among the gods); may He strengthen me with wisdom; O god! may I attain immortality (i.e. knowledge of Brahman). May my body become fit, may I utter sweet speech; may I hear more and more (of spiritual truths). You (i.e. Om) are the sheath of the Brahman; You are veiled by worldly intelligence; Protect the things that I have acquired through hearing.',
      transliterationSyllables: []
    },
    {
      id: 'madhu-vata',
      title: 'Madhu Vata',
      description: 'A beautiful hymn invoking sweetness and bliss from all elements of nature',
      audio: '',
      text: 'ॐ मधु वाता ऋतायते मधु क्षरन्ति सिन्धवः । माध्वीनः सन्त्वोषधीः । मधु नक्तमुतोषसि मधुमत्पार्थिवं रजः। मधु चौरस्तु नः पिता । मधुमान्नो वनस्पतिर्मधुमां अस्तु सूर्यः। माध्वीर्गावो भवन्तु नः ॥ ॐ शान्तिः शान्तिः शान्तिः॥',
      transliteration: 'Om madhu vātā ṛtāyate madhu kṣaranti sindhavaḥ. Mādhvīnaḥ santvoṣadhīḥ. Madhu naktamutoṣasi madhumatpārthivaṃ rajaḥ. Madhu dyaurastu naḥ pitā. Madhumānno vanaspatirmadhumāṃ astu sūryaḥ. Mādhvīrgāvo bhavantu naḥ. Om śāntiḥ śāntiḥ śāntiḥ.',
      englishMeaning: 'To me who desires to realize the Supreme Truth, may the winds blow sweetly. May the river flow giving us bliss. May the plants be delightful, beneficial to us. May the night and the dawn be pleasant to us. May the dust of the earth give us delight. May the sky, our father, shower bliss on us. May the sun be blissful to us. May the cows bring us bliss.',
      transliterationSyllables: []
    },
    {
      id: 'purnamadah',
      title: 'Purnamadah',
      description: 'The famous "Fullness" mantra describing the infinite nature of Brahman',
      audio: '',
      text: 'ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते । पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥ ॐ शान्तिः शान्तिः शान्तिः ॥',
      transliteration: 'Om pūrṇamadaḥ pūrṇamidaṃ pūrṇātpūrṇamudacyate. Pūrṇasya pūrṇamādāya pūrṇamevāvaśiṣyate. Om śāntiḥ śāntiḥ śāntiḥ.',
      englishMeaning: 'That (Supreme unmanifest Brahman) is infinite and this (conditioned Brahman, i.e. the manifest universe) is infinite. The infinite universe proceeds from the infinite (Brahman). After removing the infinite (universe) from the infinite (Brahman), the infinite (Brahman) alone remains.',
      transliterationSyllables: []
    },
    {
      id: 'asato-ma',
      title: 'Asato Ma',
      description: 'The famous prayer for guidance from darkness to light, from mortality to immortality',
      audio: '',
      text: 'ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्माऽमृतं गमय ॥ ॐ शान्तिः शान्तिः शान्तिः ॥',
      transliteration: 'Om asato mā sadgamaya. Tamaso mā jyotirgamaya. Mṛtyormā\'mṛtaṃ gamaya. Om śāntiḥ śāntiḥ śāntiḥ.',
      englishMeaning: 'O Lord! Lead me from untruth to truth; from darkness to light and from death to immortality. OM! Peace! Peace! Peace!',
      transliterationSyllables: []
    },
    {
      id: 'vang-me-manasi',
      title: 'Vang Me Manasi',
      description: 'A prayer for harmony between speech and mind, and for retention of Vedic knowledge',
      audio: '/audio/vAngmemanasi.MP3',
      text: 'ॐ वाङ्‌मे मनसि प्रतिष्ठिता मनो मे वाचि प्रतिष्ठितमाविरावीर्म एधि वेदस्य म आणीस्थः ... ... श्रुतं मे मा प्रहासीरनेनाधीतेनाहोरात्रान् संदधाम्यूतं वदिष्यामि सत्यं वदिष्यामि । तन्मामवतु तद्वक्तारमवत्ववतु मामवतु वक्तारम् ॥ ॐ शान्तिः शान्तिः शान्तिः ॥',
      transliteration: 'Om vāṅ me manasi pratiṣṭhitā mano me vāci pratiṣṭhitamāvirāvīrma edhi vedasya ma āṇīsthaḥ... ... Śrutaṃ me mā prahāsīranenādhītenāhorātrān saṃdadhāmyṛtaṃ vadiṣyāmi satyaṃ vadiṣyāmi. Tanmāmavatu tadvaktāramavatvavatu māmavatu vaktāram. Om śāntiḥ śāntiḥ śāntiḥ.',
      englishMeaning: 'Om! May my speech be in accord with the mind, may mind be in accord with the speech. O Self-effulgent One, reveal Thyself to me. May you both (speech and mind) bring me the meaning of the Vedas... May what I have heard (i.e. studied from the Vedas) not leave me. May I contemplate day and night upon what I have learnt. I shall utter what is verbally true. I shall utter what is mentally true. May Brahman protect me. May Brahman protect the teacher.',
      transliterationSyllables: []
    },
    {
      id: 'gayatri',
      title: 'Gayatri Mantra',
      description: 'A highly revered mantra from Rigveda dedicated to Savitr, the sun deity',
      audio: '/audio/gayatri.mp3',
      text: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्',
      transliteration: 'Oṃ bhūr bhuvaḥ svaḥ tat savitur vareṇyaṃ bhargo devasya dhīmahi dhiyo yo naḥ pracodayāt',
      englishMeaning: 'Om, we meditate on the divine light of the Sun, the source of all life. May that effulgent light illuminate our minds and guide our understanding.',
      transliterationSyllables: ['Oṃ ', 'bhūr', 'bhuvaḥ ', 'svaḥ ', 'tat', 'sa', 'vi', 'tur', 'va', 're', 'ṇyaṃ ', 'bhar', 'go ', 'de', 'va', 'sya ', 'dhī', 'ma', 'hi ', 'dhi', 'yo ', 'yo ', 'naḥ ', 'pra', 'cho', 'da', 'yāt']
    },
  ];

	  // For now, only Saha Navavatu should be live on the site
	  const mantras = allMantras.filter(m => m.id === 'saha-navavatu');

  // Suktams - collections of mantras
  const suktams: Suktam[] = [
    {
      id: 'ganesha-suktam',
      title: 'Sri Ganesha Suktam',
      description: 'A collection of 12 Vedic hymns invoking Lord Ganesha and Indra for blessings, wealth and protection',
      mantras: [
        { number: 1, text: 'आ तू न इन्द्र क्षुमन्तं चित्रं ग्राभं सं गृभाय । महाहस्ती दक्षिणेन ॥', transliteration: 'Ā tū na indra kṣumantaṁ citraṁ grābhaṁ saṁ gṛbhāya. Mahāhastī dakṣiṇena.', meaning: 'O Lord Indra, O mighty-armed one! Turning towards us, please quickly hold in your right hand the gift of wealth which is praise-worthy, attractive, and fit to be received by us.' },
        { number: 2, text: 'विद्या हि त्वा तुविकूर्मिं तुविदेष्णं तुवीमघम् । तुविमात्रमवोभिः ॥', transliteration: 'Vidmā hi tvā tuvikūrmiṁ tuvideṣṇaṁ tuvīmagham. Tuvimātramavobhiḥ.', meaning: 'O Indra, we indeed know that you are the performer of numerous tasks, you are the bestower of plenty of gifts. You possess enormous wealth; you are equipped with things needed for the protection of your devotees.' },
        { number: 3, text: 'न हि त्वा शूर देवा न मर्तासो दित्सन्तम् । भीमं न गां वारयन्ते ॥', transliteration: 'Na hi tvā śūra devā na martāso ditsantam. Bhīmaṁ na gāṁ vārayante.', meaning: 'O Heroic Indra! As none can stop an energetic dreadful bull, similarly neither the gods nor human beings can stop you who wish to bestow gifts on us.' },
        { number: 4, text: 'एतोन्विन्द्रं स्तवामेशानं वस्वः स्वराजम् । न राधसा मर्धिषन्नः ॥', transliteration: 'Eto nvindraṁ stavāmeśānaṁ vasvaḥ svarājam. Na rādhasā mardhiṣannaḥ.', meaning: 'O great devotees, come fast. We shall pray to Indra, the lord of wealth, self-effulgent, so that people do not trouble us by their arrogance born of riches.' },
        { number: 5, text: 'प्र स्तौषदुप गासिषच्छ्रवत्साम गीयमानम् । अभिराधसा जुगुरत् ॥', transliteration: 'Pra stauṣadupa gāsiṣacchravatsāma gīyamānam. Abhirādhasā jugurat.', meaning: 'May he who is deputed to chant praises, chant the hymn and sing in accompaniment. May Indra, who is endowed with riches, listen to the Sama hymn sung by us and accept us.' },
        { number: 6, text: 'आ नो भर दक्षिणेनाभि सव्येन प्र मृश । इन्द्र मा नो वसोर्निर्भाक् ॥', transliteration: 'Ā no bhara dakṣiṇenābhi savyena pra mṛśa. Indra mā no vasornirbhāk.', meaning: 'O Indra! Please bring wealth for us and give it to us in both hands. Do not deprive us of wealth.' },
        { number: 7, text: 'उपक्रमस्वा भर धृष्णता धृष्णो जनानाम् । अदाशूष्टरस्य वेदः ॥', transliteration: 'Upakramasvā bhara dhṛṣṇatā dhṛṣṇo janānām. Adāśūṣṭarasya vedaḥ.', meaning: 'O Indra, the punisher of enemies, proceed towards the treasures with your strength, bring the money from the uncharitable ones among human beings.' },
        { number: 8, text: 'इन्द्र य उ नु ते अस्ति वाजो विप्रैभिः सनित्वः । अस्माभिः सुतं सनुहि ॥', transliteration: 'Indra ya u nu te asti vājo viprebhiḥ sanitvaḥ. Asmābhiḥ sutaṁ sanuhi.', meaning: 'O Indra! Even the wise people adore the food present in you. Please give the food in abundance, when we pray for it.' },
        { number: 9, text: 'सद्योजुवस्ते वाजा अस्मभ्यं विश्वश्चन्द्राः । वशैश्च मधू जरन्ते ॥', transliteration: 'Sadyojuvaste vājā asmabhyaṁ viśvaścandrāḥ. Vaśaiśca madhū jarante.', meaning: 'O Indra! The food that is in your keeping (is pleasant for everyone). Let it come quickly to us. Our people with various desires soon praise you for food.' },
        { number: 10, text: 'ॐ गणानां त्वा गणपतिं हवामहे कविं कवीनामुपमश्रवस्तमम् । ज्येष्ठराजं ब्रह्मणां ब्रह्मणस्पत आ नः शृण्वन्नूतिभिस्सीद सादनम् । महागणपतये नमः ॥', transliteration: 'Om gaṇānāṁ tvā gaṇapatiṁ havāmahe kaviṁ kavīnāmupamaśravastamam. Jyeṣṭharājaṁ brahmaṇāṁ brahmaṇaspata ā naḥ śṛṇvannūtibhissīda sādanam. Mahāgaṇapataye namaḥ.', meaning: 'We invoke you, lord & leader of the heavenly hosts, the wise among the wise, endowed with incomparable fame, the supreme king, the lord of all mantras. Hear us and come to us ready to protect us.' },
        { number: 11, text: 'नि षु सीद गणपते गणेषु त्वामाहुर्विप्रतमं कवीनाम् । न ऋते त्वत्क्रियते किं चनारे महामर्कं मघवञ्चित्रमर्च ॥', transliteration: 'Ni ṣu sīda gaṇapate gaṇeṣu tvāmāhurvipratamaṁ kavīnām. Na ṛte tvatkriyate kiṁ canāre mahāmarkaṁ maghavañcitramarca.', meaning: 'O Indra, the Lord of the groups of gods, in the midst of the band of your devotees, please manifest with your full form and glory. People say that you are the wise among the wise. Near or afar, without you, no work is ever possible.' },
        { number: 12, text: 'अभिख्या नो मघवन्नाधमानान्सखे बोधि वसुपते सखीनाम् । रणं कृधि रणकृत्सत्यशुष्माभक्ते चिदा भजा राये अस्मान् ॥', transliteration: 'Abhikhyā no maghavannādhamānānsakhe bodhi vasupate sakhīnām. Raṇaṁ kṛdhi raṇakṛtsatyaśuṣmābhakte cidā bhajā rāye asmān.', meaning: 'O Indra! The possessor of riches, we are praying to you; through proclamation make us brilliant and powerful. O friend Indra, the lord of wealth, we are your friends who sing your glory; may you be aware of our desires.' },
      ]
    },
    {
      id: 'hiranyagarbha-suktam',
      title: 'Hiranyagarbha Suktam',
      description: 'A collection of 10 Vedic hymns describing Hiranyagarbha, the Golden Womb, as the sole Lord of creation',
      mantras: [
        { number: 1, text: 'हिरण्यगर्भः समवर्तताग्रे भूतस्य जातः पतिरेक आसीत् । स दाधार पृथिवीं द्यामुतेमां कस्मै देवाय हविषा विधेम ॥', transliteration: 'Hiraṇyagarbhaḥ samavartatāgre bhūtasya jātaḥ patireka āsīt. Sa dādhāra pṛthivīṁ dyāmutemāṁ kasmai devāya haviṣā vidhema.', meaning: 'Before the manifestation of this universe, Hiranyagarbha was born from the creator who is intent on creation. Being born, He became the sole Lord of all the spheres of existence, sustaining this earth, the heaven, and the extensive space between them. Let us worship with oblations the blissful Lord endowed with effulgence, munificence, etc.' },
        { number: 2, text: 'य आत्मदा बलदा यस्य विश्व उपासते प्रशिषं यस्य देवाः । यस्य छायामृतं यस्य मृत्युः कस्मै देवाय हविषा विधेम ॥', transliteration: 'Ya ātmadā baladā yasya viśva upāsate praśiṣaṁ yasya devāḥ. Yasya chāyāmṛtaṁ yasya mṛtyuḥ kasmai devāya haviṣā vidhema.', meaning: 'Let us worship with oblations the blissful Lord, who is the one who provides life, one who imparts vigour; whose command all beings, even the gods obey; and to whom immortality and death are mere shadows.' },
        { number: 3, text: 'यः प्राणतो निमिषतो महित्वैक इद्राजा जगतो बभूव । य ईशे अस्य द्विपदश्चतुष्पदः कस्मै देवाय हविषा विधेम ॥', transliteration: 'Yaḥ prāṇato nimiṣato mahitvaika idrājā jagato babhūva. Ya īśe asya dvipadaścatuṣpadaḥ kasmai devāya haviṣā vidhema.', meaning: 'Let us worship with oblations the blissful Lord who by his own greatness has verily become the sole king of all living beings that move, breathe and wink and who rules over this (world) of bipeds and quadrupeds.' },
        { number: 4, text: 'यस्येमे हिमवन्तो महित्वा यस्य समुद्रं रसया सहाहुः । यस्येमाः प्रदिशो यस्य बाहू कस्मै देवाय हविषा विधेम ॥', transliteration: 'Yasyeme himavanto mahitvā yasya samudraṁ rasayā sahāhuḥ. Yasyemāḥ pradiśo yasya bāhū kasmai devāya haviṣā vidhema.', meaning: 'Let us worship with oblations the blissful Lord whose glory the wise ones declare to be these snow-clad mountains and the oceans along with the rivers, and whose arms are the quarters of space.' },
        { number: 5, text: 'येन द्यौरुग्रा पृथिवी च दृळ्हा येन स्वः स्तभितं येन नाकः । यो अन्तरिक्षे रजसो विमानः कस्मै देवाय हविषा विधेम ॥', transliteration: 'Yena dyaurugrā pṛthivī ca dṛḷhā yena svaḥ stabhitaṁ yena nākaḥ. Yo antarikṣe rajaso vimānaḥ kasmai devāya haviṣā vidhema.', meaning: 'Let us worship with oblations the blissful Lord by whom the sky is made mysterious and awe-inspiring and the earth is made firm, by whom the heaven and the Sun are fixed, and who is the creator of vapours in the space.' },
        { number: 6, text: 'यं क्रन्दसी अवसा तस्तभाने अभ्यैक्षेतां मनसा रेजमाने । यत्राधि सूर उदितो विभाति कस्मै देवाय हविषा विधेम ॥', transliteration: 'Yaṁ krandasī avasā tastabhāne abhyaikṣetāṁ manasā rejamāne. Yatrādhi sūra udito vibhāti kasmai devāya haviṣā vidhema.', meaning: 'Let us worship with oblations the blissful Lord, whom the heaven and the earth, steady and fixed for the protection of the worlds, witnessed through their intellect; the Lord in the form of Prajapati the great sustainer in whom the sun having risen shines.' },
        { number: 7, text: 'आप ह यद्बृहतीर्विश्वमायन्गर्भं दधाना जनयन्तीरग्निम् । ततो देवानां समवर्ततासुरेकः कस्मै देवाय हविषा विधेम ॥', transliteration: 'Āpa ha yadbṛhatīrviśvamāyangarbhaṁ dadhānā janayantīragnim. Tato devānāṁ samavartatāsurekaḥ kasmai devāya haviṣā vidhema.', meaning: 'As the great waters, containing the germ (of Prajapati), had spread all over the universe for producing (all the elements like) fire, therefore arose the one and only Prajapati, the life breath of the gods; let us worship that blissful Lord with oblations.' },
        { number: 8, text: 'यश्चिदापो महिना पर्यपश्यद्दक्षं दधाना जनयन्तीर्यज्ञम् । यो देवेष्वधि देव एक आसीत्कस्मै देवाय हविषा विधेम ॥', transliteration: 'Yaścidāpo mahinā paryapaśyaddakṣaṁ dadhānā janayantīryajñam. Yo deveṣvadhi deva eka āsītkasmai devāya haviṣā vidhema.', meaning: 'Let us worship with oblations the blissful Lord, who is the Lord of the gods, the sole existence, and who by his might beheld all around, at the time of dissolution the waters which for the sake of creating the phenomenal things represented by sacrificial rite, contained the Prajapati who manifests in the form of universe.' },
        { number: 9, text: 'मा नो हिंसीज्जनिता यः पृथिव्या यो वा दिवं सत्यधर्मा जजाने । यश्चापश्चन्द्रा बृहतीर्जजान कस्मै देवाय हविषा विधेम ॥', transliteration: 'Mā no hiṁsījjanitā yaḥ pṛthivyā yo vā divaṁ satyadharmā jajāna. Yaścāpaścandrā bṛhatīrjajāna kasmai devāya haviṣā vidhema.', meaning: 'Let us worship with oblations the blissful Lord, who is the creator of the earth, who is the unfailing support, who has given birth to all the spheres of existence including the space, who has given birth to the vast and delightful waters; may He never harm us.' },
        { number: 10, text: 'प्रजापते न त्वदेतान्यन्यो विश्वा जातानि परि ता बभूव । यत्कामास्ते जुहुमस्तन्नो अस्तु वयं स्याम पतयो रयीणाम् ॥', transliteration: 'Prajāpate na tvadetānyanyo viśvā jātāni pari tā babhūva. Yatkāmāste juhumastanno astu vayaṁ syāma patayo rayīṇām.', meaning: 'O Prajapati, nobody else apart from you had pervaded the beings who manifested themselves in the beginning and those present now. Having desired what, we offer you oblations, may that result be ours, may we become possessors of riches.' },
      ]
    },
    {
      id: 'devi-suktam',
      title: 'Devi Suktam',
      description: 'A collection of 8 Vedic hymns from Rigveda where the Goddess speaks about Her cosmic nature',
      mantras: [
        { number: 1, text: 'अहं रुद्रेभिर्वसुभिश्वराम्यहमादित्यैरुत विश्वदेवैः । अहं मित्रावरुणोभा बिभर्म्यहमिन्द्राग्नी अहमश्विनोभा ॥', transliteration: 'Ahaṁ rudrebhirvasubhiścarāmyahamādityairuta viśvadevaiḥ. Ahaṁ mitrāvaruṇobhā bibharmyahamindrāgnī ahamaśvinobhā.', meaning: 'I move with the Rudras, with the Vasus, with the Adityas and all the gods. I support Mitra, Varuna, Indra, Agni and the two Asvins.' },
        { number: 2, text: 'अहं सोममाहनस बिभर्म्यहं त्वष्टारमुत पूषणं भगम् । अहं दधामि द्रविणं हविष्मते सुप्राव्ये यजमानाय सुन्वते ॥', transliteration: 'Ahaṁ somamāhanasa bibharmyaham tvaṣṭāramuta pūṣaṇaṁ bhagam. Ahaṁ dadhāmi draviṇaṁ haviṣmate suprāvye yajamānāya sunvate.', meaning: 'I Support Soma, the destroyer of foes. I also support Tvasta, Pushan and Bhaga. I bestow wealth upon him who squeezing the soma juice, offers sacrifice and pours excellent oblation.' },
        { number: 3, text: 'अहं राष्ट्री सङ्गमनी वसूनां चिकितुषी प्रथमा यज्ञियानाम् । तां मा देवा व्यदधुः पुरुत्रा भूरिस्थात्रां भूर्य्वावेशयन्तीम् ॥', transliteration: 'Ahaṁ rāṣṭrī saṅgamanī vasūnāṁ cikituṣī prathamā yajñiyānām. Tāṁ mā devā vyadadhuḥ purutrā bhūristhātrāṁ bhūryvāveśayantīm.', meaning: 'I am the queen of the universe. I bring wealth to my worshippers. I am the knower of Brahman (I have realized Brahman as my Self). I am the foremost among the objects of worship. I have assumed the form of this manifold universe, and as the Atman have entered into all beings. Therefore the gods have established Me (who am of such glory) in many places.' },
        { number: 4, text: 'मया सो अन्नमत्ति यो विपश्यति यः प्राणिति य ईं शृणोत्युक्तम् । अमन्तवो मां त उप क्षियन्ति श्रुधिश्रुत श्रद्धिवं ते वदामि ॥', transliteration: 'Mayā so annamatti yo vipaśyati yaḥ prāṇiti ya īṁ śṛṇotyuktam. Amantavo māṁ ta upa kṣiyanti śrudhiśruta śraddhivaṁ te vadāmi.', meaning: 'He who eats food, (eats) through Me, he who sees, who breathes, who hears what is spoken, does so through Me. Those who are ignorant of Me perish. You, who have ears, hear. I tell you about That which is obtained through faith.' },
        { number: 5, text: 'अहमेव स्वयमिदं वदामि जुष्टं देवेभिरुत मानुषेभिः । यं कामये तन्तमुग्रं कृणोमि तं ब्रह्माणं तमृषिं तं सुमेधाम् ॥', transliteration: 'Ahameva svayamidaṁ vadāmi juṣṭaṁ devebhiruta mānuṣebhiḥ. Yaṁ kāmaye tantamugraṁ kṛṇomi taṁ brahmāṇaṁ tamṛṣiṁ taṁ sumedhām.', meaning: 'Verily, I myself say this and my words are pleasing to gods and men - the person whom I desire I make mighty: I make him a Brahma, a Rsi, a wise man.' },
        { number: 6, text: 'अहं रुद्राय धनुरातनोमि ब्रह्मद्विषे शरवे हन्तवा उ । अहं जनाय समदं कृणोम्यहं द्यावा पृथिवी आविवेश ॥', transliteration: 'Ahaṁ rudrāya dhanurātanomi brahmadviṣe śarave hantavā u. Ahaṁ janāya samadaṁ kṛṇomyahaṁ dyāvā pṛthivī āviveśa.', meaning: 'I bend the bow for Rudra to kill the demoniac enemies of the brahmanas. For the sake of My devotees I fight against their enemies. Indeed, I pervade heaven and earth.' },
        { number: 7, text: 'अहं सुवे पितरमस्य मूर्धन्मम योनिरप्स्वन्तः समुद्रे । ततो वितिष्ठे भुवनानु विश्वोतामूं द्यां वर्ष्मणोप स्पृशामि ॥', transliteration: 'Ahaṁ suve pitaramasya mūrdhanmama yonirapsvantaḥ samudre. Tato vitiṣṭhe bhuvanānu viśvotāmūṁ dyāṁ varṣmaṇopa spṛśāmi.', meaning: 'On the Paramatman, I have given birth to the father-like sky. My place of origin is in the thought-waves of Paramatman (who is like Ocean). Therefore, entering into the beings as their in-dwelling Self, I pervade the entire universe in different ways. And I touch the heaven with My body made of Maya.' },
        { number: 8, text: 'अहमेव वात इव प्रवाम्यारभमाणा भुवनानि विश्वा । परो दिवा पर एना पृथिव्यैतावती महिना सम्बभूव ॥', transliteration: 'Ahameva vāta iva pravāmyārabhamāṇā bhuvanāni viśvā. Paro divā para enā pṛthivyaitāvatī mahinā sambabhūva.', meaning: 'Like the wind that blows I set in motion all the created things (by My sweet will). (I am) beyond the sky and the earth and I have become all this in My own splendour.' },
      ]
    },
    {
      id: 'acharyopadesha',
      title: 'Acharyopadesha',
      description: "The Instructor's Advice from Taittiriya Upanishad (Shikshavalli) - timeless guidance from teacher to student",
      mantras: [
        { number: 1, text: 'वेदमनूच्याचार्योऽन्तेवासिनमनुशास्ति । सत्यं वद । धर्म चर । स्वाध्यायान्मा प्रमदः । आचार्याय प्रियं धनमाहृत्य प्रजातन्तुं मा व्यवच्छेत्सीः । सत्यान्न प्रमदितव्यम्। धर्मान्न प्रमदितव्यम् । कुशलान्न प्रमदितव्यम् । भूत्यै न प्रमदितव्यम् । स्वाध्यायप्रवचनाभ्यां न प्रमदितव्यम् ॥', transliteration: 'Vedamanūcyācāryo\'ntevāsinamanuśāsti. Satyaṃ vada. Dharmaṃ cara. Svādhyāyānmā pramadaḥ. Ācāryāya priyaṃ dhanamāhṛtya prajātantum mā vyavacchetsīḥ. Satyānna pramaditavyam. Dharmānna pramaditavyam. Kuśalānna pramaditavyam. Bhūtyai na pramaditavyam. Svādhyāyapravacanābhyāṃ na pramaditavyam.', meaning: 'Having instructed in the Veda the preceptor advises the disciple: Speak the truth; follow the prescribed conduct; be not heedless about the studies; (at the time of your departure from your preceptor) offer to him the gift liked by him, and take care that the line of your race is not broken. Do not fail to pay attention to truth; never fail to pay heed to the performance of duty; do not be careless about (personal) welfare; Do not neglect prosperity; never be indifferent to study and teaching.' },
        { number: 2, text: 'देवपितृकार्याभ्यां न प्रमदितव्यम् । मातृदेवो भव । पितृदेवो भव । आचार्यदेवो भव । अतिथिदेवो भव । यान्यनवद्यानि कर्माणि । तानि सेवितव्यानि । नो इतराणि । यान्यस्माकं सुचरितानि । तानि त्वयोपास्यानि ॥ नो इतराणि । ये के चास्मच्छ्रेयांसो ब्राह्मणाः । तेषां त्वयाऽऽसने न प्रश्वसितव्यम् ।', transliteration: 'Devapitṛkāryābhyāṃ na pramaditavyam. Mātṛdevo bhava. Pitṛdevo bhava. Ācāryadevo bhava. Atithidevo bhava. Yānyanavadyāni karmāṇi. Tāni sevitavyāni. No itarāṇi. Yānyasmākaṃ sucaritāni. Tāni tvayopāsyāni. No itarāṇi. Ye ke cāsmacchreyāṃso brāhmaṇāḥ. Teṣāṃ tvayā\'\'sane na praśvasitavyam.', meaning: 'There should be no lapse in the duties towards the gods and manes. Let your mother be a goddess unto you. Let your father be a god unto you. Let your teacher be a god unto you. Let your guest be a god unto you. The works that are not blameworthy are to be resorted to, not the others. Those actions of ours that are commendable are to be followed by you, not the others. You should, by offering a seat etc., remove the fatigue of those Brahmanas who are more praiseworthy than us.' },
        { number: 3, text: 'श्रद्धया देयम् । अश्रद्धयाऽदेयम् । श्रिया देयम् । ह्रिया देयम् । भिया देयम् । संविदा देयम् ।', transliteration: 'Śraddhayā deyam. Aśraddhayā\'deyam. Śriyā deyam. Hriyā deyam. Bhiyā deyam. Saṃvidā deyam.', meaning: 'Gifts must be made gladly and willingly; never give an unwilling gift. Let gifts be made according to one\'s fortune, with modesty and fear. Let there be also agreement in opinion (or friendly feeling) when the gifts are offered.' },
        { number: 4, text: 'अथ यदि ते कर्मविचिकित्सा वा वृत्तविचिकित्सा वा स्यात् । ये तत्र ब्राह्मणास्संमर्शिनः । युक्ता आयुक्ताः । अलूक्षा धर्मकामास्स्युः । यथा ते तत्र वर्तेरन् । तथा तत्र वर्तेथाः ।', transliteration: 'Atha yadi te karmavicikitsā vā vṛttavicikitsā vā syāt. Ye tatra brāhmaṇāssammarśinaḥ. Yuktā āyuktāḥ. Alūkṣā dharmakāmāssyuḥ. Yathā te tatra varteran. Tathā tatra vartethāḥ.', meaning: 'Now, should there arise any uncertainty regarding your acts, or doubts in respect of your conduct in life, you behave exactly in the same manner as the Brahmanas who are able to judge impartially, who are experienced, who are not directed by others, who are gentle and intent on the Law, and who happen to be present there, would act in regard to such matters.' },
        { number: 5, text: 'अथाभ्याख्यातेषु । ये तत्र ब्राह्मणास्संमर्शिनः । युक्ता आयुक्ताः । अलूक्षा धर्मकामास्स्युः । यथा ते तेषु वर्तेरन् । तथा तेषु वर्तेथाः ।', transliteration: 'Athābhyākhyāteṣu. Ye tatra brāhmaṇāssammarśinaḥ. Yuktā āyuktāḥ. Alūkṣā dharmakāmāssyuḥ. Yathā te teṣu varteran. Tathā teṣu vartethāḥ.', meaning: 'And now with regard to those who are accused for some crime: Conduct yourself on the model of those cautious, experienced, independent, gentle Brahmanas who are interested in the Law, and who happen to be present there.' },
        { number: 6, text: 'एष आदेशः । एष उपदेशः । एषा वेदोपनिषत् । एतदनुशासनम् । एवमुपासितव्यम् । एवमुचैतदुपास्यम् ॥', transliteration: 'Eṣa ādeśaḥ. Eṣa upadeśaḥ. Eṣā vedopaniṣat. Etadanuśāsanam. Evamupāsitavyam. Evamucaitadupāsyam.', meaning: 'This is the injunction. This is the instruction. This is the secret of the Vedas. This is divine behest. (All this) is to be done thus. And (all this) must be done thus.' },
      ]
    },
    {
      id: 'upanishad-sara-sangraha',
      title: 'Upanishad Sara Sangraha',
      description: 'Essence of Upanishads from Taittiriya Upanishad - core teachings on Brahman and creation',
      mantras: [
        { number: 1, text: 'ॐ ॥ ब्रह्मविदाप्नोति परम् । तदेषाऽभ्युक्ता । सत्यं ज्ञानमनन्तं ब्रह्म । यो वेद निहितं गुहायां परमे व्योमन् । सोऽश्नुते सर्वान् कामान्सह । ब्रह्मणा विपश्चितेति ।', transliteration: 'Om. Brahmavidāpnoti param. Tadeṣā\'bhyuktā. Satyaṃ jñānamanantaṃ brahma. Yo veda nihitaṃ guhāyāṃ parame vyoman. So\'śnute sarvān kāmānsaha. Brahmaṇā vipaściteti.', meaning: 'He who realizes Brahman attains the Supreme. In this regard it has been uttered: "Brahman is Truth, Knowledge and Infinity. He who knows that Brahman as existing in the intellect which is lodged in the supreme space in the heart, enjoys all desirable things simultaneously, as the all-knowing Brahman."' },
        { number: 2, text: 'तस्माद्वा एतस्मादात्मन आकाशस्संभूतः । आकाशाद्वायुः । वायोरग्निः । अग्नेरापः । अद्भ्यः पृथिवी । पृथिव्या ओषधयः । ओषधीभ्योऽन्नम् । अन्नात्पुरुषः ।', transliteration: 'Tasmādvā etasmādātmana ākāśassambhūtaḥ. Ākāśādvāyuḥ. Vāyoragniḥ. Agnerāpaḥ. Adbhyaḥ pṛthivī. Pṛthivyā oṣadhayaḥ. Oṣadhībhyo\'nnam. Annātpuruṣaḥ.', meaning: 'From that very Atman was produced space. From space emerged air. From air was born fire. From fire was created water. From water sprang up earth. From earth were born the herbs. From the herbs was produced food. From food was born man.' },
        { number: 3, text: 'स वा एष पुरुषोऽन्नरसमयः । तस्येदमेव शिरः । अयं दक्षिणः पक्षः । अयमुत्तरः पक्षः । अयमात्मा । इदं पुच्छं प्रतिष्ठा । तदप्येष श्लोको भवति ॥', transliteration: 'Sa vā eṣa puruṣo\'nnarasamayaḥ. Tasyedameva śiraḥ. Ayaṃ dakṣiṇaḥ pakṣaḥ. Ayamuttaraḥ pakṣaḥ. Ayamātmā. Idaṃ pucchaṃ pratiṣṭhā. Tadapyeṣa śloko bhavati.', meaning: 'He indeed is this man consisting of the essence of food. This indeed is his head; this is his right wing; this is his left wing; this is his trunk; and this is the hind part forming the support and foundation. Here also is a verse pertaining to that very fact.' },
      ]
    },
    {
      id: 'brahmananda-mimamsa',
      title: 'Brahmananda Mimamsa',
      description: 'Inquiry into Bliss from Taittiriya Upanishad - a profound exploration of degrees of bliss culminating in Brahman',
      mantras: [
        { number: 1, text: 'भीषाऽस्माद्वातः पवते । भीषोदेति सूर्यः । भीषाऽस्मादग्निश्चेन्द्रश्च । मृत्युर्धावति पञ्चम इति ।', transliteration: 'Bhīṣā\'smādvātaḥ pavate. Bhīṣodeti sūryaḥ. Bhīṣā\'smādagniścendraśca. Mṛtyurdhāvati pañcama iti.', meaning: 'Being afraid of Him the wind blows. Being afraid of Him the sun rises. Being afraid of Him the fire and Indra function. And death too, the fifth runs. Thus (is the verse).' },
        { number: 2, text: 'सैषाऽऽनन्दस्य मीमांसा भवति । युवा स्यात्साधुयुवाऽध्यायकः । आशिष्ठो दृढिष्ठो बलिष्ठः । तस्येयं पृथिवी सर्वा वित्तस्य पूर्णा स्यात् । स एको मानुष आनन्दः ।', transliteration: 'Saiṣā\'\'nandasya mīmāṃsā bhavati. Yuvā syātsādhuyuvā\'dhyāyakaḥ. Āśiṣṭho dṛḍhiṣṭho baliṣṭhaḥ. Tasyeyaṃ pṛthivī sarvā vittasya pūrṇā syāt. Sa eko mānuṣa ānandaḥ.', meaning: 'This is a critical enquiry of that bliss. Suppose there is a young man in the prime of life, good, learned, full of aspiration, perfectly resolute, and most energetic. Let this whole earth full of wealth be for him. This will be one unit of human joy.' },
        { number: 3, text: '[Degrees of Bliss: 100 units of human joy = 1 unit of human gandharva joy]', transliteration: '[One hundred such units of human joy make a single unit of joy of the human gandharvas]', meaning: 'One hundred of such units of human joy make a single unit of joy of the human gandharvas, as also of a man versed in the Vedas and free from desires.' },
        { number: 4, text: '[100 units of human gandharva joy = 1 unit of divine gandharva joy]', transliteration: '[One hundred such units of the joy of human gandharvas make a single unit of joy of divine gandharvas]', meaning: 'One hundred such units of the joy of human gandharvas make a single unit of joy of divine gandharvas, as also of a man versed in the Vedas and free from desires.' },
        { number: 5, text: '[100 units of divine gandharva joy = 1 unit of joy of the manes]', transliteration: '[One hundred such units of the joy of divine gandharvas make a single unit of joy of the manes]', meaning: 'One hundred such units of the joy of divine gandharvas make a single unit of joy of the manes who inhabit the long enduring world...' },
        { number: 6, text: '[100 units of joy of manes = 1 unit of joy of gods born in Ajana heaven]', transliteration: '[One hundred such units of joy of manes make a single unit of joy of gods born in the Ajana heaven]', meaning: 'One hundred such units of joy of manes make a single unit of joy of gods born in the Ajana heaven...' },
        { number: 7, text: '[100 units of joy of Ajana gods = 1 unit of Karma-Devas joy]', transliteration: '[One hundred such units of joy of gods born in ajana heaven make a single unit of joy of Karma-Devas]', meaning: 'One hundred such units of joy of gods born in ajana heaven make a single unit of joy of Karma-Devas, who have attained to divinity by means of Vedic sacrifices...' },
        { number: 8, text: '[100 units of Karma-Devas joy = 1 unit of thirty-three gods joy]', transliteration: '[One hundred such units of joy of Karma-Devas make a single unit of joy of the thirty-three gods]', meaning: 'One hundred such units of joy of Karma-Devas make a single unit of joy of (thirty-three) gods...' },
        { number: 9, text: '[100 units of thirty-three gods joy = 1 unit of Indra\'s joy]', transliteration: '[One hundred such units of joy of the thirty-three gods make a single unit of joy of Indra]', meaning: 'One hundred such units of joy of (thirty-three) gods make a single unit of joy of Indra...' },
        { number: 10, text: '[100 units of Indra\'s joy = 1 unit of Brihaspati\'s joy]', transliteration: '[One hundred such units of joy of Indra make a single unit of joy of Brihaspati]', meaning: 'One hundred such units of joy of Indra make a single unit of joy of Brihaspati...' },
        { number: 11, text: '[100 units of Brihaspati\'s joy = 1 unit of Prajapati\'s joy]', transliteration: '[One hundred such units of joy of Brihaspati make a single unit of joy of Prajapati]', meaning: 'One hundred such units of joy of Brihaspati make a single unit of joy of Prajapati...' },
        { number: 12, text: '[100 units of Prajapati\'s joy = 1 unit of Brahma\'s joy]', transliteration: '[One hundred such units of joy of Prajapati make a single unit of joy of the Brahma]', meaning: 'One hundred such units of joy of Prajapati make a single unit of joy of the Brahma, as also of a man versed in the Vedas and free from desires.' },
        { number: 13, text: 'स यश्चायं पुरुषे । यश्चासावादित्ये । स एकः ।', transliteration: 'Sa yaścāyaṃ puruṣe. Yaścāsāvāditye. Sa ekaḥ.', meaning: 'He who is here in man and He who is in the yonder sun - both are one.' },
        { number: 14, text: 'स य एवंवित् । अस्माल्लोकात्प्रेत्य । एतमन्नमयमात्मानमुपसंक्रामति । एतं प्राणमयमात्मानमुपसंक्रामति । एतं मनोमयमात्मानमुपसंक्रामति । एतं विज्ञानमयमात्मानमुपसंक्रामति । एतमानन्दमयमात्मानमुपसंक्रामति । तदप्येष श्लोको भवति ।', transliteration: 'Sa ya evaṃvit. Asmāllokātpretya. Etamannamayamātmānamupasaṃkrāmati. Etaṃ prāṇamayamātmānamupasaṃkrāmati. Etaṃ manomayamātmānamupasaṃkrāmati. Etaṃ vijñānamayamātmānamupasaṃkrāmati. Etamānandamayamātmānamupasaṃkrāmati. Tadapyeṣa śloko bhavati.', meaning: 'He who knows thus attains, after departing from this world, this self made of food, attains this self made of vital force, attain this self made of mind, attain this self made of intelligence, attain this self made of bliss. With regard to that there is also this verse.' },
        { number: 15, text: 'यतो वाचो निवर्तन्ते । अप्राप्य मनसा सह । आनन्दं ब्रह्मणो विद्वान् । न बिभेति कुतश्चनेति ।', transliteration: 'Yato vāco nivartante. Aprāpya manasā saha. Ānandaṃ brahmaṇo vidvān. Na bibheti kutaścaneti.', meaning: 'That from which all speech with the mind turns away, not having reached It. Knowing the bliss of that Brahman man fears nothing.' },
        { number: 16, text: 'एतं ह वाव न तपति । किमहं साधु नाकरवम् । किमहं पापमकरवमिति ।', transliteration: 'Etaṃ ha vāva na tapati. Kimahaṃ sādhu nākaravam. Kimahaṃ pāpamakaravamiti.', meaning: 'Verily, the thought, "Why did I not perform good deeds, and why did I perform bad deeds?" does not torment such a one.' },
        { number: 17, text: 'स य एवं विद्वानेते आत्मानग्ग् स्पृणुते । उभे होवैष एते आत्मानग्ग् स्पृणुते । य एवं वेद । इत्युपनिषत् ।', transliteration: 'Sa ya evaṃ vidvānete ātmānagg spṛṇute. Ubhe hovaiṣa ete ātmānagg spṛṇute. Ya evaṃ veda. Ityupaniṣat.', meaning: 'He who knows thus cherishes both these as Self. Verily, he who knows thus cherishes these two as Self. Such is the secret teaching.' },
      ]
    },
    {
      id: 'sadachara-pradarshanam',
      title: 'Sadachara Pradarshanam',
      description: 'Right Conduct from Taittiriya Upanishad - teachings on hospitality, meditation, and the unity of Self',
      mantras: [
        { number: 1, text: 'न कंचन वसतौ प्रत्याचक्षीत । तद्व्रतम् । तस्माद्यया कया च विधया बह्वन्नं प्राप्नुयात् । अराध्यस्मा अन्नमित्याचक्षते ।', transliteration: 'Na kaṃcana vasatau pratyācakṣīta. Tadvratam. Tasmādyayā kayā ca vidhayā bahvannaṃ prāpnuyāt. Arādhyasmā annamityācakṣate.', meaning: 'Do not refuse anyone come for shelter. That shall be a vow. Therefore one should acquire abundant food by whatever means. They say, "Food is prepared for him."' },
        { number: 2, text: 'एतद्वै मुखतोऽन्नं राद्धम् । मुखतोऽस्मा अन्नं राध्यते । एतद्वै मध्यतोऽन्नं राद्धम् । मध्यतोऽस्मा अन्नं राध्यते । एतद्वा अन्ततोऽन्नं राद्धम् । अन्ततोऽस्मा अन्नं राध्यते । य एवं वेद ।', transliteration: 'Etadvai mukhato\'nnaṃ rāddham. Mukhato\'smā annaṃ rādhyate. Etadvai madhyato\'nnaṃ rāddham. Madhyato\'smā annaṃ rādhyate. Etadvā antato\'nnaṃ rāddham. Antato\'smā annaṃ rādhyate. Ya evaṃ veda.', meaning: 'The food that is prepared and given in the best manner returns to the giver in the best manner; what is offered in the medium fashion returns also exactly so; food prepared and offered in the lowest fashion accrues to the giver in the lowest way. He who knows thus (gets the result as described).' },
        { number: 3, text: 'क्षेम इति वाचि । योगक्षेम इति प्राणापानयोः । कर्मेति हस्तयोः । गतिरिति पादयोः । विमुक्तिरिति पायौ । इति मानुषीस्समाज्ञाः ।', transliteration: 'Kṣema iti vāci. Yogakṣema iti prāṇāpānayoḥ. Karmeti hastayoḥ. Gatiriti pādayoḥ. Vimuktiriti pāyau. Iti mānuṣīssamājñāḥ.', meaning: '(Brahman is to be meditated on) as preservation in speech; acquisition and preservation in Prāna and Apāna; as action in the hands; as movement in the feet; evacuation in the anus. These are meditations on the human plane.' },
        { number: 4, text: 'अथ दैवीः । तृप्तिरिति वृष्टौ । बलमिति विद्युति ।', transliteration: 'Atha daivīḥ. Tṛptiriti vṛṣṭau. Balamiti vidyuti.', meaning: 'Then follow the divine meditations. Brahman is to be meditated on as contentment in rain; as strength in lightening.' },
        { number: 5, text: 'यश इति पशुषु । ज्योतिरिति नक्षत्रेषु । प्रजातिरमृतमानन्द इत्युपस्थे । सर्वमित्याकाशे ।', transliteration: 'Yaśa iti paśuṣu. Jyotiriti nakṣatreṣu. Prajātiramṛtamānanda ityupasthe. Sarvamityākāśe.', meaning: '(Brahman is to be worshipped) as fame in beasts; as light in the stars; as procreation, immortality, and joy in the generative organ; as everything in space.' },
        { number: 6, text: 'तत् प्रतिष्ठेत्युपासीत । प्रतिष्ठावान् भवति । तन्मह इत्युपासीत । महान् भवति । तन्मन इत्युपासीत । मानवान् भवति ।', transliteration: 'Tat pratiṣṭhetyupāsīta. Pratiṣṭhāvān bhavati. Tanmaha ityupāsīta. Mahān bhavati. Tanmana ityupāsīta. Mānavān bhavati.', meaning: 'One should meditate on that Brahman as the support; thereby one becomes supported. One should meditate on that Brahman as great; thereby one becomes great. One should meditate on It as mind; thereby one becomes endowed with mind.' },
        { number: 7, text: 'तन्नम इत्युपासीत । नम्यन्तेऽस्मै कामाः । तद्ब्रह्मेत्युपासीत । ब्रह्मवान् भवति । तद् ब्रह्मणः परिमर इत्युपासीत । पर्येणं म्रियन्ते द्विषन्तस्सपत्नाः । परियेऽप्रिया भ्रातृव्याः ।', transliteration: 'Tannama ityupāsīta. Namyante\'smai kāmāḥ. Tadbrahmetyupāsīta. Brahmavān bhavati. Tad brahmaṇaḥ parimara ityupāsīta. Paryeṇaṃ mriyante dviṣantassapatnāḥ. Pariye\'priyā bhrātṛvyāḥ.', meaning: 'One should meditate on It as obeisance then all objects of desire bow down before him. One should meditate on It as the Supreme Lord; thereby one becomes endowed with supremacy. One should meditate on It as destructive power, thereby the hating foes and unfriendly enemies die around him.' },
        { number: 8, text: 'स यश्चायं पुरुषे । यश्चासावादित्ये । स एकः । स य एवंवित् । अस्माल्लोकात् प्रेत्य । एतमन्नमयमात्मानमुपसंक्रम्य । एतं प्राणमयमात्मानमुपसंक्रम्य । एतं मनोमयमात्मानमुपसंक्रम्य। एतं विज्ञानमयमात्मानमुपसंक्रम्य । एतमानन्दमयमात्मानमुपसंक्रम्य । इमान् लोकान् कामान्नी कामरूप्यनुसंचरन् । एतत्साम गायन्नास्ते ॥', transliteration: 'Sa yaścāyaṃ puruṣe. Yaścāsāvāditye. Sa ekaḥ. Sa ya evaṃvit. Asmāllokāt pretya. Etamannamayamātmānamupasaṃkramya. Etaṃ prāṇamayamātmānamupasaṃkramya. Etaṃ manomayamātmānamupasaṃkramya. Etaṃ vijñānamayamātmānamupasaṃkramya. Etamānandamayamātmānamupasaṃkramya. Imān lokān kāmānnī kāmarūpyanusaṃcaran. Etatsāma gāyannāste.', meaning: 'He that is here in man, and He that is there in the sun, are one. He who knows thus, attains, after departing from this world, this self made of food, then attains this self made of vital force, then attains this self made of mind, then attains this self made of intelligence, then attains this self made of bliss. Then he roams over these worlds with command over food and assuming the forms he likes and remains singing the following sāman:' },
        { number: 9, text: 'हा ३ वु हा ३ वु हा ३ वु। अहमन्नमहमन्नमहमन्नम् । अहमन्नादो २ ऽहमन्नादो २ ऽहमन्नादः । अहग्ग् श्लोककृदहग्ग् श्लोककृदहग्ग् श्लोककृत् । अहमस्मि प्रथमजा ऋता ३ स्य । पूर्वं देवेभ्यो अमृतस्य ना ३ भायि।', transliteration: 'Hā 3 vu hā 3 vu hā 3 vu. Ahamannamahamannamahamannam. Ahamannādo 2 \'hamannādo 2 \'hamannādaḥ. Ahagg ślokakṛdahagg ślokakṛdahagg ślokakṛt. Ahamasmi prathamajā ṛtā 3 sya. Pūrvaṃ devebhyo amṛtasya nā 3 bhāyi.', meaning: 'Oh! Oh! Oh! I am the food, I am the food, I am the food; I am the eater, I am the eater, I am the eater; I am the unifier, I am the unifier, I am the unifier; I am the first-born of the manifested and unmanifested worlds, I am earlier than the gods. I am the centre of immortality.' },
        { number: 10, text: 'यो मा ददाति स इदेव मा ३ वाः। अहमन्नमन्नमदन्तमा ३ द्मि । अहं विश्व भुवनमभ्यभवाम् । सुवर्ण ज्योतीः । य एवं वेद । इत्युपनिषत् ॥', transliteration: 'Yo mā dadāti sa ideva mā 3 vāḥ. Ahamannamannamadantamā 3 dmi. Ahaṃ viśva bhuvanamabhyabhavām. Suvarṇa jyotīḥ. Ya evaṃ veda. Ityupaniṣat.', meaning: 'He who gives me thus (as food) protects me. I, the food, eat him up who eats food without giving. I defeat (or engulf) the entire universe. I am effulgent like the sun. He who knows thus (gets such results). This is the Upanishad.' },
      ]
    },
  ];

	  // Helper to get syllables for a mantra - prefers healthy saved configs, then falls back to defaults
	  const getMantraSyllables = (mantraId: string): TimedSyllable[] => {
	    const savedConfig = getMantraConfig(mantraId);

	    // Saha Navavatu: only trust saved syllables if they stay aligned with the canonical timing array
	    if (mantraId === 'saha-navavatu') {
	      if (
	        savedConfig &&
	        savedConfig.confirmed &&
	        Array.isArray(savedConfig.syllables) &&
	        savedConfig.syllables.length === sahaNavatuMantraSyllables.length
	      ) {
	        return savedConfig.syllables;
	      }
	      return sahaNavatuMantraSyllables;
	    }

	    // Gayatri: similarly, only use saved syllables when aligned with the canonical array
	    if (mantraId === 'gayatri') {
	      if (
	        savedConfig &&
	        savedConfig.confirmed &&
	        Array.isArray(savedConfig.syllables) &&
	        savedConfig.syllables.length === gayatriMantraSyllables.length
	      ) {
	        return savedConfig.syllables;
	      }
	      return gayatriMantraSyllables;
	    }

	    // Other mantras (placeholders without dedicated timing arrays yet)
	    if (savedConfig && savedConfig.confirmed && savedConfig.syllables && savedConfig.syllables.length > 0) {
	      return savedConfig.syllables;
	    }
	    return [];
	  };

  // Helper to get transliteration syllables from saved config or mantra definition
  const getTransliterationSyllables = (mantra: Mantra): string[] => {
    const savedConfig = getMantraConfig(mantra.id);
	    if (
	      savedConfig &&
	      savedConfig.confirmed &&
	      savedConfig.transliterationSyllables &&
	      mantra.transliteration &&
	      savedConfig.transliterationSyllables.length === mantra.transliterationSyllables.length &&
	      savedConfig.transliterationSyllables.join('') === mantra.transliteration
	    ) {
	      return savedConfig.transliterationSyllables;
	    }
    // Fall back to mantra's static definition
    return mantra.transliterationSyllables;
  };
  return (
    <PageLayout title="Hinduism for Children">

      <div className="w-full bg-gradient-to-br from-indian-cream to-white py-12">
        <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-16">

          <div id="lessons" className="scroll-mt-20">
            {/* Enhanced Hero Section */}
            <LearnHero
              totalLessons={totalLessons}
              completedLessons={progressState.completedLessons.length}
              totalGames={4}
	              totalMantras={mantras.length}
              lastLesson={lastLesson}
            />

            {/* Bookmarks Panel */}
            <div className="mb-8">
              <BookmarksPanel
                bookmarks={progressState.bookmarks}
                getLessonTitle={getLessonTitle}
                onRemove={toggleBookmark}
                onUpdateNotes={updateBookmarkNotes}
              />
            </div>

	            <Tabs value={activeMainTab} onValueChange={handleMainTabChange} className="w-full">
	              <TabsList className="grid w-full grid-cols-3 mb-8 bg-gradient-to-br from-spiritual-50 to-white border border-spiritual-200 p-1 rounded-md">
                <TabsTrigger value="lessons" className="text-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-indian-cream data-[state=active]:to-white data-[state=active]:border-b-2 data-[state=active]:border-indian-saffron">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Lessons
                </TabsTrigger>
	                {/* Mantras tab - visible in production, content is internally filtered to live mantras */}
	                <TabsTrigger value="mantras" className="text-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-indian-cream data-[state=active]:to-white data-[state=active]:border-b-2 data-[state=active]:border-indian-saffron">
	                  <Music className="w-5 h-5 mr-2" />
	                  Mantras
	                </TabsTrigger>

                <TabsTrigger value="games" className="text-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-indian-cream data-[state=active]:to-white data-[state=active]:border-b-2 data-[state=active]:border-indian-saffron">
                  <Gamepad2 className="w-5 h-5 mr-2" />
                  Games
                </TabsTrigger>
              </TabsList>

	              <TabsContent value="lessons">
	                {/* Flattened Tab Structure - Single Level */}
                <Tabs value={activeLessonTab} onValueChange={handleLessonTabChange} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 bg-gradient-to-br from-spiritual-50 to-white border border-spiritual-200 p-1 rounded-md">
                    <TabsTrigger value="philosophy" className="text-xs md:text-sm data-[state=active]:bg-gradient-to-br data-[state=active]:from-indian-cream data-[state=active]:to-white data-[state=active]:border-b-2 data-[state=active]:border-indian-saffron px-1 md:px-3">
                      <span className="hidden md:inline">Philosophy</span>
                      <span className="md:hidden">Phil.</span>
                    </TabsTrigger>
                    <TabsTrigger value="holy-trinity" className="text-xs md:text-sm data-[state=active]:bg-gradient-to-br data-[state=active]:from-indian-cream data-[state=active]:to-white data-[state=active]:border-b-2 data-[state=active]:border-indian-saffron px-1 md:px-3">
                      <span className="hidden md:inline">Holy Trinity</span>
                      <span className="md:hidden">Trinity</span>
                    </TabsTrigger>
                    <TabsTrigger value="deities" className="text-xs md:text-sm data-[state=active]:bg-gradient-to-br data-[state=active]:from-indian-cream data-[state=active]:to-white data-[state=active]:border-b-2 data-[state=active]:border-indian-saffron px-1 md:px-3">
                      <span className="hidden md:inline">Deities/Rishis</span>
                      <span className="md:hidden">Deities</span>
                    </TabsTrigger>
                    <TabsTrigger value="scriptures" className="text-xs md:text-sm data-[state=active]:bg-gradient-to-br data-[state=active]:from-indian-cream data-[state=active]:to-white data-[state=active]:border-b-2 data-[state=active]:border-indian-saffron px-1 md:px-3">
                      <span className="hidden md:inline">Scriptures</span>
                      <span className="md:hidden">Script.</span>
                    </TabsTrigger>
                    <TabsTrigger value="practices" className="text-xs md:text-sm data-[state=active]:bg-gradient-to-br data-[state=active]:from-indian-cream data-[state=active]:to-white data-[state=active]:border-b-2 data-[state=active]:border-indian-saffron px-1 md:px-3">
                      <span className="hidden md:inline">Practices/Moral Lessons</span>
                      <span className="md:hidden">Practice</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="philosophy">
                    <div className="space-y-8">
                      {lessonsData
                        .filter(lessonGroup => lessonGroup.topicId === 'hindu-philosophy')
                        .map((lessonGroup) => (
                          <div key={lessonGroup.topicId} className="mb-10">
                            <h2 className="text-2xl font-heading font-semibold mb-5">{lessonGroup.topicName}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {lessonGroup.lessons.map((lesson) => (
                                <LessonCard
                                  key={lesson.id}
                                  lesson={lesson}
                                  topicId={lessonGroup.topicId}
                                  isComplete={isLessonComplete(lessonGroup.topicId, lesson.id)}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="holy-trinity">
                    <div className="space-y-8">
                      {lessonsData
                        .filter(lessonGroup => lessonGroup.topicId === 'holy-trinity')
                        .map((lessonGroup) => (
                          <div key={lessonGroup.topicId} className="mb-10">
                            <h2 className="text-2xl font-heading font-semibold mb-5">{lessonGroup.topicName}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {lessonGroup.lessons.map((lesson) => (
                                <LessonCard
                                  key={lesson.id}
                                  lesson={lesson}
                                  topicId={lessonGroup.topicId}
                                  isComplete={isLessonComplete(lessonGroup.topicId, lesson.id)}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="deities">
                    <div className="space-y-8">
                      {lessonsData
                        .filter(lessonGroup => lessonGroup.topicId === 'deities')
                        .map((lessonGroup) => (
                          <div key={lessonGroup.topicId} className="mb-10">
                            <h2 className="text-2xl font-heading font-semibold mb-5">{lessonGroup.topicName}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {lessonGroup.lessons.map((lesson) => (
                                <LessonCard
                                  key={lesson.id}
                                  lesson={lesson}
                                  topicId={lessonGroup.topicId}
                                  isComplete={isLessonComplete(lessonGroup.topicId, lesson.id)}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="scriptures">
                    <div className="space-y-8">
                      {lessonsData
                        .filter(lessonGroup => lessonGroup.topicId === 'scriptures')
                        .map((lessonGroup) => (
                          <div key={lessonGroup.topicId} className="mb-10">
                            <h2 className="text-2xl font-heading font-semibold mb-5">{lessonGroup.topicName}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {lessonGroup.lessons.map((lesson) => (
                                <LessonCard
                                  key={lesson.id}
                                  lesson={lesson}
                                  topicId={lessonGroup.topicId}
                                  isComplete={isLessonComplete(lessonGroup.topicId, lesson.id)}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="practices">
                    <div className="space-y-8">
                      {lessonsData
                        .filter(lessonGroup => lessonGroup.topicId === 'practices')
                        .map((lessonGroup) => (
                          <div key={lessonGroup.topicId} className="mb-10">
                            <h2 className="text-2xl font-heading font-semibold mb-5">{lessonGroup.topicName}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {lessonGroup.lessons.map((lesson) => (
                                <LessonCard
                                  key={lesson.id}
                                  lesson={lesson}
                                  topicId={lessonGroup.topicId}
                                  isComplete={isLessonComplete(lessonGroup.topicId, lesson.id)}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </TabsContent>

	              {/* Mantras content */}
	              <TabsContent value="mantras">
	                <div className="space-y-8">
	                  {import.meta.env.DEV && (
	                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
	                      <strong>Development Note:</strong> Additional mantras and tools are still being refined. In production, only completed mantras are shown.
	                    </div>
	                  )}
	                  <p className="text-lg">
	                    Mantras are sacred sound formulas that have spiritual and psychological effects.
	                  </p>

                    {/* Nested Tabs for Mantra Categories */}
                    <Tabs defaultValue="vedic-shanti" className="w-full">
                      <TabsList className={`grid w-full grid-cols-1 ${import.meta.env.DEV ? 'md:grid-cols-3' : 'md:grid-cols-1'} mb-8 bg-gradient-to-br from-spiritual-50 to-white border border-spiritual-200 p-1 rounded-md`}>
                        <TabsTrigger value="vedic-shanti" className="text-sm md:text-base data-[state=active]:bg-gradient-to-br data-[state=active]:from-indian-cream data-[state=active]:to-white data-[state=active]:border-b-2 data-[state=active]:border-indian-saffron">
                          Vedic Shanti Mantras
                        </TabsTrigger>
                        {import.meta.env.DEV && (
                          <TabsTrigger value="bhagavad-gita" className="text-sm md:text-base data-[state=active]:bg-gradient-to-br data-[state=active]:from-indian-cream data-[state=active]:to-white data-[state=active]:border-b-2 data-[state=active]:border-indian-saffron">
                            Bhagavad Gita
                          </TabsTrigger>
                        )}
                        {import.meta.env.DEV && (
                          <TabsTrigger value="devi-mahatmyam" className="text-sm md:text-base data-[state=active]:bg-gradient-to-br data-[state=active]:from-indian-cream data-[state=active]:to-white data-[state=active]:border-b-2 data-[state=active]:border-indian-saffron">
                            Devi Mahatmyam
                          </TabsTrigger>
                        )}
                      </TabsList>

                      <TabsContent value="vedic-shanti">
                        <div className="space-y-6">
                          <h3 className="text-2xl font-heading font-semibold mb-4">Vedic Shanti Mantras</h3>
                          <p className="text-gray-600 mb-6">
                            Peace mantras from the Vedas and Upanishads that invoke harmony and protection. Click on any mantra to learn its meaning and practice chanting with synchronized audio!
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {mantras.map((mantra) => (
                              <Card
                                key={mantra.id}
                                className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/50 cursor-pointer hover:shadow-lg hover:border-indian-saffron hover:scale-[1.02] transition-all duration-300 group"
                                onClick={() => setSelectedMantra(mantra)}
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                      <h3 className="text-lg font-heading font-semibold text-gray-800 group-hover:text-indian-saffron transition-colors">
                                        {mantra.title}
                                      </h3>
                                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                        {mantra.description}
                                      </p>
                                    </div>
                                    <Expand className="w-5 h-5 text-gray-400 group-hover:text-indian-saffron transition-colors flex-shrink-0 mt-1" />
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>

                          {/* Vedic Suktams Section */}
                          <div className="mt-12 pt-8 border-t border-indian-saffron/20">
                            <h3 className="text-2xl font-heading font-semibold mb-4">Vedic Suktams</h3>
                            <p className="text-gray-600 mb-6">
                              Complete collections of Vedic hymns. Each suktam contains multiple mantras that are traditionally chanted together. Click to explore all mantras within each suktam.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {suktams.map((suktam) => (
                                <Card
                                  key={suktam.id}
                                  className="bg-gradient-to-br from-spiritual-50 to-white border-2 border-spiritual-300 cursor-pointer hover:shadow-lg hover:border-spiritual-500 hover:scale-[1.02] transition-all duration-300 group"
                                  onClick={() => setSelectedSuktam(suktam)}
                                >
                                  <CardContent className="p-4">
                                    <div className="flex items-start justify-between gap-2">
                                      <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-heading font-semibold text-gray-800 group-hover:text-spiritual-600 transition-colors">
                                          {suktam.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                          {suktam.description}
                                        </p>
                                        <p className="text-xs text-spiritual-600 mt-2 font-medium">
                                          {suktam.mantras.length} Mantras
                                        </p>
                                      </div>
                                      <Expand className="w-5 h-5 text-gray-400 group-hover:text-spiritual-500 transition-colors flex-shrink-0 mt-1" />
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                        </div>
	                      </TabsContent>
	
	                      {import.meta.env.DEV && (
	                      <TabsContent value="bhagavad-gita">
                        <div className="space-y-6">
                          <h3 className="text-2xl font-heading font-semibold mb-4">Bhagavad Gita</h3>
                          <p className="text-gray-600 mb-6">
                            Sacred verses and mantras from the Bhagavad Gita, the divine dialogue between Lord Krishna and Arjuna.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Gita Dhyanam - Invocation */}
                            <Link to="/learn/bhagavad-gita/gita-dhyanam">
                              <Card className="bg-gradient-to-br from-spiritual-100 to-indian-cream border-2 border-spiritual-400 pop-shadow-card hover:shadow-lg transition-all duration-300 cursor-pointer">
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="text-lg font-heading font-semibold text-spiritual-700">
                                      Gita Dhyanam
                                    </h4>
                                    <ExternalLink className="w-4 h-4 text-gray-400" />
                                  </div>
                                  <p className="text-sm text-gray-600 mb-3">Invocation to the Gita</p>
                                  <p className="text-xs text-gray-500 mb-3">
                                    9 verses
                                  </p>
                                  <div className="text-xs text-gray-500 italic">
                                    Meditative verses recited before studying the Gita
                                  </div>
                                </CardContent>
                              </Card>
                            </Link>

                            {[
                              { chapter: 1, title: "Arjuna's Dilemma", verses: 47 },
                              { chapter: 2, title: "The Yoga of Knowledge", verses: 72 },
                              { chapter: 3, title: "The Yoga of Action", verses: 43 },
                              { chapter: 4, title: "The Yoga of Divine Knowledge", verses: 42 },
                              { chapter: 5, title: "The Yoga of Renunciation", verses: 29 },
                              { chapter: 6, title: "The Yoga of Meditation", verses: 47 },
                              { chapter: 7, title: "The Yoga of Divine Knowledge", verses: 30 },
                              { chapter: 8, title: "The Yoga of the Imperishable Brahman", verses: 28 },
                              { chapter: 9, title: "The Yoga of Royal Knowledge", verses: 34 },
                              { chapter: 10, title: "The Yoga of Divine Manifestations", verses: 42 },
                              { chapter: 11, title: "The Yoga of the Universal Form", verses: 55 },
                              { chapter: 12, title: "The Yoga of Devotion", verses: 20 },
                              { chapter: 13, title: "The Yoga of the Field and Knower", verses: 35 },
                              { chapter: 14, title: "The Yoga of the Three Gunas", verses: 27 },
                              { chapter: 15, title: "The Yoga of the Supreme Person", verses: 20 },
                              { chapter: 16, title: "The Yoga of Divine and Demonic Natures", verses: 24 },
                              { chapter: 17, title: "The Yoga of Threefold Faith", verses: 28 },
                              { chapter: 18, title: "The Yoga of Liberation through Renunciation", verses: 78 }
                            ].map((chapterInfo) => {
                              return (
                                <Link key={chapterInfo.chapter} to={`/learn/bhagavad-gita/chapter/${chapterInfo.chapter}`}>
                                  <Card className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/40 pop-shadow-card hover:shadow-lg transition-all duration-300 cursor-pointer">
                                    <CardContent className="p-4">
                                      <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-lg font-heading font-semibold">
                                          Chapter {chapterInfo.chapter}
                                        </h4>
                                        <ExternalLink className="w-4 h-4 text-gray-400" />
                                      </div>
                                      <p className="text-sm text-gray-600 mb-3">{chapterInfo.title}</p>
                                      <p className="text-xs text-gray-500 mb-3">
                                        {chapterInfo.verses} verses
                                      </p>
                                      <div className="text-xs text-gray-500 italic">
                                        Click to view all verses with Sanskrit text and transliterations
                                      </div>
                                    </CardContent>
                                  </Card>
                                </Link>
                              );
                            })}

                            {/* Gita Mahatmyam - Glory of the Gita */}
                            <Link to="/learn/bhagavad-gita/gita-mahatmyam">
                              <Card className="bg-gradient-to-br from-spiritual-100 to-indian-cream border-2 border-spiritual-400 pop-shadow-card hover:shadow-lg transition-all duration-300 cursor-pointer">
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="text-lg font-heading font-semibold text-spiritual-700">
                                      Gita Mahatmyam
                                    </h4>
                                    <ExternalLink className="w-4 h-4 text-gray-400" />
                                  </div>
                                  <p className="text-sm text-gray-600 mb-3">Glory of the Gita</p>
                                  <p className="text-xs text-gray-500 mb-3">
                                    7 verses
                                  </p>
                                  <div className="text-xs text-gray-500 italic">
                                    Verses extolling the greatness and benefits of studying the Gita
                                  </div>
                                </CardContent>
                              </Card>
                            </Link>
                          </div>
                        </div>
                      </TabsContent>
                      )}

                      {import.meta.env.DEV && (
                      <TabsContent value="devi-mahatmyam">
                        <div className="space-y-6">
                          <h3 className="text-2xl font-heading font-semibold mb-4">Devi Mahatmyam</h3>
                          <p className="text-gray-600 mb-6">
                            Sacred hymns and mantras from the Devi Mahatmyam, celebrating the Divine Mother.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                              { chapter: 1, title: "The Slaying of Madhu and Kaitabha", verses: 88 },
                              { chapter: 2, title: "The Slaying of Mahishasura", verses: 55 },
                              { chapter: 3, title: "The Slaying of Mahishasura (continued)", verses: 54 },
                              { chapter: 4, title: "The Slaying of Mahishasura (concluded)", verses: 44 },
                              { chapter: 5, title: "Devi's Conversation with the Messenger", verses: 57 },
                              { chapter: 6, title: "The Slaying of Dhumralochana", verses: 33 },
                              { chapter: 7, title: "The Slaying of Chanda and Munda", verses: 27 },
                              { chapter: 8, title: "The Slaying of Raktabija", verses: 62 },
                              { chapter: 9, title: "The Slaying of Nishumbha", verses: 52 },
                              { chapter: 10, title: "The Slaying of Shumbha", verses: 31 },
                              { chapter: 11, title: "The Hymn of Praise by the Devas", verses: 55 },
                              { chapter: 12, title: "The Boons Granted by Devi", verses: 51 },
                              { chapter: 13, title: "The Slaying of the Two Demons", verses: 25 }
                            ].map((chapterInfo) => {
                              return (
                                <Link key={chapterInfo.chapter} to={`/learn/devi-mahatmyam/chapter/${chapterInfo.chapter}`}>
                                  <Card className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/40 pop-shadow-card hover:shadow-lg transition-all duration-300 cursor-pointer">
                                    <CardContent className="p-4">
                                      <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-lg font-heading font-semibold">
                                          Chapter {chapterInfo.chapter}
                                        </h4>
                                        <ExternalLink className="w-4 h-4 text-gray-400" />
                                      </div>
                                      <p className="text-sm text-gray-600 mb-3">{chapterInfo.title}</p>
                                      <p className="text-xs text-gray-500 mb-3">
                                        {chapterInfo.verses} verses
                                      </p>
                                      <div className="text-xs text-gray-500 italic">
                                        Click to view all verses with Sanskrit text and transliterations
                                      </div>
                                    </CardContent>
                                  </Card>
                                </Link>
                              );
                            })}
	                          </div>
	                        </div>
	                      </TabsContent>
	                      )}
	                    </Tabs>
	                  </div>
	                </TabsContent>




              <TabsContent value="games">
                <div className="space-y-8">
                  <p className="text-lg">
                    Explore our collection of interactive games designed to make learning about Hindu philosophy and culture fun and engaging.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron pop-shadow-card hover:shadow-lg transition-all duration-300">
                      <Link to="/learn/games/guess-picture">
                        <CardContent className="p-6 text-center">
                          <div className="flex items-center justify-center w-12 h-12 bg-spiritual-100 rounded-full mb-4 mx-auto">
                            <Gamepad2 className="w-6 h-6 text-spiritual-500" />
                          </div>
                          <h3 className="text-lg font-heading font-semibold mb-2">Guess the Picture</h3>
                          <p className="text-gray-600 text-sm">Test your knowledge by identifying Hindu deities and symbols in pictures.</p>
                        </CardContent>
                      </Link>
                    </Card>

                    <Card className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron pop-shadow-card hover:shadow-lg transition-all duration-300">
                      <Link to="/learn/games/wordle">
                        <CardContent className="p-6 text-center">
                          <div className="flex items-center justify-center w-12 h-12 bg-spiritual-100 rounded-full mb-4 mx-auto">
                            <BookOpen className="w-6 h-6 text-spiritual-500" />
                          </div>
                          <h3 className="text-lg font-heading font-semibold mb-2">Master's Words</h3>
                          <p className="text-gray-600 text-sm">A word puzzle game featuring spiritual terms and concepts.</p>
                        </CardContent>
                      </Link>
                    </Card>

                    <Card className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron pop-shadow-card hover:shadow-lg transition-all duration-300">
                      <Link to="/learn/games/quotes">
                        <CardContent className="p-6 text-center">
                          <div className="flex items-center justify-center w-12 h-12 bg-spiritual-100 rounded-full mb-4 mx-auto">
                            <MessageSquare className="w-6 h-6 text-spiritual-500" />
                          </div>
                          <h3 className="text-lg font-heading font-semibold mb-2">Wisdom Quotes</h3>
                          <p className="text-gray-600 text-sm">Arrange words to form inspiring quotes from spiritual masters.</p>
                        </CardContent>
                      </Link>
                    </Card>

                    <Card className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron pop-shadow-card hover:shadow-lg transition-all duration-300">
                      <Link to="/learn/games/word-scramble">
                        <CardContent className="p-6 text-center">
                          <div className="flex items-center justify-center w-12 h-12 bg-spiritual-100 rounded-full mb-4 mx-auto">
                            <PenTool className="w-6 h-6 text-spiritual-500" />
                          </div>
                          <h3 className="text-lg font-heading font-semibold mb-2">Word Scramble</h3>
                          <p className="text-gray-600 text-sm">Unscramble letters to form words related to Hindu philosophy.</p>
                        </CardContent>
                      </Link>
                    </Card>

                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>



          {/* Restoring the cards that were removed */}
          <div className="mt-16">
            <SectionHeader
              title="Interactive Learning"
              subtitle="Engage with our community learning tools"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

              <Card className="border-spiritual-200 bg-gradient-to-br from-spiritual-50 to-white pop-shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-spiritual-100 rounded-full mb-4">
                    <PenTool className="w-6 h-6 text-spiritual-500" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-3">Interactive Quizzes</h3>
                  <p className="text-gray-600 mb-4">Test your knowledge with our collection of quizzes on various topics in Hinduism.</p>

                  <Button href="/learn/quizzes" variant="outline" size="sm">
                    Take Quizzes
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-spiritual-200 bg-gradient-to-br from-spiritual-50 to-white pop-shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-spiritual-100 rounded-full mb-4">
                    <Lightbulb className="w-6 h-6 text-spiritual-500" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-3">Submit Questions</h3>
                  <p className="text-gray-600 mb-4">Contribute to our question bank by creating and submitting your own questions.</p>

                  <Button href="/learn/submit" variant="outline" size="sm">
                    Submit Questions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Mantra Full-Page Modal */}
      {selectedMantra && (
        <MantraModal
          mantra={selectedMantra}
          onClose={() => setSelectedMantra(null)}
          syllables={getMantraSyllables(selectedMantra.id)}
          transliterationSyllables={getTransliterationSyllables(selectedMantra)}
        />
      )}

      {/* Suktam Full-Page Modal */}
      {selectedSuktam && (
        <SuktamModal
          suktam={selectedSuktam}
          onClose={() => setSelectedSuktam(null)}
        />
      )}
    </PageLayout>
  );
};

export default LearnPage;


