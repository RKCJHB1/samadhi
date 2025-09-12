import React, { useEffect, useMemo, useState } from 'react';
import TranslationLayout from '../../components/layout/TranslationLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import NotFoundMessage from '../../components/learn/NotFoundMessage';
import { vivekanandaLectures } from '../../data/readings/vivekanandaParliament';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { popularLanguages } from '@/data/languages';
import { Globe2, Languages, Target, Users } from 'lucide-react';
import { countSentences, flattenSentences } from '@/lib/translationUtils';
import { countTranslatedForLectureLang, getAllTranslations, mostTranslatedSentence } from '@/store/translations';
import { fetchTranslationsForLang, isSupabaseConfigured } from '@/services/translationsSupabase';

// Development-only French landing page for the Read/Translate project
// URL: /learn/read/fr

const fr = {
  title: "Initiative mondiale de traduction",
  heroP1:
    "Le 11 septembre 1893, Swami Vivekananda prononça la première de ses six conférences au Parlement des religions à Chicago. Son message dépassait la simple tolérance — il affirmait que toutes les religions sont de véritables chemins vers la même réalité divine.",
  heroP2:
    "Exactement 108 ans plus tard, jour pour jour, des attentats tragiques frappèrent New York. Cette coïncidence douloureuse rappelle combien la vision d'unité de Vivekananda est nécessaire — hier comme aujourd'hui.",
  heroP3:
    "Nous lançons cet effort de traduction en 100 langues le 11 septembre 2025, afin que son message de vérité universelle atteigne chaque coin du monde et transforme une date de douleur en un symbole d'espérance.",
  targetLabel: 'Langue cible',
  targetPlaceholder: 'Choisir une langue',
  mostTranslatedPrefix: 'Phrase la plus traduite :',
  overallProgress: 'Progression globale',
  sentencesTotal: 'phrases au total sur 6 conférences',
  ctaTranslate: 'Lire/Traduire les phrases',
  backToLearn: "Retour à l'apprentissage",
  howHeader: 'Comment fonctionnent les traductions',
  how1: 'Choisissez ci-dessus une langue cible.',
  how2: 'Ouvrez une conférence et traduisez phrase par phrase.',
  how3: 'Soumettez votre traduction. À l’avenir, des votes et revues amélioreront la qualité.',
  noteNoLogin:
    "Pas d'identification requise pour l'instant. Les traductions sont communautaires ; la modération sera ajoutée.",
  uiLangSwitch: 'Langue du site',
  uiEnglish: 'Anglais',
  uiFrench: 'Français',
};

const ReadLanguageHomePage: React.FC = () => {
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

  const navigate = useNavigate();

  // UI language switcher (English index vs French page)
  const [uiLang, setUiLang] = useState<'fr' | 'en'>('fr');
  useEffect(() => {
    if (uiLang === 'en') navigate('/read/lectures');
  }, [uiLang, navigate]);

  // Target language selector defaults to French
  const nonEnglishLangs = popularLanguages.filter((l) => l.code !== 'en');
  const [targetLang, setTargetLang] = useState<string>('fr');

  // Compute totals using actual sentence splitter and local store
  const totalSentences = useMemo(() => {
    return vivekanandaLectures.reduce((sum, lec) => sum + countSentences(lec.paragraphs), 0);
  }, []);

  const [translatedTotal, setTranslatedTotal] = useState<number>(0);
  const [mostTranslated, setMostTranslated] = useState<{ key: string; total: number } | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (isSupabaseConfigured()) {
        const remote = await fetchTranslationsForLang(targetLang, true);
        if (cancelled) return;
        const counts = new Map<string, number>();
        for (const r of remote) {
          const key = `${r.lectureId}#${r.sentenceIndex}`;
          counts.set(key, (counts.get(key) || 0) + 1);
        }
        setTranslatedTotal(remote.length);
        let maxKey = '';
        let maxVal = -1;
        for (const [k, v] of counts.entries()) {
          if (v > maxVal) {
            maxVal = v;
            maxKey = k;
          }
        }
        setMostTranslated(maxVal > 0 ? { key: maxKey, total: maxVal } : null);
      } else {
        const localTotal = vivekanandaLectures.reduce(
          (sum, lec) => sum + countTranslatedForLectureLang(lec.id, targetLang),
          0
        );
        setTranslatedTotal(localTotal);
        setMostTranslated(mostTranslatedSentence());
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [targetLang]);

  const overallProgress = totalSentences ? Math.round((translatedTotal / totalSentences) * 100) : 0;


  // Language progress data (derive from local translations; English treated as fully available)
  const all = useMemo(() => getAllTranslations(), []);
  const byLang = useMemo(() => {
    const m = new Map<string, number>();
    for (const r of all) m.set(r.lang, (m.get(r.lang) || 0) + 1);
    return m;
  }, [all]);

  const langProgress = useMemo(() => {
    // Hide English; it is the source language
    return popularLanguages
      .filter((l) => l.code !== 'en')
      .map((l) => {
        const count = byLang.get(l.code) || 0;
        const percent = totalSentences ? Math.round((count / totalSentences) * 100) : 0;
        return { ...l, count, percent, isEn: false, started: count > 0 };
      });
  }, [byLang, totalSentences]);

  return (
    <TranslationLayout title="Select a Language">
      <div className="w-full bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-gray-900">Select a Language</h1>
              <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700">
                Request New Language
              </button>
            </div>

            {/* Languages grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {langProgress.map((l) => {
                const barClass = l.percent >= 75
                  ? 'bg-green-500'
                  : l.percent >= 50
                  ? 'bg-orange-500'
                  : l.percent >= 25
                  ? 'bg-yellow-500'
                  : 'bg-red-500';

                if (!l.started) {
                  return (
                    <div key={l.code} className="flex flex-col gap-4 rounded-lg border border-dashed border-gray-400 bg-gray-100 p-5 text-center transition-colors hover:bg-gray-200 hover:border-gray-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <h3 className="text-lg font-bold text-gray-800">{l.name}</h3>
                        <p className="text-sm text-gray-600">Translation not started</p>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    to={`/read/lectures?lang=${l.code}`}
                    key={l.code}
                    className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-gray-900">{l.name}</h3>
                      </div>
                      <span className={`text-sm font-semibold ${l.percent >= 75 ? 'text-green-600' : l.percent >= 50 ? 'text-orange-600' : l.percent >= 25 ? 'text-yellow-600' : 'text-red-600'}`}>{l.percent}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div className={`h-2 rounded-full ${barClass}`} style={{ width: `${l.percent}%` }}></div>
                    </div>
                    <p className="text-sm text-gray-600">{l.count} of {totalSentences} sentences translated</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </TranslationLayout>
  );
};

export default ReadLanguageHomePage;

