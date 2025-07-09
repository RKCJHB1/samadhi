import React from 'react';
import { Navigate } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import PageHeader from '../../components/shared/PageHeader';
import SectionHeader from '../../components/shared/SectionHeader';
import Button from '../../components/shared/Button';
import { Link } from 'react-router-dom';
import { BookOpen, PenTool, MessageSquare, Lightbulb, Music } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { lessonsData } from '../../data/lessonsData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AudioPlayer from '../../components/audio/AudioPlayer';
import SyncedAudioPlayer from '../../components/audio/SyncedAudioPlayer';
import { omMantraSyllables, gayatriMantraSyllables, mahamrityunjayaMantraSyllables } from '../../data/mantraTimings';

const LearnPage = () => {
  // Check if we're in a local development environment
  const isLocalDevelopment = () => {
    // Check if running on localhost or 127.0.0.1
    const hostname = window.location.hostname;
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes('.local');
  };

  // Only redirect to games in production, not in local development
  if (!isLocalDevelopment()) {
    return <Navigate to="/learn/games" replace />;
  }

  // Sample mantras for display
  const mantras = [
    {
      id: 'om',
      title: 'Om (ॐ)',
      description: 'The most sacred sound in Hinduism, representing the essence of the ultimate reality',
      audio: '/audio/om.mp3',
      text: 'ॐ'
    },
    {
      id: 'gayatri',
      title: 'Gayatri Mantra',
      description: 'A highly revered mantra from Rigveda dedicated to Savitr, the sun deity',
      audio: '/audio/gayatri.mp3',
      text: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्'
    },
    {
      id: 'mahamrityunjaya',
      title: 'Mahamrityunjaya Mantra',
      description: 'A healing mantra dedicated to Lord Shiva that rejuvenates and bestows immortality',
      audio: '/audio/mahamrityunjaya.mp3',
      text: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात्'
    },
  ];
  return (
    <PageLayout title="Hinduism for Children">
      <div className="flex items-center justify-center py-12 bg-gradient-to-br from-indian-cream to-white">
        <div className="inline-block p-6 rounded-lg bg-gradient-to-br from-indian-cream to-white border border-indian-saffron shadow-lg transform transition-all duration-500 hover:shadow-xl hover:scale-[1.01] text-center">
          <h1 className="text-3xl font-heading font-bold mb-4 text-black">Hinduism for Children</h1>
          <p className="text-gray-700">
            Educational resources for understanding Hindu philosophy and practices
          </p>
        </div>
      </div>

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
            <Tabs defaultValue="lessons" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-gradient-to-br from-spiritual-50 to-white border border-spiritual-200 p-1 rounded-md">
                <TabsTrigger value="lessons" className="text-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-indian-cream data-[state=active]:to-white data-[state=active]:border-b-2 data-[state=active]:border-indian-saffron">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Lessons
                </TabsTrigger>
                <TabsTrigger value="mantras" className="text-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-indian-cream data-[state=active]:to-white data-[state=active]:border-b-2 data-[state=active]:border-indian-saffron">
                  <Music className="w-5 h-5 mr-2" />
                  Mantras
                </TabsTrigger>
              </TabsList>

              <TabsContent value="lessons">
                <Tabs defaultValue="philosophy" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-8 bg-gradient-to-br from-spiritual-50 to-white border border-spiritual-200 p-1 rounded-md">
                    <TabsTrigger value="philosophy" className="text-sm data-[state=active]:bg-gradient-to-br data-[state=active]:from-indian-cream data-[state=active]:to-white data-[state=active]:border-b-2 data-[state=active]:border-indian-saffron">
                      Philosophy
                    </TabsTrigger>
                    <TabsTrigger value="deities" className="text-sm data-[state=active]:bg-gradient-to-br data-[state=active]:from-indian-cream data-[state=active]:to-white data-[state=active]:border-b-2 data-[state=active]:border-indian-saffron">
                      Deities/Rishis
                    </TabsTrigger>
                    <TabsTrigger value="scriptures" className="text-sm data-[state=active]:bg-gradient-to-br data-[state=active]:from-indian-cream data-[state=active]:to-white data-[state=active]:border-b-2 data-[state=active]:border-indian-saffron">
                      Scriptures
                    </TabsTrigger>
                    <TabsTrigger value="practices" className="text-sm data-[state=active]:bg-gradient-to-br data-[state=active]:from-indian-cream data-[state=active]:to-white data-[state=active]:border-b-2 data-[state=active]:border-indian-saffron">
                      Practices
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
                                <Card key={lesson.id} className="hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-indian-cream to-white border border-indian-saffron pop-shadow-card">
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
                                <Card key={lesson.id} className="hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-indian-cream to-white border border-indian-saffron pop-shadow-card">
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
                                <Card key={lesson.id} className="hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-indian-cream to-white border border-indian-saffron pop-shadow-card">
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
                                <Card key={lesson.id} className="hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-indian-cream to-white border border-indian-saffron pop-shadow-card">
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

              <TabsContent value="mantras">
                <div className="space-y-8">
                  <p className="text-lg">
                    Mantras are sacred sound formulas that have spiritual and psychological effects.
                    Learn these mantras to enhance your meditation practice and connect with divine energies.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mantras.map((mantra) => (
                      <Card key={mantra.id} className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron pop-shadow-card">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-heading font-semibold mb-2">{mantra.title}</h3>
                          <p className="text-gray-600 mb-4">{mantra.description}</p>
                          <div className="flex justify-center">
                            {mantra.id === 'om' && (
                              <SyncedAudioPlayer
                                src={mantra.audio}
                                title={`${mantra.title} Pronunciation`}
                                syllables={omMantraSyllables}
                                originalText={mantra.text}
                              />
                            )}
                            {mantra.id === 'gayatri' && (
                              <SyncedAudioPlayer
                                src={mantra.audio}
                                title={`${mantra.title} Pronunciation`}
                                syllables={gayatriMantraSyllables}
                                originalText={mantra.text}
                              />
                            )}
                            {mantra.id === 'mahamrityunjaya' && (
                              <SyncedAudioPlayer
                                src={mantra.audio}
                                title={`${mantra.title} Pronunciation`}
                                syllables={mahamrityunjayaMantraSyllables}
                                originalText={mantra.text}
                              />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
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


