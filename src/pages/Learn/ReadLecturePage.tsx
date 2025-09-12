import React, { useEffect, useMemo, useState, useRef } from 'react';
import TranslationLayout from '../../components/layout/TranslationLayout';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import NotFoundMessage from '../../components/learn/NotFoundMessage';
import { vivekanandaLectures } from '../../data/readings/vivekanandaParliament';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { popularLanguages } from '@/data/languages';
import { ArrowLeft, Info, Lock } from 'lucide-react';

import { useToast } from '@/hooks/use-toast';
import ExistingTranslations from '@/components/learn/ExistingTranslations';

import SocialShareButtons from '@/components/shared/SocialShareButtons';
import CharacterPalette, { TRANSLITERATION_IAST } from '@/components/learn/CharacterPalette';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import {
  upsertTranslation,
  getTranslationsForLectureLangForm,
} from '@/store/translations';
import { fetchTranslationsForLectureLang as fetchTranslationsForLectureLangRemote, insertTranslationRemote, isSupabaseConfigured, getCurrentUser, getProfile, getApprovedLanguageCodes } from '@/services/translationsSupabase';
import {
  splitLectureParagraphs,
  buildSentenceOffsets,
} from '@/lib/translationUtils';
import { featureFlags } from '@/utils/featureFlags';



