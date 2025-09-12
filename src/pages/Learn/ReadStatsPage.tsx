import React, { useMemo, useEffect, useState } from 'react';
import TranslationLayout from '../../components/layout/TranslationLayout';
import NotFoundMessage from '../../components/learn/NotFoundMessage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { vivekanandaLectures } from '@/data/readings/vivekanandaParliament';
import { getAllTranslations, mostTranslatedSentence } from '@/store/translations';
import { countSentences, flattenSentences } from '@/lib/translationUtils';
import { popularLanguages } from '@/data/languages';
import { getAggregatedReadingStats } from '@/store/reading';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useSearchParams } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useTranslationStats } from '@/hooks/useTranslationStats';
import { fetchReadingOverviewCounts, getApprovedLanguageCodes } from '@/services/translationsSupabase';
import { featureFlags } from '@/utils/featureFlags';
import {
  Globe,
  BookOpen,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  XCircle,
  BarChart3,
  Languages as LanguagesIcon,
  Activity
} from 'lucide-react';

const ReadStatsPage: React.FC = () => {
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

  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const highlightLang = searchParams.get('lang');
  const [readingOverview, setReadingOverview] = useState<{ totalRegistered: number; totalReaders: number; activeReaders24h: number; activeReaders3d: number; activeReaders7d: number; totalSessions: number } | null>(null);
  const [approvedLangs, setApprovedLangs] = useState<Set<string> | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [overview, approved] = await Promise.all([
          fetchReadingOverviewCounts(),
          getApprovedLanguageCodes(),
        ]);
        if (!cancelled) {
          setReadingOverview(overview);
          setApprovedLangs(approved);
        }
      } catch {}
    })();
    return () => { cancelled = true; };
  }, []);


  // Centralized stats
  const { stats: remoteStats, loading, totalSentences, getLangCount } = useTranslationStats();

  // Get aggregated personal reading statistics
  const aggregatedReadingStats = useMemo(() => getAggregatedReadingStats(vivekanandaLectures), []);

  // Helper function to format duration
  const formatDuration = (ms: number): string => {
    if (ms < 60000) return `${Math.round(ms / 1000)}s`;
    if (ms < 3600000) return `${Math.round(ms / 60000)}m`;
    return `${Math.round(ms / 3600000)}h ${Math.round((ms % 3600000) / 60000)}m`;
  };

  // Local data (fallback)
  const all = useMemo(() => getAllTranslations(), []);
  const most = useMemo(() => mostTranslatedSentence(), [all]);
  const totals = useMemo(() => {
    const byLang = new Map<string, number>();
    for (const r of all) byLang.set(r.lang, (byLang.get(r.lang) || 0) + 1);
    return Array.from(byLang.entries()).sort((a, b) => b[1] - a[1]);
  }, [all]);

  // Helper function to get language name from code
  const getLanguageName = (langCode: string): string => {
    const language = popularLanguages.find(l => l.code === langCode);
    return language ? language.name : langCode.toUpperCase();
  };

  // Per-language completion numerator (unique sentences translated per language)
  const perLanguageCompleted = useMemo(() => {
    if (remoteStats) {
      const map = new Map<string, number>();
      for (const ls of remoteStats.languageStats) {
        map.set(ls.lang, getLangCount(ls.lang, 'approved'));
      }
      return map;
    }
    // Local fallback: count unique sentences per language
    const byLangKeys = new Map<string, Set<string>>();
    for (const r of all) {
      const key = `${r.lectureId}#${r.sentenceIndex}`;
      if (!byLangKeys.has(r.lang)) byLangKeys.set(r.lang, new Set());
      byLangKeys.get(r.lang)!.add(key);
    }
    const counts = new Map<string, number>();
    byLangKeys.forEach((set, lang) => counts.set(lang, set.size));
    return counts;
  }, [remoteStats, all, getLangCount]);

  const getLectureTitle = (lectureId: string) => {
    const lecture = vivekanandaLectures.find(l => l.id === lectureId);
    return lecture ? lecture.title : lectureId;
  };

  // Use remote stats if available, otherwise fall back to local
  const displayStats = remoteStats || {
    totalTranslations: all.length,
    totalApproved: all.length, // Local translations are considered approved
    totalPending: 0,
    totalRejected: 0,
    languageStats: totals.map(([lang, count]) => ({
      lang,
      total: count,
      approved: count,
      pending: 0,
      rejected: 0,
      lecturesCovered: new Set(all.filter(t => t.lang === lang).map(t => t.lectureId)).size
    })),
    lectureStats: vivekanandaLectures.map(lecture => {
      const lectureTranslations = all.filter(t => t.lectureId === lecture.id);
      return {
        lectureId: lecture.id,
        total: lectureTranslations.length,
        approved: lectureTranslations.length,
        languagesCovered: new Set(lectureTranslations.map(t => t.lang)).size
      };
    }).filter(stat => stat.total > 0).sort((a, b) => b.total - a.total),
    recentActivity: [],
    topContributors: []
  };

  // Filter per-language stats to show only approved/effective languages
  const filteredLanguageStats = useMemo(() => {
    const list = displayStats.languageStats || [];
    if (!approvedLangs) return list;
    return list.filter(ls => approvedLangs.has(ls.lang));
  }, [displayStats, approvedLangs]);

  const filteredRecentActivity = useMemo(() => {
    if (!remoteStats) return [] as typeof remoteStats.recentActivity;
    if (!approvedLangs) return remoteStats.recentActivity;
    return remoteStats.recentActivity.filter(a => approvedLangs.has(a.lang));
  }, [remoteStats, approvedLangs]);

  if (loading) {
    return (
      <TranslationLayout title="Translation Statistics">
        <div className="w-full bg-gradient-to-br from-indian-cream to-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center">
                    <Activity className="animate-spin h-6 w-6 mr-2" />
                    Loading statistics...
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </TranslationLayout>
    );
  }

  const pageTitle = highlightLang
    ? `${getLanguageName(highlightLang)} Translation Statistics`
    : "Translation Statistics";

  return (
    <TranslationLayout title={pageTitle}>
      <div className="w-full bg-gradient-to-br from-indian-cream to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-6">

            {/* Header with language-specific info */}
            {highlightLang && (
              <Card className="bg-gradient-to-r from-spiritual-50 to-spiritual-100 border-spiritual-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-heading font-bold text-spiritual-800 mb-2">
                        {getLanguageName(highlightLang)} Translation Statistics
                      </h1>
                      <p className="text-spiritual-700">
                        Detailed statistics for {getLanguageName(highlightLang)} translations across all lectures
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link
                        to="/read"
                        className="flex items-center gap-2 px-3 py-2 bg-spiritual-100 text-spiritual-700 rounded-lg border border-spiritual-200 hover:bg-spiritual-200 transition-colors text-sm"
                      >
                        ← Read Home
                      </Link>
                      <Link
                        to="/read/languages"
                        className="flex items-center gap-2 px-4 py-2 bg-white text-spiritual-700 rounded-lg border border-spiritual-300 hover:bg-spiritual-50 transition-colors"
                      >
                        ← Back to Languages
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Total Translations</p>
                      <p className="text-2xl font-bold text-blue-900">{displayStats.totalTranslations.toLocaleString()}</p>
                    </div>
                    <Globe className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Approved</p>
                      <p className="text-2xl font-bold text-green-900">{displayStats.totalApproved.toLocaleString()}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-yellow-600">Pending Review</p>
                      <p className="text-2xl font-bold text-yellow-900">{displayStats.totalPending.toLocaleString()}</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Languages</p>
                      <p className="text-2xl font-bold text-purple-900">{filteredLanguageStats.length}</p>
                    </div>
                    <LanguagesIcon className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* User Engagement Statistics */}
            <Card className="bg-gradient-to-br from-white to-blue-50 border border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" /> Reading & Engagement Overview
                </CardTitle>

              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y divide-blue-100 sm:divide-y-0 sm:divide-x">
                  {/* Supabase engagement */}
                  <div className="sm:px-4">
                    <h4 className="text-sm font-medium text-blue-700 border-b border-blue-200 pb-1">User Engagement</h4>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Total users</span>
                        <span className="font-semibold text-blue-800">{readingOverview ? readingOverview.totalRegistered.toLocaleString() : '—'}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Active (24h)</span>
                        <span className="font-semibold text-blue-800">{readingOverview ? readingOverview.activeReaders24h.toLocaleString() : '—'}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Active (3d)</span>
                        <span className="font-semibold text-blue-800">{readingOverview ? readingOverview.activeReaders3d.toLocaleString() : '—'}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Active (7d)</span>
                        <span className="font-semibold text-blue-800">{readingOverview ? readingOverview.activeReaders7d.toLocaleString() : '—'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Reading progress (local) */}
                  <div className="sm:px-4">
                    <h4 className="text-sm font-medium text-indigo-700 border-b border-indigo-200 pb-1">Reading Progress</h4>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Total readers</span>
                        <span className="font-semibold text-indigo-800">{aggregatedReadingStats.totalUsers.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Sentences read</span>
                        <span className="font-semibold text-indigo-800">{aggregatedReadingStats.totalSentencesRead.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Reading time</span>
                        <span className="font-semibold text-indigo-800">{formatDuration(aggregatedReadingStats.totalDurationMs)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Lecture stats (local) */}
                  <div className="sm:px-4">
                    <h4 className="text-sm font-medium text-purple-700 border-b border-purple-200 pb-1">Lectures</h4>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Started</span>
                        <span className="font-semibold text-purple-800">{aggregatedReadingStats.totalLecturesStarted.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Completed</span>
                        <span className="font-semibold text-purple-800">{aggregatedReadingStats.totalLecturesCompleted.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">In progress</span>
                        <span className="font-semibold text-purple-800">{aggregatedReadingStats.totalLecturesInProgress.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-[11px] text-gray-600 mt-4">
                  Supabase metrics show platform-wide activity. Local metrics aggregate anonymized progress saved in browsers.
                </div>
              </CardContent>
            </Card>


            {/* Progress Overview */}
            <Card className="bg-gradient-to-br from-white to-yellow-50 border border-indian-saffron/30">
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Translation Progress (Per-Language)</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Click on a language below to find out stats specific to that language.
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-gray-700">
                  <p>
                    Completion percentages are per-language: a translation in one language does not count toward another.
                  </p>
                  {filteredLanguageStats.length === 0 ? (
                    <div className="text-sm text-gray-600">No translations yet.</div>
                  ) : (
                    <div className="space-y-3">
                      {filteredLanguageStats.map((langStat) => {
                        const langTotal = perLanguageCompleted.get(langStat.lang) || 0;
                        const pct = totalSentences ? Math.min(100, Math.round((langTotal / totalSentences) * 100)) : 0;
                        return (
                          <Link
                            key={langStat.lang}
                            to={`/read/stats?lang=${langStat.lang}`}
                            className="flex items-center justify-between rounded-md hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-spiritual-300 transition-colors p-2 -mx-2 px-3"
                          >
                            <div className="flex-1 mr-3">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{getLanguageName(langStat.lang)}</span>
                                <Badge variant="secondary" className="text-xs">{langStat.lecturesCovered} lect.</Badge>
                              </div>
                              <div className="text-xs text-gray-500">{langTotal} / {totalSentences} sentences</div>
                            </div>
                            <div className="w-40">
                              <Progress value={pct} />
                              <div className="text-[11px] text-right text-gray-500 mt-0.5">{pct}%</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  {most && (() => {
                    const [lecId, idxStr] = most.key.split('#');
                    const sentIdx = parseInt(idxStr, 10);
                    const lec = vivekanandaLectures.find(l => l.id === lecId);
                    const sentence = lec ? flattenSentences(lec.paragraphs)[sentIdx] : '';
                    const firstFive = sentence ? sentence.split(/\s+/).slice(0, 5).join(' ') : most.key;
                    return (
                      <div className="text-sm text-gray-600 mt-4 p-3 bg-gray-50 rounded-lg">
                        <strong>Most translated sentence:</strong> <Link className="text-spiritual-600 hover:underline" to={`/read/${lecId}?lang=en#sent-${sentIdx}`}>{firstFive}…</Link> • {most.total} translations
                      </div>
                    );
                  })()}
                </div>
              </CardContent>
            </Card>

            {/* Language Statistics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border border-indian-saffron/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LanguagesIcon className="h-5 w-5" />
                    Languages ({filteredLanguageStats.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredLanguageStats.length === 0 ? (
                    <div className="text-sm text-gray-600">No translations yet.</div>
                  ) : (
                    <div className="space-y-3">
                      {(() => {
                        // Sort languages to show highlighted language first
                        const sortedStats = [...filteredLanguageStats];
                        if (highlightLang) {
                          sortedStats.sort((a, b) => {
                            if (a.lang === highlightLang) return -1;
                            if (b.lang === highlightLang) return 1;
                            return b.total - a.total; // Keep original sorting for others
                          });
                        }
                        return sortedStats.map((langStat) => {
                          const isHighlighted = highlightLang === langStat.lang;
                          return (
                            <div
                              key={langStat.lang}
                              className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                                isHighlighted
                                  ? 'bg-gradient-to-r from-spiritual-100 to-spiritual-50 border-2 border-spiritual-300 shadow-md'
                                  : 'bg-gray-50 hover:bg-gray-100'
                              }`}
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className={`font-medium ${isHighlighted ? 'text-spiritual-800' : ''}`}>
                                    {getLanguageName(langStat.lang)}
                                  </span>
                                  {isHighlighted && (
                                    <Badge variant="default" className="text-xs bg-spiritual-500 text-white">
                                      Selected
                                    </Badge>
                                  )}
                                  <Badge variant="secondary" className="text-xs">
                                    {langStat.lecturesCovered} lecture{langStat.lecturesCovered !== 1 ? 's' : ''}
                                  </Badge>
                                </div>
                                <div className="text-sm text-gray-600">
                                  {langStat.total.toLocaleString()} total • {langStat.approved.toLocaleString()} approved
                                  {langStat.pending > 0 && ` • ${langStat.pending} pending`}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={`text-lg font-bold ${isHighlighted ? 'text-spiritual-700' : 'text-spiritual-600'}`}>
                                  {langStat.total}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {Math.round((langStat.approved / langStat.total) * 100)}% approved
                                </div>
                              </div>
                            </div>
                          );
                        });
                      })()}
                      {filteredLanguageStats.length > 10 && (
                        <div className="text-sm text-gray-500 text-center pt-2">
                          ... and {filteredLanguageStats.length - 10} more languages
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Lecture Statistics */}
              <Card className="border border-indian-saffron/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    {highlightLang
                      ? `Lectures with ${getLanguageName(highlightLang)} translations`
                      : `Lectures (${displayStats.lectureStats.length} with translations)`
                    }
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    // Filter lectures by highlighted language if specified
                    let filteredLectureStats = displayStats.lectureStats;
                    if (highlightLang) {
                      // For local data, filter by checking if the language has translations for this lecture
                      filteredLectureStats = displayStats.lectureStats.filter(lectureStat => {
                        const lectureTranslations = all.filter(t => t.lectureId === lectureStat.lectureId);
                        return lectureTranslations.some(t => t.lang === highlightLang);
                      });
                    }

                    if (filteredLectureStats.length === 0) {
                      return (
                        <div className="text-sm text-gray-600">
                          {highlightLang
                            ? `No lectures have ${getLanguageName(highlightLang)} translations yet.`
                            : 'No lecture translations yet.'
                          }
                        </div>
                      );
                    }

                    return (
                      <div className="space-y-3">
                        {filteredLectureStats.slice(0, 6).map((lectureStat) => {
                          // Calculate language-specific stats if highlighting
                          let langSpecificCount = lectureStat.total;
                          let langSpecificApproved = lectureStat.approved;

                          if (highlightLang) {
                            const lectureTranslations = all.filter(t =>
                              t.lectureId === lectureStat.lectureId && t.lang === highlightLang
                            );
                            langSpecificCount = lectureTranslations.length;
                            langSpecificApproved = lectureTranslations.length; // Local translations are considered approved
                          }

                          return (
                            <div key={lectureStat.lectureId} className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-start justify-between mb-2">
                                <Link
                                  to={`/read/${lectureStat.lectureId}${highlightLang ? `?lang=${highlightLang}` : ''}`}
                                  className="font-medium text-spiritual-600 hover:underline flex-1 mr-2"
                                >
                                  {getLectureTitle(lectureStat.lectureId)}
                                </Link>
                                <div className="text-right">
                                  <div className="text-lg font-bold">{langSpecificCount}</div>
                                  <div className="text-xs text-gray-500">
                                    {highlightLang ? `${getLanguageName(highlightLang)} translations` : 'translations'}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span>{langSpecificApproved.toLocaleString()} approved</span>
                                {!highlightLang && (
                                  <span>{lectureStat.languagesCovered} language{lectureStat.languagesCovered !== 1 ? 's' : ''}</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                        {filteredLectureStats.length > 6 && (
                          <div className="text-sm text-gray-500 text-center pt-2">
                            ... and {filteredLectureStats.length - 6} more lectures
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Top Contributors (only show if we have remote data) */}
            {remoteStats && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                {filteredRecentActivity.length > 0 && (
                  <Card className="border border-indian-saffron/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Recent Activity (Last 7 Days)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {filteredRecentActivity.map((activity, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium">{getLanguageName(activity.lang)}</div>
                              <div className="text-sm text-gray-600">
                                {getLectureTitle(activity.lectureId)}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-spiritual-600">{activity.count}</div>
                              <div className="text-xs text-gray-500">
                                {new Date(activity.lastUpdated).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Top Contributors */}
                {remoteStats.topContributors.length > 0 && (
                  <Card className="border border-indian-saffron/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Top Contributors
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {remoteStats.topContributors.map((contributor, index) => (
                          <div key={contributor.userId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-spiritual-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                {index + 1}
                              </div>
                              <div>
                                <div className="font-medium flex items-center gap-2">
                                  <Link to={`/user/${contributor.username || ((contributor.firstName || contributor.lastName) ? `${(contributor.firstName || '').toLowerCase().replace(/[^a-z0-9]+/g,'-')}-${(contributor.lastName || '').toLowerCase().replace(/[^a-z0-9]+/g,'-')}` : contributor.userId)}`} className="hover:underline text-spiritual-700">
                                    {contributor.username ? `@${contributor.username}` : (
                                      contributor.firstName && contributor.lastName
                                        ? `${contributor.firstName} ${contributor.lastName}`
                                        : 'Anonymous'
                                    )}
                                  </Link>
                                  {contributor.role && (
                                    <Badge variant={contributor.role === 'admin' ? 'default' : contributor.role === 'moderator' ? 'secondary' : 'outline'} className="text-[10px] uppercase tracking-wide">
                                      {contributor.role}
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {contributor.approvedTranslations} approved of {contributor.totalTranslations} total
                                </div>
                                {contributor.languageProficiency && contributor.languageProficiency.length > 0 && (
                                  <div className="mt-1 flex flex-wrap gap-1">
                                    {contributor.languageProficiency.slice(0,4).map((lp, i) => (
                                      <Badge key={i} variant="outline" className="text-[10px]">
                                        {lp.code.toUpperCase()}: {lp.level}
                                      </Badge>
                                    ))}
                                    {contributor.languageProficiency.length > 4 && (
                                      <span className="text-[10px] text-gray-500">+{contributor.languageProficiency.length - 4} more</span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-spiritual-600">{contributor.totalTranslations}</div>
                              <div className="text-xs text-gray-500">
                                {Math.round((contributor.approvedTranslations / contributor.totalTranslations) * 100)}% approved
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </TranslationLayout>
  );
};

export default ReadStatsPage;

