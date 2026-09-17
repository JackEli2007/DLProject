import React from 'react';
import Card from '../ui/Card';

const QuestionCard = ({ question, onAnswer, showResult, selectedAnswer }) => {
  const isMultipleChoice = question.type === 'multiple-choice';

  return (
    <Card className="w-full">
      <div className="mb-6">
        <h3 className="text-xl font-medium text-slate-800 dark:text-white leading-relaxed">
          {question.text}
        </h3>
      </div>

      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const isSelected = selectedAnswer === option.id;
          const isCorrect = option.id === question.correctAnswer;
          
          let stateClass = "border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer";
          
          if (showResult) {
            if (isCorrect) {
              stateClass = "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-100";
            } else if (isSelected && !isCorrect) {
              stateClass = "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100";
            } else {
              stateClass = "border-slate-200 dark:border-slate-700 opacity-60 cursor-not-allowed";
            }
          } else if (isSelected) {
            stateClass = "border-blue-500 ring-1 ring-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100";
          }

          return (
            <button
              key={option.id}
              onClick={() => !showResult && onAnswer(option.id)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ${stateClass}`}
              aria-pressed={isSelected}
            >
              <div className="flex items-center">
                <div className={`
                  flex-shrink-0 w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center
                  ${showResult && isCorrect ? 'border-emerald-500 bg-emerald-500' : ''}
                  ${showResult && isSelected && !isCorrect ? 'border-red-500 bg-red-500' : ''}
                  ${!showResult && isSelected ? 'border-blue-500 bg-blue-500' : 'border-slate-300 dark:border-slate-600'}
                `}>
                  {showResult && isCorrect && (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  {!showResult && isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <span className="font-medium text-slate-700 dark:text-slate-200">{option.text}</span>
              </div>
            </button>
          );
        })}
      </div>

      {showResult && question.explanation && (
        <div className={`mt-6 p-4 rounded-lg border ${selectedAnswer === question.correctAnswer ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/10 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-200' : 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-900/30 text-red-800 dark:text-red-200'}`}>
          <h4 className="font-bold mb-1 flex items-center">
            {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Incorrect'}
          </h4>
          <p className="text-sm opacity-90">{question.explanation}</p>
        </div>
      )}
    </Card>
  );
};

export default QuestionCard;