const ReadLecturePage: React.FC = () => {
  const { toast } = useToast();
  const { lectureId } = useParams();

  if (!featureFlags.enableReadingSection) {
    return (
      <NotFoundMessage
        title="Reading Section Unavailable"
        message="This reading section is currently disabled."
        backTo="/read"
        backLabel="Back to Learning Centre"
      />
    );
  }

  const lecture = vivekanandaLectures.find(l => l.id === lectureId);

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

  const idx = vivekanandaLectures.findIndex(l => l.id === lecture.id);
  const prev = idx > 0 ? vivekanandaLectures[idx - 1] : undefined;
  const next = idx < vivekanandaLectures.length - 1 ? vivekanandaLectures[idx + 1] : undefined;

  // Approved languages set (manual approvals ∪ reviewers ∪ 3‑request rule ∪ languages with approved translations)
  const [approvedLangs, setApprovedLangs] = useState<Set<string>>(new Set());
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!isSupabaseConfigured()) return;
      const set = await getApprovedLanguageCodes();
      if (cancelled) return;
      setApprovedLangs(set);
    })();
    return () => { cancelled = true; };
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const nonEnglishAll = useMemo(() => popularLanguages.filter(l => l.code !== 'en'), []);
  const availableLangs = useMemo(() => {
    // When Supabase is configured and there are any approved languages, restrict to that set.
    if (isSupabaseConfigured() && approvedLangs.size > 0) {
      return nonEnglishAll.filter(l => approvedLangs.has(l.code.toLowerCase()));
    }
    // Otherwise (no Supabase or none approved yet), allow all non‑English languages for now.
    return nonEnglishAll;
  }, [approvedLangs, nonEnglishAll]);
  const urlLang = searchParams.get('lang');
  const [targetLang, setTargetLang] = useState<string>(() => {
    // Respect incoming ?lang as-is (including 'en' for read‑resume links). Otherwise, first available.
    if (urlLang) return urlLang;
    return (availableLangs[0]?.code || 'es');
  });


  // Keep URL ?lang in sync when targetLang changes, but do not override #hash or force-switch away from 'en'
  useEffect(() => {
    const langParam = searchParams.get('lang');
    if (langParam === targetLang) return;
    // Avoid churn when targetLang is 'en' coming from resume links
    if (targetLang === 'en') return;
    const sp = new URLSearchParams(searchParams);
    sp.set('lang', targetLang);
    setSearchParams(sp, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetLang]);

  // If approved list loads and current targetLang becomes invalid, switch to first available
  useEffect(() => {
    // Never auto-switch when targetLang is 'en' (resume from profile)
    if (targetLang === 'en') return;
    if (!availableLangs.some(l => l.code === targetLang)) {
      const next = availableLangs[0]?.code;
      if (next) setTargetLang(next);
    }
  }, [availableLangs, targetLang]);

  // When URL ?lang changes externally, update targetLang if valid
  useEffect(() => {
    const langParam = searchParams.get('lang');
    if (langParam && availableLangs.some(l => l.code === langParam) && langParam !== targetLang) {
      setTargetLang(langParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Split sentences per paragraph so we can preserve paragraph formatting in Read tab
  const perParagraphSentences = useMemo(() => splitLectureParagraphs(lecture.paragraphs), [lecture.paragraphs]);

  // Flatten for Translate tab
  const sentences = useMemo(() => perParagraphSentences.flat(), [perParagraphSentences]);

  // Prefix sums for global indices: sentenceOffsets[pIdx] = start index in flattened list
  const sentenceOffsets = useMemo(() => buildSentenceOffsets(perParagraphSentences), [perParagraphSentences]);
  // Local state for draft translations per sentence index
  const [drafts, setDrafts] = useState<Record<number, string>>({});

  const [showUntranslatedOnly, setShowUntranslatedOnly] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'read' | 'translate'>('read');

  const [viewInTarget, setViewInTarget] = useState<boolean>(false);


  const [userId, setUserId] = useState<string | null>(null);
  const [userLangs, setUserLangs] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!isSupabaseConfigured()) return;
      const u = await getCurrentUser();
      if (cancelled) return;
      if (!u) { setUserId(null); setUserLangs(new Set()); return; }
      setUserId(u.id);
      const prof = await getProfile(u.id);
      if (cancelled) return;
      const arr = (prof?.language_proficiency as any[] | undefined) || [];
      const codes = new Set<string>(arr.map((p:any) => (p.code || '').toLowerCase()).filter(Boolean));
      setUserLangs(codes);
    })();
    return () => { cancelled = true; };
  }, [lecture.id, targetLang]);

  const hasProficiency = useMemo(() => userLangs.has(targetLang.toLowerCase()), [userLangs, targetLang]);
  // Enable transliteration only for languages with a defined scheme
  const romanizationScheme: string | null = useMemo(() => {
    if (targetLang.toLowerCase() === 'hi') return 'IAST';
    return null;
  }, [targetLang]);


  // Translations for current lecture & lang (transliteration only). Prefer Supabase if configured, merge into local.
  const translationsForTarget = useMemo(() => getTranslationsForLectureLangForm(lecture.id, targetLang, 'transliteration'), [lecture.id, targetLang]);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!isSupabaseConfigured()) return;
      const remoteTranslit = await fetchTranslationsForLectureLangRemote(lecture.id, targetLang, true, 'transliteration');
      if (!cancelled && remoteTranslit.length) {
        for (const r of remoteTranslit) {
          const formVal = 'transliteration' as const;
          if (!getTranslationsForLectureLangForm(lecture.id, targetLang, formVal).some(x => x.sentenceIndex === r.sentenceIndex && x.text === r.text)) {
            upsertTranslation({ lectureId: r.lectureId, sentenceIndex: r.sentenceIndex, lang: r.lang, text: r.text, form: formVal, romanization_scheme: (r as any).romanization_scheme ?? null });
          }
        }
      }
    })();
    return () => { cancelled = true; };
  }, [lecture.id, targetLang]);
  const translatedIdxSet = useMemo(() => new Set(translationsForTarget.map(r => r.sentenceIndex)), [translationsForTarget]);
  const translatedTextByIdx = useMemo(() => {
    const m = new Map<number, string>();
    // Prefer transliteration entries
    const translits = getTranslationsForLectureLangForm(lecture.id, targetLang, 'transliteration');
    for (const r of translits) {
      if (!m.has(r.sentenceIndex)) m.set(r.sentenceIndex, r.text);
    }
    // Fallback to native if no transliteration present for a sentence (compatibility with older submissions)
    const natives = getTranslationsForLectureLangForm(lecture.id, targetLang, 'native');
    for (const r of natives) {
      if (!m.has(r.sentenceIndex)) m.set(r.sentenceIndex, r.text);
    }
    return m;
  }, [lecture.id, targetLang, translationsForTarget]);

  // Persist drafts locally per lectureId and targetLang
  useEffect(() => {
    const key = `drafts:${lecture.id}:${targetLang}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try { setDrafts(JSON.parse(saved)); } catch {}
    } else {
      setDrafts({});
    }
  }, [lecture.id, targetLang]);

  useEffect(() => {
    const key = `drafts:${lecture.id}:${targetLang}`;
    localStorage.setItem(key, JSON.stringify(drafts));
  }, [drafts, lecture.id, targetLang]);

  // Scroll to a specific sentence when arriving with #sent-N in the URL
  useEffect(() => {
    const hash = window.location.hash || '';
    const m = hash.match(/^#sent-(\d+)$/);
    if (!m) return;
    const idx = parseInt(m[1], 10);
    const scrollToEl = () => {
      const el = document.getElementById(`sent-${idx}`);
      if (!el) return false;
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
      return true;
    };
    const t1 = window.setTimeout(scrollToEl, 120);
    const t2 = window.setTimeout(scrollToEl, 400);
    return () => { window.clearTimeout(t1); window.clearTimeout(t2); };
  }, [lecture.id]);






  const handleDraftChange = (i: number, val: string) => {
    setDrafts((d) => ({ ...d, [i]: val }));
  };

  return (
    <TranslationLayout title={`Translate: ${lecture.title}`}>
      <div className="w-full bg-gradient-to-br from-indian-cream to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <Link
                  to={`/read?lang=${targetLang}`}
                  className="flex items-center gap-2 px-3 py-2 bg-spiritual-100 text-spiritual-700 rounded-lg border border-spiritual-200 hover:bg-spiritual-200 transition-colors text-sm"
                >



                  <ArrowLeft className="h-4 w-4" />
                  Read Home
                </Link>
                <span className="text-gray-500">Lecture {idx + 1} of {vivekanandaLectures.length}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="ml-3 inline-flex items-center gap-1 text-xs text-gray-600 cursor-help">
                        <Info className="h-3.5 w-3.5" />
                        Reading progress is tracked on the Read page only
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      Reading activity isn’t recorded here. Use the “Read Home” link to track progress.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center gap-3">


                <div className="text-sm text-gray-700 hidden md:block">Translate into</div>
                <div className="min-w-[220px]">
                  <Select value={targetLang} onValueChange={setTargetLang}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Target language" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableLangs.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
	                </div>
                {/* Per-sentence inputs will show both Native and Transliteration; removing page-level form toggle */}
	              </div>
            </div>
          </div>
        </div>

            <div className="container mx-auto px-4"><div className="max-w-5xl mx-auto w-full">
              <div className="mb-4 text-center">
                <p className="text-sm text-gray-600 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 inline-block">
                  Click on any sentence to translate it.
                </p>
              </div>
                <article className="bg-gradient-to-br from-white to-yellow-50 border border-indian-saffron/30 rounded-lg shadow p-6 md:p-8">
                  <header className="mb-6 text-center">
                    <h1 className="text-3xl font-heading font-bold mb-1">{lecture.title}</h1>
                    <div className="text-gray-600 text-sm">{lecture.date}</div>
                    <div className="mt-3 flex items-center justify-center gap-2 text-sm">
                      <input id="viewTarget" type="checkbox" checked={viewInTarget} onChange={(e) => setViewInTarget(e.target.checked)} />
                      <label htmlFor="viewTarget" className="text-gray-700">View in target language when available</label>
                    </div>
                  </header>

                  <div className="prose prose-lg md:prose-xl max-w-prose mx-auto px-1 space-y-4">
                    {perParagraphSentences.map((sentArr, pIdx) => (
                      <p key={pIdx} className={pIdx === 0 ? 'first-letter:text-5xl first-letter:font-heading first-letter:mr-2 first-letter:float-left first-letter:leading-none' : ''}>
                        {sentArr.map((s, sIdx) => {
                          const globalIdx = sentenceOffsets[pIdx] + sIdx;
                          const t = translatedTextByIdx.get(globalIdx);
                          const isMissing = viewInTarget && !t;
                          const display = viewInTarget ? (t || s) : s;
                          return (
                            <span
                              key={globalIdx}
                              data-idx={globalIdx}
                              className={`cursor-pointer hover:bg-yellow-100/60 transition-colors ${isMissing ? 'opacity-60 blur-[1px]' : ''}`}
                              title={isMissing ? 'No translation yet — click to contribute' : 'Click to translate this sentence'}
                              onClick={async () => {
                                setTimeout(() => {
                                  const el = document.querySelector(`#sent-${globalIdx}`) as HTMLElement | null;
                                  if (el) {
                                    const y = el.getBoundingClientRect().top + window.scrollY - 80; // offset for navbar
                                    window.scrollTo({ top: y, behavior: 'smooth' });
                                  }
                                }, 50);

                              }}
                            >
                              {display + ' '}
                              {isMissing && <span className="text-gray-400 align-super">••• </span>}
                            </span>
                          );
                        })}
                      </p>
                    ))}



                  </div>


                  <SocialShareButtons
                    url={window.location.href}
                    title={`${lecture.title} - Swami Vivekananda`}
                    description={`Read "${lecture.title}" by Swami Vivekananda from the 1893 Parliament of Religions.`}
                  />
                </article>

                <article className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/30 rounded-lg shadow p-6 md:p-8 mt-6">
                  <header className="mb-6">
                    <h2 className="text-2xl font-heading font-semibold mb-1">Translate Sentences</h2>
                    <p className="text-sm text-gray-600">Translate each sentence independently. Your drafts are kept locally for now.</p>
                  </header>

	                  {/* Proficiency notice */}
	                  {isSupabaseConfigured() && (
	                    <div className="mb-4 text-sm">
	                      {!userId ? (
	                        <div className="p-3 rounded border bg-white/70">
	                          Please log in and declare your language proficiency to submit translations. You can still save drafts locally. <Link className="underline" to="/read/profile">Manage proficiency</Link>
	                        </div>
	                      ) : !hasProficiency ? (
	                        <div className="p-3 rounded border bg-amber-50 text-amber-800">
	                          You have not declared proficiency in {targetLang.toUpperCase()}. Add it in your <Link className="underline" to="/read/profile">Translation Profile</Link> to submit. Drafts can still be saved locally.
	                        </div>
	                      ) : null}
	                    </div>
	                  )}


                  {/* Filters */}
                  <div className="flex items-center justify-end mb-4 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <input id="untranslated" type="checkbox" checked={showUntranslatedOnly} onChange={(e) => setShowUntranslatedOnly(e.target.checked)} />
                      <label htmlFor="untranslated" className="text-gray-700">Show untranslated only</label>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {sentences.map((s, i) => {
                      // If filtering for untranslated only, require that no transliteration exists
                      if (showUntranslatedOnly) {
                        const any = translationsForTarget.some(r => r.sentenceIndex === i);
                        if (any) return null;
                      }
                      const existingTranslit = getTranslationsForLectureLangForm(lecture.id, targetLang, 'transliteration').find(r => r.sentenceIndex === i)?.text || '';
                      const existingNative = getTranslationsForLectureLangForm(lecture.id, targetLang, 'native').find(r => r.sentenceIndex === i)?.text || '';
                      const translitDraft = (drafts[i] ?? existingTranslit) || existingNative;

                      return (
                        <div key={i} id={`sent-${i}`} className="bg-white rounded-md border border-indian-saffron/20 p-4">
                          <div className="text-sm text-gray-600 mb-2 flex items-center justify-between">
                            <span>Sentence {i + 1}</span>
                            {existingTranslit ? (
                              <span className="text-blue-600">Translated</span>
                            ) : translitDraft ? (
                              <span className="text-green-600">Saved</span>
                            ) : (
                              <span className="text-gray-400">No translation yet</span>
                            )}
                          </div>
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <p className="font-medium text-gray-900">{s}</p>
                              <div>
                                <div className="text-xs font-medium text-gray-600 mb-1">Transliteration</div>
                                <Textarea
                                  id={`translation-${lecture.id}-${i}-${targetLang}-transliteration`}
                                  name="translation-transliteration"
                                  dir="ltr"
                                  placeholder={romanizationScheme ? "Write transliteration with diacritics…" : "Write transliteration (no diacritics)"}
                                  value={translitDraft}
                                  onChange={(e) => setDrafts(d => ({ ...d, [i]: e.target.value }))}
                                  className="bg-white border-indian-saffron/40"
                                  autoComplete="off"
                                  aria-label={`Transliteration for sentence ${i + 1} in ${targetLang.toUpperCase()}`}
                                />
                                {romanizationScheme && (
                                  <CharacterPalette
                                    chars={TRANSLITERATION_IAST}
                                    label="Diacritics"
                                    onInsert={(ch)=>{
                                      const el = document.getElementById(`translation-${lecture.id}-${i}-${targetLang}-transliteration`) as HTMLTextAreaElement | null;
                                      const cur = translitDraft || '';
                                      if (!el) { setDrafts(d => ({ ...d, [i]: cur + ch })); return; }
                                      const start = el.selectionStart ?? cur.length;
                                      const end = el.selectionEnd ?? cur.length;
                                      const next = cur.slice(0, start) + ch + cur.slice(end);
                                      setDrafts(d => ({ ...d, [i]: next }));
                                      setTimeout(()=>{ const pos = start + ch.length; el.focus(); el.setSelectionRange(pos, pos); }, 0);
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Existing transliterations list (always show, even without diacritics) */}
                          <div className="mt-3 border-t pt-3">
                            <ExistingTranslations lectureId={lecture.id} sentenceIndex={i} targetLang={targetLang} form="transliteration" />
                          </div>

                          {/* Save/Submit actions */}
                          <div className="flex flex-wrap items-center gap-2 mt-3">
                            <Button variant="outline" size="sm" onClick={() => { toast({ title: 'Drafts saved locally' }); }}>
                              Save Drafts
                            </Button>
                            <Button size="sm" disabled={isSupabaseConfigured() && (!userId || !hasProficiency)} title={isSupabaseConfigured() && (!userId || !hasProficiency) ? 'Add language proficiency in your profile to submit' : undefined} onClick={async () => {
                              const t = (translitDraft || '').trim();
                              if (!t) { toast({ title: 'Please enter a transliteration first.' }); return; }
                              upsertTranslation({ lectureId: lecture.id, sentenceIndex: i, lang: targetLang, text: t, form: 'transliteration', romanization_scheme: romanizationScheme || null });
                              if (isSupabaseConfigured()) {
                                const user = await getCurrentUser();
                                if (!user) { window.location.href = `/auth/login?next=${encodeURIComponent(window.location.pathname + window.location.search + window.location.hash)}`; return; }
                                await insertTranslationRemote({ lectureId: lecture.id, sentenceIndex: i, lang: targetLang, text: t, form: 'transliteration', romanization_scheme: (romanizationScheme || null) as any });
                              }
                              toast({ title: isSupabaseConfigured() ? 'Submitted (pending review)' : 'Submitted locally for now' });
                            }}>
                              {isSupabaseConfigured() && (!userId || !hasProficiency) && (
                                <Lock className="h-3 w-3 mr-1 inline-block align-[-2px]" />
                              )}
                              Submit
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <nav className="mt-8 flex items-center justify-between">
                    <div>
                      {prev ? (
                        <Link to={`/read/${prev.id}?lang=${targetLang}`} className="text-spiritual-600 hover:text-spiritual-700">← {prev.title}</Link>
                      ) : <span />}
                    </div>


                    <div>
                      {next ? (
                        <Link to={`/read/${next.id}?lang=${targetLang}`} className="text-spiritual-600 hover:text-spiritual-700">{next.title} →</Link>
                      ) : <span />}


                    </div>
                  </nav>
                </article>
            </div>
            </div>
      </div>
    </TranslationLayout>
  );
};

export default ReadLecturePage;

