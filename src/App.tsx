import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate, useParams } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "@/components/shared/ScrollToTop";

// Import pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/About/AboutPage";
import OurCentre from "./pages/About/OurCentre";
import Vedanta from "./pages/About/Vedanta";
import HolyTrinity from "./pages/About/HolyTrinity";

import ContactPage from "./pages/Contact/ContactPage";

// Import Services pages
import ServicesPage from "./pages/Services/ServicesPage.tsx";
import Satsangs from "./pages/Services/Satsangs.tsx";
import HinduismForChildren from "./pages/Services/HinduismForChildren";
import SpecialFunctions from "./pages/Services/SpecialFunctions.tsx";

import NutritionProgramme from "./pages/Services/NutritionProgramme";
import FullSizeImage from "./pages/Services/FullSizeImage";
import SeminarRegistration from "./pages/Services/SeminarRegistration";
import GuruPurnimaInvitation from "./pages/Services/GuruPurnimaInvitation";
import SpecialProgrammeInvitation from "./pages/Services/SpecialProgrammeInvitation";
import WelcomeReceptionInvitation from "./pages/Services/WelcomeReceptionInvitation";
import SriSaradaDeviJayantiInvitation from "./pages/Services/SriSaradaDeviJayantiInvitation";
import MahaShivaratriInvitation from "./pages/Services/MahaShivaratriInvitation";
import SriRamakrishna190thInvitation from "./pages/Services/SriRamakrishna190thInvitation";



// Import New Ashram Project Section
import NewAshramProjectPage from "./pages/NewAshramProject/NewAshramProjectPage";
import VisionPage from "./pages/NewAshramProject/VisionPage";
import TimelinePage from "./pages/NewAshramProject/TimelinePage";

// Dev helper to log env flags
const DevFlag: React.FC = () => {
  return null;
};

import FundraisingPage from "./pages/NewAshramProject/FundraisingPage";

// Import Learn pages
import LessonsPage from "./pages/Learn/LessonsPage";
import LessonPage from "./pages/Learn/LessonPage";
import CommunityLearningPage from "./pages/Learn/CommunityLearningPage";
import QuizPage from "./pages/Learn/QuizPage";
import IndividualQuizPage from "./pages/Learn/IndividualQuizPage";

import SubmitQuestionPage from "./pages/Learn/SubmitQuestionPage";

import LearnPage from "./pages/Learn/LearnPage";
import LearnUnveilPage from "./pages/Learn/LearnUnveilPage";
import GamesPage from "./pages/Learn/GamesPage";
import AumChanterPage from "./pages/Learn/AumChanterPage";
import ThankYouPage from "./pages/Donate/ThankYouPage.tsx";
import OnThisDay from "./pages/OnThisDay";
import { lazy, Suspense } from "react";

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indian-cream to-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-indian-saffron border-t-transparent rounded-full animate-spin" />
      <p className="text-spiritual-600 font-medium">Loading...</p>
    </div>
  </div>
);

// Lazy load heavy pages for better performance
const BlockVisualization = lazy(() => import("./pages/BlockVisualization"));
const ApiTest = lazy(() => import("./pages/ApiTest"));
const GuessThePicturePage = lazy(() => import("./pages/Learn/GuessThePicturePage.tsx"));
const MastersWordsGamePage = lazy(() => import("./pages/Learn/MastersWordsGame.tsx"));
const QuotesPage = lazy(() => import("./pages/Learn/QuotesPage"));
const WordScramblePage = lazy(() => import("./pages/Learn/WordScramblePage"));
const SpeechMemorizerPage = lazy(() => import("./pages/Learn/SpeechMemorizerPage.tsx"));

import ReadIndexPage from "./pages/Learn/ReadIndexPage";
import ReadLecturePage from "./pages/Learn/ReadLecturePage";
import ReadEnglishOnlyPage from "./pages/Learn/ReadEnglishOnlyPage";

import ReadLanguageHomePage from "./pages/Learn/ReadLanguageHomePage";
import ReadStatsPage from "./pages/Learn/ReadStatsPage";
import LoginPage from "@/pages/Auth/LoginPage";
import ReadLanguagesPage from "./pages/Learn/ReadLanguagesPage";
import ReadLanguageStatsPage from "./pages/Learn/ReadLanguageStatsPage";
import RequestLanguagePage from "./pages/Learn/RequestLanguagePage";
import ProfilePage from "./pages/User/ProfilePage";
import TranslationsModerationPage from "./pages/Moderation/TranslationsModerationPage";


import ReadHomePage from "./pages/Learn/ReadHomePage";
import ReadAdminDashboardPage from "./pages/Learn/ReadAdminDashboardPage";
import ReadProfilePage from "./pages/Learn/ReadProfilePage";
import ReadFaqPage from "./pages/Learn/ReadFaqPage";
import ReadPublicProfilePageWrapper from "./pages/Learn/ReadPublicProfilePageWrapper";




