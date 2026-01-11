import React, { useEffect, useMemo, useState } from 'react';
import TranslationLayout from '../../components/layout/TranslationLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Link, useSearchParams } from 'react-router-dom';
import NotFoundMessage from '../../components/learn/NotFoundMessage';
import { vivekanandaLectures } from '../../data/readings/vivekanandaParliament';

import { Target, Users, BookOpen, CheckCircle } from 'lucide-react';
import { countSentences, flattenSentences } from '@/lib/translationUtils';
import { getAllTranslations, mostTranslatedSentence } from '@/store/translations';
import { isSupabaseConfigured } from '@/services/translationsSupabase';
import { featureFlags } from '@/utils/featureFlags';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import ReadingProgressBar from '@/components/learn/ReadingProgressBar';

const ReadIndexPage: React.FC = () => {
  if (!featureFlags.enableReadingSection) {
    return (
      <NotFoundMessage
        title="Reading Section Unavailable"
        message="This reading section is currently disabled."
        backTo="/learn"
        backLabel="Back to Learning Centre"
      />
    );
  }

  // Reading progress tracking
  const { getProgress, isLoaded: progressLoaded } = useReadingProgress();

  // Translation statistics
  const [translatedTotal, setTranslatedTotal] = useState(0);
  const [mostTranslated, setMostTranslated] = useState<{ key: string; total: number } | null>(null);

  // Compute totals using actual sentence splitter and local store
  const totalSentences = useMemo(() => {
    return vivekanandaLectures.reduce((sum, lec) => sum + countSentences(lec.paragraphs), 0);
  }, []);



  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (isSupabaseConfigured()) {
        const allTranslations = getAllTranslations();
        if (cancelled) return;
        const counts = new Map<string, number>();
        for (const r of allTranslations) {
          const key = `${r.lectureId}#${r.sentenceIndex}`;
          counts.set(key, (counts.get(key) || 0) + 1);
        }
        setTranslatedTotal(allTranslations.length);
        let maxKey = '';
        let maxVal = -1;
        for (const [k, v] of counts.entries()) {
          if (v > maxVal) { maxVal = v; maxKey = k; }
        }
        setMostTranslated(maxVal > 0 ? { key: maxKey, total: maxVal } : null);
      } else {
        const allTranslations = getAllTranslations();
        setTranslatedTotal(allTranslations.length);
        setMostTranslated(mostTranslatedSentence());
      }
    })();
    return () => { cancelled = true; };
  }, []);











































  return (
    <TranslationLayout title="Read and Translate Swamiji’s 1893 Chicago Addresses">
      <div className="w-full bg-gradient-to-br from-indian-cream to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="text-center">

              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6">Read and Translate Swamiji’s 1893 Chicago Addresses</h1>

              {/* How Translations Work - compact version */}
              <div className="bg-gradient-to-br from-white to-yellow-50/80 border border-indian-saffron/30 rounded-lg shadow-sm px-4 py-4 mb-6 max-w-md mx-auto">
                <h3 className="text-lg font-heading font-semibold mb-3 flex items-center justify-center gap-2 text-center text-spiritual-700">
                  <Users className="w-4 h-4 text-indian-saffron" /> How Translations Work
                </h3>

                <div className="space-y-2">
                  <div className="flex items-start gap-2 p-2 bg-white/60 rounded border border-indian-saffron/10">
                    <div className="flex-shrink-0 w-5 h-5 bg-spiritual-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">1</div>
                    <div className="text-gray-700 text-sm">
                      Open any lecture and select your target language.
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-2 bg-white/60 rounded border border-indian-saffron/10">
                    <div className="flex-shrink-0 w-5 h-5 bg-spiritual-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">2</div>
                    <div className="text-gray-700 text-sm">
                      Select a sentence to translate, submit your translation.
                      <span className="block text-[12px] text-gray-600">(Make sure you indicate your language proficiency in your translation profile.)</span>
                    </div>
                  </div>
                </div>
              </div>

              {mostTranslated && (() => {
                const [lecId, idxStr] = mostTranslated.key.split('#');
                const sentIdx = parseInt(idxStr, 10);
                const lec = vivekanandaLectures.find((l) => l.id === lecId);
                const sentence = lec ? flattenSentences(lec.paragraphs)[sentIdx] : '';
                const firstFive = sentence ? sentence.split(/\s+/).slice(0, 5).join(' ') : mostTranslated.key;
                return (
                  <div className="text-xs text-gray-600 mt-1">
                    Most translated sentence: <Link className="text-spiritual-600 hover:underline" to="/read/stats">{firstFive}…</Link> • {mostTranslated.total}
                  </div>
                );
              })()}

              <div className="mt-8 max-w-xl mx-auto text-sm text-gray-600 text-center">
                View per-language completion on the <Link to="/read/stats" className="text-spiritual-600 hover:underline">Stats page</Link>.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vivekanandaLectures.map((lec, i) => {
                const progress = progressLoaded ? getProgress(lec.id) : null;
                const isComplete = progress?.completed || false;
                const scrollPercent = progress?.scrollPercent || 0;

                return (
                  <Card key={lec.id} className={`bg-gradient-to-br from-indian-cream to-white border hover:shadow-lg transition-all ${isComplete ? 'border-emerald-400/60' : 'border-indian-saffron/40'}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm text-gray-500">Lecture {i + 1} • {lec.date}</div>
                        {isComplete && (
                          <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
                            <CheckCircle className="w-3.5 h-3.5" /> Complete
                          </span>
                        )}
                        {!isComplete && scrollPercent > 0 && (
                          <span className="text-xs text-gray-500">{scrollPercent}% read</span>
                        )}
                      </div>
                      <h2 className="text-xl font-heading font-semibold mb-2">{lec.title}</h2>

                      {/* Reading progress bar */}
                      {scrollPercent > 0 && (
                        <div className="mb-3">
                          <ReadingProgressBar percent={scrollPercent} variant="inline" />
                        </div>
                      )}

                      <p className="text-gray-700 mb-4 line-clamp-3">{lec.paragraphs[1] ?? lec.paragraphs[0]}</p>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <Link
                          to={`/read/${lec.id}/english`}
                          className="inline-flex items-center px-3 py-1 bg-white text-spiritual-700 border border-spiritual-300 text-sm rounded-md hover:bg-spiritual-50 transition-colors"
                        >
                          <BookOpen className="w-4 h-4 mr-2" /> {scrollPercent > 0 && !isComplete ? 'Continue Reading' : 'Read the lecture'}
                        </Link>
                        <Link
                          to={`/read/${lec.id}?lang=${new URLSearchParams(window.location.search).get('lang') || ''}`}
                          className="inline-flex items-center px-3 py-1 bg-spiritual-500 text-white text-sm rounded-md hover:bg-spiritual-600 transition-colors"
                        >
                          <Target className="w-4 h-4 mr-2" /> Translate Sentences
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>


          </div>
        </div>
      </div>
    </TranslationLayout>
  );

};

export default ReadIndexPage;

