import { useState, useEffect } from 'react';

interface Bookmark {
  id: string;
  text: string;
  chapter: number;
  verse: number;
  timestamp: number;
}

interface BookmarksByText {
  [textName: string]: Bookmark[];
}

export const useBookmarks = (textName: 'bhagavad-gita' | 'devi-mahatmyam') => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('verse-bookmarks');
    if (savedBookmarks) {
      try {
        const allBookmarks: BookmarksByText = JSON.parse(savedBookmarks);
        setBookmarks(allBookmarks[textName] || []);
      } catch (error) {
        console.error('Error loading bookmarks:', error);
        setBookmarks([]);
      }
    }
  }, [textName]);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('verse-bookmarks');
    let allBookmarks: BookmarksByText = {};
    
    if (savedBookmarks) {
      try {
        allBookmarks = JSON.parse(savedBookmarks);
      } catch (error) {
        console.error('Error parsing saved bookmarks:', error);
      }
    }
    
    allBookmarks[textName] = bookmarks;
    localStorage.setItem('verse-bookmarks', JSON.stringify(allBookmarks));
  }, [bookmarks, textName]);

  const addBookmark = (chapter: number, verse: number) => {
    const id = `${textName}-${chapter}-${verse}`;
    const newBookmark: Bookmark = {
      id,
      text: textName,
      chapter,
      verse,
      timestamp: Date.now()
    };

    setBookmarks(prev => {
      // Check if bookmark already exists
      if (prev.some(b => b.id === id)) {
        return prev;
      }
      return [...prev, newBookmark];
    });
  };

  const removeBookmark = (chapter: number, verse: number) => {
    const id = `${textName}-${chapter}-${verse}`;
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  const isBookmarked = (chapter: number, verse: number) => {
    const id = `${textName}-${chapter}-${verse}`;
    return bookmarks.some(b => b.id === id);
  };

  const toggleBookmark = (chapter: number, verse: number) => {
    if (isBookmarked(chapter, verse)) {
      removeBookmark(chapter, verse);
    } else {
      addBookmark(chapter, verse);
    }
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark
  };
};
