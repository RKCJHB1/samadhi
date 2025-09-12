import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import TranslationLayout from '@/components/layout/TranslationLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { popularLanguages } from '@/data/languages';
import { Languages, ArrowLeft, Send, Users, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { hasRequestedLanguage, submitLanguageRequest, getUserLanguageLevel } from '@/services/translationsSupabase';
import { featureFlags } from '@/utils/featureFlags';
import NotFoundMessage from '@/components/learn/NotFoundMessage';

const RequestLanguagePage: React.FC = () => {
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

  const { languageCode } = useParams<{ languageCode: string }>();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [alreadyRequested, setAlreadyRequested] = useState(false);
  const [hasProficiency, setHasProficiency] = useState<boolean | null>(null);

  // Find the language details
  const language = popularLanguages.find(l => l.code === languageCode);

  React.useEffect(() => {
    (async () => {
      if (!user || !language) return;
      const has = await hasRequestedLanguage(language.code);
      setAlreadyRequested(has);
      const level = await getUserLanguageLevel(user.id, language.code);
      setHasProficiency(!!level);
    })();
  }, [user?.id, language?.code]);

  if (!language) {
    return (
      <TranslationLayout title="Language Not Found">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Language Not Found</h1>
            <p className="text-gray-600 mb-6">The requested language could not be found.</p>
            <Button onClick={() => navigate('/read/languages')} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Languages
            </Button>
          </div>
        </div>

      </TranslationLayout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (hasProficiency === false) {
      alert('Please add your proficiency for this language in your profile before requesting it.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitLanguageRequest(language.code, reason.trim());
      if (!res.ok) {
        alert(res.error || 'Failed to submit request');
        setIsSubmitting(false);
        return;
      }
      setIsSubmitted(true);
      setAlreadyRequested(true);
    } catch (error) {
      console.error('Error submitting language request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <TranslationLayout title={`Request ${language?.name || ''} Translation`}>
        <div className="w-full bg-gradient-to-br from-indian-cream to-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center text-gray-600">Loading…</div>
          </div>
        </div>
      </TranslationLayout>
    );
  }

  if (!user) {
    return (
      <TranslationLayout title={`Request ${language.name} Translation`}>
        <div className="w-full bg-gradient-to-br from-indian-cream to-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card className="border-indian-saffron/30">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Languages className="h-8 w-8 text-spiritual-500" />
                    <CardTitle className="text-2xl">Request {language.name} Translation</CardTitle>
                  </div>
                    <p className="text-gray-600">Help us translate Swami Vivekananda's lectures into {language.name}.</p>

                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <p className="text-gray-700">
                    You need to be logged in to request a new language translation.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={() => navigate(`/auth/login?readnav=1&next=${encodeURIComponent(window.location.pathname + window.location.search)}`)} className="bg-spiritual-500 hover:bg-spiritual-600">
                      Login to Request
                    </Button>
                    <Button onClick={() => navigate('/read/languages')} variant="outline">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Languages
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </TranslationLayout>
    );
  }

  if (isSubmitted) {
    return (
      <TranslationLayout title={`Request ${language.name} Translation`}>
        <div className="w-full bg-gradient-to-br from-indian-cream to-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card className="border-indian-saffron/30">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Send className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl text-green-700">Request Submitted!</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <p className="text-gray-700">
                    Thank you for requesting <strong>{language.name}</strong> translation support.
                    We'll review your request and notify you when we have enough community interest to begin this translation project.
                  </p>
                  <div className="bg-gradient-to-br from-white to-yellow-50 border border-indian-saffron/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-indian-saffron mt-0.5" />
                      <div className="text-sm text-gray-700">
                        <p className="font-medium mb-1">What happens next?</p>
                        <p>We need at least 3 people to request this language before we can start the translation project. We'll keep you updated on the progress!</p>
                      </div>
                    </div>
                  </div>
                  <Button onClick={() => navigate('/read/languages')} variant="outline">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Languages
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </TranslationLayout>
    );
  }

  return (
    <TranslationLayout title={`Request ${language.name} Translation`}>
      <div className="w-full bg-gradient-to-br from-indian-cream to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-indian-saffron/30">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Languages className="h-8 w-8 text-spiritual-500" />
                  <div>
                    <CardTitle className="text-2xl">Request {language.name} Translation</CardTitle>
                    <p className="text-gray-600 mt-1">Help us translate Swami Vivekananda's lectures into {language.name}.</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-br from-white to-yellow-50 border border-indian-saffron/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-indian-saffron mt-0.5" />
                    <div className="text-sm text-gray-700">
                      <p className="font-medium mb-1">Community-driven translations</p>
                      <p>We need at least <strong>3 people</strong> to request a language before we can start the translation project. This ensures sufficient community interest and potential contributors.</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                      Why would you like {language.name} translations? (Optional)
                    </label>
                    <Textarea
                      id="reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Tell us why this language is important to you or your community..."
                      className="min-h-[100px]"
                    />
                  </div>

                  {alreadyRequested && (
                    <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded p-2">
                      You have already requested this language. Thank you! We’ll start the project once at least 3 requests are received.
                    </div>
                  )}

                  {hasProficiency === null && (
                    <div className="text-sm text-gray-600">Checking eligibility…</div>
                  )}

                  {hasProficiency === false && (
                    <div className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded p-2">
                      To request {language.name}, please add it to your Language Proficiency first.
                      <Link to="/read/profile" className="ml-1 underline text-amber-900">Edit profile</Link>
                    </div>
                  )}



                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="submit"
                      disabled={isSubmitting || alreadyRequested || hasProficiency === false || hasProficiency === null}
                      className="bg-spiritual-500 hover:bg-spiritual-600 flex-1"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Submit Request
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => navigate('/read/languages')}
                      variant="outline"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </form>

                <div className="text-xs text-gray-500 text-center">
                  Logged in as: {user?.email}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TranslationLayout>
  );
};

export default RequestLanguagePage;
