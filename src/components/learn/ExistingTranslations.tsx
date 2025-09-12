import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTranslationsForSentence } from '@/store/translations';
import { popularLanguages } from '@/data/languages';
import { isSupabaseConfigured, getCurrentUser, getVoteSummary, castVote, fetchTranslationsForSentence, fetchTranslationsForLectureLang, type VoteSummary, type TranslationRecord } from '@/services/translationsSupabase';
import { toast } from '@/components/ui/use-toast';

type Props = {
  lectureId: string;
  sentenceIndex?: number;
  targetLang?: string;
  form?: 'native' | 'transliteration';
};

const langName = (code: string) => popularLanguages.find((l) => l.code === code)?.name || code.toUpperCase();

const ExistingTranslations: React.FC<Props> = ({ lectureId, sentenceIndex, targetLang, form = 'transliteration' }) => {
  const [items, setItems] = useState<TranslationRecord[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [expandedLangs, setExpandedLangs] = useState<Record<string, boolean>>({});


  // Get local translations as fallback, filtered by target language and form
  const localItems = useMemo(() => {
    if (sentenceIndex !== undefined) {
      const allLocal = getTranslationsForSentence(lectureId, sentenceIndex);
      let filtered = targetLang ? allLocal.filter(item => item.lang === targetLang) : allLocal;
      filtered = filtered.filter(item => (item.form || 'transliteration') === form);
      return filtered;
    }
    return [];
  }, [lectureId, sentenceIndex, targetLang, form]);

  useEffect(() => {
    (async () => {
      if (!isSupabaseConfigured()) {
        setLoggedIn(false);
        // Always enforce language + form filter even on local fallback
        const filteredLocal = (localItems || []).filter(it => !targetLang || (it.lang || '').toLowerCase() === targetLang.toLowerCase())
                                                .filter(it => ((it.form as any) || 'transliteration') === form);
        setItems(filteredLocal);
        return;
      }

      const u = await getCurrentUser();
      setLoggedIn(!!u);

      // Fetch remote translations with user info
      try {
        let remoteItems: TranslationRecord[] = [];
        if (sentenceIndex !== undefined) {
          // Always filter by target language when provided for sentence-specific translations
          if (targetLang) {
            remoteItems = await fetchTranslationsForSentence(lectureId, sentenceIndex, targetLang, form);
          } else {
            // If no target language specified, fetch all for this sentence (filter by form only)
            remoteItems = await fetchTranslationsForSentence(lectureId, sentenceIndex, undefined, form);
          }
        } else if (targetLang) {
          // Fetch all translations for lecture in target language
          remoteItems = await fetchTranslationsForLectureLang(lectureId, targetLang, true, form);
        }

        // Use remote items if available, otherwise use filtered local items
        let finalItems = remoteItems.length > 0 ? remoteItems : localItems;

        // Strict client-side filtering by language and form (defensive)
        finalItems = (finalItems || []).filter(it => !targetLang || (it.lang || '').toLowerCase() === targetLang.toLowerCase())
                                       .filter(it => ((it.form as any) || 'transliteration') === form);

        setItems(finalItems);
      } catch (error) {
        console.warn('Failed to fetch remote translations:', error);
        const filteredLocal = (localItems || []).filter(it => !targetLang || (it.lang || '').toLowerCase() === targetLang.toLowerCase())
                                                .filter(it => ((it.form as any) || 'transliteration') === form);
        setItems(filteredLocal);
      }
    })();
  }, [lectureId, sentenceIndex, targetLang, form, localItems]);

  const [summaries, setSummaries] = useState<Record<string, VoteSummary>>({});

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const fetchAll = async () => {
      const next: Record<string, VoteSummary> = {};
      for (const r of items) {
        const key = `${r.lang}|${((r.form as any) || 'transliteration')}|${r.text}`;
        const s = await getVoteSummary(lectureId, sentenceIndex, r.lang, r.text, (r.form as any) || 'transliteration');
        if (s) next[key] = s;
      }
      setSummaries(next);
    };
    fetchAll();
  }, [items, lectureId, sentenceIndex]);

  if (!items.length) {
    return <div className="text-xs text-gray-500">No translations yet. Be the first to contribute!</div>;
  }

  // Group by language code, keeping full translation records
  const byLang = items.reduce<Record<string, TranslationRecord[]>>((acc, r) => {
    (acc[r.lang] ||= []).push(r);
    return acc;
  }, {});

  const handleVote = async (lang: string, text: string, value: 1 | -1, itemSentenceIndex: number, itemForm: 'native' | 'transliteration') => {
    if (!isSupabaseConfigured() || !loggedIn) {
      toast({
        title: 'Login required',
        description: 'Only logged-in users can vote.',
      });
      return;
    }
    const res = await castVote(lectureId, itemSentenceIndex, lang, text, value, itemForm);
    if (res.needsLogin) {
      toast({
        title: 'Login required',
        description: 'Only logged-in users can vote.',
      });
      return;
    }
    if (res.ok) {
      const s = await getVoteSummary(lectureId, itemSentenceIndex, lang, text, itemForm);
      const key = `${lang}|${itemForm}|${text}`;
      if (s) setSummaries((prev) => ({ ...prev, [key]: s }));
    }
  };

  return (
    <div className="space-y-2">
      {Object.entries(byLang).map(([lang, translations]) => (
        <div key={lang} className="text-sm">
          <div className="font-medium text-gray-700 mb-1 flex items-center justify-between">
            <span>{langName(lang)}</span>
            {translations.length > 3 && (
              <button
                type="button"
                className="text-xs text-spiritual-700 hover:underline"
                onClick={() => setExpandedLangs((prev) => ({ ...prev, [lang]: !prev[lang] }))}
              >
                {expandedLangs[lang] ? 'Collapse' : `View all (${translations.length})`}
              </button>
            )}
          </div>
          <ul className="space-y-2">
            {[...translations]
              .sort((a, b) => {
                const ka = `${lang}|${((a.form as any) || 'transliteration')}|${a.text}`;
                const kb = `${lang}|${((b.form as any) || 'transliteration')}|${b.text}`;
                const sa = summaries[ka];
                const sb = summaries[kb];
                const scoreA = sa ? sa.up - sa.down : 0;
                const scoreB = sb ? sb.up - sb.down : 0;
                if (scoreB !== scoreA) return scoreB - scoreA;
                const upA = sa?.up || 0;
                const upB = sb?.up || 0;
                if (upB !== upA) return upB - upA;
                return 0;
              })
              .slice(0, expandedLangs[lang] ? translations.length : 3)
              .map((translation, i) => {
                const key = `${lang}|${((translation.form as any) || 'transliteration')}|${translation.text}`;
                const s = summaries[key];
                const score = s ? s.up - s.down : 0;
                const uv = s?.userVote ?? 0;
                return (
                  <li key={i} className="text-gray-700 border border-indian-saffron/30 rounded-md p-3 bg-white/60">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="flex-1">{translation.text}</span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          className={`px-1.5 py-0.5 text-xs rounded border ${uv === 1 ? 'bg-green-50 border-green-400 text-green-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                          onClick={() => handleVote(lang, translation.text, 1, translation.sentenceIndex, (translation.form as any) || 'transliteration')}
                          title={loggedIn ? 'Upvote' : 'Login required to vote'}
                        >
                          +{s ? ` ${s.up}` : ''}
                        </button>
                        <button
                          type="button"
                          className={`px-1.5 py-0.5 text-xs rounded border ${uv === -1 ? 'bg-red-50 border-red-400 text-red-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                          onClick={() => handleVote(lang, translation.text, -1, translation.sentenceIndex, (translation.form as any) || 'transliteration')}
                          title={loggedIn ? 'Downvote' : 'Login required to vote'}
                        >
                          -{s ? ` ${s.down}` : ''}
                        </button>
                        <span className="ml-1 text-xs text-gray-500">{s ? `score ${score}` : ''}</span>
                        {!loggedIn && (
                          <span className="ml-2 text-[11px] text-gray-400">Login to vote</span>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 ml-0">
                      by {translation.createdBy ? (
                        <Link to={`/user/${translation.createdByUsername || (translation.createdBy || '')}`} className="text-spiritual-700 hover:underline">
                          {translation.createdByUsername ? `@${translation.createdByUsername}` : (translation.createdByName || 'Contributor')}
                        </Link>
                      ) : (
                        translation.createdByName || 'Anonymous'
                      )}
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ExistingTranslations;

