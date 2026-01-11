import React, { useState } from 'react';
import { Award, Lock, ChevronRight } from 'lucide-react';
import { Achievement, ACHIEVEMENTS } from '@/hooks/useLearningProgress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface AchievementsBadgeProps {
  unlockedAchievements: Achievement[];
  className?: string;
}

const AchievementsBadge: React.FC<AchievementsBadgeProps> = ({
  unlockedAchievements,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const unlockedCount = unlockedAchievements.length;
  const totalCount = ACHIEVEMENTS.length;

  const isUnlocked = (id: string) => 
    unlockedAchievements.some(a => a.id === id);

  const getUnlockedDate = (id: string) => {
    const achievement = unlockedAchievements.find(a => a.id === id);
    if (achievement?.unlockedAt) {
      return new Date(achievement.unlockedAt).toLocaleDateString();
    }
    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className={cn(
            'inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition-all',
            'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200',
            'hover:from-amber-100 hover:to-yellow-100 hover:border-amber-300',
            className
          )}
        >
          <Award className="w-5 h-5 text-amber-500" />
          <span className="font-medium text-amber-800">
            {unlockedCount}/{totalCount}
          </span>
          <ChevronRight className="w-4 h-4 text-amber-400" />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            Achievements
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-3">
          {ACHIEVEMENTS.map((achievement) => {
            const unlocked = isUnlocked(achievement.id);
            const unlockedDate = getUnlockedDate(achievement.id);

            return (
              <div
                key={achievement.id}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-lg border transition-all',
                  unlocked
                    ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200'
                    : 'bg-gray-50 border-gray-200 opacity-60'
                )}
              >
                <div
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center text-2xl',
                    unlocked
                      ? 'bg-gradient-to-br from-amber-400 to-yellow-500'
                      : 'bg-gray-200'
                  )}
                >
                  {unlocked ? achievement.icon : <Lock className="w-5 h-5 text-gray-400" />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className={cn(
                    'font-medium',
                    unlocked ? 'text-gray-900' : 'text-gray-500'
                  )}>
                    {achievement.name}
                  </h4>
                  <p className={cn(
                    'text-sm',
                    unlocked ? 'text-gray-600' : 'text-gray-400'
                  )}>
                    {achievement.description}
                  </p>
                  {unlockedDate && (
                    <p className="text-xs text-amber-600 mt-1">
                      Unlocked {unlockedDate}
                    </p>
                  )}
                </div>

                {unlocked && (
                  <div className="text-green-500">
                    ✓
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round((unlockedCount / totalCount) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-500"
              style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AchievementsBadge;

