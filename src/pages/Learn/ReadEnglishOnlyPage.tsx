import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TranslationLayout from '@/components/layout/TranslationLayout';
import NotFoundMessage from '@/components/learn/NotFoundMessage';
import { vivekanandaLectures } from '@/data/readings/vivekanandaParliament';
import { flattenSentences } from '@/lib/translationUtils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getLectureProgress } from '@/store/reading';
import { isSupabaseConfigured, upsertReadingProgress, getMyReadingProgressFor } from '@/services/translationsSupabase';
import { useToast } from '@/hooks/use-toast';

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const ReadEnglishOnlyPage: React.FC = () => {
  const { lectureId } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();

  if (!import.meta.env.DEV) {
    return (
      <NotFoundMessage
        title="Reading Section Unavailable"
        message="This development reading section is currently hidden in production."
        backTo="/read"
        backLabel="Back to Read Index"
      />
    );
  }

  const lecture = vivekanandaLectures.find(l => l.id === lectureId);
  const sentences = useMemo(() => lecture ? flattenSentences(lecture.paragraphs) : [], [lecture]);

  const userId = user?.id || 'anonymous';
  const initialIdx = useMemo(() => {
    if (!lecture) return 0;
    const prog = getLectureProgress(userId, lecture.id);
    // Resume from next sentence if we had progress
    return clamp((prog.lastSentenceIndex || 0) + 1, 0, Math.max(0, sentences.length - 1));
  }, [lecture, sentences.length, userId]);

    const [index, setIndex] = useState<number>(initialIdx);

  const boxRef = useRef<HTMLDivElement | null>(null);
  const sentRef = useRef<HTMLDivElement | null>(null);

  // Keep track of what we've saved to avoid redundant writes
  // Manual-only saving: we no longer auto-save per index change

  // Keyboard shortcuts for navigation only
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { setIndex(i => clamp(i - 1, 0, sentences.length - 1)); }
      if (e.key === 'ArrowRight') { setIndex(i => clamp(i + 1, 0, sentences.length - 1)); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sentences.length]);

  // Manual-only: removed auto-save on index change


  // If arriving with #sent-N in URL, jump to that sentence index
  useEffect(() => {
    const m = (window.location.hash || '').match(/^#sent-(\d+)$/);
    if (!m) return;
    const idx = Math.max(0, Math.min(Number(m[1] || 0), Math.max(0, sentences.length - 1)));
    setRunning(false);



    setIndex(idx);
  }, [sentences.length]);


  if (!lecture) {
    return (
      <NotFoundMessage
        title="Lecture Not Found"
        message="The lecture you're looking for doesn't exist."
        backTo="/read"
        backLabel="Back to Read Index"
      />
    );
  }

  return (
    <TranslationLayout title={`Read: ${lecture.title}`}>
      <div className="w-full bg-gradient-to-br from-white to-yellow-50 py-10 min-h-[80vh]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* Lecture Header */}
            <div className="mb-4 text-center">
              <h1 className="text-3xl font-heading font-bold mb-1">{lecture.title}</h1>
              {lecture.date && (<div className="text-gray-600 text-sm">{lecture.date}</div>)}
            </div>

            {/* Controls */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Link to="/read" className="px-3 py-1 border rounded-md hover:bg-gray-50">← Back</Link>
                <span className="px-2">•</span>
                <span>Sentence {index + 1} / {sentences.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setIndex(i => clamp(i - 1, 0, sentences.length - 1))}>
                  <ChevronLeft className="w-4 h-4 mr-1"/> Previous
                </Button>
                <Button variant="outline" size="sm" onClick={() => setIndex(i => clamp(i + 1, 0, sentences.length - 1))}>
                  <ChevronRight className="w-4 h-4 mr-1"/> Next
                </Button>

                {/* Resume button: load last saved index from Supabase and jump */}
                <Button
                  size="sm"
                  variant="default"
                  onClick={async () => {
                    try {
                      if (isSupabaseConfigured()) {
                        const row = await getMyReadingProgressFor(lecture.id, 'en');
                        const resumeTo = row ? Math.max(0, Math.min(row.lastSentenceIndex + 1, Math.max(0, sentences.length - 1))) : 0;
                        setIndex(resumeTo);
                        toast({ title: 'Resumed', description: `Jumped to sentence ${resumeTo + 1}.` });
                      } else {
                        // Fallback to local stats
                        const prog = getLectureProgress(userId, lecture.id);
                        const resumeTo = Math.max(0, Math.min((prog.lastSentenceIndex || 0) + 1, Math.max(0, sentences.length - 1)));
                        setIndex(resumeTo);
                        toast({ title: 'Resumed (local)', description: `Jumped to sentence ${resumeTo + 1}.` });
                      }
                    } catch {}
                  }}
                >
                  Resume
                </Button>

                {/* Manual Save Progress */}
                <Button
                  size="sm"
                  variant="default"
                  onClick={async () => {
                    try {
                      if (isSupabaseConfigured()) {
                        await upsertReadingProgress(lecture.id, 'en', index);
                        toast({ title: 'Progress saved', description: 'Your position will appear on your profile.' });
                      } else {
                        toast({ title: 'Progress saved locally' });
                      }
                    } catch {}
                  }}
                >
                  Save Progress
                </Button>


              </div>
            </div>

            {/* Centered viewport */}
            <div ref={boxRef} className="relative overflow-hidden bg-white border border-yellow-200 rounded-lg shadow-inner h-[50vh] flex items-center justify-center">
              <div className="px-6 text-center">
                <div
                  key={index}
                  ref={sentRef}
                  className="text-2xl md:text-3xl font-serif text-gray-900"
                >
                  {sentences[index]}
                </div>
              </div>
            </div>

            {/* Footer info */}
            <div className="mt-6 text-sm text-gray-600">
              <div>
                <strong>Note:</strong> This is an English-only reading view.{' '}
                <Link to={`/read/${lecture.id}?lang=`} className="text-spiritual-600 underline">Translations</Link> are disabled here.
              </div>
            </div>
          </div>
        </div>
      </div>
    </TranslationLayout>
  );
};

export default ReadEnglishOnlyPage;

