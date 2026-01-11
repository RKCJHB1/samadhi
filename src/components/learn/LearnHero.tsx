import React from 'react';
import { Trophy, Info } from 'lucide-react';

interface LearnHeroProps {
  totalLessons: number;
  completedLessons: number;
  lastLesson?: { topicId: string; lessonId: string; title?: string } | null;
}

const LearnHero: React.FC<LearnHeroProps> = ({ totalLessons, completedLessons }) => {
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="bg-gradient-to-br from-indian-saffron/10 via-spiritual-50 to-indian-cream py-6">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-indian-saffron" />
                <span className="text-sm font-medium text-gray-600">Your Learning Progress</span>
              </div>
              <span className="text-lg font-bold text-indian-saffron">{progressPercent}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-indian-saffron to-orange-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 text-center">
              {completedLessons} of {totalLessons} lessons completed
            </p>
            <div className="flex items-start gap-2 mt-3 pt-3 border-t border-gray-200">
              <Info className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-400">
                Complete the quiz at the end of each lesson to mark it as done. Progress is saved locally in your browser.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnHero;

