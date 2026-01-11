import React from 'react';

interface ReadingProgressBarProps {
  percent: number;
  showLabel?: boolean;
  className?: string;
  variant?: 'fixed' | 'inline';
}

const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({
  percent,
  showLabel = false,
  className = '',
  variant = 'fixed',
}) => {
  const clampedPercent = Math.min(Math.max(percent, 0), 100);
  const isComplete = clampedPercent >= 95;

  if (variant === 'fixed') {
    return (
      <div className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
        {/* Progress bar */}
        <div className="h-1 bg-gray-200/50 backdrop-blur-sm">
          <div
            className={`h-full transition-all duration-300 ease-out ${
              isComplete 
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' 
                : 'bg-gradient-to-r from-spiritual-600 to-indian-saffron'
            }`}
            style={{ width: `${clampedPercent}%` }}
          />
        </div>
        
        {/* Optional label */}
        {showLabel && (
          <div className="absolute right-2 top-1.5 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs font-medium shadow-sm border border-gray-200">
            {isComplete ? (
              <span className="text-emerald-600 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Complete
              </span>
            ) : (
              <span className="text-gray-600">{clampedPercent}%</span>
            )}
          </div>
        )}
      </div>
    );
  }

  // Inline variant for cards/lists
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              isComplete 
                ? 'bg-emerald-500' 
                : 'bg-gradient-to-r from-spiritual-500 to-indian-saffron'
            }`}
            style={{ width: `${clampedPercent}%` }}
          />
        </div>
        {showLabel && (
          <span className={`text-xs font-medium min-w-[3rem] text-right ${
            isComplete ? 'text-emerald-600' : 'text-gray-500'
          }`}>
            {isComplete ? '✓ Done' : `${clampedPercent}%`}
          </span>
        )}
      </div>
    </div>
  );
};

export default ReadingProgressBar;

