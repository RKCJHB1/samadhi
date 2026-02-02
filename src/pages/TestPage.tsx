import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import PageHeader from '../components/shared/PageHeader';
import SectionHeader from '../components/shared/SectionHeader';
import Button from '../components/shared/Button';
import { Link } from 'react-router-dom';
import { BookOpen, PenTool, MessageSquare, Lightbulb, Music, Mail, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { enhancedLessonsData as lessonsData } from '../data/lessonsDataNew';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AudioPlayer from '../components/audio/AudioPlayer';
import SyncedAudioPlayer from '../components/audio/SyncedAudioPlayer';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  omMantraSyllables,
  gayatriMantraSyllables as originalGayatriSyllables,
  mahamrityunjayaMantraSyllables as originalMahamrityunjayaSyllables
} from '../data/mantraTimings';

// Create English transliteration syllables for mantras
const gayatriMantraSyllables = [
  { text: "Om ", startTime: 0, endTime: 1.5 },
  { text: "Bhur ", startTime: 1.5, endTime: 2.0 },
  { text: "Bhuvah ", startTime: 2.0, endTime: 2.5 },
  { text: "Swah, ", startTime: 2.5, endTime: 3.0 },
  { text: "Tat ", startTime: 3.0, endTime: 3.5 },
  { text: "Sa", startTime: 3.5, endTime: 3.8 },
  { text: "vi", startTime: 3.8, endTime: 4.1 },
  { text: "tur ", startTime: 4.1, endTime: 4.4 },
  { text: "Va", startTime: 4.4, endTime: 4.7 },
  { text: "re", startTime: 4.7, endTime: 5.0 },
  { text: "nyam, ", startTime: 5.0, endTime: 5.5 },
  { text: "Bhar", startTime: 5.5, endTime: 5.8 },
  { text: "go ", startTime: 5.8, endTime: 6.2 },
  { text: "De", startTime: 6.2, endTime: 6.5 },
  { text: "va", startTime: 6.5, endTime: 6.8 },
  { text: "sya ", startTime: 6.8, endTime: 7.2 },
  { text: "Dhi", startTime: 7.2, endTime: 7.5 },
  { text: "ma", startTime: 7.5, endTime: 7.8 },
  { text: "hi, ", startTime: 7.8, endTime: 8.2 },
  { text: "Dhi", startTime: 8.2, endTime: 8.5 },
  { text: "yo ", startTime: 8.5, endTime: 8.8 },
  { text: "Yo ", startTime: 8.8, endTime: 9.1 },
  { text: "Nah ", startTime: 9.1, endTime: 9.5 },
  { text: "Pra", startTime: 9.5, endTime: 9.8 },
  { text: "cho", startTime: 9.8, endTime: 10.1 },
  { text: "da", startTime: 10.1, endTime: 10.4 },
  { text: "yat", startTime: 10.4, endTime: 11.0 }
];

