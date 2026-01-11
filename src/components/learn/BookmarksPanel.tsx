import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, BookOpen, ChevronRight, Trash2, Edit3, X, Check } from 'lucide-react';
import { LessonBookmark } from '@/hooks/useLearningProgress';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface BookmarksPanelProps {
  bookmarks: LessonBookmark[];
  onRemove: (topicId: string, lessonId: string) => void;
  onUpdateNotes: (topicId: string, lessonId: string, notes: string) => void;
  getLessonTitle: (topicId: string, lessonId: string) => string | undefined;
  className?: string;
}

const BookmarksPanel: React.FC<BookmarksPanelProps> = ({
  bookmarks,
  onRemove,
  onUpdateNotes,
  getLessonTitle,
  className
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState('');

  const startEditing = (bookmark: LessonBookmark) => {
    setEditingId(`${bookmark.topicId}-${bookmark.lessonId}`);
    setEditNotes(bookmark.notes || '');
  };

  const saveNotes = (bookmark: LessonBookmark) => {
    onUpdateNotes(bookmark.topicId, bookmark.lessonId, editNotes);
    setEditingId(null);
  };

  const sortedBookmarks = [...bookmarks].sort((a, b) => b.savedAt - a.savedAt);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            'gap-2 border-indian-saffron/30 hover:bg-indian-saffron/10 relative',
            className
          )}
        >
          <Bookmark className="w-4 h-4" />
          <span className="hidden sm:inline">My Library</span>
          {bookmarks.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-indian-saffron text-white text-xs rounded-full flex items-center justify-center">
              {bookmarks.length}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-indian-saffron" />
            My Library ({bookmarks.length})
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-3">
          {sortedBookmarks.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Bookmark className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="font-medium">No bookmarks yet</p>
              <p className="text-sm">Save lessons to access them quickly</p>
            </div>
          ) : (
            sortedBookmarks.map((bookmark) => {
              const id = `${bookmark.topicId}-${bookmark.lessonId}`;
              const isEditing = editingId === id;
              const title = getLessonTitle(bookmark.topicId, bookmark.lessonId) || 'Untitled Lesson';

              return (
                <div
                  key={id}
                  className="p-3 rounded-lg border border-gray-200 bg-gradient-to-r from-white to-gray-50 hover:border-indian-saffron/30 transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Link
                      to={`/learn/lessons/${bookmark.topicId}/${bookmark.lessonId}`}
                      className="flex-1 min-w-0"
                    >
                      <h4 className="font-medium text-gray-900 hover:text-indian-saffron transition-colors line-clamp-1">
                        {title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        Saved {new Date(bookmark.savedAt).toLocaleDateString()}
                      </p>
                    </Link>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => isEditing ? saveNotes(bookmark) : startEditing(bookmark)}
                        className="p-1.5 text-gray-400 hover:text-indian-saffron rounded"
                        title={isEditing ? 'Save notes' : 'Edit notes'}
                      >
                        {isEditing ? <Check className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => onRemove(bookmark.topicId, bookmark.lessonId)}
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Notes section */}
                  {isEditing ? (
                    <div className="mt-2">
                      <textarea
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        placeholder="Add a note..."
                        className="w-full p-2 text-sm border rounded-md resize-none focus:ring-1 focus:ring-indian-saffron focus:border-indian-saffron"
                        rows={2}
                        autoFocus
                      />
                    </div>
                  ) : bookmark.notes ? (
                    <p className="text-sm text-gray-600 bg-white p-2 rounded border border-gray-100 mt-2">
                      {bookmark.notes}
                    </p>
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookmarksPanel;

