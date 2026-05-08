import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import TranslationLayout from '@/components/layout/TranslationLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getSupabase, isSupabaseConfigured, upsertProfile, updateProfileLanguageProficiency } from '@/services/translationsSupabase';

const SupabaseLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [linkSent, setLinkSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search] = useSearchParams();
  const navigate = useNavigate();

  const next = search.get('next') || '/';
  const readnav = search.get('readnav') === '1';

  // Handle magic-link redirect and complete login (only when returning with tokens)
  useEffect(() => {
    const handleDeepLink = async () => {
      const hash = window.location.hash || '';
      if (!hash.includes('access_token')) return; // only process after clicking email magic link

      const sb = getSupabase();
      if (!sb) return;
      // Parse and set session if hash contains access_token
      await sb.auth.getSession();
      const { data } = await sb.auth.getUser();
      const user = data.user;
      if (!user) return;

      try {
        const { getProfile, updateUserRole, isUsernameAvailable, updateUsername } = await import('@/services/translationsSupabase');
        const existing = await getProfile(user.id);
        const isAdminEmail = (user.email || '').toLowerCase() === 'viprananda@rkmm.org';
        const roleToSet = existing?.role || (isAdminEmail ? 'admin' : 'user');
        await upsertProfile({ id: user.id, email: user.email ?? null, role: roleToSet });
        if (!existing?.role && roleToSet === 'admin') {
          await updateUserRole(user.id, 'admin');
        }
        // Sync language proficiency from localStorage if present
        try {
          const lpRaw = localStorage.getItem('languageProficiency');
          if (lpRaw) {
            const parsed = JSON.parse(lpRaw);
            await updateProfileLanguageProficiency(user.id, parsed);
          }
        } catch {}
        // Ensure a public username exists for attribution and policies
        const hadUsernameBefore = Boolean(existing?.username);
        let p = await getProfile(user.id);
        if (!p?.username) {
          if (hadUsernameBefore) {
            // Do NOT auto-change usernames if the profile previously had one
            // (prevents accidental overwrite due to a stale read)
            // Just continue and let downstream pages fetch the latest profile.
          } else {
            // Try to auto-create a sensible default username ONLY for new users
            const baseFromEmail = (user.email || '').split('@')[0] || '';
            const baseFromName = [p?.first_name || '', p?.last_name || ''].filter(Boolean).join('-');
            const rawBase = (baseFromEmail || baseFromName || 'user').toLowerCase();
            const normalizedBase = rawBase
              .replace(/[^a-z0-9-]/g, '-')
              .replace(/-{2,}/g, '-')
              .replace(/^-+|-+$/g, '')
              .slice(0, 30);
            let candidate = normalizedBase || 'user';
            let attempts = 0;
            while (attempts < 3) {
              const ok = await isUsernameAvailable(candidate);
              if (ok) {
                const res = await updateUsername(user.id, candidate);
                if (res.ok) { p = await getProfile(user.id); break; }
              }
              attempts++;
              const suffix = Math.floor(1000 + Math.random() * 9000);
              candidate = `${normalizedBase}-${suffix}`.slice(0, 30);
            }
          }
          // If still no username, fall back to asking the user (rare edge case)
          if (!p?.username) {
            navigate(`/profile?requireUsername=1&next=${encodeURIComponent(next)}`);
            return;
          }
        }
      } catch {}

      navigate(next);
    };
    handleDeepLink();
  }, [navigate, next]);

  // If already logged in (no deep-link hash), redirect away from login
  useEffect(() => {
    const hash = window.location.hash || '';
    if (hash.includes('access_token')) return; // handled by deep-link effect
    const check = async () => {
      const sb = getSupabase();
      if (!sb) return;
      const { data: sessionData } = await sb.auth.getSession();
      if (sessionData.session?.user) {
        navigate(next, { replace: true });
      }
    };
    check();
  }, [navigate, next]);

  const sendMagicLink = async () => {
    setError(null);
    const sb = getSupabase();
    if (!sb || !isSupabaseConfigured()) { setError('Auth is not configured.'); return; }
    if (!email) { setError('Please enter your email.'); return; }
    try {
      setLoading(true);
      const redirectTo = `${window.location.origin}/auth/login?next=${encodeURIComponent(next)}`;
      const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo } });
      if (error) { setError(error.message); return; }
      setLinkSent(true);
    } finally {
      setLoading(false);
    }
  };

  const Layout = readnav ? TranslationLayout : PageLayout;

  return (
    <Layout title="Login">
      <div className="w-full bg-gradient-to-br from-indian-cream to-white py-12">
        <div className="container mx-auto px-4 max-w-md">
          <h1 className="text-2xl font-heading font-semibold mb-4">Login to Your Account</h1>
          <div className="space-y-3">
            <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {error && <div className="text-sm text-red-600">{error}</div>}
            {!linkSent ? (
              <Button onClick={sendMagicLink} disabled={loading || !email}>
                {loading ? 'Sending…' : 'Send sign-in link'}
              </Button>
            ) : (
              <div className="text-sm text-green-700">Magic link sent. Please check your inbox (and spam). Click the link to finish signing in.</div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SupabaseLoginPage;

