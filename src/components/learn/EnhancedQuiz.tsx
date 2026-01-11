import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Check, X, RefreshCcw, Share2, Trophy, Star, ArrowRight, ArrowLeft } from 'lucide-react';
import { QuizType } from '../../data/lessonsData';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface EnhancedQuizProps {
  quiz: QuizType;
  onComplete?: (score: number, total: number) => void;
}

const EnhancedQuiz: React.FC<EnhancedQuizProps> = ({ quiz, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const question = quiz.questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];
  const isCorrect = selectedAnswer === question?.correctAnswer;

  const fireConfetti = useCallback(() => {
    const count = 200;
    const defaults = { origin: { y: 0.7 }, zIndex: 9999 };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, []);

  const handleAnswer = (answerIndex: number) => {
    if (showFeedback) return;
    
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: answerIndex });
    setShowFeedback(true);
    setIsAnimating(true);

    // Check if correct and show mini celebration
    if (answerIndex === question.correctAnswer) {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#FF9933', '#FFD700', '#FFA500']
      });
    }

    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const score = calculateScore();
      setShowResults(true);
      if (score === quiz.questions.length) {
        fireConfetti();
      } else if (score >= quiz.questions.length * 0.8) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
      onComplete?.(score, quiz.questions.length);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowFeedback(selectedAnswers[currentQuestion - 1] !== undefined);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setShowFeedback(false);
  };

  const calculateScore = () => {
    return Object.entries(selectedAnswers).reduce((score, [qIndex, aIndex]) => {
      return quiz.questions[Number(qIndex)].correctAnswer === aIndex ? score + 1 : score;
    }, 0);
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage === 100) return { emoji: '🏆', message: 'Perfect Score! You\'re a master!' };
    if (percentage >= 80) return { emoji: '🌟', message: 'Excellent work! Almost perfect!' };
    if (percentage >= 60) return { emoji: '👍', message: 'Good job! Keep learning!' };
    if (percentage >= 40) return { emoji: '📚', message: 'Nice try! Review the lesson and try again.' };
    return { emoji: '💪', message: 'Keep practicing! You\'ll get there!' };
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / quiz.questions.length) * 100);
    const { emoji, message } = getScoreMessage(percentage);

    return (
      <div className="animate-in fade-in duration-500">
        {/* Score Header */}
        <div className="text-center py-6 mb-6 bg-gradient-to-br from-indian-saffron/10 to-spiritual-100/30 rounded-xl">
          <div className="text-6xl mb-3">{emoji}</div>
          <div className="text-4xl font-bold text-gray-900 mb-2">
            {score}/{quiz.questions.length}
          </div>
          <div className="text-lg text-gray-600 mb-1">{percentage}% Correct</div>
          <p className="text-gray-700 font-medium">{message}</p>
        </div>

        {/* Score breakdown */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg border border-green-200">
            <Check className="w-5 h-5 text-green-500" />
            <span className="font-medium text-green-700">{score} Correct</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-lg border border-red-200">
            <X className="w-5 h-5 text-red-500" />
            <span className="font-medium text-red-700">{quiz.questions.length - score} Wrong</span>
          </div>
        </div>

        {/* Review answers */}
        <div className="space-y-3 mb-6">
          {quiz.questions.map((q, qIndex) => {
            const userAnswer = selectedAnswers[qIndex];
            const correct = userAnswer === q.correctAnswer;
            return (
              <Card key={qIndex} className={cn(
                'p-4 border-l-4 transition-all',
                correct 
                  ? 'border-l-green-500 bg-green-50/50' 
                  : 'border-l-red-500 bg-red-50/50'
              )}>
                <div className="flex items-start gap-3">
                  <div className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
                    correct ? 'bg-green-500' : 'bg-red-500'
                  )}>
                    {correct ? <Check className="w-4 h-4 text-white" /> : <X className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-1">{q.question}</p>
                    <p className="text-sm text-gray-600">
                      Your answer: <span className={correct ? 'text-green-600' : 'text-red-600'}>{q.answers[userAnswer]}</span>
                    </p>
                    {!correct && (
                      <p className="text-sm text-green-600 mt-1">
                        ✓ Correct: {q.answers[q.correctAnswer]}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          <Button onClick={handleRestart} variant="outline" className="gap-2">
            <RefreshCcw className="w-4 h-4" /> Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Question UI
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="animate-in fade-in duration-300">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indian-saffron to-orange-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">{question.question}</h3>

        <div className="space-y-3">
          {question.answers.map((answer, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === question.correctAnswer;

            let buttonStyle = 'bg-white border-gray-200 hover:border-indian-saffron hover:bg-indian-saffron/5';

            if (showFeedback) {
              if (isCorrectAnswer) {
                buttonStyle = 'bg-green-50 border-green-500 ring-2 ring-green-200';
              } else if (isSelected && !isCorrectAnswer) {
                buttonStyle = 'bg-red-50 border-red-500 ring-2 ring-red-200 animate-shake';
              } else {
                buttonStyle = 'bg-gray-50 border-gray-200 opacity-60';
              }
            } else if (isSelected) {
              buttonStyle = 'bg-indian-saffron/10 border-indian-saffron ring-2 ring-indian-saffron/30';
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showFeedback}
                className={cn(
                  'w-full p-4 rounded-xl border-2 text-left transition-all duration-200',
                  'flex items-center gap-3',
                  buttonStyle
                )}
              >
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0',
                  'border-2 transition-all',
                  showFeedback && isCorrectAnswer
                    ? 'bg-green-500 border-green-500 text-white'
                    : showFeedback && isSelected
                    ? 'bg-red-500 border-red-500 text-white'
                    : isSelected
                    ? 'bg-indian-saffron border-indian-saffron text-white'
                    : 'bg-white border-gray-300 text-gray-600'
                )}>
                  {showFeedback && isCorrectAnswer ? <Check className="w-4 h-4" /> :
                   showFeedback && isSelected ? <X className="w-4 h-4" /> :
                   String.fromCharCode(65 + index)}
                </div>
                <span className="flex-1 text-gray-800">{answer}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t">
        <Button
          variant="ghost"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </Button>

        {showFeedback && (
          <Button onClick={handleNext} className="gap-2 bg-indian-saffron hover:bg-indian-saffron/90">
            {currentQuestion === quiz.questions.length - 1 ? 'See Results' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default EnhancedQuiz;

