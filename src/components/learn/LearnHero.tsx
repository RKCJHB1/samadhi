import React from 'react';
import { Trophy, Info, BookOpen, Gamepad2, Music, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface LearnHeroProps {
  totalLessons: number;
  completedLessons: number;
  totalGames?: number;
  totalMantras?: number;
  lastLesson?: { topicId: string; lessonId: string; title?: string } | null;
}

const LearnHero: React.FC<LearnHeroProps> = ({
  totalLessons,
  completedLessons,
  totalGames = 4,
  totalMantras = 15
}) => {
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="bg-gradient-to-br from-indian-saffron/10 via-spiritual-50 to-indian-cream py-6">
      <div className="container mx-auto px-4">
        {/* Welcome Section - Compact & Centered */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-1">
            Welcome to Your Learning Journey
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Explore Hindu philosophy, culture, and spirituality through interactive lessons, games, and mantras.
          </p>
        </div>

        {/* Quick Stats - Ultra Compact */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4 text-indian-saffron" />
            <span className="text-xs font-bold text-gray-900">{totalLessons}+ Lessons</span>
          </div>
          <div className="flex items-center gap-1">
            <Gamepad2 className="w-4 h-4 text-spiritual-500" />
            <span className="text-xs font-bold text-gray-900">{totalGames} Games</span>
          </div>
          <div className="flex items-center gap-1">
            <Music className="w-4 h-4 text-orange-600" />
            <span className="text-xs font-bold text-gray-900">{totalMantras}+ Mantras</span>
          </div>
        </div>

        {/* Progress Bar - Minimal */}
        <div className="flex items-center gap-2">
          <Trophy className="w-3 h-3 text-indian-saffron flex-shrink-0" />
          <div className="flex-1">
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indian-saffron to-orange-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <span className="text-xs font-bold text-indian-saffron whitespace-nowrap">{progressPercent}%</span>
        </div>
      </div>
    </div>
  );
};

export default LearnHero;

