
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Check, X } from 'lucide-react';
import { QuizType } from '../../data/lessonsData';

interface LessonQuizProps {
  quiz: QuizType;
}

const LessonQuiz: React.FC<LessonQuizProps> = ({ quiz }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  
  const question = quiz.questions[currentQuestion];
  
  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
    });
  };
  
  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
  };
  
  const calculateScore = () => {
    return Object.entries(selectedAnswers).reduce((score, [questionIndex, answerIndex]) => {
      const question = quiz.questions[Number(questionIndex)];
      return question.correctAnswer === answerIndex ? score + 1 : score;
    }, 0);
  };
  
  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / quiz.questions.length) * 100);
    
    return (
      <div className="text-center py-4">
        <h3 className="text-xl font-medium mb-4">Quiz Results</h3>
        <div className="text-3xl font-bold mb-2">
          {score}/{quiz.questions.length} correct ({percentage}%)
        </div>
        
        <div className="my-6 space-y-4">
          {quiz.questions.map((q, qIndex) => {
            const selectedAnswer = selectedAnswers[qIndex];
            const isCorrect = selectedAnswer === q.correctAnswer;
            
            return (
              <Card key={qIndex} className={`p-4 border ${isCorrect ? 'bg-gradient-to-br from-green-100/50 to-indian-cream/50 border-green-300/50' : 'bg-gradient-to-br from-red-100/50 to-indian-cream/50 border-red-300/50'}`}>
                <div className="flex items-start gap-2">
                  {isCorrect ? (
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  ) : (
                    <X className="w-5 h-5 text-red-500 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium mb-1">{q.question}</p>
                    <p className="text-sm">
                      Your answer: <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                        {q.answers[selectedAnswer]}
                      </span>
                    </p>
                    {!isCorrect && (
                      <p className="text-sm text-green-600">
                        Correct answer: {q.answers[q.correctAnswer]}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        
        <Button onClick={handleRestart}>Restart Quiz</Button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {quiz.questions.length}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">{question.question}</h3>
        
        <RadioGroup 
          value={selectedAnswers[currentQuestion]?.toString()} 
          onValueChange={(value) => handleAnswer(parseInt(value))}
          className="space-y-3"
        >
          {question.answers.map((answer, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={index.toString()} id={`answer-${index}`} />
              <Label htmlFor={`answer-${index}`} className="cursor-pointer">{answer}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        <Button 
          onClick={handleNext}
          disabled={selectedAnswers[currentQuestion] === undefined}
        >
          {currentQuestion === quiz.questions.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default LessonQuiz;
