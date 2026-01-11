import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, BookOpen, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Lesson {
  id: string;
  title: string;
  description: string;
}

interface LessonGroup {
  topicId: string;
  topicName: string;
  lessons: Lesson[];
}

interface LessonSearchProps {
  lessonsData: LessonGroup[];
  className?: string;
}

const LessonSearch: React.FC<LessonSearchProps> = ({ lessonsData, className }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    const results: Array<{
      lesson: Lesson;
      topicId: string;
      topicName: string;
      matchType: 'title' | 'description';
    }> = [];

    lessonsData.forEach((group) => {
      group.lessons.forEach((lesson) => {
        const titleMatch = lesson.title.toLowerCase().includes(lowerQuery);
        const descMatch = lesson.description.toLowerCase().includes(lowerQuery);

        if (titleMatch || descMatch) {
          results.push({
            lesson,
            topicId: group.topicId,
            topicName: group.topicName,
            matchType: titleMatch ? 'title' : 'description'
          });
        }
      });
    });

    return results.slice(0, 8); // Limit results
  }, [query, lessonsData]);

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className={cn('relative', className)}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search lessons..."
          className={cn(
            'w-full pl-10 pr-10 py-2.5 rounded-xl border-2 transition-all',
            'bg-white text-gray-900 placeholder-gray-400',
            'focus:outline-none focus:ring-0',
            isFocused || query
              ? 'border-indian-saffron shadow-md'
              : 'border-gray-200 hover:border-gray-300'
          )}
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isFocused && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden">
          {searchResults.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <p className="font-medium">No lessons found</p>
              <p className="text-sm">Try a different search term</p>
            </div>
          ) : (
            <div className="max-h-80 overflow-y-auto">
              {searchResults.map((result, index) => (
                <Link
                  key={`${result.topicId}-${result.lesson.id}`}
                  to={`/learn/lessons/${result.topicId}/${result.lesson.id}`}
                  className={cn(
                    'flex items-center gap-3 p-3 hover:bg-indian-saffron/5 transition-colors',
                    index !== 0 && 'border-t border-gray-100'
                  )}
                  onClick={() => setQuery('')}
                >
                  <div className="w-8 h-8 rounded-lg bg-indian-saffron/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4 text-indian-saffron" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{result.lesson.title}</p>
                    <p className="text-xs text-gray-500 truncate">{result.topicName}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LessonSearch;

