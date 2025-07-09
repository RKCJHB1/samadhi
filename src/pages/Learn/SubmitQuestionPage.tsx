
import React from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

const SubmitQuestionPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the data to a backend
    alert("Thank you for your submission! Our team will review your question.");
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
                    <div className="space-y-2">
                      <Label htmlFor="question">Question</Label>
                      <Textarea
                        id="question"
                        placeholder="Write your question here..."
                        required
                        className="min-h-24"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="optionA">Option A</Label>
                        <Input id="optionA" placeholder="First option" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="optionB">Option B</Label>
                        <Input id="optionB" placeholder="Second option" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="optionC">Option C</Label>
                        <Input id="optionC" placeholder="Third option" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="optionD">Option D</Label>
                        <Input id="optionD" placeholder="Fourth option" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="correctAnswer">Correct Answer</Label>
                      <Select>
                        <SelectTrigger>
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
                      <Label htmlFor="topic">Topic</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="philosophy">Philosophy</SelectItem>
                          <SelectItem value="deities">Deities/Rishis</SelectItem>
                          <SelectItem value="scriptures">Scriptures</SelectItem>
                          <SelectItem value="practices">Practices</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reference">Reference</Label>
                      <Input id="reference" placeholder="Source text, chapter, verse, etc." />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="explanation">Explanation (Optional)</Label>
                      <Textarea
                        id="explanation"
                        placeholder="Explain why the correct answer is right..."
                        className="min-h-20"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full md:w-auto">
                      Submit Question
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
