import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { popularLanguages } from '@/data/languages';
import { Plus, X } from 'lucide-react';
const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedLangCode, setSelectedLangCode] = useState<string>('');
  const [languageProficiency, setLanguageProficiency] = useState<Array<{ code: string; level: 'Beginner'|'Fluent'|'Native/Academic' }>>([]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = location.state?.from?.pathname || '/';

  React.useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !firstName || !lastName) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      await signUp(email, password, {
        firstName,
        lastName,
        languageProficiency,
      });
      toast({
        title: "Account created",
        description: "Please check your email to confirm your account",
      });
      setActiveTab('login');
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gradient-to-br from-indian-cream to-white pt-20">
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-80px-64px)]">
          <Card className="w-full max-w-md border-2 border-indian-saffron/50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-indian-cream to-white pop-shadow-card">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold tracking-tight text-black">
                Welcome to the Centre
              </CardTitle>
              <CardDescription className="text-gray-600">
                Sign in to your account or create a new one
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-gradient-to-br from-spiritual-50 to-white border border-spiritual-200 p-1 rounded-md">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-indian-saffron hover:bg-indian-saffron/90" disabled={loading}>
                      {loading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="register">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="grid gap-4 grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="First name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Last name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2 pt-2">
                      <Label>Language proficiency (for translation project)</Label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Select value={selectedLangCode} onValueChange={setSelectedLangCode}>
                          <SelectTrigger className="w-full sm:w-[260px] bg-white">
                            <SelectValue placeholder="Select a language" />
                          </SelectTrigger>
                          <SelectContent>
                            {popularLanguages
                              .filter(l => !languageProficiency.some(p => p.code === l.code))
                              .map(l => (
                                <SelectItem key={l.code} value={l.code}>{l.nativeName || l.name}</SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            if (!selectedLangCode) return;
                            if (languageProficiency.some(p => p.code === selectedLangCode)) return;
                            setLanguageProficiency([...languageProficiency, { code: selectedLangCode, level: 'Fluent' }]);
                            setSelectedLangCode('');
                          }}
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add language
                        </Button>
                      </div>

                      {languageProficiency.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {languageProficiency.map((lp, idx) => {
                            const lang = popularLanguages.find(l => l.code === lp.code);
                            return (
                              <div key={lp.code} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 border rounded-md p-2 bg-gradient-to-br from-white to-indian-cream/30">
                                <div className="flex-1 text-sm font-medium">
                                  {lang ? (lang.nativeName || lang.name) : lp.code}
                                </div>
                                <Select
                                  value={lp.level}
                                  onValueChange={(val) => {
                                    const next = [...languageProficiency];
                                    next[idx] = { ...next[idx], level: val as 'Beginner'|'Fluent'|'Native/Academic' };
                                    setLanguageProficiency(next);
                                  }}
                                >
                                  <SelectTrigger className="w-[220px] bg-white">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Beginner">Beginner</SelectItem>
                                    <SelectItem value="Fluent">Fluent</SelectItem>
                                    <SelectItem value="Native/Academic">Native/Academic</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  onClick={() => {
                                    setLanguageProficiency(languageProficiency.filter((p) => p.code !== lp.code));
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <Button type="submit" className="w-full bg-indian-saffron hover:bg-indian-saffron/90" disabled={loading}>
                      {loading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="mb-4">
              <p className="text-center text-sm text-muted-foreground w-full">
                By continuing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;
