import React, { useState, useMemo } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Play, Search, Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Pagination from '../../components/shared/Pagination';
import { useBookmarks } from '../../hooks/useBookmarks';

interface Verse {
  verse: number;
  sanskrit: string;
  transliteration: string;
}

// Import the actual verse data
import { bhagavadGitaChaptersComplete } from '../../data/bhagavadGitaVerses';

const chapterInfo = {
  1: { title: "Arjuna's Dilemma", verses: 47 },
  2: { title: "The Yoga of Knowledge", verses: 72 },
  3: { title: "The Yoga of Action", verses: 43 },
  4: { title: "The Yoga of Divine Knowledge", verses: 42 },
  5: { title: "The Yoga of Renunciation", verses: 29 },
  6: { title: "The Yoga of Meditation", verses: 47 },
  7: { title: "The Yoga of Divine Knowledge", verses: 30 },
  8: { title: "The Yoga of the Imperishable Brahman", verses: 28 },
  9: { title: "The Yoga of Royal Knowledge", verses: 34 },
  10: { title: "The Yoga of Divine Manifestations", verses: 42 },
  11: { title: "The Yoga of the Universal Form", verses: 55 },
  12: { title: "The Yoga of Devotion", verses: 20 },
  13: { title: "The Yoga of the Field and Knower", verses: 35 },
  14: { title: "The Yoga of the Three Gunas", verses: 27 },
  15: { title: "The Yoga of the Supreme Person", verses: 20 },
  16: { title: "The Yoga of Divine and Demonic Natures", verses: 24 },
  17: { title: "The Yoga of Threefold Faith", verses: 28 },
  18: { title: "The Yoga of Liberation through Renunciation", verses: 78 }
};

const BhagavadGitaChapterPage = () => {
  const { chapter } = useParams<{ chapter: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');

  const chapterNum = parseInt(chapter || '1');
  const currentPage = parseInt(searchParams.get('page') || '1');
  const versesPerPage = 10;

  const { isBookmarked, toggleBookmark } = useBookmarks('bhagavad-gita');

  const currentChapter = chapterInfo[chapterNum as keyof typeof chapterInfo];
  const chapterData = bhagavadGitaChaptersComplete.find(ch => ch.chapter === chapterNum);

  // Generate placeholder verses if no data exists
  const allVerses = useMemo(() => {
    if (chapterData && chapterData.verses.length > 0) {
      return chapterData.verses;
    }

    // Generate placeholder verses for chapters without data
    const verseCount = currentChapter?.verses || 0;
    return Array.from({ length: verseCount }, (_, i) => ({
      verse: i + 1,
      sanskrit: `[Sanskrit text for verse ${i + 1} to be added]`,
      transliteration: `[Transliteration for verse ${i + 1} to be added]`
    }));
  }, [chapterData, currentChapter]);

  // Filter verses based on search term
  const filteredVerses = useMemo(() => {
    if (!searchTerm) return allVerses;

    return allVerses.filter(verse =>
      verse.sanskrit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      verse.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
      verse.verse.toString().includes(searchTerm)
    );
  }, [allVerses, searchTerm]);

  // Paginate filtered verses
  const totalPages = Math.ceil(filteredVerses.length / versesPerPage);
  const startIndex = (currentPage - 1) * versesPerPage;
  const paginatedVerses = filteredVerses.slice(startIndex, startIndex + versesPerPage);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!currentChapter) {
    return (
      <PageLayout title="Chapter Not Found">
        <div className="container mx-auto px-4 py-12">
          <p>Chapter not found.</p>
          <Link to="/learn#mantras">
            <Button>Back to Mantras</Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={`Bhagavad Gita - Chapter ${chapterNum}`}>
      <div className="w-full bg-gradient-to-br from-indian-cream to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Link to="/learn#mantras" className="inline-flex items-center text-spiritual-600 hover:text-spiritual-700 mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Mantras
              </Link>
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
                Bhagavad Gita - Chapter {chapterNum}
              </h1>
              <h2 className="text-xl text-gray-600 mb-4">{currentChapter.title}</h2>
              <p className="text-gray-500">{currentChapter.verses} verses</p>
            </div>

            {/* Search and Filters */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search verses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              {searchTerm && (
                <p className="text-sm text-gray-600 mt-2">
                  Found {filteredVerses.length} verse(s) matching "{searchTerm}"
                </p>
              )}
            </div>

            {/* Verses */}
            <div className="space-y-6">
              {paginatedVerses.map((verse) => (
                <Card key={verse.verse} className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron pop-shadow-card">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-heading font-semibold">
                        Verse {verse.verse}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleBookmark(chapterNum, verse.verse)}
                          className={`flex items-center gap-2 ${
                            isBookmarked(chapterNum, verse.verse)
                              ? 'bg-indian-saffron text-white hover:bg-indian-saffron/90'
                              : ''
                          }`}
                        >
                          {isBookmarked(chapterNum, verse.verse) ? (
                            <BookmarkCheck className="w-4 h-4" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Play className="w-4 h-4" />
                          Audio
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Sanskrit:</h4>
                        <p className="text-gray-700 font-sanskrit text-lg leading-relaxed">
                          {verse.sanskrit}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Transliteration:</h4>
                        <p className="text-gray-700 italic leading-relaxed">
                          {verse.transliteration}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredVerses.length === 0 && searchTerm && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No verses found matching your search.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {!searchTerm && totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  itemsPerPage={versesPerPage}
                  totalItems={filteredVerses.length}
                />
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-12">
              {chapterNum > 1 && (
                <Link to={`/learn/bhagavad-gita/chapter/${chapterNum - 1}`}>
                  <Button variant="outline">
                    ← Previous Chapter
                  </Button>
                </Link>
              )}
              {chapterNum < 18 && (
                <Link to={`/learn/bhagavad-gita/chapter/${chapterNum + 1}`} className="ml-auto">
                  <Button variant="outline">
                    Next Chapter →
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BhagavadGitaChapterPage;
