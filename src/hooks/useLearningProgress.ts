import { useState, useEffect, useCallback } from 'react';

// Types
export interface LessonProgress {
  lessonId: string;
  topicId: string;
  completedAt: number;
  quizScore?: number;
}

export interface LearningStreak {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string; // YYYY-MM-DD format
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: number;
}

export interface LessonBookmark {
  lessonId: string;
  topicId: string;
  savedAt: number;
  notes?: string;
}

export interface ReadingPreferences {
  fontSize: 'small' | 'medium' | 'large';
  lineSpacing: 'compact' | 'normal' | 'relaxed';
  theme: 'default' | 'sepia' | 'dark';
}

export interface LearningProgressState {
  completedLessons: LessonProgress[];
  streak: LearningStreak;
  achievements: Achievement[];
  bookmarks: LessonBookmark[];
  readingPreferences: ReadingPreferences;
}

const STORAGE_KEY = 'learning-progress';

const defaultState: LearningProgressState = {
  completedLessons: [],
  streak: {
    currentStreak: 0,
    longestStreak: 0,
    lastActivityDate: ''
  },
  achievements: [],
  bookmarks: [],
  readingPreferences: {
    fontSize: 'medium',
    lineSpacing: 'normal',
    theme: 'default'
  }
};

// Achievement definitions
export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-lesson', name: 'First Steps', description: 'Complete your first lesson', icon: '🎯' },
  { id: 'philosophy-explorer', name: 'Philosophy Explorer', description: 'Complete all philosophy lessons', icon: '📚' },
  { id: 'quiz-master', name: 'Quiz Master', description: 'Score 100% on 5 quizzes', icon: '🏆' },
  { id: 'week-streak', name: 'Dedicated Learner', description: 'Maintain a 7-day learning streak', icon: '🔥' },
  { id: 'bookworm', name: 'Bookworm', description: 'Bookmark 10 lessons', icon: '📖' },
  { id: 'trinity-complete', name: 'Holy Trinity', description: 'Complete all Holy Trinity lessons', icon: '🙏' },
  { id: 'deities-complete', name: 'Divine Knowledge', description: 'Complete all Deities lessons', icon: '✨' },
  { id: 'scriptures-complete', name: 'Scripture Scholar', description: 'Complete all Scriptures lessons', icon: '📜' },
  { id: 'practices-complete', name: 'Practitioner', description: 'Complete all Practices lessons', icon: '🧘' },
  { id: 'all-complete', name: 'Enlightened', description: 'Complete all available lessons', icon: '🌟' }
];

export const useLearningProgress = () => {
  const [state, setState] = useState<LearningProgressState>(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState({ ...defaultState, ...parsed });
      }
    } catch (error) {
      console.error('Error loading learning progress:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isLoaded]);

  // Helper to get today's date string
  const getTodayString = () => new Date().toISOString().split('T')[0];

  // Update streak based on activity
  const updateStreak = useCallback(() => {
    const today = getTodayString();
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    setState(prev => {
      const { lastActivityDate, currentStreak, longestStreak } = prev.streak;
      
      if (lastActivityDate === today) {
        return prev; // Already updated today
      }
      
      let newStreak = 1;
      if (lastActivityDate === yesterday) {
        newStreak = currentStreak + 1;
      }
      
      return {
        ...prev,
        streak: {
          currentStreak: newStreak,
          longestStreak: Math.max(longestStreak, newStreak),
          lastActivityDate: today
        }
      };
    });
  }, []);

  // Mark lesson as complete
  const completeLesson = useCallback((topicId: string, lessonId: string, quizScore?: number) => {
    updateStreak();
    
    setState(prev => {
      const exists = prev.completedLessons.some(
        l => l.lessonId === lessonId && l.topicId === topicId
      );
      
      if (exists) {
        // Update quiz score if provided
        if (quizScore !== undefined) {
          return {
            ...prev,
            completedLessons: prev.completedLessons.map(l =>
              l.lessonId === lessonId && l.topicId === topicId
                ? { ...l, quizScore: Math.max(l.quizScore || 0, quizScore) }
                : l
            )
          };
        }
        return prev;
      }
      
      return {
        ...prev,
        completedLessons: [
          ...prev.completedLessons,
          { lessonId, topicId, completedAt: Date.now(), quizScore }
        ]
      };
    });
  }, [updateStreak]);

  // Check if lesson is completed
  const isLessonComplete = useCallback((topicId: string, lessonId: string) => {
    return state.completedLessons.some(
      l => l.lessonId === lessonId && l.topicId === topicId
    );
  }, [state.completedLessons]);

  // Get completion percentage for a topic
  const getTopicProgress = useCallback((topicId: string, totalLessons: number) => {
    const completed = state.completedLessons.filter(l => l.topicId === topicId).length;
    return totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
  }, [state.completedLessons]);

  // Bookmark management
  const toggleBookmark = useCallback((topicId: string, lessonId: string) => {
    setState(prev => {
      const exists = prev.bookmarks.some(
        b => b.lessonId === lessonId && b.topicId === topicId
      );

      if (exists) {
        return {
          ...prev,
          bookmarks: prev.bookmarks.filter(
            b => !(b.lessonId === lessonId && b.topicId === topicId)
          )
        };
      }

      return {
        ...prev,
        bookmarks: [
          ...prev.bookmarks,
          { lessonId, topicId, savedAt: Date.now() }
        ]
      };
    });
  }, []);

  const isBookmarked = useCallback((topicId: string, lessonId: string) => {
    return state.bookmarks.some(
      b => b.lessonId === lessonId && b.topicId === topicId
    );
  }, [state.bookmarks]);

  const updateBookmarkNotes = useCallback((topicId: string, lessonId: string, notes: string) => {
    setState(prev => ({
      ...prev,
      bookmarks: prev.bookmarks.map(b =>
        b.lessonId === lessonId && b.topicId === topicId
          ? { ...b, notes }
          : b
      )
    }));
  }, []);

  // Reading preferences
  const updateReadingPreferences = useCallback((prefs: Partial<ReadingPreferences>) => {
    setState(prev => ({
      ...prev,
      readingPreferences: { ...prev.readingPreferences, ...prefs }
    }));
  }, []);

  // Unlock achievement
  const unlockAchievement = useCallback((achievementId: string) => {
    setState(prev => {
      const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
      if (!achievement) return prev;

      const exists = prev.achievements.some(a => a.id === achievementId);
      if (exists) return prev;

      return {
        ...prev,
        achievements: [
          ...prev.achievements,
          { ...achievement, unlockedAt: Date.now() }
        ]
      };
    });
  }, []);

  // Get last viewed lesson for "continue learning"
  const getLastLesson = useCallback(() => {
    if (state.completedLessons.length === 0) return null;
    const sorted = [...state.completedLessons].sort((a, b) => b.completedAt - a.completedAt);
    return sorted[0];
  }, [state.completedLessons]);

  return {
    state,
    isLoaded,
    completeLesson,
    isLessonComplete,
    getTopicProgress,
    updateStreak,
    toggleBookmark,
    isBookmarked,
    updateBookmarkNotes,
    updateReadingPreferences,
    unlockAchievement,
    getLastLesson
  };
};

