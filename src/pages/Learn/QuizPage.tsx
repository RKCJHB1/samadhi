
import React, { useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { enhancedLessonsData as lessonsData } from '../../data/lessonsDataNew';

const QuizPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('philosophy');

  // Extract quizzes from actual lessons data
  const availableQuizzes = lessonsData.flatMap(group =>
    group.lessons
      .filter(lesson => lesson.quiz && lesson.quiz.questions.length > 0)
      .map(lesson => ({
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        questionCount: lesson.quiz!.questions.length,

        category: group.topicName,
        categoryId: group.topicId
      }))
  );

  // Group quizzes by the five main categories
  const philosophyQuizzes = availableQuizzes.filter(quiz => quiz.categoryId === 'hindu-philosophy');
  const holyTrinityQuizzes = availableQuizzes.filter(quiz => quiz.categoryId === 'holy-trinity');
  const deitiesQuizzes = availableQuizzes.filter(quiz => quiz.categoryId === 'deities');
  const scripturesQuizzes = availableQuizzes.filter(quiz => quiz.categoryId === 'scriptures');
  const practicesQuizzes = availableQuizzes.filter(quiz => quiz.categoryId === 'practices');


  return (
    <PageLayout title="Interactive Quizzes | Hinduism for Children">
      {/* Header in the style of Hinduism for Children */}
      <div className="flex items-center justify-center py-12 bg-gradient-to-br from-indian-cream to-white">
        <div className="inline-block p-6 rounded-lg bg-gradient-to-br from-indian-cream to-white border border-indian-saffron shadow-lg transform transition-all duration-500 hover:shadow-xl hover:scale-[1.01] text-center">
          <h1 className="text-3xl font-heading font-bold mb-4 text-black">Interactive Quizzes</h1>
          <p className="text-gray-700">
            Test your knowledge on various topics in Hindu philosophy
          </p>
        </div>
      </div>

      <div className="w-full bg-gradient-to-br from-indian-cream to-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/learn" className="inline-flex items-center text-indian-saffron hover:text-spiritual-600 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Learning Centre
          </Link>


          
          <Tabs defaultValue="philosophy" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8 bg-gradient-to-r from-indian-cream to-white border border-indian-saffron/30">
              <TabsTrigger
                value="philosophy"
                className="data-[state=active]:bg-spiritual-600 data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:text-indian-saffron transition-colors text-sm"
              >
                Philosophy
              </TabsTrigger>
              <TabsTrigger
                value="holy-trinity"
                className="data-[state=active]:bg-spiritual-600 data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:text-indian-saffron transition-colors text-sm"
              >
                Holy Trinity
              </TabsTrigger>
              <TabsTrigger
                value="deities"
                className="data-[state=active]:bg-spiritual-600 data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:text-indian-saffron transition-colors text-sm"
              >
                Deities/Rishis
              </TabsTrigger>
              <TabsTrigger
                value="scriptures"
                className="data-[state=active]:bg-spiritual-600 data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:text-indian-saffron transition-colors text-sm"
              >
                Scriptures
              </TabsTrigger>
              <TabsTrigger
                value="practices"
                className="data-[state=active]:bg-spiritual-600 data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:text-indian-saffron transition-colors text-sm"
              >
                Practices/Moral Lessons
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="philosophy">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {philosophyQuizzes.map(quiz => (
                  <Card key={quiz.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/30 pop-shadow-card hover:scale-[1.02]">
                    <Link to={`/learn/quizzes/${quiz.id}`}>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-2 text-spiritual-600">{quiz.title}</h3>
                        <p className="text-gray-700 text-sm mb-3 leading-relaxed">{quiz.description}</p>
                        <div className="flex justify-between text-xs text-gray-600 font-medium">
                          <span>{quiz.questionCount} Questions</span>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="holy-trinity">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {holyTrinityQuizzes.map(quiz => (
                  <Card key={quiz.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/30 pop-shadow-card hover:scale-[1.02]">
                    <Link to={`/learn/quizzes/${quiz.id}`}>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-2 text-spiritual-600">{quiz.title}</h3>
                        <p className="text-gray-700 text-sm mb-3 leading-relaxed">{quiz.description}</p>
                        <div className="flex justify-between text-xs text-gray-600 font-medium">
                          <span>{quiz.questionCount} Questions</span>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="deities">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {deitiesQuizzes.map(quiz => (
                  <Card key={quiz.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/30 pop-shadow-card hover:scale-[1.02]">
                    <Link to={`/learn/quizzes/${quiz.id}`}>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-2 text-spiritual-600">{quiz.title}</h3>
                        <p className="text-gray-700 text-sm mb-3 leading-relaxed">{quiz.description}</p>
                        <div className="flex justify-between text-xs text-gray-600 font-medium">
                          <span>{quiz.questionCount} Questions</span>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="scriptures">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {scripturesQuizzes.map(quiz => (
                  <Card key={quiz.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/30 pop-shadow-card hover:scale-[1.02]">
                    <Link to={`/learn/quizzes/${quiz.id}`}>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-2 text-spiritual-600">{quiz.title}</h3>
                        <p className="text-gray-700 text-sm mb-3 leading-relaxed">{quiz.description}</p>
                        <div className="flex justify-between text-xs text-gray-600 font-medium">
                          <span>{quiz.questionCount} Questions</span>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="practices">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {practicesQuizzes.map(quiz => (
                  <Card key={quiz.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/30 pop-shadow-card hover:scale-[1.02]">
                    <Link to={`/learn/quizzes/${quiz.id}`}>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-2 text-spiritual-600">{quiz.title}</h3>
                        <p className="text-gray-700 text-sm mb-3 leading-relaxed">{quiz.description}</p>
                        <div className="flex justify-between text-xs text-gray-600 font-medium">
                          <span>{quiz.questionCount} Questions</span>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default QuizPage;