// Create English transliteration syllables for Mahamrityunjaya Mantra
const mahamrityunjayaMantraSyllables = [
  { text: "Om ", startTime: 0, endTime: 1.5 },
  { text: "Try", startTime: 1.5, endTime: 2.0 },
  { text: "am", startTime: 2.0, endTime: 2.3 },
  { text: "ba", startTime: 2.3, endTime: 2.5 },
  { text: "kam ", startTime: 2.5, endTime: 3.0 },
  { text: "Ya", startTime: 3.0, endTime: 3.3 },
  { text: "ja", startTime: 3.3, endTime: 3.6 },
  { text: "ma", startTime: 3.6, endTime: 3.9 },
  { text: "he ", startTime: 3.9, endTime: 4.2 },
  { text: "Su", startTime: 4.2, endTime: 4.5 },
  { text: "gan", startTime: 4.5, endTime: 4.8 },
  { text: "dhim ", startTime: 4.8, endTime: 5.2 },
  { text: "Pu", startTime: 5.2, endTime: 5.5 },
  { text: "shti", startTime: 5.5, endTime: 5.8 },
  { text: "var", startTime: 5.8, endTime: 6.1 },
  { text: "dha", startTime: 6.1, endTime: 6.4 },
  { text: "nam ", startTime: 6.4, endTime: 7.0 },
  { text: "Ur", startTime: 7.0, endTime: 7.3 },
  { text: "va", startTime: 7.3, endTime: 7.6 },
  { text: "ru", startTime: 7.6, endTime: 7.9 },
  { text: "ka", startTime: 7.9, endTime: 8.2 },
  { text: "mi", startTime: 8.2, endTime: 8.5 },
  { text: "va ", startTime: 8.5, endTime: 8.8 },
  { text: "Ban", startTime: 8.8, endTime: 9.1 },
  { text: "dha", startTime: 9.1, endTime: 9.4 },
  { text: "nan ", startTime: 9.4, endTime: 10.0 },
  { text: "Mri", startTime: 10.0, endTime: 10.3 },
  { text: "tyor", startTime: 10.3, endTime: 10.6 },
  { text: "mu", startTime: 10.6, endTime: 10.9 },
  { text: "kshi", startTime: 10.9, endTime: 11.2 },
  { text: "ya ", startTime: 11.2, endTime: 11.5 },
  { text: "Ma", startTime: 11.5, endTime: 11.8 },
  { text: "mri", startTime: 11.8, endTime: 12.1 },
  { text: "tat", startTime: 12.1, endTime: 13.0 }
];

// Define the contact form schema with Zod
const contactFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  honeypot: z.string().max(0, { message: "Bot detected" }), // Honeypot field should be empty
});

// Define the type for our form values
type ContactFormValues = z.infer<typeof contactFormSchema>;

