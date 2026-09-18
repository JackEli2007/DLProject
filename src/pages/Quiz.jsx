import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Tabs from '../components/ui/Tabs';
import QuestionCard from '../components/quiz/QuestionCard';
import QuizResults from '../components/quiz/QuizResults';
import { useProgress } from '../context/ProgressContext';
import { quizQuestions } from '../data/quizQuestions';

const Quiz = () => {
  const { saveQuizScore, awardXP } = useProgress();
  const [quizState, setQuizState] = useState('setup'); // setup, active, results
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const topics = [
    { id: 'all', label: 'All Topics' },
    { id: 'jk-flipflop', label: 'JK Flip-Flop' },
    { id: 'char-codes', label: 'Character Codes' }
  ];

  const startQuiz = () => {
    let filtered = quizQuestions || [];
    if (selectedTopic !== 'all') {
      const moduleMap = {
        'jk-flipflop': 'jkFlipFlop',
        'char-codes': 'charCodes'
      };
      filtered = filtered.filter(q => q.module === moduleMap[selectedTopic]);
    }
    // Shuffle and pick up to 10
    const shuffled = [...filtered].sort(() => 0.5 - Math.random()).slice(0, 10);
    setCurrentQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizState('active');
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(s => s + 1);
    
    setTimeout(() => {
      if (currentQuestionIndex < currentQuestions.length - 1) {
        setCurrentQuestionIndex(i => i + 1);
      } else {
        finishQuiz(score + (isCorrect ? 1 : 0));
      }
    }, 1500);
  };

  const finishQuiz = (finalScore) => {
    setQuizState('results');
    const percentage = Math.round((finalScore / currentQuestions.length) * 100);
    const xpEarned = finalScore * 20; // 20 XP per correct answer
    
    saveQuizScore(selectedTopic, percentage);
    if (xpEarned > 0) {
      awardXP(xpEarned);
    }
  };

  const resetQuiz = () => setQuizState('setup');

  if (quizState === 'setup') {
    return (
      <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">Knowledge Quizzes</h1>
        <Card className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Select Topic</h2>
          <Tabs tabs={topics} activeTab={selectedTopic} onChange={setSelectedTopic} className="mb-8" />
          
          <div className="flex justify-center mt-8">
            <Button size="lg" variant="primary" onClick={startQuiz} className="w-full sm:w-auto px-12">
              Start Quiz
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (quizState === 'active') {
    const question = currentQuestions[currentQuestionIndex];
    return (
      <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6 text-slate-600 dark:text-slate-400 font-medium">
          <span>Question {currentQuestionIndex + 1} of {currentQuestions.length}</span>
          <span>Score: {score}</span>
        </div>
        
        {question && (
          <QuestionCard 
            key={question.id || currentQuestionIndex}
            question={question}
            onSubmit={handleAnswer}
            showFeedbackImmediately={true}
          />
        )}
      </div>
    );
  }

  if (quizState === 'results') {
    return (
      <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        <QuizResults 
          score={score} 
          total={currentQuestions.length} 
          topic={topics.find(t => t.id === selectedTopic)?.label}
          onRetry={resetQuiz} 
        />
      </div>
    );
  }

  return null;
};

export default Quiz;
