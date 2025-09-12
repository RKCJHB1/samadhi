import { useEffect, useMemo, useState } from 'react';
import { isSupabaseConfigured, fetchComprehensiveStats, type TranslationStats } from '@/services/translationsSupabase';
import { vivekanandaLectures } from '@/data/readings/vivekanandaParliament';
import { countSentences } from '@/lib/translationUtils';
import { getAllTranslations } from '@/store/translations';

export type StatsMode = 'approved' | 'any';

// Simple in-module cache to avoid fetching the same stats repeatedly across pages
let cachedStats: TranslationStats | null = null;
let fetching: Promise<TranslationStats | null> | null = null;

export function useTranslationStats() {
  const supConfigured = isSupabaseConfigured();
  const [stats, setStats] = useState<TranslationStats | null>(cachedStats);
  const [loading, setLoading] = useState<boolean>(supConfigured && !cachedStats);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!supConfigured) {
        setLoading(false);
        return;
      }
      try {
        if (!fetching) fetching = fetchComprehensiveStats();
        const result = await fetching;
        if (!cancelled) {
          cachedStats = result;
          setStats(result);
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Failed to load stats');
      } finally {
        if (!cancelled) setLoading(false);
        fetching = null;
      }
    })();
    return () => { cancelled = true; };
  }, [supConfigured]);

  // Total sentences across all lectures
  const totalSentences = useMemo(() => (
    vivekanandaLectures.reduce((sum, lec) => sum + countSentences(lec.paragraphs), 0)
  ), []);

  // Local fallback counts when Supabase is not configured
  const localCounts = useMemo(() => {
    if (supConfigured) return null;
    const map = new Map<string, number>();
    const uniq = new Map<string, Set<string>>();
    for (const r of getAllTranslations()) {
      const key = `${r.lectureId}#${r.sentenceIndex}`;
      if (!uniq.has(r.lang)) uniq.set(r.lang, new Set());
      uniq.get(r.lang)!.add(key);
    }
    uniq.forEach((set, lang) => map.set(lang, set.size));
    return map;
  }, [supConfigured]);

  // Helper to get per-language count by mode
  function getLangCount(lang: string, mode: StatsMode): number {
    if (stats && supConfigured) {
      const row = stats.languageStats.find(ls => ls.lang === lang);
      if (!row) return 0;
      if (mode === 'approved') return typeof row.approved === 'number' ? row.approved : 0;
      return typeof row.total === 'number' ? row.total : 0;
    }
    // Fallback: local unique (no approval info available)
    return localCounts?.get(lang) || 0;
  }

  return { stats, loading, error, totalSentences, getLangCount };
}

