import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import TranslationLayout from '@/components/layout/TranslationLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { getSupabase, isSupabaseConfigured } from '@/services/translationsSupabase';

const SupabaseSignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search] = useSearchParams();
  const navigate = useNavigate();

  const next = search.get('next') || '/';
  const readnav = search.get('readnav') === '1';
  const redirectTo = `${window.location.origin}/auth/login?next=${encodeURIComponent(next)}`;

  const handleSignup = async () => {
    setError(null); setMessage(null);
    const sb = getSupabase();
    if (!sb || !isSupabaseConfigured()) { setError('Auth is not configured.'); return; }
    if (!email || !password) { setError('Please enter email and password.'); return; }
    try {
      setLoading(true);
      const { error } = await sb.auth.signUp({ email, password, options: { emailRedirectTo: redirectTo } });
      if (error) { setError(error.message); return; }
      setMessage('Account created. Please check your email to confirm, then log in.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError(null); setMessage(null);
    const sb = getSupabase();
    if (!sb) return;
    const { error } = await sb.auth.resend({ type: 'signup', email, options: { emailRedirectTo: redirectTo } });
    if (error) setError(error.message); else setMessage('Confirmation email resent. Please check your inbox (or spam).');
  };

  const Layout = readnav ? TranslationLayout : PageLayout;

  return (
    <Layout title="Sign Up">
      <div className="w-full bg-gradient-to-br from-indian-cream to-white py-12">
        <div className="container mx-auto px-4 max-w-md">
          <h1 className="text-2xl font-heading font-semibold mb-4">Create Account</h1>
          <div className="space-y-3">
            <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <div className="text-sm text-red-600">{error}</div>}
            {message && <div className="text-sm text-green-700">{message}</div>}
            <div className="flex gap-2">
              <Button onClick={handleSignup} disabled={loading || !email || !password}>
                {loading ? 'Creating account…' : 'Create Account'}
              </Button>
              <Button variant="outline" onClick={handleResend} disabled={!email}>Resend confirmation</Button>
            </div>
            <div className="text-sm text-gray-600">
              Already have an account? <Link className="text-spiritual-700 underline" to={`/auth/login?next=${encodeURIComponent(next)}`}>Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SupabaseSignupPage;

