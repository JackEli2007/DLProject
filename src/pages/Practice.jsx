import React, { useState } from 'react';
import Tabs from '../components/ui/Tabs';
import QuestionCard from '../components/quiz/QuestionCard';
import { useProgress } from '../context/ProgressContext';
import { practiceProblems } from '../data/practiceProblems';
import { useToast } from '../context/ToastContext';

const Practice = () => {
  const { awardXP } = useProgress();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('jk-flipflop');
  
  // Mock practice state
  const [completedProblems, setCompletedProblems] = useState(new Set());

  const handleAnswerSubmit = (problemId, isCorrect, xpReward) => {
    if (isCorrect && !completedProblems.has(problemId)) {
      setCompletedProblems(prev => new Set([...prev, problemId]));
      awardXP(xpReward || 10);
      addToast('Correct! XP Awarded.', 'success');
    } else if (isCorrect) {
      addToast('Correct! (Already completed)', 'info');
    } else {
      addToast('Incorrect, try again.', 'error');
    }
  };

  const tabs = [
    { id: 'jk-flipflop', label: 'JK Flip-Flop' },
    { id: 'race-around', label: 'Race-Around' },
    { id: 'char-codes', label: 'Character Codes' }
  ];

  const filteredProblems = (practiceProblems || []).filter(p => p.topic === activeTab);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Practice Area</h1>
        <p className="text-slate-600 dark:text-slate-400">Test your knowledge with bite-sized practice problems.</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

      <div className="space-y-6">
        {filteredProblems.length === 0 ? (
          <div className="text-center p-8 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-lg">
            No practice problems available for this topic yet.
          </div>
        ) : (
          filteredProblems.map((problem) => (
            <div key={problem.id} className="relative">
              {completedProblems.has(problem.id) && (
                <div className="absolute -top-3 -right-3 z-10 text-2xl" title="Completed">✅</div>
              )}
              <QuestionCard 
                question={problem} 
                onSubmit={(isCorrect) => handleAnswerSubmit(problem.id, isCorrect, problem.xpReward)}
                showFeedbackImmediately={true}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Practice;
