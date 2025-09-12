import React, { useEffect, useMemo, useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import TranslationLayout from '@/components/layout/TranslationLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, listPendingTranslations, listPendingTranslationsByLanguages, listReviewerLanguagesForUser, setTranslationStatus, isSupabaseConfigured, getProfile, getApprovedLanguageCodes } from '@/services/translationsSupabase';

const TranslationsModerationPage: React.FC = () => {
  const [pending, setPending] = useState<any[]>([]);
  const params = new URLSearchParams(window.location.search);
  const useReadLayout = params.get('readnav') === '1';
  const [loading, setLoading] = useState(true);
  const [myLangs, setMyLangs] = useState<string[]>([]);
  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
  const [allowedApproveLangs, setAllowedApproveLangs] = useState<Set<string>>(new Set());
  const [approvedSet, setApprovedSet] = useState<Set<string>>(new Set());
  const [myRole, setMyRole] = useState<'user'|'moderator'|'admin'|'unknown'>('unknown');
  const [filterMode, setFilterMode] = useState<'mine'|'all'>('mine');
  const navigate = useNavigate();

  const myApprovedLangs = useMemo(() => myLangs.filter(l => approvedSet.has((l||'').toLowerCase()) && (l||'').toLowerCase() !== 'en'), [myLangs, approvedSet]);
  const activeLangs = useMemo(() => (filterMode === 'mine' ? selectedLangs.filter(l => approvedSet.has((l||'').toLowerCase())) : Array.from(approvedSet)), [filterMode, selectedLangs, approvedSet]);

  useEffect(() => {
    (async () => {
      if (!isSupabaseConfigured()) { setLoading(false); return; }
      const user = await getCurrentUser();
      if (!user) { navigate('/login?next=/moderation/translations'); return; }
      const langs = await listReviewerLanguagesForUser(user.id);
      setMyLangs(langs);
      const prof = await getProfile(user.id);
      setMyRole((prof?.role as any) || 'user');
      const profArr = (prof?.language_proficiency as any[] | undefined) || [];
      const allowed = new Set<string>(profArr.filter(p => ['Fluent','Native/Academic'].includes(p.level)).map(p => (p.code || '').toLowerCase()).filter(Boolean));
      setAllowedApproveLangs(allowed);
      // Load approved language set
      const approved = await getApprovedLanguageCodes();
      const arr = Array.from(approved).filter(c => c && c.toLowerCase() !== 'en');
      const set = new Set(arr.map(c => c.toLowerCase()));
      setApprovedSet(set);
      // Initialize selected langs to intersection of reviewer langs and approved
      const initialSel = langs.filter(l => set.has((l||'').toLowerCase()));
      setSelectedLangs(initialSel);
      // Fetch pending for approved languages (all approved by default)
      const items = set.size > 0 ? await listPendingTranslationsByLanguages(Array.from(set), 200) : await listPendingTranslations(200);
      setPending(items);
      setLoading(false);
    })();
  }, [navigate]);

  useEffect(() => {
    (async () => {
      if (!isSupabaseConfigured()) return;
      setLoading(true);
      // Always restrict to approved set; if mine mode results in empty, show none
      const langs = (filterMode === 'mine') ? activeLangs : Array.from(approvedSet);
      const items = (langs && langs.length > 0)
        ? await listPendingTranslationsByLanguages(langs, 200)
        : [];
      setPending(items);
      setLoading(false);
    })();
  }, [activeLangs, approvedSet, filterMode]);

  const handleAction = async (idx: number, status: 'approved'|'rejected') => {
    const item = pending[idx];
    const ok = await setTranslationStatus(item, status);
    if (ok) setPending(pending.filter((_, i) => i !== idx));
  };

  const Layout = useReadLayout ? TranslationLayout : PageLayout;

  return (
    <Layout title="Moderate Translations">
      <div className="w-full bg-gradient-to-br from-indian-cream to-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-heading font-bold mb-6">Pending Translations</h1>
          <div className="max-w-6xl mx-auto space-y-6">
          {!isSupabaseConfigured() && (
            <div className="text-sm text-red-600">Supabase is not configured.</div>
          )}
          {isSupabaseConfigured() && filterMode==='mine' && selectedLangs.length > 0 && (
            <div className="mb-4 p-3 border rounded-md bg-white shadow-sm flex items-center gap-2 flex-wrap">
              {myApprovedLangs.map((l) => {
                const sel = selectedLangs.includes(l);
                return (
                  <Button key={l} size="sm" variant={sel ? 'default' : 'outline'} onClick={()=>{
                    setSelectedLangs((prev)=> sel ? prev.filter(x=>x!==l) : Array.from(new Set([...prev, l])));
                  }}>
                    {l.toUpperCase()}
                  </Button>
                );
              })}
              <Button size="sm" variant="ghost" onClick={()=>setSelectedLangs(myLangs)}>All</Button>
              <Button size="sm" variant="ghost" onClick={()=>setSelectedLangs([])}>Clear</Button>
            </div>
          )}

          {isSupabaseConfigured() && myLangs.length > 0 && (
            <div className="mb-4 p-3 border rounded-md bg-white shadow-sm flex items-center gap-3">
              <div className="text-sm text-gray-700">Filter:</div>
              <Button size="sm" variant={filterMode==='mine' ? 'default' : 'outline'} onClick={()=>setFilterMode('mine')}>My assigned</Button>
              <Button size="sm" variant={filterMode==='all' ? 'default' : 'outline'} onClick={()=>setFilterMode('all')}>All languages</Button>
              {filterMode==='mine' && (
                <div className="text-xs text-gray-600">{myLangs.map(l => l.toUpperCase()).join(', ') || '\u2014'}</div>
              )}
            </div>
          )}

          {isSupabaseConfigured() && (
            <Card className="border"><CardContent className="text-xs text-gray-700">
              <div className="font-medium text-gray-700 mb-1">How filtering and permissions work</div>
              <ul className="list-disc ml-5 space-y-1">
                <li>“My assigned” shows only languages you are assigned to review. Use the chips above to include/exclude specific languages.</li>
                <li>Approve requires you to be Fluent or Native/Academic in that language. Admins can approve all.</li>
                <li>Reject requires you to be assigned as a reviewer for that language. Admins can reject all.</li>
              </ul>
            </CardContent></Card>
          )}


          {loading ? (
            <div>Loading…</div>
          ) : pending.length === 0 ? (
            <div className="text-gray-600">No pending items.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pending.map((p, idx) => (
                <Card key={`${p.lecture_id}-${p.sentence_index}-${p.lang}-${p.created_at}`} className="border border-indian-saffron/40">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-600 mb-2">

                      {p.lecture_id} • sentence #{p.sentence_index} • {p.lang}
                    </div>
                    <div className="mb-3 whitespace-pre-wrap">{p.text}</div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        disabled={isSupabaseConfigured() && myRole !== 'admin' && !allowedApproveLangs.has((p.lang || '').toLowerCase())}
                        title={isSupabaseConfigured() && myRole !== 'admin' && !allowedApproveLangs.has((p.lang || '').toLowerCase()) ? 'You can only approve languages where you are Fluent or Native/Academic' : undefined}
                        onClick={() => handleAction(idx, 'approved')}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={isSupabaseConfigured() && myRole !== 'admin' && !myLangs.some(l => (l || '').toLowerCase() === (p.lang || '').toLowerCase())}
                        title={isSupabaseConfigured() && myRole !== 'admin' && !myLangs.some(l => (l || '').toLowerCase() === (p.lang || '').toLowerCase()) ? 'You can reject only in languages you are assigned to review' : undefined}
                        onClick={() => handleAction(idx, 'rejected')}
                      >
                        Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
          </div>
      </div>
    </Layout>
  );
};

export default TranslationsModerationPage;

