import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Circle, BookOpen, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Lesson {
  id: string;
  title: string;
  description: string;
}

interface TopicProgressCardProps {
  topicId: string;
  topicName: string;
  lessons: Lesson[];
  completedLessonIds: string[];
  icon?: React.ReactNode;
  color?: string;
  className?: string;
}

const TopicProgressCard: React.FC<TopicProgressCardProps> = ({
  topicId,
  topicName,
  lessons,
  completedLessonIds,
  icon,
  color = 'indian-saffron',
  className
}) => {
  const completedCount = lessons.filter(l => completedLessonIds.includes(l.id)).length;
  const totalCount = lessons.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const isComplete = completedCount === totalCount && totalCount > 0;

  // Color mappings for different topics
  const colorMap: Record<string, { bg: string; border: string; accent: string; progress: string }> = {
    'philosophy': {
      bg: 'from-purple-50 to-indigo-50',
      border: 'border-purple-200',
      accent: 'text-purple-600',
      progress: 'from-purple-400 to-indigo-500'
    },
    'holy-trinity': {
      bg: 'from-amber-50 to-orange-50',
      border: 'border-amber-200',
      accent: 'text-amber-600',
      progress: 'from-amber-400 to-orange-500'
    },
    'deities': {
      bg: 'from-rose-50 to-pink-50',
      border: 'border-rose-200',
      accent: 'text-rose-600',
      progress: 'from-rose-400 to-pink-500'
    },
    'scriptures': {
      bg: 'from-emerald-50 to-teal-50',
      border: 'border-emerald-200',
      accent: 'text-emerald-600',
      progress: 'from-emerald-400 to-teal-500'
    },
    'practices': {
      bg: 'from-blue-50 to-cyan-50',
      border: 'border-blue-200',
      accent: 'text-blue-600',
      progress: 'from-blue-400 to-cyan-500'
    }
  };

  const colors = colorMap[topicId] || {
    bg: 'from-gray-50 to-slate-50',
    border: 'border-gray-200',
    accent: 'text-gray-600',
    progress: 'from-gray-400 to-slate-500'
  };

  return (
    <div
      className={cn(
        'rounded-xl border overflow-hidden transition-all hover:shadow-lg',
        `bg-gradient-to-br ${colors.bg}`,
        colors.border,
        className
      )}
    >
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {icon || <BookOpen className={cn('w-5 h-5', colors.accent)} />}
            <h3 className="font-semibold text-gray-900">{topicName}</h3>
          </div>
          {isComplete && (
            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              Complete!
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{completedCount} of {totalCount} lessons</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="h-2 bg-white/50 rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full bg-gradient-to-r transition-all duration-500',
                colors.progress
              )}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Lessons list */}
      <div className="border-t border-white/50 bg-white/30">
        {lessons.slice(0, 4).map((lesson) => {
          const isCompleted = completedLessonIds.includes(lesson.id);
          return (
            <Link
              key={lesson.id}
              to={`/learn/lessons/${topicId}/${lesson.id}`}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/50 transition-colors border-b border-white/30 last:border-b-0"
            >
              {isCompleted ? (
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-gray-300 flex-shrink-0" />
              )}
              <span className={cn(
                'flex-1 text-sm truncate',
                isCompleted ? 'text-gray-500' : 'text-gray-700'
              )}>
                {lesson.title}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
          );
        })}
        
        {lessons.length > 4 && (
          <Link
            to={`/learn#${topicId}`}
            className={cn(
              'block text-center py-2 text-sm font-medium hover:bg-white/50 transition-colors',
              colors.accent
            )}
          >
            View all {lessons.length} lessons →
          </Link>
        )}
      </div>
    </div>
  );
};

export default TopicProgressCard;

