import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, BookOpen, ChevronRight, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

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
  showFilters?: boolean;
}

const LessonSearch: React.FC<LessonSearchProps> = ({ lessonsData, className, showFilters = true }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const searchResults = useMemo(() => {
    if (!query.trim() && !selectedTopic) return [];

    const lowerQuery = query.toLowerCase();
    const results: Array<{
      lesson: Lesson;
      topicId: string;
      topicName: string;
      matchType: 'title' | 'description';
    }> = [];

    lessonsData.forEach((group) => {
      // Filter by topic if selected
      if (selectedTopic && group.topicId !== selectedTopic) return;

      group.lessons.forEach((lesson) => {
        const titleMatch = lesson.title.toLowerCase().includes(lowerQuery);
        const descMatch = lesson.description.toLowerCase().includes(lowerQuery);

        if (!query.trim() || titleMatch || descMatch) {
          results.push({
            lesson,
            topicId: group.topicId,
            topicName: group.topicName,
            matchType: titleMatch ? 'title' : 'description'
          });
        }
      });
    });

    return results.slice(0, 12); // Increased limit
  }, [query, lessonsData, selectedTopic]);

  const handleClear = () => {
    setQuery('');
    setSelectedTopic(null);
  };

  const topicOptions = lessonsData.map(group => ({
    id: group.topicId,
    name: group.topicName,
    count: group.lessons.length
  }));

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
          placeholder="Search lessons by title or topic..."
          className={cn(
            'w-full pl-10 pr-10 py-3 rounded-xl border-2 transition-all text-base',
            'bg-white text-gray-900 placeholder-gray-400',
            'focus:outline-none focus:ring-0',
            isFocused || query
              ? 'border-indian-saffron shadow-lg'
              : 'border-gray-200 hover:border-gray-300'
          )}
        />
        {(query || selectedTopic) && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Topic Filter Tags */}
      {showFilters && (
        <div className="mt-3 flex flex-wrap gap-2">
          <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
            <Filter className="w-3 h-3" />
            Filter by topic:
          </div>
          {topicOptions.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(selectedTopic === topic.id ? null : topic.id)}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium transition-all',
                selectedTopic === topic.id
                  ? 'bg-indian-saffron text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {topic.name}
            </button>
          ))}
        </div>
      )}

      {/* Search Results Dropdown */}
      {isFocused && (query || selectedTopic) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden">
          {searchResults.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p className="font-medium">No lessons found</p>
              <p className="text-sm">Try a different search term or topic</p>
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {searchResults.map((result, index) => (
                <Link
                  key={`${result.topicId}-${result.lesson.id}`}
                  to={`/learn/lessons/${result.topicId}/${result.lesson.id}`}
                  className={cn(
                    'flex items-start gap-3 p-4 hover:bg-indian-saffron/5 transition-colors',
                    index !== 0 && 'border-t border-gray-100'
                  )}
                  onClick={() => {
                    setQuery('');
                    setSelectedTopic(null);
                  }}
                >
                  <div className="w-8 h-8 rounded-lg bg-indian-saffron/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <BookOpen className="w-4 h-4 text-indian-saffron" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{result.lesson.title}</p>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{result.lesson.description}</p>
                    <Badge variant="outline" className="text-xs">{result.topicName}</Badge>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
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

