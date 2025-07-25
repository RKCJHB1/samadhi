import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { enhancedLessonsData as lessonsData } from '../../data/lessonsDataNew';
import LessonQuiz from '../../components/learn/LessonQuiz';
import NotFoundMessage from '../../components/learn/NotFoundMessage';

const IndividualQuizPage = () => {
  const { quizId } = useParams<{ quizId: string }>();

  // Find the lesson that matches the quiz ID
  const lesson = lessonsData
    .flatMap(group => group.lessons)
    .find(lesson => lesson.id === quizId);

  // Find the topic for breadcrumb
  const topic = lessonsData.find(group => 
    group.lessons.some(lesson => lesson.id === quizId)
  );

  if (!lesson || !lesson.quiz) {
    return (
      <PageLayout title="Quiz Not Found | Hinduism for Children">
        <div className="w-full bg-gradient-to-br from-indian-cream to-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/learn/quizzes" className="inline-flex items-center text-indian-saffron hover:text-spiritual-600 mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Quizzes
            </Link>
            <NotFoundMessage 
              title="Quiz Not Found"
              message="The quiz you're looking for doesn't exist or doesn't have any questions yet."
              linkTo="/learn/quizzes"
              linkText="Browse All Quizzes"
            />
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={`${lesson.title} Quiz | Hinduism for Children`}>
      {/* Header */}
      <div className="flex items-center justify-center py-12 bg-gradient-to-br from-indian-cream to-white">
        <div className="inline-block p-6 rounded-lg bg-gradient-to-br from-indian-cream to-white border border-indian-saffron shadow-lg transform transition-all duration-500 hover:shadow-xl hover:scale-[1.01] text-center max-w-2xl">
          <h1 className="text-3xl font-heading font-bold mb-4 text-black">{lesson.title}</h1>
          <p className="text-gray-700">
            Test your knowledge from this lesson
          </p>
          {topic && (
            <p className="text-sm text-indian-saffron mt-2 font-medium">
              {topic.topicName}
            </p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full bg-gradient-to-br from-indian-cream to-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/learn/quizzes" className="inline-flex items-center text-indian-saffron hover:text-spiritual-600 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Quizzes
            </Link>
            
            {/* Link to the actual lesson */}
            {topic && (
              <Link 
                to={`/learn/lessons/${topic.topicId}/${lesson.id}`}
                className="inline-flex items-center text-spiritual-600 hover:text-indian-saffron transition-colors text-sm"
              >
                📖 Read the Lesson First
              </Link>
            )}
          </div>

          {/* Quiz Description */}
          <div className="mb-8 bg-gradient-to-r from-indian-cream to-white p-6 rounded-lg border border-indian-saffron/30 pop-shadow-card">
            <h2 className="text-xl font-semibold mb-3 text-spiritual-600">About This Quiz</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {lesson.description}
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="bg-white px-3 py-1 rounded-full border border-indian-saffron/30">
                📝 {lesson.quiz.questions.length} Questions
              </span>
              <span className="bg-white px-3 py-1 rounded-full border border-indian-saffron/30">
                ⏱️ {Math.ceil(lesson.quiz.questions.length * 1.5)} minutes
              </span>
            </div>
          </div>

          {/* Quiz Component */}
          <Card className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/30 pop-shadow-card">
            <CardHeader>
              <CardTitle className="text-xl text-spiritual-600">Quiz Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <LessonQuiz quiz={lesson.quiz} />
            </CardContent>
          </Card>

          {/* Additional Actions */}
          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-indian-cream to-white p-6 rounded-lg border border-indian-saffron/30 pop-shadow-card">
              <h3 className="text-lg font-semibold mb-3 text-spiritual-600">Want to Learn More?</h3>
              <p className="text-gray-700 mb-4">
                Explore more lessons and quizzes to deepen your understanding of Hindu philosophy and practices.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/learn/quizzes"
                  className="inline-flex items-center px-4 py-2 bg-white border border-indian-saffron text-indian-saffron hover:bg-indian-saffron/10 rounded-lg transition-colors"
                >
                  📚 More Quizzes
                </Link>
                {topic && (
                  <Link
                    to={`/learn/lessons/${topic.topicId}/${lesson.id}`}
                    className="inline-flex items-center px-4 py-2 bg-spiritual-600 text-white hover:bg-spiritual-700 rounded-lg transition-colors"
                  >
                    📖 Read This Lesson
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default IndividualQuizPage;
