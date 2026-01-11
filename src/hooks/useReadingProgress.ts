import { useState, useEffect, useCallback, useRef } from 'react';

export interface ReadingProgress {
  lectureId: string;
  scrollPercent: number;
  lastReadAt: number;
  completed: boolean;
}

export interface ReadingProgressState {
  progress: Record<string, ReadingProgress>;
  recentlyRead: string[]; // List of lecture IDs, most recent first
}

const STORAGE_KEY = 'reading-progress';
const MAX_RECENT = 10;

const defaultState: ReadingProgressState = {
  progress: {},
  recentlyRead: [],
};

export const useReadingProgress = (lectureId?: string) => {
  const [state, setState] = useState<ReadingProgressState>(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentScrollPercent, setCurrentScrollPercent] = useState(0);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState({ ...defaultState, ...parsed });
      }
    } catch (error) {
      console.error('Error loading reading progress:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever state changes (debounced)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isLoaded]);

  // Calculate scroll progress
  const calculateScrollPercent = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const percent = docHeight > 0 ? Math.min(Math.round((scrollTop / docHeight) * 100), 100) : 0;
    return percent;
  }, []);

  // Update progress for current lecture (debounced to avoid too many writes)
  const updateProgress = useCallback((scrollPercent: number) => {
    if (!lectureId) return;
    
    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Debounce the save to localStorage
    saveTimeoutRef.current = setTimeout(() => {
      setState(prev => {
        const existingProgress = prev.progress[lectureId];
        const isCompleted = scrollPercent >= 95;
        
        // Only update if progress has increased or it's being marked complete
        const shouldUpdate = !existingProgress || 
          scrollPercent > existingProgress.scrollPercent ||
          (isCompleted && !existingProgress.completed);
        
        if (!shouldUpdate) return prev;

        // Update recently read list
        const recentlyRead = [
          lectureId,
          ...prev.recentlyRead.filter(id => id !== lectureId)
        ].slice(0, MAX_RECENT);

        return {
          ...prev,
          progress: {
            ...prev.progress,
            [lectureId]: {
              lectureId,
              scrollPercent: Math.max(scrollPercent, existingProgress?.scrollPercent || 0),
              lastReadAt: Date.now(),
              completed: isCompleted || existingProgress?.completed || false,
            }
          },
          recentlyRead,
        };
      });
    }, 500); // Debounce for 500ms
  }, [lectureId]);

  // Track scroll position for current lecture
  useEffect(() => {
    if (!lectureId || !isLoaded) return;

    const handleScroll = () => {
      const percent = calculateScrollPercent();
      setCurrentScrollPercent(percent);
      updateProgress(percent);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [lectureId, isLoaded, calculateScrollPercent, updateProgress]);

  // Get progress for a specific lecture
  const getProgress = useCallback((id: string): ReadingProgress | null => {
    return state.progress[id] || null;
  }, [state.progress]);

  // Get all progress entries sorted by last read
  const getAllProgress = useCallback(() => {
    return Object.values(state.progress).sort((a, b) => b.lastReadAt - a.lastReadAt);
  }, [state.progress]);

  // Mark lecture as complete
  const markComplete = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        [id]: {
          ...prev.progress[id],
          lectureId: id,
          scrollPercent: 100,
          lastReadAt: Date.now(),
          completed: true,
        }
      }
    }));
  }, []);

  // Get recently read lectures
  const getRecentlyRead = useCallback(() => {
    return state.recentlyRead;
  }, [state.recentlyRead]);

  return {
    currentScrollPercent,
    isLoaded,
    getProgress,
    getAllProgress,
    markComplete,
    getRecentlyRead,
    state,
  };
};

