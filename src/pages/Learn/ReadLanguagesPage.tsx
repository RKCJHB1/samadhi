import React, { useMemo, useEffect, useState } from 'react';
import TranslationLayout from '@/components/layout/TranslationLayout';
import { Link } from 'react-router-dom';
import { popularLanguages } from '@/data/languages';
import { getAllTranslations } from '@/store/translations';
import { vivekanandaLectures } from '@/data/readings/vivekanandaParliament';
import { countSentences } from '@/lib/translationUtils';
import { ChevronLeft, ChevronRight, Plus, Languages as LanguagesIcon, ArrowLeft } from 'lucide-react';
import { useTranslationStats } from '@/hooks/useTranslationStats';
import { isSupabaseConfigured, getApprovedLanguageCodes } from '@/services/translationsSupabase';
import { featureFlags } from '@/utils/featureFlags';
import NotFoundMessage from '@/components/learn/NotFoundMessage';

const ReadLanguagesPage: React.FC = () => {
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

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const languagesPerPage = 6;


  // Centralized stats
  const { stats: remoteStats, loading, totalSentences, getLangCount } = useTranslationStats();
  // Approved languages set (manual, reviewers, request rule, or any with approved translations)
  const [approvedLangs, setApprovedLangs] = useState<Set<string>>(new Set());
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!isSupabaseConfigured()) return;
      const set = await getApprovedLanguageCodes();
      if (!cancelled) setApprovedLangs(set);
    })();
    return () => { cancelled = true; };
  }, []);

  const supConfigured = Boolean(remoteStats);



  // Local translation counts by language
  const allTranslations = useMemo(() => getAllTranslations(), []);
  const byLang = useMemo(() => {
    // Prefer centralized remote stats; otherwise fallback to local
    if (remoteStats) {
      const map = new Map<string, number>();
      for (const ls of remoteStats.languageStats) {
        map.set(ls.lang, getLangCount(ls.lang, 'approved'));
      }
      return map;
    }
    // Fallback (no Supabase): count UNIQUE sentences per language locally
    const map = new Map<string, Set<string>>();
    for (const r of allTranslations) {
      const key = `${r.lectureId}#${r.sentenceIndex}`;
      if (!map.has(r.lang)) map.set(r.lang, new Set());
      map.get(r.lang)!.add(key);
    }
    const counts = new Map<string, number>();
    map.forEach((set, lang) => counts.set(lang, set.size));
    return counts;
  }, [allTranslations, remoteStats, getLangCount]);

  // Languages that have any activity (any translations), used only to decide "started" placement
  const startedLangs = useMemo(() => {
    if (supConfigured && remoteStats) {
      return new Set(
        remoteStats.languageStats
          .filter((ls) => (typeof ls.total === 'number' ? ls.total : 0) > 0)
          .map((ls) => ls.lang)
      );
    }
    // Fallback: any local translation marks the language as started
    const set = new Set<string>();
    for (const r of allTranslations) set.add(r.lang);
    return set;
  }, [allTranslations, remoteStats, supConfigured]);

  // Progress view model (English hidden) - percent uses APPROVED counts; "started" uses any activity
  const langProgress = useMemo(() => {
    // Only list EFFECTIVE approved languages to avoid non-approved items linking to blocked pages
    const languages = popularLanguages
      .filter((l) => l.code !== 'en')
      .filter((l) => approvedLangs.size === 0 ? true : approvedLangs.has(l.code))
      .map((l) => {
        const countApproved = byLang.get(l.code) || 0;
        const percent = totalSentences ? Math.round((countApproved / totalSentences) * 100) : 0;
        const started = startedLangs.has(l.code) || approvedLangs.has(l.code);
        return { ...l, count: countApproved, percent, isEn: false, started };
      });

    // Sort: higher progress first, then alphabetically
    return languages.sort((a, b) => {
      if (a.percent !== b.percent) return b.percent - a.percent;
      return a.name.localeCompare(b.name);
    });
  }, [byLang, startedLangs, totalSentences, approvedLangs]);

  // Requestable languages: those not in the effective approved set (hide until approved set is known)
  const requestableLangs = useMemo(() => {
    if (approvedLangs.size === 0) return [] as typeof popularLanguages;
    return popularLanguages.filter((l) => l.code !== 'en' && !approvedLangs.has(l.code));
  }, [approvedLangs]);

  // Pagination calculations
  const totalPages = Math.ceil(langProgress.length / languagesPerPage);
  const startIndex = (currentPage - 1) * languagesPerPage;
  const endIndex = startIndex + languagesPerPage;
  const currentLanguages = langProgress.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers with ellipsis logic
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // Show max 5 page numbers

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Show 1, 2, 3, ..., last
        pages.push(2, 3);
        if (totalPages > 4) pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show 1, ..., last-2, last-1, last
        pages.push('...');
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Show 1, ..., current, ..., last
        pages.push('...');
        pages.push(currentPage);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // While Supabase stats load, avoid showing an alphabetical grid that hides started languages on later pages
  if (supConfigured && loading) {
    return (
      <TranslationLayout title="Select a Language">
        <div className="w-full bg-gradient-to-br from-indian-cream to-white py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Link
                    to="/read"
                    className="flex items-center gap-2 px-3 py-2 bg-spiritual-100 text-spiritual-700 rounded-lg border border-spiritual-200 hover:bg-spiritual-200 transition-colors text-sm"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Read Home
                  </Link>
                  <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-gray-900">Select a Language</h1>
                </div>
              </div>
              <div className="flex items-center justify-center py-20 text-gray-700">Loading language stats…</div>
            </div>
          </div>
        </div>
      </TranslationLayout>
    );
  }

  return (
    <TranslationLayout title="Select a Language">
      <div className="w-full bg-gradient-to-br from-indian-cream to-white py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Link
                  to="/read"
                  className="flex items-center gap-2 px-3 py-2 bg-spiritual-100 text-spiritual-700 rounded-lg border border-spiritual-200 hover:bg-spiritual-200 transition-colors text-sm"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Read Home
                </Link>
                <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-gray-900">Select a Language</h1>
              </div>

            </div>

            {/* Notice about new language requests */}
            <div className="mb-6 rounded-lg border border-indian-saffron/30 bg-gradient-to-br from-indian-cream to-white p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-spiritual-100">
                    <span className="text-sm font-semibold text-spiritual-700">ℹ</span>
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  <p className="font-medium text-gray-900 mb-1">New Language Requirements</p>
                  <p>To start a translation in a new language, we need at least <strong>three people requesting</strong> that language. This ensures there's sufficient community interest and potential contributors for the translation effort.</p>
                </div>
              </div>
            </div>

            {/* Languages grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentLanguages.map((l) => {
                const barClass = l.percent >= 75
                  ? 'bg-green-500'
                  : l.percent >= 50
                  ? 'bg-orange-500'
                  : l.percent >= 25
                  ? 'bg-yellow-500'
                  : 'bg-red-500';

                if (!l.started) {
                  return (
                    <Link
                      to={`/read/request/${l.code}`}
                      key={l.code}
                      className="flex flex-col gap-4 rounded-lg border border-dashed border-gray-400 bg-gray-100 p-5 text-center transition-colors hover:bg-gray-200 hover:border-gray-500 opacity-60 hover:opacity-80"
                    >
                      <div className="flex flex-col items-center justify-center gap-3">
                        <Plus className="h-8 w-8 text-gray-500" />
                        <h3 className="text-lg font-bold text-gray-800">{l.name}</h3>
                        <p className="text-sm text-gray-600">Translation not started</p>
                      </div>
                    </Link>
                  );
                }

                return (
                  <Link
                    to={`/read/languages/${l.code}/stats`}
                    key={l.code}
                    className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <LanguagesIcon className="h-6 w-6 text-gray-500" />
                        <h3 className="text-lg font-bold text-gray-900">{l.name}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500" title="Approved translations">Approved</span>
                        <span className={`${l.percent >= 75 ? 'text-green-600' : l.percent >= 50 ? 'text-orange-600' : l.percent >= 25 ? 'text-yellow-600' : 'text-red-600'} text-sm font-semibold`}>{l.percent}%</span>
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200" title="Approved translations">
                      <div className={`h-2 rounded-full ${barClass}`} style={{ width: `${l.percent}%` }} />
                    </div>
                    <p className="text-sm text-gray-600">{l.count} of {totalSentences} sentences approved</p>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 rounded-md border border-indian-saffron/30 bg-gradient-to-br from-indian-cream to-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gradient-to-br hover:from-indian-cream hover:to-indian-cream/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>

                <div className="flex items-center gap-1 text-sm text-gray-700">
                  {getPageNumbers().map((page, index) => (
                    <React.Fragment key={`${page}-${index}`}>
                      {page === '...' ? (
                        <span className="px-2 py-1 text-gray-400">...</span>
                      ) : (
                        <button
                          onClick={() => goToPage(page as number)}
                          className={`px-2 py-1 rounded transition-colors ${
                            page === currentPage
                              ? 'bg-spiritual-500 text-white font-semibold'
                              : 'text-gray-700 hover:text-spiritual-600 hover:bg-indian-cream/50'
                          }`}
                        >
                          {page}
                        </button>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 rounded-md border border-indian-saffron/30 bg-gradient-to-br from-indian-cream to-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gradient-to-br hover:from-indian-cream hover:to-indian-cream/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Requestable languages (not yet approved) */}
            {requestableLangs.length > 0 && (
              <div className="mt-12">
                <h2 className="text-xl font-heading font-semibold text-gray-900 mb-4">Other languages you can request</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {requestableLangs.map((l) => (
                    <Link
                      to={`/read/request/${l.code}`}
                      key={l.code}
                      className="flex flex-col gap-4 rounded-lg border border-dashed border-gray-400 bg-gray-100 p-5 text-center transition-colors hover:bg-gray-200 hover:border-gray-500"
                    >
                      <div className="flex flex-col items-center justify-center gap-3">
                        <Plus className="h-8 w-8 text-gray-500" />
                        <h3 className="text-lg font-bold text-gray-800">{l.name}</h3>
                        <p className="text-sm text-gray-600">Request this language</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </TranslationLayout>
  );
};

export default ReadLanguagesPage;
