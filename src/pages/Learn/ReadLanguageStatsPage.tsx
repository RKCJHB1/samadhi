import React, { useMemo, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TranslationLayout from '../../components/layout/TranslationLayout';
import NotFoundMessage from '../../components/learn/NotFoundMessage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { vivekanandaLectures } from '@/data/readings/vivekanandaParliament';
import { getAllTranslations } from '@/store/translations';
import { countSentences, flattenSentences } from '@/lib/translationUtils';
import { popularLanguages } from '@/data/languages';
import { fetchTranslationsForLang, listApprovedLanguages, listHiddenLanguages, isSupabaseConfigured } from '@/services/translationsSupabase';
import { useTranslationStats } from '@/hooks/useTranslationStats';
import { featureFlags } from '@/utils/featureFlags';
import {
  Globe,
  BookOpen,
  TrendingUp,
  CheckCircle,
  Clock,
  BarChart3,
  ArrowLeft,
  ExternalLink,
  Calendar,
  User
} from 'lucide-react';

const ReadLanguageStatsPage: React.FC = () => {
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

  const { langCode } = useParams<{ langCode: string }>();
  const [remoteTranslations, setRemoteTranslations] = useState<any[]>([]);
  const [isApproved, setIsApproved] = useState<boolean | null>(null);

  // Centralized stats
  const { stats: remoteStats, loading, totalSentences, getLangCount } = useTranslationStats();

  // Get language info
  const language = popularLanguages.find(l => l.code === langCode);
  if (!language) {
    return (
      <NotFoundMessage
        title="Language Not Found"
        message={`Language code "${langCode}" is not supported.`}
        backTo="/read/languages"
        backLabel="Back to Languages"
      />
    );
  }

  // Check approved languages – use manual approvals only (fast, avoids heavy queries)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // If Supabase isn’t configured, don’t block the page in local dev
        if (!isSupabaseConfigured()) {
          if (!cancelled) setIsApproved(true);
          return;
        }
        const [manual, hidden] = await Promise.all([
          listApprovedLanguages(),
          listHiddenLanguages(),
        ]);
        const manualSet = new Set((manual || []).map((c) => (c || '').toLowerCase()));
        const hiddenSet = new Set((hidden || []).map((c) => (c || '').toLowerCase()));
        const allowed = manualSet.has((langCode || '').toLowerCase()) && !hiddenSet.has((langCode || '').toLowerCase());
        if (!cancelled) setIsApproved(allowed);
      } catch {
        if (!cancelled) setIsApproved(false);
      }
    })();
    return () => { cancelled = true; };
  }, [langCode]);

  if (isApproved === null) {
    return (
      <TranslationLayout title="Loading">
        <div className="py-16 text-center text-gray-500">Loading language statistics…</div>
      </TranslationLayout>
    );
  }

  if (isApproved === false) {
    return (
      <NotFoundMessage
        title="Language Not Approved"
        message={`The language "${language.name}" is not currently approved for public statistics.`}
        backTo="/read/languages"
        backLabel="Back to Languages"
      />
    );
  }

  // Local translations for this language
  const localTranslations = useMemo(() =>
    getAllTranslations().filter(t => t.lang === langCode),
    [langCode]
  );

  // Fetch remote translations for this language (approved only)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const remote = await fetchTranslationsForLang(langCode!, true);
      if (!cancelled) setRemoteTranslations(remote);
    })();
    return () => { cancelled = true; };
  }, [langCode]);

  // Use remote data if available, otherwise local
  const translations = remoteTranslations.length > 0 ? remoteTranslations : localTranslations;

  // If we have remote aggregate stats, use APPROVED unique counts from there for the numerator
  const approvedUniqueFromRemote = useMemo(() => {
    if (!remoteStats) return null;
    return getLangCount(langCode!, 'approved');
  }, [remoteStats, langCode, getLangCount]);

  const localUniqueCount = useMemo(() => {
    const set = new Set<string>();
    for (const t of translations) set.add(`${t.lectureId}#${t.sentenceIndex}`);
    return set.size;
  }, [translations]);

  // Calculate comprehensive stats (percent uses APPROVED unique from remote when available)
  const stats = useMemo(() => {
    const totalSentences = vivekanandaLectures.reduce((sum, lec) => sum + countSentences(lec.paragraphs), 0);

    // Group by lecture
    const byLecture = new Map<string, any[]>();
    translations.forEach(t => {
      if (!byLecture.has(t.lectureId)) {
        byLecture.set(t.lectureId, []);
      }
      byLecture.get(t.lectureId)!.push(t);
    });

    // Calculate lecture stats (unique sentences only, from what we have loaded)
    const lectureStats = Array.from(byLecture.entries()).map(([lectureId, lecTranslations]) => {
      const lecture = vivekanandaLectures.find(l => l.id === lectureId);
      const lectureSentenceCount = lecture ? countSentences(lecture.paragraphs) : 0;
      const uniqueSentences = new Set<string>();
      for (const t of lecTranslations) uniqueSentences.add(`${t.lectureId}#${t.sentenceIndex}`);
      const translatedUnique = uniqueSentences.size;
      const progress = lectureSentenceCount > 0 ? (translatedUnique / lectureSentenceCount) * 100 : 0;

      return {
        lectureId,
        title: lecture?.title || lectureId,
        date: lecture?.date || '',
        totalSentences: lectureSentenceCount,
        translatedSentences: translatedUnique,
        progress: Math.round(progress),
        translations: lecTranslations.sort((a, b) => a.sentenceIndex - b.sentenceIndex)
      };
    }).sort((a, b) => b.translatedSentences - a.translatedSentences);

    // Recent activity (last 7 days)
    const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    const recentTranslations = translations.filter(t =>
      (t.updatedAt || t.createdAt) > sevenDaysAgo
    ).sort((a, b) => (b.updatedAt || b.createdAt) - (a.updatedAt || a.createdAt));

    // Numerator for overall percentage
    let approvedUnique = approvedUniqueFromRemote ?? 0;
    if (approvedUniqueFromRemote == null) {
      // Fallback: compute unique from what we loaded (already approved-only when remote)
      const uniqueKeys = new Set<string>();
      for (const t of translations) uniqueKeys.add(`${t.lectureId}#${t.sentenceIndex}`);
      approvedUnique = uniqueKeys.size;
    }

    return {
      totalTranslations: approvedUnique,
      totalSentences,
      overallProgress: totalSentences ? Math.round((approvedUnique / totalSentences) * 100) : 0,
      lecturesWithTranslations: byLecture.size,
      totalLectures: vivekanandaLectures.length,
      lectureStats,
      recentTranslations: recentTranslations.slice(0, 10)
    };
  }, [translations, approvedUniqueFromRemote]);

  const getLanguageName = (code: string) => {
    const lang = popularLanguages.find(l => l.code === code);
    if (!lang) return code;
    const hasDistinctNative = !!lang.nativeName && lang.nativeName !== lang.name;
    return hasDistinctNative ? `${lang.name} (${lang.nativeName})` : lang.name;
  };

  const getSentenceText = (lectureId: string, sentenceIndex: number): string => {
    const lecture = vivekanandaLectures.find(l => l.id === lectureId);
    if (!lecture) return '';
    const sentences = flattenSentences(lecture.paragraphs);
    return sentences[sentenceIndex] || '';
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };



  if (loading) {
    return (
      <TranslationLayout title={`${getLanguageName(langCode!)} Statistics`}>
        <div className="w-full bg-gradient-to-br from-indian-cream to-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center">
                    <Clock className="animate-spin h-6 w-6 mr-2" />
                    Loading {getLanguageName(langCode!)} statistics...
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </TranslationLayout>
    );
  }



  return (
    <TranslationLayout title={`${getLanguageName(langCode!)} Statistics`}>
      <div className="w-full bg-gradient-to-br from-indian-cream to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Header */}
            <Card className="bg-gradient-to-r from-spiritual-50 to-spiritual-100 border-spiritual-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-heading font-bold text-spiritual-800 mb-2">
                      {getLanguageName(langCode!)} Translation Statistics
                    </h1>
                    <p className="text-spiritual-700">
                      Comprehensive statistics and progress for {getLanguageName(langCode!)} translations
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Percentages show Approved unique sentences
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/read"
                      className="flex items-center gap-2 px-3 py-2 bg-spiritual-100 text-spiritual-700 rounded-lg border border-spiritual-200 hover:bg-spiritual-200 transition-colors text-sm"
                    >
                      <ArrowLeft className="h-3 w-3" />
                      Read Home
                    </Link>
                    <Link
                      to="/read/languages"
                      className="flex items-center gap-2 px-4 py-2 bg-white text-spiritual-700 rounded-lg border border-spiritual-300 hover:bg-spiritual-50 transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to Languages
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Total Translations</p>
                      <p className="text-2xl font-bold text-blue-900">{stats.totalTranslations.toLocaleString()}</p>
                    </div>
                    <Globe className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Progress <span className="text-xs text-gray-600" title="Approved translations">(Approved)</span></p>
                      <p className="text-2xl font-bold text-green-900">{stats.overallProgress}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Lectures Started</p>
                      <p className="text-2xl font-bold text-purple-900">{stats.lecturesWithTranslations}/{stats.totalLectures}</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Recent Activity</p>
                      <p className="text-2xl font-bold text-orange-900">{stats.recentTranslations.length}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Overall Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Overall Translation Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Sentences Translated</span>
                      <span>{stats.totalTranslations.toLocaleString()} of {stats.totalSentences.toLocaleString()} sentences</span>
                    </div>
                    <Progress value={stats.overallProgress} className="h-3" />
                  </div>
                  <div className="text-sm text-gray-600">
                    {stats.totalSentences - stats.totalTranslations} sentences remaining
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lecture-by-Lecture Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Lecture Progress ({stats.lectureStats.length} lectures)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.lectureStats.map((lectureStat) => (
                      <div key={lectureStat.lectureId} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <Link
                              to={`/read/${lectureStat.lectureId}?lang=${langCode}`}
                              className="font-medium text-spiritual-600 hover:underline block mb-1"
                            >
                              {lectureStat.title}
                            </Link>
                            <div className="text-sm text-gray-600 mb-2">
                              {lectureStat.date}
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-gray-600">
                                {lectureStat.translatedSentences} of {lectureStat.totalSentences} sentences
                              </span>
                              <Badge variant={lectureStat.progress === 100 ? "default" : "secondary"}>
                                {lectureStat.progress}% complete
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Progress value={lectureStat.progress} className="h-2" />
                      </div>
                    ))}
                    {stats.lectureStats.length === 0 && (
                      <div className="text-sm text-gray-600 text-center py-4">
                        No lectures have been translated yet.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Recent Translations (Last 7 Days)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stats.recentTranslations.map((translation, index) => {
                      const sentenceText = getSentenceText(translation.lectureId, translation.sentenceIndex);
                      const lecture = vivekanandaLectures.find(l => l.id === translation.lectureId);
                      return (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <Link
                                to={`/read/${translation.lectureId}?lang=${langCode}#sent-${translation.sentenceIndex}`}
                                className="text-sm font-medium text-spiritual-600 hover:underline flex items-center gap-1"
                              >
                                {lecture?.title || translation.lectureId}
                                <ExternalLink className="h-3 w-3" />
                              </Link>
                              <div className="text-xs text-gray-500 mt-1">
                                Sentence {translation.sentenceIndex + 1}
                              </div>
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatDate(translation.updatedAt || translation.createdAt)}
                            </div>
                          </div>
                          <div className="text-sm text-gray-700 line-clamp-2">
                            {sentenceText.length > 100 ? `${sentenceText.substring(0, 100)}...` : sentenceText}
                          </div>
                        </div>
                      );
                    })}
                    {stats.recentTranslations.length === 0 && (
                      <div className="text-sm text-gray-600 text-center py-4">
                        No recent translation activity.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Sentence List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  All Translated Sentences ({stats.totalTranslations})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {stats.lectureStats.map((lectureStat) => (
                    <div key={lectureStat.lectureId} className="border-l-4 border-spiritual-200 pl-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {lectureStat.title}
                        </h3>
                        <Badge variant="outline">
                          {lectureStat.translatedSentences} sentences
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        {lectureStat.translations.map((translation, index) => {
                          const sentenceText = getSentenceText(translation.lectureId, translation.sentenceIndex);
                          return (
                            <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                              <div className="flex items-start justify-between mb-2">
                                <Link
                                  to={`/read/${translation.lectureId}?lang=${langCode}#sent-${translation.sentenceIndex}`}
                                  className="text-sm font-medium text-spiritual-600 hover:underline flex items-center gap-1"
                                >
                                  Sentence {translation.sentenceIndex + 1}
                                  <ExternalLink className="h-3 w-3" />
                                </Link>
                                <div className="text-xs text-gray-500">
                                  {formatDate(translation.updatedAt || translation.createdAt)}
                                </div>
                              </div>
                              <div className="text-sm text-gray-700 mb-2">
                                <strong>Original:</strong> {sentenceText}
                              </div>
                              <div className="text-sm text-spiritual-700">
                                <strong>{getLanguageName(langCode!)}:</strong> {translation.text}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  {stats.totalTranslations === 0 && (
                    <div className="text-center py-8 text-gray-600">
                      No translations available yet for {getLanguageName(langCode!)}.
                      <br />
                      <Link
                        to={`/read/lectures?lang=${langCode}`}
                        className="text-spiritual-600 hover:underline mt-2 inline-block"
                      >
                        Start translating →
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </TranslationLayout>
  );
};

export default ReadLanguageStatsPage;
