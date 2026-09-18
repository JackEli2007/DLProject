import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useProgress } from '../context/ProgressContext';
import { jkLessons } from '../data/jkLessons';
import { charLessons } from '../data/charLessons';

const Learn = () => {
  const { progress } = useProgress();
  const navigate = useNavigate();

  const renderLessonCard = (lesson, moduleKey, index) => {
    const isCompleted = progress?.modules?.[moduleKey]?.completedLessons?.includes(lesson.id);
    const isUnlocked = index === 0 || progress?.modules?.[moduleKey]?.completedLessons?.includes(lesson.prerequisiteId) || true; // Simulating logic for unlocked

    return (
      <Card 
        key={lesson.id}
        className={`flex flex-col transition-all ${isUnlocked ? 'cursor-pointer hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500' : 'opacity-75 cursor-not-allowed grayscale'}`}
        onClick={() => {
          if (isUnlocked) {
            const path = moduleKey === 'jkFlipFlop' ? '/learn/jk-flipflop' : '/learn/char-codes';
            navigate(path);
          }
        }}
      >
        <div className="p-5 flex flex-col h-full">
          <div className="flex justify-between items-start mb-3">
            <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">Section {index + 1}</div>
            {isCompleted ? (
              <Badge variant="success">Completed</Badge>
            ) : !isUnlocked ? (
              <Badge variant="default">Locked 🔒</Badge>
            ) : (
              <Badge variant="primary">{lesson.difficulty || 'Beginner'}</Badge>
            )}
          </div>
          <h4 className="text-lg font-bold mb-2 text-slate-800 dark:text-slate-100">{lesson.title}</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 flex-1">{lesson.description}</p>
          <div className="mt-4 flex items-center justify-between text-xs font-medium text-amber-500">
            <span>+{lesson.xpReward || 50} XP</span>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-12">
      
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Learning Modules</h1>
        <p className="text-slate-600 dark:text-slate-400">Complete lessons in order to unlock new content and earn XP.</p>
      </div>

      <section>
        <div className="flex items-center gap-4 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">JK Flip-Flop & Race-Around Condition</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jkLessons?.map((lesson, idx) => renderLessonCard(lesson, 'jkFlipFlop', idx))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-4 mb-6">
          <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-lg">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Character Codes & Digital Representation</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {charLessons?.map((lesson, idx) => renderLessonCard(lesson, 'charCodes', idx))}
        </div>
      </section>

    </div>
  );
};

export default Learn;
