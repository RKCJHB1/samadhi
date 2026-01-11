import React from 'react';
import { Flame, Trophy, Calendar } from 'lucide-react';
import { LearningStreak as StreakType } from '@/hooks/useLearningProgress';
import { cn } from '@/lib/utils';

interface LearningStreakProps {
  streak: StreakType;
  compact?: boolean;
  className?: string;
}

const LearningStreak: React.FC<LearningStreakProps> = ({
  streak,
  compact = false,
  className
}) => {
  const { currentStreak, longestStreak, lastActivityDate } = streak;
  
  const today = new Date().toISOString().split('T')[0];
  const isActiveToday = lastActivityDate === today;
  
  // Get streak "heat" level for styling
  const getStreakLevel = () => {
    if (currentStreak >= 30) return 'legendary';
    if (currentStreak >= 14) return 'hot';
    if (currentStreak >= 7) return 'warm';
    if (currentStreak >= 3) return 'building';
    return 'starting';
  };
  
  const streakLevel = getStreakLevel();
  
  const levelColors = {
    legendary: 'from-purple-500 to-pink-500',
    hot: 'from-orange-500 to-red-500',
    warm: 'from-yellow-500 to-orange-500',
    building: 'from-yellow-400 to-yellow-500',
    starting: 'from-gray-400 to-gray-500'
  };

  if (compact) {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium',
          currentStreak > 0
            ? `bg-gradient-to-r ${levelColors[streakLevel]} text-white`
            : 'bg-gray-100 text-gray-500',
          className
        )}
      >
        <Flame className={cn('w-4 h-4', currentStreak > 0 && 'animate-pulse')} />
        <span>{currentStreak} day{currentStreak !== 1 ? 's' : ''}</span>
      </div>
    );
  }

  return (
    <div className={cn('bg-white rounded-xl border border-gray-200 p-4', className)}>
      <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
        <Calendar className="w-4 h-4" />
        Learning Streak
      </h4>
      
      <div className="flex items-center justify-between">
        {/* Current Streak */}
        <div className="text-center">
          <div
            className={cn(
              'inline-flex items-center justify-center w-16 h-16 rounded-full mb-2',
              currentStreak > 0
                ? `bg-gradient-to-br ${levelColors[streakLevel]}`
                : 'bg-gray-100'
            )}
          >
            <Flame
              className={cn(
                'w-8 h-8',
                currentStreak > 0 ? 'text-white animate-pulse' : 'text-gray-400'
              )}
            />
          </div>
          <div className="text-2xl font-bold text-gray-900">{currentStreak}</div>
          <div className="text-xs text-gray-500">Current</div>
        </div>
        
        {/* Divider */}
        <div className="h-16 w-px bg-gray-200" />
        
        {/* Best Streak */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 mb-2">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{longestStreak}</div>
          <div className="text-xs text-gray-500">Best</div>
        </div>
      </div>
      
      {/* Status message */}
      <div className={cn(
        'mt-4 text-center text-sm py-2 rounded-lg',
        isActiveToday
          ? 'bg-green-50 text-green-700'
          : 'bg-amber-50 text-amber-700'
      )}>
        {isActiveToday ? (
          <span>🎉 You've learned today! Keep it up!</span>
        ) : currentStreak > 0 ? (
          <span>⚡ Learn today to keep your streak!</span>
        ) : (
          <span>📚 Start a lesson to begin your streak!</span>
        )}
      </div>
    </div>
  );
};

export default LearningStreak;

