import React from 'react';
import { Lightbulb, Info, AlertCircle, Quote, BookOpen, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type CalloutType = 'did-you-know' | 'important' | 'tip' | 'quote' | 'definition' | 'pronunciation';

interface CalloutBoxProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
  author?: string; // For quotes
  className?: string;
}

const calloutConfig = {
  'did-you-know': {
    icon: Lightbulb,
    defaultTitle: 'Did You Know?',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-300',
    iconColor: 'text-amber-500',
    titleColor: 'text-amber-800'
  },
  'important': {
    icon: AlertCircle,
    defaultTitle: 'Important',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-300',
    iconColor: 'text-red-500',
    titleColor: 'text-red-800'
  },
  'tip': {
    icon: Info,
    defaultTitle: 'Tip',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-300',
    iconColor: 'text-blue-500',
    titleColor: 'text-blue-800'
  },
  'quote': {
    icon: Quote,
    defaultTitle: '',
    bgColor: 'bg-spiritual-50',
    borderColor: 'border-spiritual-300',
    iconColor: 'text-spiritual-500',
    titleColor: 'text-spiritual-800'
  },
  'definition': {
    icon: BookOpen,
    defaultTitle: 'Definition',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-300',
    iconColor: 'text-green-600',
    titleColor: 'text-green-800'
  },
  'pronunciation': {
    icon: Volume2,
    defaultTitle: 'Pronunciation',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-300',
    iconColor: 'text-purple-500',
    titleColor: 'text-purple-800'
  }
};

const CalloutBox: React.FC<CalloutBoxProps> = ({
  type,
  title,
  children,
  author,
  className
}) => {
  const config = calloutConfig[type];
  const Icon = config.icon;
  const displayTitle = title || config.defaultTitle;

  if (type === 'quote') {
    return (
      <blockquote
        className={cn(
          'relative my-6 p-6 rounded-lg border-l-4',
          config.bgColor,
          config.borderColor,
          className
        )}
      >
        <Quote className={cn('absolute top-4 left-4 w-8 h-8 opacity-20', config.iconColor)} />
        <div className="pl-6">
          <p className="text-lg italic text-gray-700 leading-relaxed">
            {children}
          </p>
          {author && (
            <footer className="mt-3 text-sm font-medium text-gray-600">
              — {author}
            </footer>
          )}
        </div>
      </blockquote>
    );
  }

  return (
    <div
      className={cn(
        'my-6 p-4 rounded-lg border',
        config.bgColor,
        config.borderColor,
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn('flex-shrink-0 mt-0.5', config.iconColor)}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          {displayTitle && (
            <h5 className={cn('font-semibold mb-1', config.titleColor)}>
              {displayTitle}
            </h5>
          )}
          <div className="text-gray-700 text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalloutBox;

