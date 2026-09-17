import React, { useState } from 'react';
import Card from '../components/ui/Card';
import ProgressBar from '../components/ui/ProgressBar';
import LevelProgress from '../components/gamification/LevelProgress';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { useProgress } from '../context/ProgressContext';
import { achievements } from '../data/achievements';

const Progress = () => {
  const { progress, resetProgress } = useProgress();
  const [showResetModal, setShowResetModal] = useState(false);

  const handleReset = () => {
    resetProgress();
    setShowResetModal(false);
  };

  const totalCompletion = Math.round(
    (((progress?.modules?.jkFlipFlop?.completionRate || 0) + 
      (progress?.modules?.charCodes?.completionRate || 0)) / 2) || 0
  );

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Your Progress</h1>
          <p className="text-slate-600 dark:text-slate-400">Track your learning journey and achievements.</p>
        </div>
        <Button variant="danger" outline onClick={() => setShowResetModal(true)}>
          Reset Progress
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-2 flex flex-col justify-center items-center bg-slate-900 text-white shadow-xl border border-slate-700 relative overflow-hidden">
           <LevelProgress />
        </Card>
        
        <Card className="p-6 flex flex-col justify-center items-center text-center">
          <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-2">Overall Completion</h3>
          <div className="text-5xl font-bold text-blue-500 mb-4">{totalCompletion}%</div>
          <ProgressBar value={totalCompletion} color="bg-blue-500" className="w-full" />
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Module Progress</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-1 text-slate-700 dark:text-slate-300">
                <span>JK Flip-Flop</span>
                <span>{progress?.modules?.jkFlipFlop?.completionRate || 0}%</span>
              </div>
              <ProgressBar value={progress?.modules?.jkFlipFlop?.completionRate || 0} color="bg-blue-500" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1 text-slate-700 dark:text-slate-300">
                <span>Character Codes</span>
                <span>{progress?.modules?.charCodes?.completionRate || 0}%</span>
              </div>
              <ProgressBar value={progress?.modules?.charCodes?.completionRate || 0} color="bg-cyan-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Stats & Scores</h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
              <span className="text-slate-600 dark:text-slate-400">Quizzes Completed</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {Object.keys(progress?.quizScores || {}).length}
              </span>
            </li>
            <li className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
              <span className="text-slate-600 dark:text-slate-400">Challenges Won</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {progress?.completedChallenges?.length || 0}
              </span>
            </li>
          </ul>
        </Card>
      </div>

      <section>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Achievements</h3>
        {(!progress?.achievements || progress.achievements.length === 0) ? (
          <div className="text-center p-8 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400">
            No achievements yet. Keep learning to unlock them!
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {(achievements || []).map(achievement => {
              const isUnlocked = progress.achievements.includes(achievement.id);
              return (
                <div key={achievement.id} className={`flex flex-col items-center text-center p-4 rounded-xl border ${isUnlocked ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-60 grayscale'}`}>
                  <div className="text-4xl mb-2">{achievement.icon || '🏆'}</div>
                  <div className="font-semibold text-sm text-slate-800 dark:text-slate-200">{achievement.title}</div>
                  <div className="text-xs text-slate-500 mt-1">{achievement.description}</div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {showResetModal && (
        <Modal 
          isOpen={showResetModal} 
          onClose={() => setShowResetModal(false)}
          title="Reset All Progress?"
        >
          <div className="py-4 space-y-4">
            <p className="text-slate-600 dark:text-slate-300">
              Are you absolutely sure you want to reset all your progress? This will delete your XP, levels, quiz scores, and unlocked achievements.
            </p>
            <p className="text-red-500 font-semibold">This action cannot be undone.</p>
            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline" onClick={() => setShowResetModal(false)}>Cancel</Button>
              <Button variant="danger" onClick={handleReset}>Yes, Reset Everything</Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default Progress;
