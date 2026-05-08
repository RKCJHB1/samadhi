import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Calendar, Users, Star, BookOpen, Gamepad2, Music, Heart, CheckCircle2, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { enhancedLessonsData } from '@/data/lessonsDataNew';

const HinduismForChildren = () => {
  // Dynamically compute lesson counts per topic
  const topicSummaries = enhancedLessonsData.map((group) => ({
    topicId: group.topicId,
    topicName: group.topicName,
    lessonCount: group.lessons.length,
  }));
  const totalLessons = topicSummaries.reduce((sum, t) => sum + t.lessonCount, 0);

  // Icon map for topics
  const topicIcons: Record<string, React.ReactNode> = {
    'hindu-philosophy': <BookOpen className="w-6 h-6 text-indian-saffron" />,
    'holy-trinity': <Star className="w-6 h-6 text-indian-saffron" />,
    'deities': <Heart className="w-6 h-6 text-indian-saffron" />,
    'scriptures': <Book className="w-6 h-6 text-indian-saffron" />,
    'practices': <Calendar className="w-6 h-6 text-indian-saffron" />,
  };

  return (
    <div className="w-full bg-gradient-to-br from-indian-cream to-white">
      <div className="w-full bg-gradient-to-br from-indian-cream to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-4xl mx-auto mt-8">

            {/* ── Header ── */}
            <div className="inline-block p-6 rounded-lg bg-gradient-to-br from-indian-cream to-white border-2 border-indian-saffron shadow-lg transform transition-all duration-500 hover:shadow-xl hover:scale-[1.01] text-center w-full mb-8">
              <h1 className="text-3xl font-heading font-bold mb-4 text-black flex items-center justify-center gap-2">
                Hinduism for Children
                <Star className="w-6 h-6 text-indian-saffron" />
              </h1>
              <p className="text-gray-700">
                Interactive and engaging programs to help children learn about Hindu values, philosophy, and culture
              </p>
            </div>

            {/* ── Hero Image ── */}
            <div className="rounded-2xl overflow-hidden shadow-md border border-indian-saffron/20 mb-12">
              <img
                src="/pics/vivekananda blessing children.png"
                alt="Swami Vivekananda blessing children"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* ── What Children Will Learn ── */}
            <div className="bg-gradient-to-br from-indian-cream to-white rounded-lg p-6 shadow-sm border border-indian-saffron/20 mb-12">
              <h3 className="text-2xl font-heading font-semibold mb-6 text-center">What Children Will Learn</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Core values of Dharma, Karma, and compassion',
                  'Stories of deities, saints, and rishis',
                  'Introduction to the Vedas, Bhagavad Gita, and Ramayana',
                  'Meditation, prayer, and mindfulness practices',
                  'Lives and teachings of Sri Ramakrishna, Sri Sarada Devi, and Swami Vivekananda',
                  'Celebrations: Diwali, Maha Shivaratri, and more',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Curriculum Overview ── */}
            <div className="bg-gradient-to-br from-indian-cream to-white rounded-lg p-6 shadow-sm border border-indian-saffron/20 mb-12">
              <h3 className="text-2xl font-heading font-semibold mb-2 text-center">Curriculum Overview</h3>
              <p className="text-gray-600 text-center mb-6">
                <span className="font-semibold text-indian-saffron">{totalLessons} lessons</span> across {topicSummaries.length} topic areas
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {topicSummaries.map((topic) => (
                  <Link
                    key={topic.topicId}
                    to="/learn#lessons"
                    className="flex items-center gap-4 p-4 rounded-xl border border-indian-saffron/20 bg-white hover:shadow-md hover:border-indian-saffron/40 transition-all duration-200"
                  >
                    <div className="w-12 h-12 rounded-full bg-indian-saffron/10 flex items-center justify-center shrink-0">
                      {topicIcons[topic.topicId] ?? <BookOpen className="w-6 h-6 text-indian-saffron" />}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 leading-tight">{topic.topicName}</p>
                      <p className="text-sm text-gray-500">{topic.lessonCount} lessons</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* ── Explore Our Online Resources ── */}
            <div className="bg-gradient-to-br from-indian-cream to-white rounded-lg p-6 shadow-sm border border-indian-saffron/20 mb-12">
              <h3 className="text-2xl font-heading font-semibold mb-2 text-center">Explore Our Online Resources</h3>
              <p className="text-gray-600 text-center mb-6">
                Our online learning platform is live — explore lessons, games, and mantras right now!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Lessons Card */}
                <Link
                  to="/learn#lessons"
                  className="group flex flex-col items-center text-center p-6 rounded-2xl border-2 border-indian-saffron/20 bg-white hover:border-indian-saffron hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-indian-saffron/10 flex items-center justify-center mb-4 group-hover:bg-indian-saffron/20 transition-colors">
                    <BookOpen className="w-7 h-7 text-indian-saffron" />
                  </div>
                  <h4 className="text-lg font-heading font-semibold mb-2">Lessons &amp; Quizzes</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    {totalLessons} interactive lessons with videos, stories, and quizzes to test understanding.
                  </p>
                  <span className="inline-flex items-center gap-1 text-indian-saffron font-medium text-sm group-hover:gap-2 transition-all">
                    Start Learning <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>

                {/* Games Card */}
                <Link
                  to="/learn/games"
                  className="group flex flex-col items-center text-center p-6 rounded-2xl border-2 border-indian-saffron/20 bg-white hover:border-indian-saffron hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-indian-saffron/10 flex items-center justify-center mb-4 group-hover:bg-indian-saffron/20 transition-colors">
                    <Gamepad2 className="w-7 h-7 text-indian-saffron" />
                  </div>
                  <h4 className="text-lg font-heading font-semibold mb-2">Educational Games</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    4 interactive games — Word Scramble, Guess the Picture, Word Master, and Wisdom Quotes.
                  </p>
                  <span className="inline-flex items-center gap-1 text-indian-saffron font-medium text-sm group-hover:gap-2 transition-all">
                    Play Games <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>

                {/* Mantras Card */}
                <Link
                  to="/learn#mantras"
                  className="group flex flex-col items-center text-center p-6 rounded-2xl border-2 border-indian-saffron/20 bg-white hover:border-indian-saffron hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-indian-saffron/10 flex items-center justify-center mb-4 group-hover:bg-indian-saffron/20 transition-colors">
                    <Music className="w-7 h-7 text-indian-saffron" />
                  </div>
                  <h4 className="text-lg font-heading font-semibold mb-2">Mantra Learning</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Learn Sanskrit mantras with audio, transliteration, and syllable-by-syllable follow-along.
                  </p>
                  <span className="inline-flex items-center gap-1 text-indian-saffron font-medium text-sm group-hover:gap-2 transition-all">
                    Explore Mantras <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>

            {/* ── Class Information ── */}
            <div className="bg-gradient-to-br from-indian-cream to-white rounded-lg p-6 shadow-sm border border-indian-saffron/20 mb-12">
              <h3 className="text-2xl font-heading font-semibold mb-6">Sunday Classes</h3>
              <div className="bg-gradient-to-br from-indian-cream to-yellow-50 rounded-2xl border-2 border-indian-saffron p-6 hover:shadow-md transition-all duration-300">
                <h4 className="text-xl font-heading font-semibold mb-3 flex items-center justify-center gap-2">
                  <Book className="w-6 h-6 text-indian-saffron" />
                  Hinduism for Children Classes
                </h4>
                <div className="space-y-3 mt-4">
                  <p className="text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indian-saffron shrink-0" />
                    <span><span className="font-semibold">When:</span> Every Sunday</span>
                  </p>
                  <p className="text-gray-700 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indian-saffron shrink-0" />
                    <span><span className="font-semibold">Time:</span> 9:15 AM – 10:15 AM</span>
                  </p>
                  <p className="text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-indian-saffron shrink-0" />
                    <span><span className="font-semibold">Location:</span> Benvenuto Conference Centre</span>
                  </p>
                  <p className="text-gray-700 mt-4">
                    Weekly classes teaching Hinduism, Vedanta philosophy, and moral values to children through engaging activities and lessons.
                  </p>
                </div>
              </div>
            </div>

            {/* ── Contact / Registration CTA ── */}
            <div className="bg-gradient-to-br from-indian-saffron/5 to-yellow-50 rounded-lg p-6 shadow-sm border border-indian-saffron/30 mb-8">
              <div className="text-center">
                <h3 className="text-2xl font-heading font-semibold mb-3">Interested in Enrolling Your Child?</h3>
                <p className="text-gray-700 max-w-2xl mx-auto mb-6">
                  We welcome children of all ages to join our Sunday classes. For more information or to register your child, please get in touch with us.
                </p>
                <a
                  href="mailto:johannesburg@ramakrishna-phoenix.org.za?subject=Hinduism%20for%20Children%20-%20Enquiry"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indian-saffron text-white rounded-lg hover:bg-indian-saffron/90 transition-colors shadow-md hover:shadow-lg font-medium"
                >
                  <Mail className="w-5 h-5" />
                  Contact Us
                </a>
                <p className="text-gray-500 text-sm mt-4">
                  johannesburg@ramakrishna-phoenix.org.za
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HinduismForChildren;
