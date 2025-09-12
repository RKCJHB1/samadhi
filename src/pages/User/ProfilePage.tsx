import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import TranslationLayout from '@/components/layout/TranslationLayout';
import { updateProfileFields, getProfile, updateUsername } from '@/services/translationsSupabase';
import { useLocation, useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, profile, signOut } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [savingUsername, setSavingUsername] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { toast } = useToast();

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || '');
      setLastName(profile.last_name || '');
      setUsername((profile as any).username || '');
    }
  }, [profile]);

  // If ?requireUsername=1:
  // - If username is missing, stay here and prompt
  // - If username already exists, auto-continue to next
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const must = params.get('requireUsername') === '1';
    const next = params.get('next') || '/';
    if (!must) return;
    if (username && username.trim().length >= 3) {
      navigate(next, { replace: true });
    }
  }, [location.search, username, navigate]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);

      const res = await updateProfileFields(user.id, { first_name: firstName, last_name: lastName });
      if (!res.ok) throw new Error(res.error || 'Failed to update profile');
      // Reload profile to reflect changes
      try { const p = await getProfile(user.id); if (p) { /* no direct set here, context will refresh on next mount */ } } catch {}

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully."
      });
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TranslationLayout title="Your Profile">
      <div className="w-full bg-gradient-to-br from-indian-cream to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
        <Card className="border border-indian-saffron/30">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-indian-blue">Your Profile</CardTitle>
            <CardDescription>
              Update your personal information
            </CardDescription>
          </CardHeader>
          <CardContent>
                {/* Role and profile info */}
                <div className="rounded-md bg-yellow-50 border border-yellow-200 p-3 text-sm text-yellow-800">
                  <div>Role: <span className="font-medium">{profile?.role ?? 'user'}</span></div>
                  {!profile?.role || profile?.role === 'user' ? (
                    <div className="mt-1">If you need moderator/admin access, please contact an administrator.</div>
                  ) : null}
                </div>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input
                      id="first-name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input
                      id="last-name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={user?.email}
                    disabled
                  />
                  <p className="text-sm text-muted-foreground">

                {/* Username field */}
                <div className="space-y-2">
                  <Label htmlFor="username">Public Username</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="username"
                      value={username}
                      onChange={(e)=>{ setUsername(e.target.value.toLowerCase()); setUsernameError(null); }}
                      placeholder="e.g. swami-viprananda"
                    />
                    <Button type="button" variant="outline" disabled={savingUsername || !username} onClick={async ()=>{
                      if (!user || !username) { setUsernameError('Username is required'); return; }
                      setSavingUsername(true);
                      const res = await updateUsername(user.id, username.trim() || null);
                      setSavingUsername(false);
                      if (!res.ok) { setUsernameError(res.error || 'Failed to update username'); return; }
                      toast({ title: 'Username updated', description: 'Your public username was saved.' });
                      const next = new URLSearchParams(location.search).get('next') || '/';
                      const require = new URLSearchParams(location.search).get('requireUsername') === '1';
                      if (require) navigate(next);
                    }}>{savingUsername ? 'Saving…' : 'Save Username'}</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">Only letters, numbers, and dashes. 3–30 characters.</p>
                  {(!username || usernameError) && (
                    <div className="text-xs text-red-600">A public username is required to continue using the reading section.</div>
                  )}
                  {usernameError && <div className="text-sm text-red-600">{usernameError}</div>}
                  {username && !usernameError && (
                    <div className="text-xs text-gray-700">Public URL: <a className="underline" href={`/user/${username}`}>{window.location.origin}/user/{username}</a></div>
                  )}
                </div>

                    To change your email, please contact an administrator.
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-indian-saffron hover:bg-indian-saffron/90"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={signOut}
                  className="border-indian-saffron/30 text-indian-saffron hover:bg-indian-saffron/10"
                >
                  Sign Out
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
          </div>
        </div>
      </div>
    </TranslationLayout>
  );
};

export default ProfilePage;
