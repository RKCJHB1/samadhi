import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { lessonsData } from '../../data/lessonsData';
import NotFoundMessage from '../../components/learn/NotFoundMessage';
import LessonQuiz from '../../components/learn/LessonQuiz';

const LessonPage = () => {
  const { topicId, lessonId } = useParams<{ topicId: string; lessonId: string }>();
  
  // Find the current topic and lesson
  const topic = lessonsData.find(t => t.topicId === topicId);
  const lesson = topic?.lessons.find(l => l.id === lessonId);
  
  // Find next lesson
  const findNextLesson = () => {
    if (!topic || !lesson) return null;
    
    const currentIndex = topic.lessons.findIndex(l => l.id === lessonId);
    const nextLesson = topic.lessons[currentIndex + 1];
    
    if (nextLesson) {
      return {
        topicId,
        lesson: nextLesson
      };
    }
    
    // If no next lesson in current topic, find first lesson in next topic
    const topicIndex = lessonsData.findIndex(t => t.topicId === topicId);
    const nextTopic = lessonsData[topicIndex + 1];
    
    if (nextTopic && nextTopic.lessons.length > 0) {
      return {
        topicId: nextTopic.topicId,
        lesson: nextTopic.lessons[0]
      };
    }
    
    return null;
  };
  
  const nextLesson = findNextLesson();

  if (!topic || !lesson) {
    return (
      <NotFoundMessage 
        title="Lesson Not Found"
        message="The lesson you're looking for doesn't exist."
        backTo="/learn"
        backLabel="Back to Learning Centre"
      />
    );
  }

  return (
    <PageLayout title={`Lesson: ${lesson.title}`}>
      <div className="min-h-screen w-full bg-gradient-to-br from-indian-cream to-white">
        <div className="w-full">
          <div className="container mx-auto px-4 py-8">
            <Link to="/learn" className="inline-flex items-center text-spiritual-500 hover:text-spiritual-600 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Learning Centre
            </Link>
            
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-heading font-bold">{lesson.title}</h1>
              <p className="text-muted-foreground mt-2">Topic: {topic.topicName}</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column - Video and Cards (stacked) */}
              <div className="lg:col-span-4 space-y-6">
                {/* Video Section */}
                <Card className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/30">
                  <CardHeader>
                    <CardTitle className="text-xl">Lesson Video</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                      {lesson.videoUrl ? (
                        <iframe
                          className="w-full h-full rounded-md"
                          src={lesson.videoUrl}
                          title={lesson.title}
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <div className="text-center p-8 text-muted-foreground">
                          Video content coming soon
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Next Lesson Card */}
                <Card className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/30">
                  <CardHeader>
                    <CardTitle className="text-lg">Next Lesson</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {nextLesson ? (
                      <Link 
                        to={`/learn/lessons/${nextLesson.topicId}/${nextLesson.lesson.id}`}
                        className="group block p-4 border rounded-md hover:bg-secondary transition-colors"
                      >
                        <div className="font-medium group-hover:text-spiritual-600">{nextLesson.lesson.title}</div>
                        <p className="text-sm text-muted-foreground mt-1">{nextLesson.lesson.description}</p>
                        <div className="mt-2 text-spiritual-500 group-hover:text-spiritual-600 flex items-center">
                          Continue <ArrowRight className="ml-1 w-4 h-4" />
                        </div>
                      </Link>
                    ) : (
                      <p className="text-muted-foreground">You've completed all available lessons!</p>
                    )}
                  </CardContent>
                </Card>
                
                {/* Related Content Card */}
                <Card className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/30">
                  <CardHeader>
                    <CardTitle className="text-lg">Related Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm">
                      <div className="font-medium">Main Topic</div>
                      <Link 
                        to={`/learn/topics/${topicId}`} 
                        className="text-spiritual-500 hover:text-spiritual-600"
                      >
                        {topic.topicName} - Overview
                      </Link>
                    </div>
                    
                    {lesson.resources && lesson.resources.length > 0 ? (
                      <div className="space-y-2">
                        <div className="font-medium text-sm">Additional Reading</div>
                        <ul className="space-y-1">
                          {lesson.resources.map((resource, index) => (
                            <li key={index}>
                              <a 
                                href={resource.url} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-spiritual-500 hover:text-spiritual-600 text-sm"
                              >
                                {resource.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              </div>

              {/* Lesson Content - Expanded to fill rest of page */}
              <div className="lg:col-span-8">
                <Card className="h-full bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/30">
                  <CardHeader>
                    <CardTitle className="text-xl">Lesson Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      {lesson.content ? (
                        <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
                      ) : (
                        <div className="min-h-[500px] flex items-center justify-center border border-dashed rounded-md p-8 text-center text-muted-foreground">
                          <p>Lesson content will appear here.</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Quiz Section - Full Width */}
            <div className="mt-8">
              <Card className="bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/30">
                <CardHeader>
                  <CardTitle className="text-xl">Knowledge Check</CardTitle>
                </CardHeader>
                <CardContent>
                  {lesson.quiz ? (
                    <LessonQuiz quiz={lesson.quiz} />
                  ) : (
                    <p className="text-muted-foreground">No quiz available for this lesson yet.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LessonPage;
