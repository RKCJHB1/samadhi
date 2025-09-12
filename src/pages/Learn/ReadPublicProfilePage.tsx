import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import TranslationLayout from '@/components/layout/TranslationLayout';
import NotFoundMessage from '@/components/learn/NotFoundMessage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getReadingStatsForUser } from '@/store/reading';
import { vivekanandaLectures } from '@/data/readings/vivekanandaParliament';
import { countSentences, flattenSentences } from '@/lib/translationUtils';
import { listMyReadingProgress, getCurrentUser } from '@/services/translationsSupabase';
import { useAuth } from '@/contexts/AuthContext';


function msToHMS(ms: number) {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  const parts = [] as string[];
  if (h) parts.push(`${h}h`);
  if (m) parts.push(`${m}m`);
  parts.push(`${ss}s`);
  return parts.join(' ');
}

const ReadingStats: React.FC<{ userId: string }> = ({ userId }) => {
  const stats = getReadingStatsForUser(userId);
  const lectureIds = Object.keys(stats.lectures);
  const totalLectures = lectureIds.length;

  // Compute completed vs in-progress using actual sentence counts per lecture
  let completed = 0;
  let inProgress = 0;
  for (const id of lectureIds) {
    const lec = vivekanandaLectures.find((l) => l.id === id);
    const total = lec ? countSentences(lec.paragraphs) : 0;
    const prog = stats.lectures[id];
    const readUnique = prog.uniqueSentenceIndices?.length || 0;

    if (total > 0) {
      if (readUnique >= total) completed += 1;
      else if (readUnique > 0) inProgress += 1;
    } else if (readUnique > 0) {
      // Unknown lecture id fallback: treat as in progress
      inProgress += 1;
    }
  }

  return (
    <div className="pt-2 border-t mt-2">
      <div className="font-medium text-gray-800 mb-1">Reading (English)</div>
      <div className="text-xs text-gray-700 space-y-1">
        <div>Total sentences read: {stats.totals.totalSentences}</div>
        <div>Total time: {msToHMS(stats.totals.totalDurationMs)}</div>
        <div>Lectures started: {totalLectures}</div>
        <div>
          {completed} {completed === 1 ? 'lecture' : 'lectures'} complete, {inProgress} in progress
        </div>
      </div>
    </div>
  );
};

import { getProfile, fetchComprehensiveStats, listProfiles, fetchUserApprovedContributions, fetchUserApprovedCounts, fetchUserApprovedRankPercentile, type Profile, type TranslationStats } from '@/services/translationsSupabase';

function extractUserId(param?: string): string | null {
  if (!param) return null;
  // Accept either a raw UUID or a pure slug that matches a profile's name
  const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i;
  const m = param.match(uuidRegex);
  if (m) return m[0];
  return null;
}

function slugifyName(first?: string | null, last?: string | null) {
  const s = [first || '', last || ''].join(' ').trim().toLowerCase();
  return s.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || null;
}

const ReadPublicProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { profile: authProfile, user: authUser } = useAuth();

  const { userId } = useParams<{ userId?: string }>(); // may be UUID or username
  const [searchParams, setSearchParams] = useSearchParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<TranslationStats | null>(null);
  const [resolvedUserId, setResolvedUserId] = useState<string | null>(extractUserId(userId) || null);
  const [triedResolve, setTriedResolve] = useState(false);

  const [contributionList, setContributionList] = useState<Array<{ lectureId: string; sentenceIndex: number; lang: string; text: string; createdAt: string; updatedAt: string; }>>([]);
  const [approvedCounts, setApprovedCounts] = useState<{ totalApproved: number; todayApproved: number }>({ totalApproved: 0, todayApproved: 0 });
  const [percentile, setPercentile] = useState<{ rank: number; totalContributors: number; topPercent: number } | null>(null);

  const page = Math.max(parseInt(searchParams.get('page') || '1', 10) || 1, 1);
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(contributionList.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const pageItems = contributionList.slice(startIdx, endIdx);

  const goToPage = (p: number) => {
    const sp = new URLSearchParams(searchParams);
    sp.set('page', String(p));
    setSearchParams(sp, { replace: true });
    // After URL updates, scroll to the top anchor for reliability across browsers
    setTimeout(() => {
      const anchor = document.getElementById('profile-top');
      if (anchor && 'scrollIntoView' in anchor) {
        try { anchor.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; } catch {}
      }
      try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch { window.scrollTo(0, 0); }
    }, 0);
  };

  // Resolve param in this order:
  // 0) If URL matches logged-in user's username, resolve immediately to that user's ID (fast path)
  // 1) Username exact match (DB)
  // 2) UUID
  // 3) Full-name slug fallback
  useEffect(() => {
    (async () => {
      if (!userId || resolvedUserId) return;

      // Fast path: if logged-in profile exists and username matches URL param
      const param = userId.toLowerCase();
      if (authProfile?.username && authProfile.username.toLowerCase() === param && authUser?.id) {
        setResolvedUserId(authUser.id);
        setTriedResolve(true);
        return;
      }

      // If we've already tried DB resolution, stop here (avoid repeated queries)
      if (triedResolve) return;

      // Try username
      try {
        const { getProfileByUsername } = await import('@/services/translationsSupabase');
        const p = await getProfileByUsername(param);
        if (p) { setResolvedUserId(p.id); setTriedResolve(true); return; }
      } catch {}
      // UUID
      const looksLikeUuid = extractUserId(userId);
      if (looksLikeUuid) { setResolvedUserId(looksLikeUuid); setTriedResolve(true); return; }
      // Full-name slug
      try {
        const profiles = await listProfiles(200);
        const match = profiles.find(p => slugifyName(p.first_name, p.last_name) === param);
        if (match) { setResolvedUserId(match.id); setTriedResolve(true); return; }
      } catch {}
      setTriedResolve(true);
    })();
  }, [userId, resolvedUserId, triedResolve]);


  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!resolvedUserId) return;
      try {
        const p = await getProfile(resolvedUserId);
        if (!cancelled) {
          setProfile(p);
          // Normalize URL: if user has a username and current param is a UUID or name slug, redirect to /user/:username
          if (p?.username && userId && userId.toLowerCase() !== p.username.toLowerCase()) {
            const isUuid = !!extractUserId(userId);
            const isSlug = !isUuid; // either slug or other
            if (isUuid || isSlug) {
              navigate(`/user/${p.username}`, { replace: true });
            }
          }
        }
      } catch {}
      try {
        const s = await fetchComprehensiveStats();
        if (!cancelled) setStats(s);
      } catch {}
      try {
        const [list, counts, percentile] = await Promise.all([
          fetchUserApprovedContributions(resolvedUserId, 200),
          fetchUserApprovedCounts(resolvedUserId),
          fetchUserApprovedRankPercentile(resolvedUserId)
        ]);
        if (!cancelled) {
          setContributionList(list);
          setApprovedCounts(counts);
          setPercentile(percentile);
        }
      } catch {}
    })();
    return () => { cancelled = true; };
  }, [resolvedUserId, navigate, userId]);

  const showNotFound = triedResolve && !resolvedUserId;

  const fullName = profile ? [profile.first_name, profile.last_name].filter(Boolean).join(' ') : '';
  const initials = (profile?.first_name?.[0] || '') + (profile?.last_name?.[0] || '');

  // Count user contributions from stats if available (fallback if API not available)
  const totals = (() => {
    if (approvedCounts.totalApproved > 0) return { total: approvedCounts.totalApproved, approved: approvedCounts.totalApproved };
    if (!stats) return { total: 0, approved: 0 };
    const user = stats.topContributors.find(c => c.userId === resolvedUserId);
    if (!user) return { total: 0, approved: 0 };
    return { total: user.totalTranslations, approved: user.approvedTranslations };
  })();



  return (
    <TranslationLayout title={fullName || 'Contributor'}>
      {showNotFound ? (
        <div className="w-full py-12">
          <div className="container mx-auto px-4 text-sm text-gray-700">
            User not found. This site now requires every contributor to have a public username. Please set yours on the Profile page.
          </div>
        </div>
      ) : (
        <div id="profile-top" className="w-full bg-gradient-to-br from-indian-cream to-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-spiritual-600 text-white flex items-center justify-center text-xl font-bold">
                  {initials || 'U'}
                </div>
                <div>
                  <div className="text-2xl font-heading font-bold">{fullName || 'Contributor'}</div>
                  {profile?.username && (
                    <div className="text-sm text-gray-600">@{profile.username}</div>
                  )}
                  {profile?.role && (
                    <div className="mt-1">
                      <Badge variant={profile.role === 'admin' ? 'default' : profile.role === 'moderator' ? 'secondary' : 'outline'} className="uppercase text-[10px]">{profile.role}</Badge>
                    </div>
                  )}

	                    {/* Resume list intentionally only on /read/profile (private); not shown on public profile */}

                </div>
              </div>





              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Stats */}
                <Card className="border border-indian-saffron/30 lg:col-span-1">
                  <CardHeader>
                    <CardTitle>Contributions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-gray-700">
                    <div>Today: {approvedCounts.todayApproved}</div>
                    <div>All-time approved: {approvedCounts.totalApproved}</div>
                    {percentile && (
                      <div className="text-xs text-gray-600">Top ~{percentile.topPercent}% contributor (rank {percentile.rank} of {percentile.totalContributors})</div>
                    )}
                    {profile?.language_proficiency && profile.language_proficiency.length > 0 && (
                      <div className="pt-2">
                        <div className="font-medium text-gray-800 mb-1">Language proficiency</div>
                        <div className="flex flex-wrap gap-1">
                          {profile.language_proficiency.map((lp, i) => (
                            <Link key={i} to={`/read/languages/${lp.code}/stats`} className="hover:underline">
                              <Badge variant="outline" className="text-[10px]">{lp.code.toUpperCase()}: {lp.level}</Badge>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Reading stats (local, per-user) */}
                    <ReadingStats userId={resolvedUserId} />
                  </CardContent>
                </Card>

                {/* Recent contributions list */}
                <Card className="border border-indian-saffron/30 lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Approved Contributions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {contributionList.length === 0 ? (
                      <div className="text-sm text-gray-600">No recent approved contributions.</div>
                    ) : (
                      <>
                        <ul className="divide-y">
                          {pageItems.map((c, idx) => (
                            <li key={`${c.lectureId}-${c.sentenceIndex}-${c.lang}-${idx}`} className="py-3">
                              <div className="text-sm text-gray-900">
                                <span className="font-medium">[{c.lang.toUpperCase()}]</span> {c.text.length > 140 ? `${c.text.slice(0,140)}…` : c.text}
                              </div>
                              <div className="text-xs text-gray-500">
                                {new Date(c.updatedAt || c.createdAt).toLocaleString()} •
                                {' '}
                                <Link className="underline" to={`/read/${c.lectureId}?lang=${c.lang}#sent-${c.sentenceIndex}`}>View translation</Link>
                                {' '}•{' '}
                                <Link className="underline" to={`/read/${c.lectureId}?lang=${c.lang}`}>View lecture</Link>
                                {' '}• Sentence {c.sentenceIndex + 1}
                              </div>
                            </li>
                          ))}


                        </ul>

                        {/* Pagination controls */}
                        <div className="flex items-center justify-between pt-4">
                          <div className="text-xs text-gray-600">Page {currentPage} of {totalPages}</div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" disabled={currentPage <= 1} onClick={() => goToPage(currentPage - 1)}>Previous</Button>
                            <Button size="sm" variant="outline" disabled={currentPage >= totalPages} onClick={() => goToPage(currentPage + 1)}>Next</Button>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="text-sm">
                <Link to="/read" className="text-spiritual-700 hover:underline">← Back to Read Home</Link>
              </div>
            </div>


          </div>
        </div>
      )}
    </TranslationLayout>
  );
};

export default ReadPublicProfilePage;

