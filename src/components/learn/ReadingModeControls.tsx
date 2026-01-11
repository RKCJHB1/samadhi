import React from 'react';
import { Type, AlignJustify, Sun, Moon, Palette } from 'lucide-react';
import { ReadingPreferences } from '@/hooks/useLearningProgress';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ReadingModeControlsProps {
  preferences: ReadingPreferences;
  onUpdate: (prefs: Partial<ReadingPreferences>) => void;
}

const ReadingModeControls: React.FC<ReadingModeControlsProps> = ({
  preferences,
  onUpdate
}) => {
  const fontSizes = [
    { value: 'small', label: 'A', fontSize: '12px' },
    { value: 'medium', label: 'A', fontSize: '18px' },
    { value: 'large', label: 'A', fontSize: '24px' }
  ] as const;

  const lineSpacings = [
    { value: 'compact', label: 'Compact' },
    { value: 'normal', label: 'Normal' },
    { value: 'relaxed', label: 'Relaxed' }
  ] as const;

  const themes = [
    { value: 'default', label: 'Light', icon: Sun, bg: 'bg-white', border: 'border-gray-300' },
    { value: 'sepia', label: 'Sepia', icon: Palette, bg: 'bg-amber-50', border: 'border-amber-300' },
    { value: 'dark', label: 'Dark', icon: Moon, bg: 'bg-gray-900', border: 'border-gray-600' }
  ] as const;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-gray-600 hover:text-indian-saffron hover:border-indian-saffron"
        >
          <Type className="w-4 h-4" />
          <span className="hidden sm:inline">Reading Mode</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4" align="end">
        <div className="space-y-4">
          {/* Font Size */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Font Size
            </label>
            <div className="flex gap-2">
              {fontSizes.map((fs) => (
                <button
                  key={fs.value}
                  onClick={() => onUpdate({ fontSize: fs.value })}
                  className={cn(
                    'flex-1 py-2 rounded-md border transition-all font-semibold',
                    preferences.fontSize === fs.value
                      ? 'bg-indian-saffron text-white border-indian-saffron'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-indian-saffron'
                  )}
                  style={{ fontSize: fs.fontSize }}
                >
                  {fs.label}
                </button>
              ))}
            </div>
          </div>

          {/* Line Spacing */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Line Spacing
            </label>
            <div className="flex gap-2">
              {lineSpacings.map((ls) => (
                <button
                  key={ls.value}
                  onClick={() => onUpdate({ lineSpacing: ls.value })}
                  className={cn(
                    'flex-1 py-2 px-1 rounded-md border transition-all flex flex-col items-center justify-center',
                    preferences.lineSpacing === ls.value
                      ? 'bg-indian-saffron text-white border-indian-saffron'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-indian-saffron'
                  )}
                  title={ls.label}
                >
                  {/* Visual representation of line spacing */}
                  <div className={cn(
                    'flex flex-col w-6',
                    ls.value === 'compact' && 'gap-0.5',
                    ls.value === 'normal' && 'gap-1',
                    ls.value === 'relaxed' && 'gap-1.5'
                  )}>
                    <div className={cn(
                      'h-0.5 rounded-full',
                      preferences.lineSpacing === ls.value ? 'bg-white' : 'bg-gray-400'
                    )} />
                    <div className={cn(
                      'h-0.5 rounded-full',
                      preferences.lineSpacing === ls.value ? 'bg-white' : 'bg-gray-400'
                    )} />
                    <div className={cn(
                      'h-0.5 rounded-full',
                      preferences.lineSpacing === ls.value ? 'bg-white' : 'bg-gray-400'
                    )} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Background
            </label>
            <div className="flex gap-2">
              {themes.map((theme) => (
                <button
                  key={theme.value}
                  onClick={() => onUpdate({ theme: theme.value })}
                  className={cn(
                    'flex-1 py-2 px-3 rounded-md border-2 transition-all flex items-center justify-center gap-1',
                    theme.bg,
                    preferences.theme === theme.value
                      ? 'ring-2 ring-indian-saffron ring-offset-1'
                      : theme.border
                  )}
                  title={theme.label}
                >
                  <theme.icon className={cn(
                    'w-4 h-4',
                    theme.value === 'dark' ? 'text-white' : 'text-gray-600'
                  )} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ReadingModeControls;

