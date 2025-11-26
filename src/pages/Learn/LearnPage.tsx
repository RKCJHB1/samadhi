import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import PageHeader from '../../components/shared/PageHeader';
import SectionHeader from '../../components/shared/SectionHeader';
import Button from '../../components/shared/Button';
import { Link } from 'react-router-dom';
import { BookOpen, PenTool, MessageSquare, Lightbulb, Music, Gamepad2, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { enhancedLessonsData as lessonsData } from '../../data/lessonsDataNew';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AudioPlayer from '../../components/audio/AudioPlayer';
import SyncedAudioPlayer from '../../components/audio/SyncedAudioPlayer';
import { gayatriMantraSyllables, sahaNavatuMantraSyllables } from '../../data/mantraTimings';




const LearnPage = () => {
  // State for managing active tabs
  const [activeMainTab, setActiveMainTab] = useState('lessons');
  const [activeLessonTab, setActiveLessonTab] = useState('philosophy');



  // Check if we're in a local development environment
  const isLocalDevelopment = () => {
    // Check if running on localhost or 127.0.0.1
    const hostname = window.location.hostname;
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes('.local');
  };

  // Handle URL hash for direct tab navigation
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      // If hash matches a lesson tab, set both main tab and lesson tab
      if (['philosophy', 'holy-trinity', 'deities', 'scriptures', 'practices'].includes(hash)) {
        setActiveMainTab('lessons');
        setActiveLessonTab(hash);
      }
      // If hash matches a main tab, set it
      else if (['lessons', 'games'].includes(hash)) {
        setActiveMainTab(hash);
      }
    }
  }, []);

  // Update URL hash when lesson tab changes
  const handleLessonTabChange = (value: string) => {
    setActiveLessonTab(value);
    window.history.replaceState(null, '', `#${value}`);
  };

  // Update URL hash when main tab changes
  const handleMainTabChange = (value: string) => {
    setActiveMainTab(value);
    if (value === 'lessons') {
      window.history.replaceState(null, '', `#${activeLessonTab}`);
    } else {
      window.history.replaceState(null, '', `#${value}`);
    }
  };



  // Sample mantras for display
  const mantras = [
    {
      id: 'gayatri',
      title: 'Gayatri Mantra',
      description: 'A highly revered mantra from Rigveda dedicated to Savitr, the sun deity',
      audio: '/audio/gayatri.mp3',
      text: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्',
      transliteration: 'Oṃ bhūr bhuvaḥ svaḥ tat savitur vareṇyaṃ bhargo devasya dhīmahi dhiyo yo naḥ pracodayāt',
      englishMeaning: 'Om, we meditate on the divine light of the Sun, the source of all life. May that effulgent light illuminate our minds and guide our understanding.',
      transliterationSyllables: ['Oṃ ', 'bhūr', 'bhuvaḥ ', 'svaḥ ', 'tat', 'sa', 'vi', 'tur', 'va', 're', 'ṇyaṃ ', 'bhar', 'go ', 'de', 'va', 'sya ', 'dhī', 'ma', 'hi ', 'dhi', 'yo ', 'yo ', 'naḥ ', 'pra', 'cho', 'da', 'yāt']
    },
    {
      id: 'saha-na-vavatu',
      title: 'Saha Nā Vavatu',
      description: 'A peace mantra from the Upanishads invoking protection and harmony for teacher and student',
      audio: '/audio/sahana.mp3',
      text: 'ॐ सह नाववतु सह नौ भुनक्तु सह वीर्यं करवावहै तेजस्विनावधीतमस्तु मा विद्विषावहै ॐ शान्तिः शान्तिः शान्तिः',
      transliteration: 'Oṃ saha nāvavatu saha nau bhunaktu saha vīryaṃ karavāvahai tejasvināvadhītamastu mā vidviṣāvahai oṃ śāntiḥ śāntiḥ śāntiḥ',
      englishMeaning: 'Om, may we be protected together and nourished together. May we work together with great vigor, and may our study be enlightening and fruitful. May we never quarrel with each other. Om peace, peace, peace.',
      transliterationSyllables: ['Oṃ ', 'sa', 'ha ', 'nā', 'va', 'va', 'tu ', 'sa', 'ha ', 'nau ', 'bhu', 'na', 'ktu ', 'sa', 'ha ', 'vī', 'rya', 'ṃ ', 'ka', 'ra', 'vā', 'va', 'hai ', 'te', 'ja', 'svi', 'nā', 'va', 'dhī', 'ta', 'ma', 'stu ', 'mā ', 'vi', 'dvi', 'ṣā', 'va', 'hai ', 'oṃ ', 'śān', 'ti', 'ḥ ', 'śān', 'ti', 'ḥ ', 'śān', 'ti', 'ḥ']
    },
  ];
  return (
    <PageLayout title="Hinduism for Children">


      <div className="w-full bg-gradient-to-br from-indian-cream to-white py-12">
        <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron p-6 rounded-lg mb-12 pop-shadow-card">
            <h2 className="text-2xl font-heading font-semibold mb-4">Welcome</h2>
            <p className="text-gray-700">
              Welcome to our learning platform, designed to provide accessible and comprehensive education about Hinduism and Vedanta philosophy for children.
              We aim to instill values, cultural appreciation, and spiritual understanding in an engaging and age-appropriate manner.
            </p>
          </div>



          <div className="mt-16">
            <SectionHeader
              title="Explore Lessons"
              subtitle="Discover our collection of lessons on Hindu philosophy and deities"
            />
            <Tabs value={activeMainTab} onValueChange={handleMainTabChange} className="w-full">
              <TabsList className={`grid w-full ${import.meta.env.DEV ? 'grid-cols-3' : 'grid-cols-2'} mb-8 bg-gradient-to-br from-spiritual-50 to-white border border-spiritual-200 p-1 rounded-md`}>
                <TabsTrigger value="lessons" className="text-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-indian-cream data-[state=active]:to-white data-[state=active]:border-b-2 data-[state=active]:border-indian-saffron">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Lessons
                </TabsTrigger>
                {/* DEVELOPMENT ONLY - Mantras tab hidden from production */}
                {import.meta.env.DEV && (
                  <TabsTrigger value="mantras" className="text-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-indian-cream data-[state=active]:to-white data-[state=active]:border-b-2 data-[state=active]:border-indian-saffron">
                    <Music className="w-5 h-5 mr-2" />
                    Mantras (Dev)
                  </TabsTrigger>
                )}

                <TabsTrigger value="games" className="text-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-indian-cream data-[state=active]:to-white data-[state=active]:border-b-2 data-[state=active]:border-indian-saffron">
                  <Gamepad2 className="w-5 h-5 mr-2" />
                  Games
                </TabsTrigger>
              </TabsList>

              <TabsContent value="lessons">
                <Tabs value={activeLessonTab} onValueChange={handleLessonTabChange} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 bg-gradient-to-br from-spiritual-50 to-white border border-spiritual-200 p-1 rounded-md">
                    <TabsTrigger value="philosophy" className="text-xs md:text-sm data-[state=active]:bg-gradient-to-br data-[state=active]:from-indian-cream data-[state=active]:to-white data-[state=active]:border-b-2 data-[state=active]:border-indian-saffron px-1 md:px-3">
                      <span className="hidden md:inline">Philosophy</span>
                      <span className="md:hidden">Phil.</span>
                    </TabsTrigger>
                    <TabsTrigger value="holy-trinity" className="text-xs md:text-sm data-[state=active]:bg-gradient-to-br data-[state=active]:from-indian-cream data-[state=active]:to-white data-[state=active]:border-b-2 data-[state=active]:border-indian-saffron px-1 md:px-3">
                      <span className="hidden md:inline">Holy Trinity</span>
                      <span className="md:hidden">Trinity</span>
                    </TabsTrigger>
                    <TabsTrigger value="deities" className="text-xs md:text-sm data-[state=active]:bg-gradient-to-br data-[state=active]:from-indian-cream data-[state=active]:to-white data-[state=active]:border-b-2 data-[state=active]:border-indian-saffron px-1 md:px-3">
                      <span className="hidden md:inline">Deities/Rishis</span>
                      <span className="md:hidden">Deities</span>
                    </TabsTrigger>
                    <TabsTrigger value="scriptures" className="text-xs md:text-sm data-[state=active]:bg-gradient-to-br data-[state=active]:from-indian-cream data-[state=active]:to-white data-[state=active]:border-b-2 data-[state=active]:border-indian-saffron px-1 md:px-3">
                      <span className="hidden md:inline">Scriptures</span>
                      <span className="md:hidden">Script.</span>
                    </TabsTrigger>
                    <TabsTrigger value="practices" className="text-xs md:text-sm data-[state=active]:bg-gradient-to-br data-[state=active]:from-indian-cream data-[state=active]:to-white data-[state=active]:border-b-2 data-[state=active]:border-indian-saffron px-1 md:px-3">
                      <span className="hidden md:inline">Practices/Moral Lessons</span>
                      <span className="md:hidden">Practice</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="philosophy">
                    <div className="space-y-8">
                      {lessonsData
                        .filter(lessonGroup => lessonGroup.topicId === 'hindu-philosophy')
                        .map((lessonGroup) => (
                          <div key={lessonGroup.topicId} className="mb-10">
                            <h2 className="text-2xl font-heading font-semibold mb-5">{lessonGroup.topicName}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {lessonGroup.lessons.map((lesson) => (
                                <Card key={lesson.id} className="hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/40 pop-shadow-card hover:from-indian-cream hover:to-white/95">
                                  <Link to={`/learn/lessons/${lessonGroup.topicId}/${lesson.id}`}>
                                    <CardContent className="p-4">
                                      <div className="text-lg font-medium mb-2">{lesson.title}</div>
                                      <p className="text-gray-600">{lesson.description}</p>
                                    </CardContent>
                                  </Link>
                                </Card>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="holy-trinity">
                    <div className="space-y-8">
                      {lessonsData
                        .filter(lessonGroup => lessonGroup.topicId === 'holy-trinity')
                        .map((lessonGroup) => (
                          <div key={lessonGroup.topicId} className="mb-10">
                            <h2 className="text-2xl font-heading font-semibold mb-5">{lessonGroup.topicName}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {lessonGroup.lessons.map((lesson) => (
                                <Card key={lesson.id} className="hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/40 pop-shadow-card hover:from-indian-cream hover:to-white/95">
                                  <Link to={`/learn/lessons/${lessonGroup.topicId}/${lesson.id}`}>
                                    <CardContent className="p-4">
                                      <div className="text-lg font-medium mb-2">{lesson.title}</div>
                                      <p className="text-gray-600">{lesson.description}</p>
                                    </CardContent>
                                  </Link>
                                </Card>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="deities">
                    <div className="space-y-8">
                      {lessonsData
                        .filter(lessonGroup => lessonGroup.topicId === 'deities')
                        .map((lessonGroup) => (
                          <div key={lessonGroup.topicId} className="mb-10">
                            <h2 className="text-2xl font-heading font-semibold mb-5">{lessonGroup.topicName}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {lessonGroup.lessons.map((lesson) => (
                                <Card key={lesson.id} className="hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/40 pop-shadow-card hover:from-indian-cream hover:to-white/95">
                                  <Link to={`/learn/lessons/${lessonGroup.topicId}/${lesson.id}`}>
                                    <CardContent className="p-4">
                                      <div className="text-lg font-medium mb-2">{lesson.title}</div>
                                      <p className="text-gray-600">{lesson.description}</p>
                                    </CardContent>
                                  </Link>
                                </Card>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="scriptures">
                    <div className="space-y-8">
                      {lessonsData
                        .filter(lessonGroup => lessonGroup.topicId === 'scriptures')
                        .map((lessonGroup) => (
                          <div key={lessonGroup.topicId} className="mb-10">
                            <h2 className="text-2xl font-heading font-semibold mb-5">{lessonGroup.topicName}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {lessonGroup.lessons.map((lesson) => (
                                <Card key={lesson.id} className="hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/40 pop-shadow-card hover:from-indian-cream hover:to-white/95">
                                  <Link to={`/learn/lessons/${lessonGroup.topicId}/${lesson.id}`}>
                                    <CardContent className="p-4">
                                      <div className="text-lg font-medium mb-2">{lesson.title}</div>
                                      <p className="text-gray-600">{lesson.description}</p>
                                    </CardContent>
                                  </Link>
                                </Card>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="practices">
                    <div className="space-y-8">
                      {lessonsData
                        .filter(lessonGroup => lessonGroup.topicId === 'practices')
                        .map((lessonGroup) => (
                          <div key={lessonGroup.topicId} className="mb-10">
                            <h2 className="text-2xl font-heading font-semibold mb-5">{lessonGroup.topicName}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {lessonGroup.lessons.map((lesson) => (
                                <Card key={lesson.id} className="hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/40 pop-shadow-card hover:from-indian-cream hover:to-white/95">
                                  <Link to={`/learn/lessons/${lessonGroup.topicId}/${lesson.id}`}>
                                    <CardContent className="p-4">
                                      <div className="text-lg font-medium mb-2">{lesson.title}</div>
                                      <p className="text-gray-600">{lesson.description}</p>
                                    </CardContent>
                                  </Link>
                                </Card>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </TabsContent>

              {/* DEVELOPMENT ONLY - Mantras content hidden from production */}
              {import.meta.env.DEV && (
                <TabsContent value="mantras">
                  <div className="space-y-8">
                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
                      <strong>Development Mode:</strong> This mantras section is currently in development and not available in production.
                    </div>
                    <p className="text-lg">
                      Mantras are sacred sound formulas that have spiritual and psychological effects.
                    </p>

                    {/* Nested Tabs for Mantra Categories */}
                    <Tabs defaultValue="vedic-shanti" className="w-full">
                      <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8 bg-gradient-to-br from-spiritual-50 to-white border border-spiritual-200 p-1 rounded-md">
                        <TabsTrigger value="vedic-shanti" className="text-sm md:text-base data-[state=active]:bg-gradient-to-br data-[state=active]:from-indian-cream data-[state=active]:to-white data-[state=active]:border-b-2 data-[state=active]:border-indian-saffron">
                          Vedic Shanti Mantras
                        </TabsTrigger>
                        <TabsTrigger value="bhagavad-gita" className="text-sm md:text-base data-[state=active]:bg-gradient-to-br data-[state=active]:from-indian-cream data-[state=active]:to-white data-[state=active]:border-b-2 data-[state=active]:border-indian-saffron">
                          Bhagavad Gita
                        </TabsTrigger>
                        <TabsTrigger value="devi-mahatmyam" className="text-sm md:text-base data-[state=active]:bg-gradient-to-br data-[state=active]:from-indian-cream data-[state=active]:to-white data-[state=active]:border-b-2 data-[state=active]:border-indian-saffron">
                          Devi Mahatmyam
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="vedic-shanti">
                        <div className="space-y-6">
                          <h3 className="text-2xl font-heading font-semibold mb-4">Vedic Shanti Mantras</h3>
                          <p className="text-gray-600 mb-6">
                            Peace mantras from the Vedas and Upanishads that invoke harmony and protection.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {mantras.map((mantra) => (
                              <Card key={mantra.id} className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron pop-shadow-card">
                                <CardContent className="p-6">
                                  <h3 className="text-xl font-heading font-semibold mb-2">{mantra.title}</h3>
                                  <p className="text-gray-600 mb-4">{mantra.description}</p>

                                  <div className="flex justify-center mb-4">
                                    {mantra.id === 'gayatri' && (
                                      <SyncedAudioPlayer
                                        src={mantra.audio}
                                        title={`${mantra.title} Pronunciation`}
                                        syllables={gayatriMantraSyllables}
                                        originalText={mantra.text}
                                        transliteration={mantra.transliteration}
                                        transliterationSyllables={mantra.transliterationSyllables}
                                      />
                                    )}
                                    {mantra.id === 'saha-na-vavatu' && (
                                      <SyncedAudioPlayer
                                        src={mantra.audio}
                                        title={`${mantra.title} Pronunciation`}
                                        syllables={sahaNavatuMantraSyllables}
                                        originalText={mantra.text}
                                        transliteration={mantra.transliteration}
                                        transliterationSyllables={mantra.transliterationSyllables}
                                      />
                                    )}
                                  </div>

                                  <div className="mt-4 p-4 bg-white border border-indian-saffron/20 rounded-md">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">English Meaning:</h4>
                                    <p className="text-base text-center text-gray-700 leading-relaxed">
                                      {mantra.englishMeaning}
                                    </p>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="bhagavad-gita">
                        <div className="space-y-6">
                          <h3 className="text-2xl font-heading font-semibold mb-4">Bhagavad Gita</h3>
                          <p className="text-gray-600 mb-6">
                            Sacred verses and mantras from the Bhagavad Gita, the divine dialogue between Lord Krishna and Arjuna.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Gita Dhyanam - Invocation */}
                            <Link to="/learn/bhagavad-gita/gita-dhyanam">
                              <Card className="bg-gradient-to-br from-spiritual-100 to-indian-cream border-2 border-spiritual-400 pop-shadow-card hover:shadow-lg transition-all duration-300 cursor-pointer">
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="text-lg font-heading font-semibold text-spiritual-700">
                                      Gita Dhyanam
                                    </h4>
                                    <ExternalLink className="w-4 h-4 text-gray-400" />
                                  </div>
                                  <p className="text-sm text-gray-600 mb-3">Invocation to the Gita</p>
                                  <p className="text-xs text-gray-500 mb-3">
                                    9 verses
                                  </p>
                                  <div className="text-xs text-gray-500 italic">
                                    Meditative verses recited before studying the Gita
                                  </div>
                                </CardContent>
                              </Card>
                            </Link>

                            {[
                              { chapter: 1, title: "Arjuna's Dilemma", verses: 47 },
                              { chapter: 2, title: "The Yoga of Knowledge", verses: 72 },
                              { chapter: 3, title: "The Yoga of Action", verses: 43 },
                              { chapter: 4, title: "The Yoga of Divine Knowledge", verses: 42 },
                              { chapter: 5, title: "The Yoga of Renunciation", verses: 29 },
                              { chapter: 6, title: "The Yoga of Meditation", verses: 47 },
                              { chapter: 7, title: "The Yoga of Divine Knowledge", verses: 30 },
                              { chapter: 8, title: "The Yoga of the Imperishable Brahman", verses: 28 },
                              { chapter: 9, title: "The Yoga of Royal Knowledge", verses: 34 },
                              { chapter: 10, title: "The Yoga of Divine Manifestations", verses: 42 },
                              { chapter: 11, title: "The Yoga of the Universal Form", verses: 55 },
                              { chapter: 12, title: "The Yoga of Devotion", verses: 20 },
                              { chapter: 13, title: "The Yoga of the Field and Knower", verses: 35 },
                              { chapter: 14, title: "The Yoga of the Three Gunas", verses: 27 },
                              { chapter: 15, title: "The Yoga of the Supreme Person", verses: 20 },
                              { chapter: 16, title: "The Yoga of Divine and Demonic Natures", verses: 24 },
                              { chapter: 17, title: "The Yoga of Threefold Faith", verses: 28 },
                              { chapter: 18, title: "The Yoga of Liberation through Renunciation", verses: 78 }
                            ].map((chapterInfo) => {
                              return (
                                <Link key={chapterInfo.chapter} to={`/learn/bhagavad-gita/chapter/${chapterInfo.chapter}`}>
                                  <Card className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/40 pop-shadow-card hover:shadow-lg transition-all duration-300 cursor-pointer">
                                    <CardContent className="p-4">
                                      <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-lg font-heading font-semibold">
                                          Chapter {chapterInfo.chapter}
                                        </h4>
                                        <ExternalLink className="w-4 h-4 text-gray-400" />
                                      </div>
                                      <p className="text-sm text-gray-600 mb-3">{chapterInfo.title}</p>
                                      <p className="text-xs text-gray-500 mb-3">
                                        {chapterInfo.verses} verses
                                      </p>
                                      <div className="text-xs text-gray-500 italic">
                                        Click to view all verses with Sanskrit text and transliterations
                                      </div>
                                    </CardContent>
                                  </Card>
                                </Link>
                              );
                            })}

                            {/* Gita Mahatmyam - Glory of the Gita */}
                            <Link to="/learn/bhagavad-gita/gita-mahatmyam">
                              <Card className="bg-gradient-to-br from-spiritual-100 to-indian-cream border-2 border-spiritual-400 pop-shadow-card hover:shadow-lg transition-all duration-300 cursor-pointer">
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="text-lg font-heading font-semibold text-spiritual-700">
                                      Gita Mahatmyam
                                    </h4>
                                    <ExternalLink className="w-4 h-4 text-gray-400" />
                                  </div>
                                  <p className="text-sm text-gray-600 mb-3">Glory of the Gita</p>
                                  <p className="text-xs text-gray-500 mb-3">
                                    7 verses
                                  </p>
                                  <div className="text-xs text-gray-500 italic">
                                    Verses extolling the greatness and benefits of studying the Gita
                                  </div>
                                </CardContent>
                              </Card>
                            </Link>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="devi-mahatmyam">
                        <div className="space-y-6">
                          <h3 className="text-2xl font-heading font-semibold mb-4">Devi Mahatmyam</h3>
                          <p className="text-gray-600 mb-6">
                            Sacred hymns and mantras from the Devi Mahatmyam, celebrating the Divine Mother.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                              { chapter: 1, title: "The Slaying of Madhu and Kaitabha", verses: 88 },
                              { chapter: 2, title: "The Slaying of Mahishasura", verses: 55 },
                              { chapter: 3, title: "The Slaying of Mahishasura (continued)", verses: 54 },
                              { chapter: 4, title: "The Slaying of Mahishasura (concluded)", verses: 44 },
                              { chapter: 5, title: "Devi's Conversation with the Messenger", verses: 57 },
                              { chapter: 6, title: "The Slaying of Dhumralochana", verses: 33 },
                              { chapter: 7, title: "The Slaying of Chanda and Munda", verses: 27 },
                              { chapter: 8, title: "The Slaying of Raktabija", verses: 62 },
                              { chapter: 9, title: "The Slaying of Nishumbha", verses: 52 },
                              { chapter: 10, title: "The Slaying of Shumbha", verses: 31 },
                              { chapter: 11, title: "The Hymn of Praise by the Devas", verses: 55 },
                              { chapter: 12, title: "The Boons Granted by Devi", verses: 51 },
                              { chapter: 13, title: "The Slaying of the Two Demons", verses: 25 }
                            ].map((chapterInfo) => {
                              return (
                                <Link key={chapterInfo.chapter} to={`/learn/devi-mahatmyam/chapter/${chapterInfo.chapter}`}>
                                  <Card className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/40 pop-shadow-card hover:shadow-lg transition-all duration-300 cursor-pointer">
                                    <CardContent className="p-4">
                                      <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-lg font-heading font-semibold">
                                          Chapter {chapterInfo.chapter}
                                        </h4>
                                        <ExternalLink className="w-4 h-4 text-gray-400" />
                                      </div>
                                      <p className="text-sm text-gray-600 mb-3">{chapterInfo.title}</p>
                                      <p className="text-xs text-gray-500 mb-3">
                                        {chapterInfo.verses} verses
                                      </p>
                                      <div className="text-xs text-gray-500 italic">
                                        Click to view all verses with Sanskrit text and transliterations
                                      </div>
                                    </CardContent>
                                  </Card>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </TabsContent>
              )}




              <TabsContent value="games">
                <div className="space-y-8">
                  <p className="text-lg">
                    Explore our collection of interactive games designed to make learning about Hindu philosophy and culture fun and engaging.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron pop-shadow-card hover:shadow-lg transition-all duration-300">
                      <Link to="/learn/games/guess-picture">
                        <CardContent className="p-6 text-center">
                          <div className="flex items-center justify-center w-12 h-12 bg-spiritual-100 rounded-full mb-4 mx-auto">
                            <Gamepad2 className="w-6 h-6 text-spiritual-500" />
                          </div>
                          <h3 className="text-lg font-heading font-semibold mb-2">Guess the Picture</h3>
                          <p className="text-gray-600 text-sm">Test your knowledge by identifying Hindu deities and symbols in pictures.</p>
                        </CardContent>
                      </Link>
                    </Card>

                    <Card className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron pop-shadow-card hover:shadow-lg transition-all duration-300">
                      <Link to="/learn/games/wordle">
                        <CardContent className="p-6 text-center">
                          <div className="flex items-center justify-center w-12 h-12 bg-spiritual-100 rounded-full mb-4 mx-auto">
                            <BookOpen className="w-6 h-6 text-spiritual-500" />
                          </div>
                          <h3 className="text-lg font-heading font-semibold mb-2">Master's Words</h3>
                          <p className="text-gray-600 text-sm">A word puzzle game featuring spiritual terms and concepts.</p>
                        </CardContent>
                      </Link>
                    </Card>

                    <Card className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron pop-shadow-card hover:shadow-lg transition-all duration-300">
                      <Link to="/learn/games/quotes">
                        <CardContent className="p-6 text-center">
                          <div className="flex items-center justify-center w-12 h-12 bg-spiritual-100 rounded-full mb-4 mx-auto">
                            <MessageSquare className="w-6 h-6 text-spiritual-500" />
                          </div>
                          <h3 className="text-lg font-heading font-semibold mb-2">Wisdom Quotes</h3>
                          <p className="text-gray-600 text-sm">Arrange words to form inspiring quotes from spiritual masters.</p>
                        </CardContent>
                      </Link>
                    </Card>

                    <Card className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron pop-shadow-card hover:shadow-lg transition-all duration-300">
                      <Link to="/learn/games/word-scramble">
                        <CardContent className="p-6 text-center">
                          <div className="flex items-center justify-center w-12 h-12 bg-spiritual-100 rounded-full mb-4 mx-auto">
                            <PenTool className="w-6 h-6 text-spiritual-500" />
                          </div>
                          <h3 className="text-lg font-heading font-semibold mb-2">Word Scramble</h3>
                          <p className="text-gray-600 text-sm">Unscramble letters to form words related to Hindu philosophy.</p>
                        </CardContent>
                      </Link>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>



          {/* Restoring the cards that were removed */}
          <div className="mt-16">
            <SectionHeader
              title="Interactive Learning"
              subtitle="Engage with our community learning tools"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

              <Card className="border-spiritual-200 bg-gradient-to-br from-spiritual-50 to-white pop-shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-spiritual-100 rounded-full mb-4">
                    <PenTool className="w-6 h-6 text-spiritual-500" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-3">Interactive Quizzes</h3>
                  <p className="text-gray-600 mb-4">Test your knowledge with our collection of quizzes on various topics in Hinduism.</p>

                  <Button href="/learn/quizzes" variant="outline" size="sm">
                    Take Quizzes
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-spiritual-200 bg-gradient-to-br from-spiritual-50 to-white pop-shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-spiritual-100 rounded-full mb-4">
                    <Lightbulb className="w-6 h-6 text-spiritual-500" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-3">Submit Questions</h3>
                  <p className="text-gray-600 mb-4">Contribute to our question bank by creating and submitting your own questions.</p>

                  <Button href="/learn/submit" variant="outline" size="sm">
                    Submit Questions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LearnPage;


