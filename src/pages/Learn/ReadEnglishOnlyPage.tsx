import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TranslationLayout from '@/components/layout/TranslationLayout';
import NotFoundMessage from '@/components/learn/NotFoundMessage';
import { vivekanandaLectures } from '@/data/readings/vivekanandaParliament';
import { flattenSentences } from '@/lib/translationUtils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getLectureProgress, recordSentenceRead, addReadingDuration } from '@/store/reading';
import { isSupabaseConfigured, upsertReadingProgress, getMyReadingProgressFor, recordReadingTime } from '@/services/translationsSupabase';
import { useToast } from '@/hooks/use-toast';
import { featureFlags } from '@/utils/featureFlags';

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const ReadEnglishOnlyPage: React.FC = () => {
  const { lectureId } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();

  if (!featureFlags.enableReadingSection) {
    return (
      <NotFoundMessage
        title="Reading Section Unavailable"
        message="This reading section is currently disabled."
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
  const [running, setRunning] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(3000); // 3 seconds per sentence

  const boxRef = useRef<HTMLDivElement | null>(null);
  const sentRef = useRef<HTMLDivElement | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const lastIndexRef = useRef<number>(index);

  // Track reading statistics when index changes
  useEffect(() => {
    if (!lecture) return;

    // Record the sentence as read for statistics
    recordSentenceRead(userId, lecture.id, index, 0);

    // Track time spent on previous sentence
    if (lastIndexRef.current !== index) {
      const now = Date.now();
      const timeSpent = now - startTimeRef.current;
      if (timeSpent > 0 && timeSpent < 60000) { // Only count reasonable time (< 1 minute)
        addReadingDuration(userId, lecture.id, timeSpent);
        if (isSupabaseConfigured()) { void recordReadingTime(lecture.id, 'en', timeSpent); }
      }
      startTimeRef.current = now;
      lastIndexRef.current = index;
    }
  }, [index, lecture, userId]);

  // Auto-scroll functionality
  useEffect(() => {
    if (!running || !lecture) return;

    const timer = setTimeout(() => {
      setIndex(i => {
        const next = i + 1;
        if (next >= sentences.length) {
          setRunning(false);
          return i;
        }
        return next;
      });
    }, speed);

    return () => clearTimeout(timer);
  }, [running, index, sentences.length, speed, lecture]);

  // Keyboard shortcuts for navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setRunning(false);
        setIndex(i => clamp(i - 1, 0, sentences.length - 1));
      }
      if (e.key === 'ArrowRight') {
        setRunning(false);
        setIndex(i => clamp(i + 1, 0, sentences.length - 1));
      }
      if (e.key === ' ') {
        e.preventDefault();
        setRunning(r => !r);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sentences.length]);


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

  // Compute previous/next lectures for navigation
  const idx = vivekanandaLectures.findIndex(l => l.id === lecture.id);
  const prevLecture = idx > 0 ? vivekanandaLectures[idx - 1] : undefined;
  const nextLecture = idx < vivekanandaLectures.length - 1 ? vivekanandaLectures[idx + 1] : undefined;

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
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <Link to="/read" className="px-3 py-1 border rounded-md hover:bg-gray-50">← Back</Link>
                <span className="px-2">•</span>
                <span>Sentence {index + 1} / {sentences.length}</span>
                {prevLecture && (<>
                  <span className="px-2">•</span>
                  <Link to={`/read/${prevLecture.id}/english#sent-0`} title={prevLecture.title} className="text-spiritual-600 hover:text-spiritual-700 underline">Previous lecture</Link>
                </>)}
                {nextLecture && (<>
                  <span className="px-2">•</span>
                  <Link to={`/read/${nextLecture.id}/english#sent-0`} title={nextLecture.title} className="text-spiritual-600 hover:text-spiritual-700 underline">Next lecture</Link>
                </>)}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => { setRunning(false); setIndex(i => clamp(i - 1, 0, sentences.length - 1)); }}>
                  <ChevronLeft className="w-4 h-4 mr-1"/> Previous
                </Button>
                <Button variant="outline" size="sm" onClick={() => { setRunning(false); setIndex(i => clamp(i + 1, 0, sentences.length - 1)); }}>
                  <ChevronRight className="w-4 h-4 mr-1"/> Next
                </Button>

                {/* Auto-scroll controls */}
                <Button
                  variant={running ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRunning(!running)}
                >
                  {running ? <Pause className="w-4 h-4 mr-1"/> : <Play className="w-4 h-4 mr-1"/>}
                  {running ? 'Pause' : 'Auto-scroll'}
                </Button>

                {/* Speed control */}
                <select
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="px-2 py-1 border rounded text-sm"
                >
                  <option value={1500}>Fast (1.5s)</option>
                  <option value={3000}>Normal (3s)</option>
                  <option value={5000}>Slow (5s)</option>
                </select>

                {/* Resume button: load last saved index from Supabase and jump */}
                <Button
                  size="sm"
                  variant="default"
                  onClick={async () => {
                    try {
                      if (isSupabaseConfigured()) {
                        const row = await getMyReadingProgressFor(lecture.id, 'en');
                        const resumeTo = row ? Math.max(0, Math.min(row.lastSentenceIndex + 1, Math.max(0, sentences.length - 1))) : 0;
                        setRunning(false);
                        setIndex(resumeTo);
                        toast({ title: 'Resumed', description: `Jumped to sentence ${resumeTo + 1}.` });
                      } else {
                        // Fallback to local stats
                        const prog = getLectureProgress(userId, lecture.id);
                        const resumeTo = Math.max(0, Math.min((prog.lastSentenceIndex || 0) + 1, Math.max(0, sentences.length - 1)));
                        setRunning(false);
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
                        toast({ title: 'Reading progress saved', description: `Saved at sentence ${index + 1}. You can resume from here later.` });
                      } else {
                        // Update local reading progress too
                        recordSentenceRead(userId, lecture.id, index, 0);
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
            <div className="mt-6 text-sm text-gray-600 space-y-2">
              <div>
                <strong>Note:</strong> This is an English-only reading view.{' '}
                <Link to={`/read/${lecture.id}?lang=`} className="text-spiritual-600 underline">Translations</Link> are disabled here.
              </div>
              <div>
                <strong>Controls:</strong> Use arrow keys to navigate, spacebar to start/stop auto-scrolling.
                Your reading progress is automatically tracked for statistics.
              </div>
            </div>


          </div>
        </div>
      </div>
    </TranslationLayout>
  );
};

export default ReadEnglishOnlyPage;

