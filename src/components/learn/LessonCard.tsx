import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Lesson {
  id: string;
  title: string;
  description: string;
  quiz?: any;
}

interface LessonCardProps {
  lesson: Lesson;
  topicId: string;
  isComplete?: boolean;
  className?: string;
}

// Topic-specific icons and colors
const topicConfig: Record<string, { icon: string; gradient: string; accent: string }> = {
  'hindu-philosophy': {
    icon: '🕉️',
    gradient: 'from-purple-50 to-indigo-50',
    accent: 'border-purple-200 hover:border-purple-400'
  },
  'holy-trinity': {
    icon: '🙏',
    gradient: 'from-amber-50 to-orange-50',
    accent: 'border-amber-200 hover:border-amber-400'
  },
  'deities': {
    icon: '✨',
    gradient: 'from-rose-50 to-pink-50',
    accent: 'border-rose-200 hover:border-rose-400'
  },
  'scriptures': {
    icon: '📜',
    gradient: 'from-emerald-50 to-teal-50',
    accent: 'border-emerald-200 hover:border-emerald-400'
  },
  'practices': {
    icon: '🧘',
    gradient: 'from-blue-50 to-cyan-50',
    accent: 'border-blue-200 hover:border-blue-400'
  }
};

const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  topicId,
  isComplete = false,
  className
}) => {
  const config = topicConfig[topicId] || {
    icon: '📖',
    gradient: 'from-gray-50 to-slate-50',
    accent: 'border-gray-200 hover:border-gray-400'
  };

  const hasQuiz = !!lesson.quiz;

  return (
    <div
      className={cn(
        'group relative rounded-xl border-2 overflow-hidden transition-all duration-300',
        'bg-gradient-to-br shadow-sm hover:shadow-lg',
        config.gradient,
        config.accent,
        isComplete && 'ring-2 ring-green-200 ring-offset-1',
        className
      )}
    >
      {/* Completed badge */}
      {isComplete && (
        <div className="absolute top-3 right-3 z-10">
          <div className="flex items-center gap-1 px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            <span>Done</span>
          </div>
        </div>
      )}

      <Link to={`/learn/lessons/${topicId}/${lesson.id}`} className="block p-5">
        {/* Icon and Title */}
        <div className={cn("flex items-start gap-3 mb-3", isComplete && "pr-16")}>
          <span className="text-2xl">{config.icon}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 group-hover:text-indian-saffron transition-colors line-clamp-2">
              {lesson.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {lesson.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/50">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              5 min
            </span>
            {hasQuiz && (
              <span className="px-2 py-0.5 bg-white/70 rounded text-spiritual-600">
                Has Quiz
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-sm font-medium text-indian-saffron opacity-0 group-hover:opacity-100 transition-opacity">
            Read <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LessonCard;