// Import Dashboard pages
import StudentDashboard from "./pages/Dashboard/StudentDashboard";
import TeacherDashboard from "./pages/Dashboard/TeacherDashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";

// Import Admin pages
import MantraAdminPage from "./pages/Admin/MantraAdminPage";
import ContentManagementPage from "./pages/Admin/ContentManagementPage";
import VerseManagementPage from "./pages/Admin/VerseManagementPage";
import BulkVerseImport from "./pages/Admin/BulkVerseImport";
import ModeratorManagementPage from "./pages/Admin/ModeratorManagementPage";
import ModeratorDashboardPage from "./pages/Admin/ModeratorDashboardPage";
import AdminProtectedRoute from "./components/auth/AdminProtectedRoute";

// Lazy load Gallery pages (image-heavy)
const GalleryPage = lazy(() => import("./pages/Gallery/GalleryPage"));
const GalleryImageView = lazy(() => import("./pages/Gallery/GalleryImageView"));

// Import Donation pages
import DonatePage from "./pages/Donate/DonatePage";

// Lazy load Test/Dev pages
const TestPage = lazy(() => import("./pages/TestPage"));
const BlocksPage = lazy(() => import("./pages/BlocksPage"));

const queryClient = new QueryClient();

const ConditionalNavbar: React.FC = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/read')) return null;
  return <Navbar />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ConditionalNavbar />
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<Index />} />
            <Route path="/on-this-day" element={<OnThisDay />} />

            {/* About Section */}
            <Route path="/about" element={<AboutPage />}>
              <Route path="/about/our-centre" element={<OurCentre />} />
              <Route path="/about/vedanta" element={<Vedanta />} />
              <Route path="/about/holy-trinity" element={<HolyTrinity />} />

            </Route>

            {/* Services Section */}
            <Route path="/services" element={<ServicesPage />}>
              <Route path="/services/satsangs" element={<Satsangs />} />
              <Route path="/services/hinduism-for-children" element={<HinduismForChildren />} />
              <Route path="/services/special-functions" element={<SpecialFunctions />} />
              <Route path="/services/nutrition-programme" element={<NutritionProgramme />} />
              <Route path="/services/nutrition-programme/image/:imageId" element={<FullSizeImage />} />
            </Route>

            {/* Standalone Service Pages */}
            <Route path="/services/seminar-registration" element={<SeminarRegistration />} />
            <Route path="/services/guru-purnima-invitation" element={<GuruPurnimaInvitation />} />
            <Route path="/services/special-programme-invitation" element={<SpecialProgrammeInvitation />} />
            <Route path="/services/welcome-reception-invitation" element={<WelcomeReceptionInvitation />} />
            <Route path="/services/sri-sarada-devi-jayanti-invitation" element={<SriSaradaDeviJayantiInvitation />} />
            <Route path="/services/maha-shivaratri-invitation" element={<MahaShivaratriInvitation />} />
            <Route path="/services/sri-ramakrishna-190th-invitation" element={<SriRamakrishna190thInvitation />} />


            {/* New Ashram Project Section */}
            <Route path="/new-ashram-project" element={<NewAshramProjectPage />} />
            <Route path="/new-ashram-project/vision" element={<VisionPage />} />
            <Route path="/new-ashram-project/timeline" element={<TimelinePage />} />
            <Route path="/new-ashram-project/fundraising" element={<FundraisingPage />} />
            <Route path="/new-ashram-project/3d-model" element={<Suspense fallback={<PageLoader />}><BlockVisualization /></Suspense>} />
            {/* <Route path="/test-3d" element={<Test3D />} /> */}
            <Route path="/simple-3d-test" element={<div style={{padding: '20px', backgroundColor: 'lightblue', minHeight: '100vh'}}><h1>Simple Test Page Works!</h1><p>If you can see this, routing is working.</p></div>} />
            <Route path="/api-test" element={<Suspense fallback={<PageLoader />}><ApiTest /></Suspense>} />

            {/* Learn Section */}
            <Route path="/learnunveil" element={<LearnUnveilPage />} />
            <Route path="/learn" element={<LearnPage />} />
              <Route path="/learn/lessons/:topicId/:lessonId" element={<LessonPage />} />
              <Route path="/learn/community" element={<CommunityLearningPage />} />
              <Route path="/learn/quizzes" element={<QuizPage />} />
              <Route path="/learn/quizzes/:quizId" element={<IndividualQuizPage />} />

              <Route path="/learn/submit" element={<SubmitQuestionPage />} />
              <Route path="/learn/games" element={<GamesPage />} />
              <Route path="/learn/games/aum-chanter" element={<AumChanterPage />} />
              <Route path="/learn/games/guess-picture" element={<Suspense fallback={<PageLoader />}><GuessThePicturePage /></Suspense>} />
              <Route path="/learn/games/wordle" element={<Suspense fallback={<PageLoader />}><MastersWordsGamePage /></Suspense>} />
              <Route path="/learn/games/quotes" element={<Suspense fallback={<PageLoader />}><QuotesPage /></Suspense>} />
              <Route path="/learn/games/word-scramble" element={<Suspense fallback={<PageLoader />}><WordScramblePage /></Suspense>} />
              {/* Speech Memorizer (Password protected) */}
              <Route path="/speech" element={<Suspense fallback={<PageLoader />}><SpeechMemorizerPage /></Suspense>} />




	              {/* Read/Translate (Dev-only) */}
	              <Route path="/read" element={<ReadHomePage />} />
              <Route path="/read/lectures" element={<ReadIndexPage />} />
              <Route path="/read/languages" element={<ReadLanguagesPage />} />
              <Route path="/read/languages/:langCode/stats" element={<ReadLanguageStatsPage />} />
              <Route path="/read/request/:languageCode" element={<RequestLanguagePage />} />
	              <Route path="/read/fr" element={<ReadLanguageHomePage />} />
              <Route path="/read/faq" element={<ReadFaqPage />} />


	              <Route path="/read/stats" element={<ReadStatsPage />} />
              <Route path="/read/admin" element={<ReadAdminDashboardPage />} />

	              <Route path="/read/profile" element={<ReadProfilePage />} />
	              {/* Support readable profile URLs; :userId may be a UUID, username, or a name slug */}
              <Route path="/user/:userId" element={<ReadPublicProfilePageWrapper />} />
              {/* Back-compat redirect from old path */}
	              <Route path="/read/user/:userId" element={<Navigate to="/user/:userId" replace />} />

	              <Route path="/read/:lectureId" element={<ReadLecturePage />} />
	              <Route path="/read/:lectureId/english" element={<ReadEnglishOnlyPage />} />

            {/* Authentication and User Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />

            {/* Supabase Auth and Moderation */}
            <Route path="/auth" element={<Navigate to="/login" replace />} />
            <Route path="/auth/login" element={<Navigate to="/login" replace />} />
            <Route path="/auth/signup" element={<Navigate to="/login" replace />} />
            <Route path="/moderation/translations" element={<TranslationsModerationPage />} />

            {/* Admin Routes - Now available in production */}
            {/* Admin Login - Redirect to unified login */}
            <Route path="/admin/login" element={<Navigate to="/login" replace />} />

            {/* Protected Admin Routes - Super Admin */}
            <Route path="/admin" element={
              <AdminProtectedRoute requiredRole="super_admin">
                <AdminDashboard />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/moderators" element={
              <AdminProtectedRoute requiredRole="super_admin">
                <ModeratorManagementPage />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/content" element={
              <AdminProtectedRoute requiredRole="super_admin">
                <ContentManagementPage />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/verses" element={
              <AdminProtectedRoute requiredRole="super_admin">
                <VerseManagementPage />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/bulk-import" element={
              <AdminProtectedRoute requiredRole="super_admin">
                <BulkVerseImport />
              </AdminProtectedRoute>
            } />

            {/* Protected Admin Routes - Moderator */}
            <Route path="/admin/my-assignments" element={
              <AdminProtectedRoute requiredRole="moderator">
                <ModeratorDashboardPage />
              </AdminProtectedRoute>
            } />

            {/* Shared Routes - Both roles can access - Dev only */}
            {import.meta.env.DEV && (
              <Route path="/admin/mantras" element={
                <AdminProtectedRoute>
                  <MantraAdminPage />
                </AdminProtectedRoute>
              } />
            )}

            {/* Dashboard Routes - Protected */}
            <Route path="/dashboard/student" element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/teacher" element={
              <ProtectedRoute>
                <TeacherDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/admin" element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            {/* Donation Routes */}
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/donate/thank-you" element={<ThankYouPage />} />

            {/* Gallery Section */}
            <Route path="/gallery" element={<Suspense fallback={<PageLoader />}><GalleryPage /></Suspense>} />
            <Route path="/gallery/image/:imageId" element={<Suspense fallback={<PageLoader />}><GalleryImageView /></Suspense>} />

            {/* Contact Page */}
            <Route path="/contact" element={<ContactPage />} />

            {/* Test Page */}
            <Route path="/test" element={<Suspense fallback={<PageLoader />}><TestPage /></Suspense>} />

            {/* Blocks Page (Development Only) */}
            <Route path="/blocks" element={<Suspense fallback={<PageLoader />}><BlocksPage /></Suspense>} />

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
