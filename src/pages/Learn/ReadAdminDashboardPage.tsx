import React, { useEffect, useMemo, useState } from 'react';
import TranslationLayout from '@/components/layout/TranslationLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BarChart3, CheckCircle2, Clock, Languages as LanguagesIcon, ShieldCheck } from 'lucide-react';
import { getAllTranslations } from '@/store/translations';
import { vivekanandaLectures } from '@/data/readings/vivekanandaParliament';
import { countSentences } from '@/lib/translationUtils';
import NotFoundMessage from '@/components/learn/NotFoundMessage';
import { fetchComprehensiveStats, isSupabaseConfigured, listProfiles, updateUserRole, listLanguageReviewers, addLanguageReviewer, removeLanguageReviewer, listReviewerRequests, approveReviewerRequest, rejectReviewerRequest, listLanguageRequestsAll, listApprovedLanguages, addApprovedLanguage, removeApprovedLanguage, getApprovedLanguageCodes, type TranslationStats, type Profile, type ReviewerRequest, type LanguageRequest } from '@/services/translationsSupabase';
import { popularLanguages } from '@/data/languages';
import { featureFlags } from '@/utils/featureFlags';


const ReadAdminDashboardPage: React.FC = () => {
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

  const [remote, setRemote] = useState<TranslationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [reviewers, setReviewers] = useState<Array<{lang: string; user_id: string; email?: string|null; first_name?: string|null; last_name?: string|null}>>([]);
  const [requests, setRequests] = useState<ReviewerRequest[]>([]);
  const [langRequests, setLangRequests] = useState<LanguageRequest[]>([]);
  const [addLang, setAddLang] = useState<string>('');
  const [addUserId, setAddUserId] = useState<string>('');

  const [approvedLangs, setApprovedLangs] = useState<string[]>([]);
  const [newApprovedLang, setNewApprovedLang] = useState<string>('');
  const [effectiveApprovedLangs, setEffectiveApprovedLangs] = useState<string[]>([]);

  const [saving, setSaving] = useState<Record<string, boolean>>({});


  // Local fallback stats
  const totalSentences = useMemo(
    () => vivekanandaLectures.reduce((s, lec) => s + countSentences(lec.paragraphs), 0),
    []
  );
  const localTotal = useMemo(() => getAllTranslations().length, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (isSupabaseConfigured()) {
        const stats = await fetchComprehensiveStats();
        if (!cancelled) setRemote(stats);
      }

      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  // Load profiles for role management (admin)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (isSupabaseConfigured()) {


        const rows = await listProfiles(200);
        if (!cancelled) setProfiles(rows);

      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Load language reviewers
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (isSupabaseConfigured()) {
        const list = await listLanguageReviewers();
        if (!cancelled) setReviewers(list);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Load pending reviewer requests
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (isSupabaseConfigured()) {
        const list = await listReviewerRequests('pending');
        if (!cancelled) setRequests(list);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Load language requests (admin)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (isSupabaseConfigured()) {
        const list = await listLanguageRequestsAll();
        if (!cancelled) setLangRequests(list);

      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Load approved languages list (manual) and effective approved (manual + any with approved translations)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (isSupabaseConfigured()) {
        const list = await listApprovedLanguages();
        if (!cancelled) setApprovedLangs(list);
        const eff = await getApprovedLanguageCodes();
        if (!cancelled) setEffectiveApprovedLangs(Array.from(eff).sort());
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const totals = remote
    ? {
        totalTranslations: remote.totalTranslations,
        totalApproved: remote.totalApproved,
        totalPending: remote.totalPending,
        languages: remote.languageStats.length,
      }
    : {
        totalTranslations: localTotal,
        totalApproved: localTotal,
        totalPending: 0,
        languages: 1, // local store only guarantees EN as baseline
      };

  return (
    <TranslationLayout title="Translation Admin Dashboard">
      <div className="w-full bg-gradient-to-br from-indian-cream to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-3xl font-heading font-bold">Translation Admin</h1>
              <div className="flex gap-2 flex-wrap">
                <Button asChild variant="default"><Link to="/moderation/translations">Moderate</Link></Button>
                <Button asChild variant="outline"><Link to="/read/stats">View Stats</Link></Button>
                <Button asChild variant="ghost"><Link to="/read/languages">Manage Languages</Link></Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardHeader className="pb-2"><CardTitle className="text-sm text-blue-700">Total Translations</CardTitle></CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-blue-900">{totals.totalTranslations.toLocaleString()}</div>
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardHeader className="pb-2"><CardTitle className="text-sm text-green-700">Approved</CardTitle></CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-green-900">{totals.totalApproved.toLocaleString()}</div>
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                <CardHeader className="pb-2"><CardTitle className="text-sm text-yellow-700">Pending Review</CardTitle></CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-yellow-900">{totals.totalPending.toLocaleString()}</div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardHeader className="pb-2"><CardTitle className="text-sm text-purple-700">Languages</CardTitle></CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-purple-900">{totals.languages}</div>
                  <LanguagesIcon className="h-8 w-8 text-purple-600" />
                </CardContent>
              </Card>
            </div>

            <Card className="border border-indian-saffron/30">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-lg font-heading font-semibold">Moderation Queue</div>
                    <div className="text-sm text-gray-600">Approve or reject submitted translations</div>
                  </div>
                  <Button asChild>
                    <Link to="/moderation/translations"><ShieldCheck className="h-4 w-4 mr-2" /> Open Moderation</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {isSupabaseConfigured() && (
              <Card className="border">
                <CardHeader>
                  <CardTitle>Role Management</CardTitle>
                </CardHeader>
                <CardContent>
                  {profiles.length === 0 ? (
                    <div className="text-sm text-gray-600">No profiles found or not authorized.</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="text-left border-b">
                            <th className="py-2 pr-4">Email</th>
                            <th className="py-2 pr-4">Name</th>
                            <th className="py-2 pr-4">Role</th>
                            <th className="py-2"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {profiles.map((p) => (
                            <tr key={p.id} className="border-b last:border-0">
                              <td className="py-2 pr-4">{p.email || '\u2014'}</td>
                              <td className="py-2 pr-4">{[p.first_name, p.last_name].filter(Boolean).join(' ') || '\u2014'}</td>
                              <td className="py-2 pr-4">
                                <select
                                  className="border rounded px-2 py-1 bg-white"
                                  value={p.role}
                                  onChange={(e) => {
                                    const role = e.target.value as Profile['role'];
                                    setProfiles((prev) => prev.map(row => row.id === p.id ? { ...row, role } : row));
                                  }}
                                >
                                  <option value="user">User</option>
                                  <option value="moderator">Moderator</option>
                                  <option value="admin">Admin</option>
                                </select>
                              </td>
                              <td className="py-2">
                                <Button
                                  size="sm"
                                  disabled={!!saving[p.id]}
                                  onClick={async () => {
                                    setSaving((s) => ({ ...s, [p.id]: true }));
                                    const res = await updateUserRole(p.id, p.role);
                                    setSaving((s) => ({ ...s, [p.id]: false }));
                                    if (!res.ok) alert(res.error || 'Failed to update role');
                                  }}
                                >
                                  {saving[p.id] ? 'Saving\u2026' : 'Save'}
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {isSupabaseConfigured() && (
              <Card className="border">
                <CardHeader>
                  <CardTitle>Language Reviewers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-3 items-start md:items-end mb-4">
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Language</div>
                      <select className="border rounded px-2 py-1 bg-white min-w-[180px]" value={addLang} onChange={(e)=>setAddLang(e.target.value)}>
                        <option value="">Select language</option>
                        {popularLanguages.map(l => (
                          <option key={l.code} value={l.code}>{l.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Reviewer (user)</div>
                      <select className="border rounded px-2 py-1 bg-white min-w-[220px]" value={addUserId} onChange={(e)=>setAddUserId(e.target.value)}>
                        <option value="">Select user</option>
                        {profiles.map(p => (
                          <option key={p.id} value={p.id}>{p.email || [p.first_name, p.last_name].filter(Boolean).join(' ') || p.id}</option>
                        ))}
                      </select>
                    </div>
                    <Button
                      onClick={async ()=>{
                        if (!addLang || !addUserId) return;
                        const res = await addLanguageReviewer(addLang, addUserId);
                        if (!res.ok) { alert(res.error || 'Failed to add reviewer'); return; }
                        const list = await listLanguageReviewers();
                        setReviewers(list);
                        setAddLang('');
                        setAddUserId('');
                      }}
                      disabled={!addLang || !addUserId}
                    >Add</Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="text-left border-b">
                          <th className="py-2 pr-4">Language</th>
                          <th className="py-2 pr-4">Reviewer</th>
                          <th className="py-2"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {reviewers.length === 0 ? (
                          <tr><td className="py-3 text-gray-600" colSpan={3}>No reviewers assigned.</td></tr>
                        ) : (
                          reviewers.sort((a,b)=> a.lang.localeCompare(b.lang) || (a.email||'').localeCompare(b.email||'')).map((r, idx) => (
                            <tr key={`${r.lang}-${r.user_id}-${idx}`} className="border-b last:border-0">
                              <td className="py-2 pr-4">{popularLanguages.find(l=>l.code===r.lang)?.name || r.lang.toUpperCase()}</td>
                              <td className="py-2 pr-4">{r.email || [r.first_name, r.last_name].filter(Boolean).join(' ') || r.user_id}</td>
                              <td className="py-2">
                                <Button size="sm" variant="destructive" onClick={async ()=>{
                                  const res = await removeLanguageReviewer(r.lang, r.user_id);
                                  if (!res.ok) { alert(res.error || 'Failed to remove'); return; }


                                  setReviewers(prev => prev.filter(x => !(x.lang===r.lang && x.user_id===r.user_id)));
                                }}>Remove</Button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
            {isSupabaseConfigured() && (
              <Card className="border">
                <CardHeader>
                  <CardTitle>Approved Languages (Manual)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-3 items-start md:items-end mb-4">
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Language</div>
                      <select className="border rounded px-2 py-1 bg-white min-w-[200px]" value={newApprovedLang} onChange={(e)=>setNewApprovedLang(e.target.value)}>
                        <option value="">Select language</option>
                        {popularLanguages.filter(l=>l.code!=='en').map(l => (
                          <option key={l.code} value={l.code}>{l.name}</option>
                        ))}
                      </select>
                    </div>
                    <Button
                      onClick={async ()=>{
                        if (!newApprovedLang) return;
                        const res = await addApprovedLanguage(newApprovedLang);
                        if (!res.ok) { alert(res.error || 'Failed to approve language'); return; }
                        const list = await listApprovedLanguages();
                        setApprovedLangs(list);
                        setNewApprovedLang('');
                      }}
                      disabled={!newApprovedLang}
                    >Add Approval</Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="text-left border-b">
                          <th className="py-2 pr-4">Language</th>
                          <th className="py-2 pr-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {approvedLangs.length === 0 ? (
                          <tr><td className="py-3 text-gray-600" colSpan={2}>No manually approved languages yet.</td></tr>
                        ) : (
                          approvedLangs.sort().map((code) => (
                            <tr key={code} className="border-b last:border-0">
                              <td className="py-2 pr-4">{popularLanguages.find(l=>l.code===code)?.name || code.toUpperCase()}</td>
                              <td className="py-2">
                                <Button size="sm" variant="destructive" onClick={async ()=>{
                                  const res = await removeApprovedLanguage(code);
                                  if (!res.ok) { alert(res.error || 'Failed to remove'); return; }
                                  setApprovedLangs(prev => prev.filter(x => x !== code));
                                }}>Remove</Button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>

            {isSupabaseConfigured() && (
              <Card className="border">
                <CardHeader>
                  <CardTitle>Effective Approved Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600 mb-3">This includes manually-approved languages plus any languages that already have approved translations.</div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="text-left border-b">
                          <th className="py-2 pr-4">Language</th>
                        </tr>
                      </thead>
                      <tbody>
                        {effectiveApprovedLangs.length === 0 ? (
                          <tr><td className="py-3 text-gray-600">No effective approved languages yet.</td></tr>
                        ) : (
                          effectiveApprovedLangs.map((code)=> (
                            <tr key={code} className="border-b last:border-0">
                              <td className="py-2 pr-4">{popularLanguages.find(l=>l.code===code)?.name || code.toUpperCase()}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

                  </div>
                </CardContent>
              </Card>
            )}


            {isSupabaseConfigured() && (
              <Card className="border">
                <CardHeader>
                  <CardTitle>Reviewer Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  {requests.length === 0 ? (
                    <div className="text-sm text-gray-600">No pending requests.</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="text-left border-b">
                            <th className="py-2 pr-4">User</th>
                            <th className="py-2 pr-4">Language</th>
                            <th className="py-2 pr-4">Level</th>
                            <th className="py-2 pr-4">Sample/Notes</th>
                            <th className="py-2"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {requests.map((r) => (
                            <tr key={r.id} className="border-b last:border-0">
                              <td className="py-2 pr-4">{r.email || [r.first_name, r.last_name].filter(Boolean).join(' ') || r.user_id}</td>
                              <td className="py-2 pr-4">{popularLanguages.find(l=>l.code===r.lang)?.name || r.lang.toUpperCase()}</td>
                              <td className="py-2 pr-4">{r.level}</td>
                              <td className="py-2 pr-4 max-w-[360px] whitespace-pre-wrap text-gray-700">{r.sample_text || '\u2014'}</td>
                              <td className="py-2 flex gap-2">
                                <Button size="sm" onClick={async ()=>{
                                  const res = await approveReviewerRequest(r.id);
                                  if (!res.ok) { alert(res.error || 'Failed to approve'); return; }
                                  setRequests(prev => prev.filter(x => x.id !== r.id));
                                  const list = await listLanguageReviewers();
                                  setReviewers(list);
                                }}>Approve</Button>
                                <Button size="sm" variant="destructive" onClick={async ()=>{
                                  const res = await rejectReviewerRequest(r.id);
                                  if (!res.ok) { alert(res.error || 'Failed to reject'); return; }
                                  setRequests(prev => prev.filter(x => x.id !== r.id));
                                }}>Reject</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}


            {isSupabaseConfigured() && (
              <Card className="border">
                <CardHeader>
                  <CardTitle>New Language Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  {langRequests.length === 0 ? (
                    <div className="text-sm text-gray-600">No language requests yet.</div>
                  ) : (
                    (() => {
                      const counts = langRequests.reduce((m, r) => {
                        m[r.lang] = (m[r.lang] || 0) + 1; return m;
                      }, {} as Record<string, number>);
                      const items = Object.entries(counts)
                        .sort((a,b)=> (b[1] - a[1]) || a[0].localeCompare(b[0]));
                      const threshold = 3;
                      return (
                        <div className="overflow-x-auto">
                          <table className="min-w-full text-sm">
                            <thead>
                              <tr className="text-left border-b">
                                <th className="py-2 pr-4">Language</th>
                                <th className="py-2 pr-4">Requests</th>
                                <th className="py-2 pr-4">Status</th>
                                <th className="py-2 pr-4">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {items.map(([code, count]) => {
                                const alreadyApproved = approvedLangs.includes(code);
                                const canApprove = count >= threshold && !alreadyApproved;
                                return (
                                  <tr key={code} className="border-b last:border-0">
                                    <td className="py-2 pr-4">{popularLanguages.find(l=>l.code===code)?.name || code.toUpperCase()}</td>
                                    <td className="py-2 pr-4">{count}</td>
                                    <td className="py-2 pr-4">
                                      {count >= threshold ? (
                                        <span className="text-green-700 font-medium">Threshold met ({threshold})</span>
                                      ) : (
                                        <span className="text-gray-700">Waiting for {threshold - count} more</span>
                                      )}
                                    </td>
                                    <td className="py-2 pr-4">
                                      {alreadyApproved ? (
                                        <span className="text-gray-600">Approved</span>
                                      ) : (
                                        <Button size="sm" disabled={!canApprove} onClick={async ()=>{
                                          if (!canApprove) return;
                                          const res = await addApprovedLanguage(code);
                                          if (!res.ok) { alert(res.error || 'Failed to approve language'); return; }
                                          const list = await listApprovedLanguages();
                                          setApprovedLangs(list);
                                        }}>Approve</Button>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      );
                    })()
                  )}
                </CardContent>
              </Card>
            )}




            {!loading && !remote && (
              <div className="text-xs text-gray-600">Supabase not configured – showing local-only statistics.</div>
            )}
          </div>
        </div>
      </div>
    </TranslationLayout>
  );
};

export default ReadAdminDashboardPage;

