import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const QuizResults = ({ score, total, xpEarned, questions = [], onRetry }) => {
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 70;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in-up">
      <Card className="text-center overflow-hidden relative">
        <div className={`absolute top-0 left-0 w-full h-2 ${passed ? 'bg-emerald-500' : 'bg-amber-500'}`} />
        
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mt-4 mb-2">
          {passed ? 'Great Job!' : 'Keep Practicing!'}
        </h2>
        
        <div className="flex justify-center items-center gap-12 my-8">
          <div className="flex flex-col items-center">
            <span className="text-5xl font-black text-slate-800 dark:text-white">
              {score}<span className="text-3xl text-slate-400">/{total}</span>
            </span>
            <span className="text-sm font-medium text-slate-500 mt-2 uppercase tracking-wide">Score</span>
          </div>
          
          <div className="w-px h-16 bg-slate-200 dark:bg-slate-700" />
          
          <div className="flex flex-col items-center">
            <div className="flex items-center text-4xl font-black text-purple-600 dark:text-purple-400">
              <span className="text-2xl mr-1">+</span>{xpEarned}
            </div>
            <span className="text-sm font-medium text-slate-500 mt-2 uppercase tracking-wide">XP Earned</span>
          </div>
        </div>

        <div className="flex justify-center">
          <Button variant="primary" onClick={onRetry}>
            Continue Learning
          </Button>
        </div>
      </Card>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white px-2">Review Answers</h3>
        {questions.map((q, i) => {
          const isCorrect = q.userAnswer === q.correctAnswer;
          return (
            <div key={i} className={`p-4 rounded-lg border ${isCorrect ? 'bg-emerald-50/50 border-emerald-100 dark:bg-emerald-900/10 dark:border-emerald-800/30' : 'bg-red-50/50 border-red-100 dark:bg-red-900/10 dark:border-red-800/30'}`}>
              <div className="flex gap-3">
                <div className="mt-1">
                  {isCorrect ? (
                    <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200">{q.text}</p>
                  {!isCorrect && (
                    <div className="mt-2 text-sm text-red-700 dark:text-red-400">
                      <span className="font-semibold">Correct answer:</span> {q.options.find(o => o.id === q.correctAnswer)?.text}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizResults;
