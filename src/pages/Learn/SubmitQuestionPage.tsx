
import React, { useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import * as emailjs from '@emailjs/browser';
import { Turnstile } from '@marsidev/react-turnstile';

const SubmitQuestionPage = () => {
  console.log('SubmitQuestionPage component loaded!'); // Debug log
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: '',
    topic: '',
    reference: '',
    explanation: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (field: string) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('Form submission started!'); // Debug log
    e.preventDefault();

    // Validate required fields
    const requiredFields = {
      name: 'Name',
      email: 'Email',
      question: 'Question',
      optionA: 'Option A',
      optionB: 'Option B',
      optionC: 'Option C',
      optionD: 'Option D',
      correctAnswer: 'Correct Answer',
      topic: 'Topic'
    };

    const missingFields = [];
    for (const [field, label] of Object.entries(requiredFields)) {
      if (!formData[field as keyof typeof formData]?.trim()) {
        missingFields.push(label);
      }
    }

    if (missingFields.length > 0) {
      toast({
        title: "Missing Required Fields",
        description: `Please fill in: ${missingFields.join(', ')}`,
        variant: "destructive"
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    // Check if Turnstile token is present
    if (!turnstileToken) {
      toast({
        title: "Verification Required",
        description: "Please complete the security verification.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // EmailJS configuration
      const serviceId = 'service_c9jeqt9';
      const templateId = 'template_k5oohps';
      const publicKey = 'dqKqK-lERaTmsIkqu';

      // Log what we're sending for debugging
      console.log('Sending email with data:', formData);

      // Debug: Log the configuration and data being sent
      console.log('EmailJS Configuration:', {
        serviceId,
        templateId,
        publicKey: publicKey ? 'Present' : 'Missing'
      });
      console.log('Form data being sent:', formData);

      // Initialize EmailJS with your public key
      emailjs.init(publicKey);

      // Send the email
      const result = await emailjs.send(serviceId, templateId, formData);
      console.log('EmailJS send result:', result);

      // Reset form
      setFormData({
        name: '',
        email: '',
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctAnswer: '',
        topic: '',
        reference: '',
        explanation: ''
      });

      // Reset Turnstile token
      setTurnstileToken('');

      toast({
        title: "Question Submitted Successfully!",
        description: "Thank you for your submission! Our team will review your question.",
      });
    } catch (error) {
      console.error('Error sending email:', error);

      // More detailed error handling
      if (error instanceof Error) {
        console.error('Error details:', {
          message: error.message,
          stack: error.stack,
          name: error.name
        });
      } else {
        console.error('Unknown error type:', typeof error, error);
      }

      toast({
        title: "Submission Error",
        description: "There was a problem submitting your question. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout title="Submit Questions | Hinduism for Children">
      {/* Header in the style of other learn pages */}
      <div className="flex items-center justify-center py-12 bg-gradient-to-br from-indian-cream to-white">
        <div className="inline-block p-6 rounded-lg bg-gradient-to-br from-indian-cream to-white border border-indian-saffron shadow-lg transform transition-all duration-500 hover:shadow-xl hover:scale-[1.01] text-center">
          <h1 className="text-3xl font-heading font-bold mb-4 text-black">Submit Questions</h1>
          <p className="text-gray-700">
            Contribute to our knowledge base by submitting your own questions
          </p>
        </div>
      </div>

      <div className="w-full bg-gradient-to-br from-indian-cream to-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/learn" className="inline-flex items-center text-indian-saffron hover:text-spiritual-600 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Learning Centre
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/30 pop-shadow-card">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Enter your full name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Your Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email address"
                          required
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="question">Question</Label>
                      <Textarea
                        id="question"
                        placeholder="Write your question here..."
                        required
                        className="min-h-24"
                        value={formData.question}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="optionA">Option A</Label>
                        <Input
                          id="optionA"
                          placeholder="First option"
                          required
                          value={formData.optionA}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="optionB">Option B</Label>
                        <Input
                          id="optionB"
                          placeholder="Second option"
                          required
                          value={formData.optionB}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="optionC">Option C</Label>
                        <Input
                          id="optionC"
                          placeholder="Third option"
                          required
                          value={formData.optionC}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="optionD">Option D</Label>
                        <Input
                          id="optionD"
                          placeholder="Fourth option"
                          required
                          value={formData.optionD}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="correctAnswer-trigger">Correct Answer</Label>
                      <Select onValueChange={handleSelectChange('correctAnswer')} value={formData.correctAnswer} name="correctAnswer">
                        <SelectTrigger id="correctAnswer-trigger">
                          <SelectValue placeholder="Select the correct option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">Option A</SelectItem>
                          <SelectItem value="B">Option B</SelectItem>
                          <SelectItem value="C">Option C</SelectItem>
                          <SelectItem value="D">Option D</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="topic-trigger">Topic</Label>
                      <Select onValueChange={handleSelectChange('topic')} value={formData.topic} name="topic">
                        <SelectTrigger id="topic-trigger">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="philosophy">Philosophy</SelectItem>
                          <SelectItem value="deities">Deities/Rishis</SelectItem>
                          <SelectItem value="scriptures">Scriptures</SelectItem>
                          <SelectItem value="practices">Practices/Moral Lessons</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reference">Reference</Label>
                      <Input
                        id="reference"
                        placeholder="Source text, chapter, verse, etc."
                        value={formData.reference}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="explanation">Explanation (Optional)</Label>
                      <Textarea
                        id="explanation"
                        placeholder="Explain why the correct answer is right..."
                        className="min-h-20"
                        value={formData.explanation}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Cloudflare Turnstile */}
                    <div className="flex justify-center">
                      <Turnstile
                        siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
                        onSuccess={(token) => {
                          console.log('Turnstile success:', token);
                          setTurnstileToken(token);
                        }}
                        onError={() => {
                          console.error('Turnstile error');
                          setTurnstileToken('');
                          toast({
                            title: "Verification Error",
                            description: "Security verification failed. Please try again.",
                            variant: "destructive"
                          });
                        }}
                        onExpire={() => {
                          console.log('Turnstile expired');
                          setTurnstileToken('');
                        }}
                        theme="light"
                        size="normal"
                      />
                    </div>

                    <Button
                      type="button"
                      size="lg"
                      className="w-full md:w-auto"
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Question'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-1">
              <Card className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/30 pop-shadow-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-heading font-semibold mb-4">Submission Guidelines</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Questions should be clear and concise</li>
                    <li>• All options should be plausible</li>
                    <li>• Only one option should be correct</li>
                    <li>• Provide a reliable reference when possible</li>
                    <li>• Questions will be reviewed before publishing</li>
                  </ul>

                  <hr className="my-4 border-indian-saffron/20" />

                  <h4 className="font-heading font-medium mb-2">Sample Format:</h4>
                  <div className="bg-indian-cream/50 p-3 rounded text-sm border border-indian-saffron/20">
                    <p><strong>Question:</strong> Who is known as the author of the Ramayana?</p>
                    <p><strong>A.</strong> Valmiki</p>
                    <p><strong>B.</strong> Ved Vyasa</p>
                    <p><strong>C.</strong> Tulsidas</p>
                    <p><strong>D.</strong> Kalidasa</p>
                    <p><strong>Correct Answer:</strong> A</p>
                    <p><strong>Reference:</strong> Traditional attribution</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SubmitQuestionPage;