const TestPage = () => {
  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const { toast } = useToast();

  // Initialize form with react-hook-form and zod validation
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      honeypot: "",
    },
  });

  // Handle form submission
  const handleSubmit = async (values: ContactFormValues) => {
    // Check for honeypot (if filled, it's likely a bot)
    if (values.honeypot) {
      console.log("Bot detected");
      toast({
        title: "Message sent",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      return;
    }

    // Rate limiting - prevent more than 3 submissions in a short period
    if (submissionCount >= 3) {
      toast({
        title: "Too many attempts",
        description: "Please try again later.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmissionCount(prev => prev + 1);

    try {
      // Backend removed - Test form now shows success message without actual submission
      console.log('Test form data (backend removed):', values);

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate response data
      const responseData = { message: 'Test form submitted successfully (no backend)' };

      // Reset the form
      form.reset();

      toast({
        title: "Message sent",
        description: `Thank you for your message. We'll get back to you soon.`,
      });

      console.log('Form submission successful:', responseData);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sample mantras for display
  const mantras = [
    {
      id: 'om',
      title: 'Om (ॐ)',
      description: 'The most sacred sound in Hinduism, representing the essence of the ultimate reality',
      audio: '/audio/om.mp3',
      text: 'ॐ',
      transliteration: 'Oṃ'
    },
    {
      id: 'gayatri',
      title: 'Gayatri Mantra',
      description: 'A highly revered mantra from Rigveda dedicated to Savitr, the sun deity',
      audio: '/audio/gayatri.mp3',
      text: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्',
      transliteration: 'Oṃ bhūr bhuvaḥ svaḥ tat savitur vareṇyaṃ bhargo devasya dhīmahi dhiyo yo naḥ pracodayāt'
    },
    {
      id: 'mahamrityunjaya',
      title: 'Mahamrityunjaya Mantra',
      description: 'A healing mantra dedicated to Lord Shiva that rejuvenates and bestows immortality',
      audio: '/audio/mahamrityunjaya.mp3',
      text: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मा‌ऽमृतात्',
      transliteration: 'Oṃ tryambakaṃ yajāmahe sugandhiṃ puṣṭivardhanam urvārukamiva bandhanānmṛtyormukṣīya mā\'mṛtāt'
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
                <div className="space-y-8">
                  {lessonsData.map((lessonGroup) => (
                    <div key={lessonGroup.topicId} className="mb-10">
                      <h2 className="text-2xl font-heading font-semibold mb-5">{lessonGroup.topicName}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {lessonGroup.lessons.map((lesson) => (
                          <Card key={lesson.id} className="hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-indian-cream/90 to-white border border-indian-saffron/40 pop-shadow-card hover:from-indian-cream hover:to-white/95">
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
                                transliteration={mantra.transliteration}
                                mantraId={mantra.id}
                              />
                            )}
                            {mantra.id === 'gayatri' && (
                              <SyncedAudioPlayer
                                src={mantra.audio}
                                title={`${mantra.title} Pronunciation`}
                                syllables={gayatriMantraSyllables}
                                originalText={mantra.text}
                                transliteration={mantra.transliteration}
                                mantraId={mantra.id}
                              />
                            )}
                            {mantra.id === 'mahamrityunjaya' && (
                              <SyncedAudioPlayer
                                src={mantra.audio}
                                title={`${mantra.title} Pronunciation`}
                                syllables={mahamrityunjayaMantraSyllables}
                                originalText={mantra.text}
                                transliteration={mantra.transliteration}
                                mantraId={mantra.id}
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

          <div className="mt-24">
            <SectionHeader
            title="Explore Subjects"
            subtitle="Dive into our comprehensive curriculum covering the key aspects of Hinduism"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              /* Core Concepts entry removed */
              { id: 'scriptures', title: 'Scriptures', desc: 'Vedas, Upanishads, etc.' },
              { id: 'deities', title: 'Deities', desc: 'Trimurti, Major Deities, etc.' },
              { id: 'philosophical-schools', title: 'Philosophical Schools', desc: 'Samkhya, Yoga, etc.' },
              { id: 'practices-rituals', title: 'Practices and Rituals', desc: 'Puja, Samskaras, etc.' },
              { id: 'sects-traditions', title: 'Sects and Traditions', desc: 'Vaishnavism, Shaivism, etc.' },
              { id: 'influential-figures', title: 'Influential Figures', desc: 'Divine Incarnations, etc.' },
              { id: 'history-evolution', title: 'History and Evolution', desc: 'Ancient Origins, etc.' },
              { id: 'temples-architecture', title: 'Temples and Architecture', desc: 'Temple Styles, etc.' },
              { id: 'society-culture', title: 'Society and Culture', desc: 'Family, Arts, etc.' },
              { id: 'cosmology-mythology', title: 'Cosmology and Mythology', desc: 'Creation Myths, Yugas, etc.' },
              { id: 'modern-issues', title: 'Modern Issues and Debates', desc: 'Science, Secularism, etc.' },
            ].map(subject => (
              <Link key={subject.id} to="/learn" className="block group">
                <div className="h-full p-6 border border-indian-saffron rounded-lg pop-shadow-card transition-all duration-300 bg-gradient-to-br from-indian-cream to-white">
                  <h3 className="text-lg font-heading font-semibold mb-2 group-hover:text-spiritual-500 transition-colors">{subject.title}</h3>
                  <p className="text-gray-600 text-sm">{subject.desc}</p>
                </div>
              </Link>
            ))}
          </div>
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

          <div className="mt-24">
            <SectionHeader
              title="Contact Us"
              subtitle="Get in touch with our team"
            />

            <div className="mt-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 bg-gradient-to-br from-indian-cream to-white border border-indian-saffron p-6 rounded-lg pop-shadow-card">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone (optional)</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Message subject" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your message here..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Honeypot field - hidden from users but bots will fill it out */}
                  <div className="hidden" aria-hidden="true">
                    <FormField
                      control={form.control}
                      name="honeypot"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Leave this empty</FormLabel>
                          <FormControl>
                            <Input
                              tabIndex={-1}
                              autoComplete="off"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-spiritual-500 hover:bg-spiritual-600 text-white py-2 px-4 rounded-md flex items-center justify-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                    <div className="mt-2 text-xs text-gray-500">
                      This site is protected by spam detection and rate limiting.
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TestPage;