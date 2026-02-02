
import React from 'react';
import PageLayout from '../../components/layout/PageLayout';
import PageHeader from '../../components/shared/PageHeader';
import { Link } from 'react-router-dom';
import { ArrowLeft, Music, BookOpen } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { lessonsData } from '../../data/lessonsData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { isDevelopment } from '@/utils/featureFlags';
import SyncedAudioPlayer from '../../components/audio/SyncedAudioPlayer';
import { gayatriMantraSyllables, mahamrityunjayaMantraSyllables, sahaNavatuMantraSyllables } from '../../data/mantraTimings';

const LessonsPage = () => {
  // Sample mantras for display
  const mantras = [
    {
      id: 'gayatri',
      title: 'Gayatri Mantra',
      description: 'A highly revered mantra from Rigveda dedicated to Savitr, the sun deity',
      audio: '/mantras/gayatri.mp3',
      text: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्',
      transliteration: 'Oṃ bhūr bhuvaḥ svaḥ tat savitur vareṇyaṃ bhargo devasya dhīmahi dhiyo yo naḥ pracodayāt',
      syllables: gayatriMantraSyllables
    },
    {
      id: 'mahamrityunjaya',
      title: 'Mahamrityunjaya Mantra',
      description: 'A healing mantra dedicated to Lord Shiva that rejuvenates and bestows immortality',
      audio: '/mantras/mahamrityunjaya.mp3',
      text: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात्',
      transliteration: 'Oṃ tryambakaṃ yajāmahe sugandhiṃ puṣṭivardhanam urvārukamiva bandhanānmṛtyormukṣīya mā\'mṛtāt',
      syllables: mahamrityunjayaMantraSyllables
    },
    {
      id: 'shanti',
      title: 'Shanti Mantra',
      description: 'A peace mantra from the Upanishads that invokes peace in all realms of existence',
      audio: '/mantras/shanti.mp3',
      text: 'ॐ सह नाववतु । सह नौ भुनक्तु । सह वीर्यं करवावहै । तेजस्वि नावधीतमस्तु मा विद्विषावहै । ॐ शान्तिः शान्तिः शान्तिः ॥',
      transliteration: 'Oṃ saha nāvavatu saha nau bhunaktu saha vīryaṃ karavāvahai tejasvināvadhītamastu mā vidviṣāvahai oṃ śāntiḥ śāntiḥ śāntiḥ',
      syllables: sahaNavatuMantraSyllables
    },
  ];

  return (
    <PageLayout title="Lessons">
      <PageHeader
        title="Learning Resources"
        subtitle="Lessons and mantras to deepen your understanding"
        backgroundImage="https://images.unsplash.com/photo-1590012314707-68e797908069?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <Link to="/learn" className="inline-flex items-center text-spiritual-500 hover:text-spiritual-600 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Learning Centre
          </Link>

          <Tabs defaultValue="lessons" className="w-full">
            <TabsList className={`grid w-full ${isDevelopment() ? 'grid-cols-2' : 'grid-cols-1'} mb-8`}>
              <TabsTrigger value="lessons" className="text-lg">
                <BookOpen className="w-5 h-5 mr-2" />
                Lessons
              </TabsTrigger>
              {/* DEVELOPMENT ONLY - Mantras tab hidden from production */}
              {isDevelopment() && (
                <TabsTrigger value="mantras" className="text-lg">
                  <Music className="w-5 h-5 mr-2" />
                  Mantras (Dev)
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="lessons">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {lessonsData.map((lessonGroup) => (
                  <div key={lessonGroup.topicId} className="space-y-4">
                    <h2 className="text-2xl font-heading font-semibold">{lessonGroup.topicName}</h2>

                    {lessonGroup.lessons.map((lesson) => (
                      <Card key={lesson.id} className="hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-indian-cream to-white border border-indian-saffron">
                        <Link to={`/learn/lessons/${lessonGroup.topicId}/${lesson.id}`}>
                          <CardContent className="p-4">
                            <div className="font-medium">{lesson.title}</div>
                            <p className="text-sm text-muted-foreground mt-1">{lesson.description}</p>
                          </CardContent>
                        </Link>
                      </Card>
                    ))}
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* DEVELOPMENT ONLY - Mantras content hidden from production */}
            {isDevelopment() && (
              <TabsContent value="mantras">
                <div className="space-y-8">
                  <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
                    <strong>Development Mode:</strong> This mantras section is currently in development and not available in production.
                  </div>
                  <p className="text-lg">
                    Mantras are sacred sound formulas that have spiritual and psychological effects.
                    Learn these mantras to enhance your meditation practice and connect with divine energies.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mantras.map((mantra) => (
                      <Card key={mantra.id} className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-heading font-semibold mb-2">{mantra.title}</h3>
                          <p className="text-gray-600 mb-4">{mantra.description}</p>
                          <div className="flex justify-center">
                            <SyncedAudioPlayer
                              src={mantra.audio}
                              title={`${mantra.title} Pronunciation`}
                              syllables={mantra.syllables}
                              originalText={mantra.text}
                              transliteration={mantra.transliteration}
                              mantraId={mantra.id}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default LessonsPage;
