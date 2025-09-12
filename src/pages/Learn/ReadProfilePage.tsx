import React, { useEffect, useMemo, useState } from 'react';
import TranslationLayout from '@/components/layout/TranslationLayout';
import NotFoundMessage from '@/components/learn/NotFoundMessage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { popularLanguages } from '@/data/languages';
import { Badge } from '@/components/ui/badge';
import { getCurrentUser, getProfile, updateProfileLanguageProficiency, type LanguageProficiency, getReviewerCountForLang, submitReviewerVolunteer, listMyReviewerRequests } from '@/services/translationsSupabase';
import { useToast } from '@/hooks/use-toast';
import { featureFlags } from '@/utils/featureFlags';


const levels: LanguageProficiency['level'][] = ['Beginner','Fluent','Native/Academic'];

const ReadProfilePage: React.FC = () => {
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

  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [proficiency, setProficiency] = useState<LanguageProficiency[]>([]);
  const [saving, setSaving] = useState(false);
  const [coverage, setCoverage] = useState<Record<string, number>>({});
  const [myRequests, setMyRequests] = useState<Record<string, 'pending'|'approved'|'rejected'>>({});
  const [samples, setSamples] = useState<Record<string, string>>({});
  const [role, setRole] = useState<'user'|'moderator'|'admin'|null>(null);
  const [username, setUsername] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [usernameSaving, setUsernameSaving] = useState(false);
  const { toast } = useToast();
  const [savedProficiency, setSavedProficiency] = useState<LanguageProficiency[]>([]);

  const selectedCodes = useMemo(() => new Set(proficiency.map(p => p.code)), [proficiency]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const user = await getCurrentUser();
      if (!user || cancelled) { setLoading(false); return; }
      setUserId(user.id);
      const prof = await getProfile(user.id);
      const initial = (prof?.language_proficiency as LanguageProficiency[] | null) || [];
      setProficiency(initial);
      setSavedProficiency(initial);
      setRole((prof?.role as any) || 'user');
      setUsername((prof?.username as string) || "");
      setLoading(false);



    })();
    return () => { cancelled = true; };
  }, []);


  useEffect(() => {
    (async () => {
      if (!userId) return;
      const fluentLangs = proficiency.filter(p => p.level === 'Fluent' || p.level === 'Native/Academic').map(p => p.code);
      const entries = await Promise.all(fluentLangs.map(async (code) => {
        const c = await getReviewerCountForLang(code);
        return [code, c] as const;
      }));
      const cov: Record<string, number> = {};
      for (const [code, c] of entries) cov[code] = c;
      setCoverage(cov);
      const reqs = await listMyReviewerRequests();
      const map: Record<string, 'pending'|'approved'|'rejected'> = {};
      for (const r of reqs) map[r.lang] = r.status;
      setMyRequests(map);
    })();
  }, [userId, proficiency]);

  const addLanguage = () => {
    // Do not suggest English; it is the source language
    const first = popularLanguages.find(l => l.code !== 'en' && !selectedCodes.has(l.code));
    if (!first) return;
    const next = [...proficiency, { code: first.code, level: 'Beginner' }];
    setProficiency(next);
  };

  const save = async () => {
    if (!userId) return;
    setSaving(true);
    const res = await updateProfileLanguageProficiency(userId, proficiency);
    setSaving(false);
    if (!res.ok) alert(res.error || 'Failed to save');
    else {
      setSavedProficiency(proficiency);
      toast({ title: 'Profile saved', description: 'Your changes have been saved.' });
    }
  };

  return (
    <TranslationLayout title="Translation Profile">
      <div className="w-full bg-gradient-to-br from-indian-cream to-white py-12">



            {/* Unified column layout for consistent widths */}
        <div className="container mx-auto px-4">
            <Card className="max-w-3xl mx-auto border border-indian-saffron/30 shadow-sm bg-white/90">
              <CardHeader>
                <CardTitle>Public Username</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 mb-2">Set a clean URL for your public profile (unique). Only letters, numbers, and dashes, 3–30 characters.</div>
                <div className="flex flex-col sm:flex-row items-start gap-2">
                  <input
                    type="text"
                    className="border rounded px-3 py-2 bg-white w-full sm:w-80 text-sm"
                    value={username}
                    onChange={(e)=>{ setUsername(e.target.value.toLowerCase()); setUsernameError(null); }}
                    placeholder="e.g. swami-viprananda"
                  />
                  <Button disabled={usernameSaving} onClick={async ()=>{
                    if (!userId) return;
                    setUsernameSaving(true);
                    const { updateUsername } = await import('@/services/translationsSupabase');
                    const res = await updateUsername(userId, username.trim() || null);
                    setUsernameSaving(false);
                    if (!res.ok) { setUsernameError(res.error || 'Failed to update username'); return; }
                    setUsernameError(null);
                  }}>{usernameSaving ? 'Saving…' : 'Save Username'}</Button>
                </div>
                {usernameError && <div className="text-sm text-red-600 mt-2">{usernameError}</div>}
                {username && !usernameError && (
                  <div className="text-xs text-gray-700 mt-2">Your public URL: <a className="underline" href={`/user/${username}`}>{window.location.origin}/user/{username}</a></div>
                )}
              </CardContent>
            </Card>

            {/* Keep everything aligned to the same width and spacing */}
            <div className="max-w-3xl mx-auto space-y-6">


          <div>


            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">Your Translation Profile</h1>
            <div className="rounded-md bg-yellow-50 border border-yellow-200 p-3 text-sm text-yellow-800">
              <div>Your role: <span className="font-medium">{role ?? 'user'}</span></div>
            </div>

            <Card className="max-w-3xl mx-auto border border-indian-saffron/30 shadow-sm bg-white/90">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Language Proficiency</CardTitle>
                <Button variant="outline" size="sm" onClick={addLanguage}>Add Language</Button>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-sm text-gray-600">Loading…</div>
                ) : !userId ? (
                  <div className="text-sm text-gray-600">Please log in to manage your profile.</div>
                ) : (
                  <>
                    <div className="space-y-3">
                      {proficiency.length === 0 ? (
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <span>No languages added yet.</span>
                          <Button variant="outline" size="sm" onClick={addLanguage}>Add your first language</Button>
                        </div>
                      ) : (
                        proficiency.map((lp, idx) => (
                          <div key={idx} className="flex flex-col md:flex-row md:items-center gap-2 p-2 bg-gray-50 rounded">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">{popularLanguages.find(l => l.code === lp.code)?.name || lp.code.toUpperCase()}</Badge>
                            </div>
                            <div>
                              <select className="border rounded px-2 py-1 bg-white" value={lp.code} onChange={(e)=>{
                                const v = e.target.value;
                                setProficiency(prev => prev.map((p,i)=> i === idx ? { ...p, code: v } : p));
                              }}>
                                {popularLanguages.filter(l => l.code !== 'en').map(l => (
                                  <option key={l.code} value={l.code} disabled={l.code !== lp.code && selectedCodes.has(l.code)}>
                                    {l.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <select className="border rounded px-2 py-1 bg-white" value={lp.level} onChange={(e)=>{
                                const v = e.target.value as LanguageProficiency['level'];
                                setProficiency(prev => prev.map((p,i)=> i === idx ? { ...p, level: v } : p));
                              }}>
                                {levels.map(l => (<option key={l} value={l}>{l}</option>))}
                              </select>
                            </div>
                            <div className="md:ml-auto flex items-center gap-2">
                              {JSON.stringify(proficiency[idx]) !== JSON.stringify(savedProficiency[idx]) && (
                                <Button size="sm" onClick={async ()=>{
                                  if (!userId) return;
                                  setSaving(true);
                                  const res = await updateProfileLanguageProficiency(userId, proficiency);
                                  setSaving(false);
                                  if (res.ok) { setSavedProficiency(proficiency); toast({ title: 'Profile saved', description: 'Your changes have been saved.' }); }
                                  else alert(res.error || 'Failed to save');
                                }}>Save</Button>
                              )}
                              <Button variant="destructive" size="sm" onClick={async ()=>{
                                const next = proficiency.filter((_,i)=> i!==idx);
                                setProficiency(next);
                                if (userId) {
                                  setSaving(true);
                                  const res = await updateProfileLanguageProficiency(userId, next);
                                  setSaving(false);
                                  if (res.ok) toast({ title: 'Language removed', description: `${popularLanguages.find(l=>l.code===lp.code)?.name || lp.code.toUpperCase()} removed.` });
                                  else alert(res.error || 'Failed to save');
                                }
                              }}>Remove</Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                  </>
                )}
              </CardContent>
            </Card>

            {userId && (
              <Card className="max-w-3xl mx-auto border border-indian-saffron/30 shadow-sm bg-white/90">
                <CardHeader>
                  <CardTitle>Reviewer Volunteering</CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const threshold = 2;
                    const fluent = proficiency.filter(p => p.level === 'Fluent' || p.level === 'Native/Academic');
                    const suggestions = fluent.filter(p => (coverage[p.code] ?? 0) < threshold && (myRequests[p.code] !== 'pending' && myRequests[p.code] !== 'approved'));
                    if (suggestions.length === 0) return <div className="text-sm text-gray-600">No suggestions right now. Languages with fewer than {threshold} reviewers will appear here.</div>;
                    return (
                      <div className="space-y-4">
                        <div className="text-sm text-gray-700">We have low reviewer coverage for these languages. You qualify to volunteer based on your proficiency. Admins will review your request.</div>
                        {suggestions.map((p) => (
                          <div key={p.code} className="p-3 border rounded-md">
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <div className="font-medium">{popularLanguages.find(l=>l.code===p.code)?.name || p.code.toUpperCase()}</div>
                              <div className="text-xs text-gray-600">Current reviewers: {coverage[p.code] ?? 0}</div>
                            </div>
                            <textarea
                              id={`reviewer-sample-${p.code}`}
                              name="reviewerSample"
                              className="w-full border rounded px-2 py-1 text-sm"
                              rows={3}
                              placeholder="Optional: briefly share your background or a short sample to help admins vet your request."
                              value={samples[p.code] || ''}
                              onChange={(e)=> setSamples(prev => ({ ...prev, [p.code]: e.target.value }))}
                              aria-label={`${popularLanguages.find(l=>l.code===p.code)?.name || p.code.toUpperCase()} reviewer sample`}
                              autoComplete="off"
                            />
                            <div className="mt-2">
                              <Button size="sm" onClick={async ()=>{
                                const res = await submitReviewerVolunteer(p.code, p.level as any, samples[p.code] || '');
                                if (!res.ok) { alert(res.error || 'Failed to submit'); return; }
                                setMyRequests(prev => ({ ...prev, [p.code]: 'pending' }));
                                setSamples(prev => ({ ...prev, [p.code]: '' }));
                              }}>Volunteer as reviewer</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            )}

          </div>
        </div>
      </div>
      </div>
    </TranslationLayout>
  );
};

export default ReadProfilePage;

