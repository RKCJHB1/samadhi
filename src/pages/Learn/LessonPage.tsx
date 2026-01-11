import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import { ArrowLeft, ArrowRight, BookOpen, Clock, ChevronRight, Play, ExternalLink, CheckCircle2, Bookmark, BookmarkCheck } from 'lucide-react';
import { enhancedLessonsData as lessonsData } from '../../data/lessonsDataNew';
import NotFoundMessage from '../../components/learn/NotFoundMessage';
import EnhancedQuiz from '../../components/learn/EnhancedQuiz';
import ReadingModeControls from '../../components/learn/ReadingModeControls';
import TableOfContents from '../../components/learn/TableOfContents';
import DownloadPdfButton from '../../components/learn/DownloadPdfButton';
import { useLearningProgress } from '../../hooks/useLearningProgress';
import { cn } from '@/lib/utils';

const LessonPage = () => {
  const { topicId, lessonId } = useParams<{ topicId: string; lessonId: string }>();
  const contentRef = useRef<HTMLDivElement>(null);

  // Find the current topic and lesson
  const topic = lessonsData.find(t => t.topicId === topicId);
  const lessonData = topic?.lessons.find(l => l.id === lessonId);

  // Learning progress hook
  const {
    state: progressState,
    completeLesson,
    isLessonComplete,
    toggleBookmark,
    isBookmarked,
    updateReadingPreferences
  } = useLearningProgress();

  // Proper loading state management
  const [loading, setLoading] = useState(true);
  const [lesson, setLesson] = useState<any>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isMarkedComplete, setIsMarkedComplete] = useState(false);

  // Check if lesson is completed
  useEffect(() => {
    if (topicId && lessonId) {
      setIsMarkedComplete(isLessonComplete(topicId, lessonId));
    }
  }, [topicId, lessonId, isLessonComplete, progressState]);

  // Initialize lesson data with proper loading state
  useEffect(() => {
    setLoading(true);
    setShowQuiz(false);

    const timer = setTimeout(() => {
      if (lessonData) {
        setLesson(lessonData);
      }
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [lessonData, topicId, lessonId]);

  // Calculate lesson progress within topic
  const getLessonProgress = () => {
    if (!topic) return { current: 0, total: 0 };
    const currentIndex = topic.lessons.findIndex(l => l.id === lessonId);
    return { current: currentIndex + 1, total: topic.lessons.length };
  };

  // Find previous lesson
  const findPrevLesson = () => {
    if (!topic) return null;
    const currentIndex = topic.lessons.findIndex(l => l.id === lessonId);
    if (currentIndex > 0) {
      return { topicId, lesson: topic.lessons[currentIndex - 1] };
    }
    // Check previous topic
    const topicIndex = lessonsData.findIndex(t => t.topicId === topicId);
    const prevTopic = lessonsData[topicIndex - 1];
    if (prevTopic && prevTopic.lessons.length > 0) {
      return { topicId: prevTopic.topicId, lesson: prevTopic.lessons[prevTopic.lessons.length - 1] };
    }
    return null;
  };

  // Find next lesson
  const findNextLesson = () => {
    if (!topic || !lesson) return null;
    const currentIndex = topic.lessons.findIndex(l => l.id === lessonId);
    const nextLesson = topic.lessons[currentIndex + 1];
    if (nextLesson) {
      return { topicId, lesson: nextLesson };
    }
    const topicIndex = lessonsData.findIndex(t => t.topicId === topicId);
    const nextTopic = lessonsData[topicIndex + 1];
    if (nextTopic && nextTopic.lessons.length > 0) {
      return { topicId: nextTopic.topicId, lesson: nextTopic.lessons[0] };
    }
    return null;
  };

  const prevLesson = findPrevLesson();
  const nextLesson = findNextLesson();
  const progress = getLessonProgress();

  if (!topic || !lessonData) {
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
    <PageLayout title={`Lesson: ${lesson?.title || lessonData.title}`}>
      <div className={`min-h-screen w-full bg-gradient-to-b from-indian-cream via-white to-indian-cream/30 transition-opacity duration-300 ${loading ? 'opacity-90' : 'opacity-100'}`}>

        {/* Progress Bar */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-indian-saffron/20 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between text-sm">
              <Link to="/learn" className="inline-flex items-center text-spiritual-500 hover:text-spiritual-600 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Learning Centre</span>
              </Link>

              <div className="flex items-center gap-2 text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">{topic.topicName}</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-foreground font-medium">{progress.current} of {progress.total}</span>
              </div>

              <div className="flex items-center gap-2">
                {/* Bookmark button */}
                <button
                  onClick={() => topicId && lessonId && toggleBookmark(topicId, lessonId)}
                  className={cn(
                    'p-2 rounded-lg transition-all',
                    isBookmarked(topicId || '', lessonId || '')
                      ? 'text-indian-saffron bg-indian-saffron/10'
                      : 'text-gray-400 hover:text-indian-saffron hover:bg-indian-saffron/5'
                  )}
                  title={isBookmarked(topicId || '', lessonId || '') ? 'Remove bookmark' : 'Bookmark this lesson'}
                >
                  {isBookmarked(topicId || '', lessonId || '') ? (
                    <BookmarkCheck className="w-4 h-4" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>

                {/* Download PDF button */}
                <DownloadPdfButton
                  lessonTitle={lesson?.title || lessonData?.title || 'Lesson'}
                  lessonDescription={lessonData?.description || ''}
                  contentRef={contentRef}
                  topicName={topic?.topicName}
                  topicId={topicId}
                  lessonId={lessonId}
                />

                {/* Reading mode controls */}
                <ReadingModeControls
                  preferences={progressState.readingPreferences}
                  onUpdate={updateReadingPreferences}
                />
              </div>
            </div>

            {/* Progress indicator */}
            <div className="mt-2 h-1 bg-indian-saffron/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indian-saffron to-spiritual-500 rounded-full transition-all duration-500"
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main Content Area with Reading Preferences */}
        <div className={cn(
          'transition-colors duration-300',
          progressState.readingPreferences.theme === 'sepia' && 'bg-amber-50/50',
          progressState.readingPreferences.theme === 'dark' && 'bg-gray-900'
        )}>
          <div className="flex max-w-6xl mx-auto justify-center">
            {/* Table of Contents - Desktop */}
            <aside className="hidden lg:block w-56 flex-shrink-0 pl-4 pt-8">
              <TableOfContents contentRef={contentRef} />
            </aside>

            <article className={cn(
              'flex-1 max-w-3xl px-4 py-8 md:py-12',
              progressState.readingPreferences.fontSize === 'small' && 'text-sm',
              progressState.readingPreferences.fontSize === 'large' && 'text-lg',
              progressState.readingPreferences.lineSpacing === 'compact' && 'leading-snug',
              progressState.readingPreferences.lineSpacing === 'relaxed' && 'leading-loose',
              progressState.readingPreferences.theme === 'dark' && 'text-gray-100'
            )}>

              {/* Completion Badge */}
              {isMarkedComplete && (
                <div className="mb-6 flex items-center justify-center gap-2 py-2 px-4 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  You've completed this lesson
                </div>
              )}

              {/* Header */}
              <header className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-spiritual-100 text-spiritual-700 rounded-full text-sm font-medium mb-4">
                  <BookOpen className="w-4 h-4" />
                  {topic.topicName}
                </div>
                <h1 className={cn(
                  'text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight mb-4',
                  progressState.readingPreferences.theme === 'dark' ? 'text-white' : 'text-gray-900'
                )}>
                  {loading ? 'Loading...' : (lesson?.title || lessonData?.title)}
                </h1>
                <p className={cn(
                  'text-lg max-w-2xl mx-auto',
                  progressState.readingPreferences.theme === 'dark' ? 'text-gray-300' : 'text-muted-foreground'
                )}>
                  {lessonData.description}
                </p>
              </header>

          {/* Video Section (if available) */}
          {lesson?.videoUrl && (
            <div className="mb-10">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg border border-indian-saffron/20">
                <iframe
                  src={lesson.videoUrl}
                  title={lesson.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-3 flex items-center justify-center gap-2">
                <Play className="w-4 h-4" />
                Watch the video lesson above, then continue reading below
              </p>
            </div>
          )}

          {/* Lesson Content */}
          <div ref={contentRef} className="lesson-content">
            {loading ? (
              <div className="min-h-[300px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <div className="w-8 h-8 border-2 border-spiritual-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p>Loading lesson content...</p>
                </div>
              </div>
            ) : lesson?.content ? (
              <div
                className={cn(
                  'prose max-w-none',
                  progressState.readingPreferences.fontSize === 'small' && 'prose-sm',
                  progressState.readingPreferences.fontSize === 'large' && 'prose-xl',
                  'prose-headings:font-heading',
                  progressState.readingPreferences.theme === 'dark'
                    ? 'prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300 prose-strong:text-white prose-blockquote:bg-gray-800/50'
                    : 'prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900',
                  'prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-indian-saffron/30',
                  'prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3',
                  progressState.readingPreferences.theme === 'dark' ? 'prose-h3:text-spiritual-300' : 'prose-h3:text-spiritual-700',
                  // Line spacing for paragraphs
                  progressState.readingPreferences.lineSpacing === 'compact' && 'prose-p:leading-snug prose-li:leading-snug',
                  progressState.readingPreferences.lineSpacing === 'normal' && 'prose-p:leading-relaxed prose-li:leading-relaxed',
                  progressState.readingPreferences.lineSpacing === 'relaxed' && 'prose-p:leading-loose prose-li:leading-loose',
                  'prose-p:mb-4',
                  'prose-li:my-1',
                  'prose-strong:font-semibold',
                  'prose-img:rounded-xl prose-img:shadow-md prose-img:my-6',
                  'prose-blockquote:border-l-4 prose-blockquote:border-indian-saffron prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:italic',
                  progressState.readingPreferences.theme !== 'dark' && 'prose-blockquote:bg-indian-cream/50'
                )}
                dangerouslySetInnerHTML={{ __html: lesson.content }}
              />
            ) : (
              <div className="min-h-[300px] flex items-center justify-center text-muted-foreground">
                <p>Lesson content will appear here.</p>
              </div>
            )}
          </div>

          {/* Mobile TOC */}
          <TableOfContents contentRef={contentRef} className="lg:hidden" />

          {/* Resources Section */}
          {lesson?.resources && lesson.resources.length > 0 && (
            <div className={cn(
              'mt-12 p-6 rounded-xl border',
              progressState.readingPreferences.theme === 'dark'
                ? 'bg-gray-800/50 border-gray-700'
                : 'bg-gradient-to-br from-spiritual-50 to-indian-cream/50 border-spiritual-200'
            )}>
              <h3 className={cn(
                'text-lg font-heading font-semibold mb-4 flex items-center gap-2',
                progressState.readingPreferences.theme === 'dark' ? 'text-white' : 'text-gray-900'
              )}>
                <ExternalLink className="w-5 h-5 text-spiritual-500" />
                Additional Resources
              </h3>
              <ul className="space-y-2">
                {lesson.resources.map((resource: any, index: number) => (
                  <li key={index}>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'hover:underline inline-flex items-center gap-1',
                        progressState.readingPreferences.theme === 'dark'
                          ? 'text-spiritual-300 hover:text-spiritual-200'
                          : 'text-spiritual-600 hover:text-spiritual-700'
                      )}
                    >
                      {resource.title}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Mark Complete / Quiz Section */}
          <div className="mt-12">
            {lesson?.quiz ? (
              !showQuiz ? (
                <div className={cn(
                  'text-center p-8 rounded-xl border-2 border-dashed',
                  progressState.readingPreferences.theme === 'dark'
                    ? 'bg-gray-800/50 border-indian-saffron/40'
                    : 'bg-gradient-to-br from-indian-cream to-white border-indian-saffron/40'
                )}>
                  <h3 className={cn(
                    'text-xl font-heading font-semibold mb-2',
                    progressState.readingPreferences.theme === 'dark' ? 'text-white' : 'text-gray-900'
                  )}>
                    Ready to test your knowledge?
                  </h3>
                  <p className={cn(
                    'mb-4',
                    progressState.readingPreferences.theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground'
                  )}>
                    Take a quick quiz to reinforce what you've learned
                  </p>
                  <button
                    onClick={() => setShowQuiz(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indian-saffron to-spiritual-500 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    Start Quiz
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className={cn(
                  'p-6 rounded-xl border shadow-md',
                  progressState.readingPreferences.theme === 'dark'
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-indian-saffron/30'
                )}>
                  <h3 className={cn(
                    'text-xl font-heading font-semibold mb-6',
                    progressState.readingPreferences.theme === 'dark' ? 'text-white' : 'text-gray-900'
                  )}>
                    Knowledge Check
                  </h3>
                  <EnhancedQuiz
                    quiz={lesson.quiz}
                    onComplete={(score, total) => {
                      if (topicId && lessonId) {
                        const percentage = Math.round((score / total) * 100);
                        completeLesson(topicId, lessonId, percentage);
                      }
                    }}
                  />
                </div>
              )
            ) : (
              /* Mark as complete button for lessons without quiz */
              !isMarkedComplete && (
                <div className={cn(
                  'text-center p-8 rounded-xl border-2 border-dashed',
                  progressState.readingPreferences.theme === 'dark'
                    ? 'bg-gray-800/50 border-green-700'
                    : 'bg-gradient-to-br from-green-50 to-white border-green-300'
                )}>
                  <h3 className={cn(
                    'text-xl font-heading font-semibold mb-2',
                    progressState.readingPreferences.theme === 'dark' ? 'text-white' : 'text-gray-900'
                  )}>
                    Finished reading?
                  </h3>
                  <p className={cn(
                    'mb-4',
                    progressState.readingPreferences.theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground'
                  )}>
                    Mark this lesson as complete to track your progress
                  </p>
                  <button
                    onClick={() => {
                      if (topicId && lessonId) {
                        completeLesson(topicId, lessonId);
                      }
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Mark as Complete
                  </button>
                </div>
              )
            )}
          </div>

          {/* Navigation Footer */}
          <nav className={cn(
            'mt-12 pt-8 border-t',
            progressState.readingPreferences.theme === 'dark' ? 'border-gray-700' : 'border-indian-saffron/30'
          )}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevLesson ? (
                <Link
                  to={`/learn/lessons/${prevLesson.topicId}/${prevLesson.lesson.id}`}
                  className={cn(
                    'group flex items-center gap-3 p-4 rounded-xl border hover:shadow-md transition-all',
                    progressState.readingPreferences.theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 hover:border-spiritual-400'
                      : 'bg-white border-indian-saffron/30 hover:border-spiritual-400'
                  )}
                >
                  <div className={cn(
                    'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-spiritual-100 transition-colors',
                    progressState.readingPreferences.theme === 'dark' ? 'bg-gray-700' : 'bg-indian-cream'
                  )}>
                    <ArrowLeft className="w-5 h-5 text-spiritual-500" />
                  </div>
                  <div className="min-w-0">
                    <div className={cn(
                      'text-sm',
                      progressState.readingPreferences.theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground'
                    )}>Previous</div>
                    <div className={cn(
                      'font-medium truncate group-hover:text-spiritual-600 transition-colors',
                      progressState.readingPreferences.theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                    )}>
                      {prevLesson.lesson.title}
                    </div>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextLesson ? (
                <Link
                  to={`/learn/lessons/${nextLesson.topicId}/${nextLesson.lesson.id}`}
                  className={cn(
                    'group flex items-center justify-end gap-3 p-4 rounded-xl border hover:shadow-md transition-all sm:text-right',
                    progressState.readingPreferences.theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 hover:border-spiritual-400'
                      : 'bg-gradient-to-r from-indian-cream to-spiritual-50 border-spiritual-200 hover:border-spiritual-400'
                  )}
                >
                  <div className="min-w-0">
                    <div className={cn(
                      'text-sm',
                      progressState.readingPreferences.theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground'
                    )}>Next Lesson</div>
                    <div className={cn(
                      'font-medium truncate group-hover:text-spiritual-600 transition-colors',
                      progressState.readingPreferences.theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                    )}>
                      {nextLesson.lesson.title}
                    </div>
                  </div>
                  <div className={cn(
                    'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-spiritual-200 transition-colors',
                    progressState.readingPreferences.theme === 'dark' ? 'bg-gray-700' : 'bg-spiritual-100'
                  )}>
                    <ArrowRight className="w-5 h-5 text-spiritual-500" />
                  </div>
                </Link>
              ) : (
                <Link
                  to="/learn"
                  className="group flex items-center justify-end gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-md transition-all sm:text-right"
                >
                  <div className="min-w-0">
                    <div className="text-sm text-green-600">Congratulations!</div>
                    <div className="font-medium text-green-700">
                      All lessons complete
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-green-600" />
                  </div>
                </Link>
              )}
            </div>
          </nav>
        </article>

            {/* Spacer to balance the TOC on the left - Desktop only */}
            <aside className="hidden lg:block w-56 flex-shrink-0 pr-4" aria-hidden="true" />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LessonPage;
