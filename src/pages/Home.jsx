import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ProgressBar from '../components/ui/ProgressBar';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import LevelProgress from '../components/gamification/LevelProgress';
import { useProgress } from '../context/ProgressContext';

const Home = () => {
  const { progress } = useProgress();
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('dll_onboarding_complete')) {
      setShowOnboarding(true);
    }
  }, []);

  const handleStartLearning = () => {
    localStorage.setItem('dll_onboarding_complete', 'true');
    setShowOnboarding(false);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 dark:text-slate-200">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-slate-900 text-white p-8 sm:p-12 shadow-xl border border-slate-700">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <circle cx="20%" cy="30%" r="2" fill="#38bdf8" className="animate-ping" />
            <circle cx="80%" cy="70%" r="2" fill="#22c55e" className="animate-ping" style={{ animationDelay: '1s' }} />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            Digital Logic — Learn It. Build It. Break It. Understand It.
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl">
            Dive into interactive simulation-based learning. Master JK Flip-Flops, Race-Around conditions, and Character Codes through hands-on experiments, real-time predictions, and practical challenges.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => navigate('/learn')} variant="primary" size="lg" className="font-semibold shadow-lg shadow-blue-500/30">
              Start Learning
            </Button>
            <Button onClick={() => navigate('/lab')} variant="secondary" size="lg" className="bg-slate-800 hover:bg-slate-700 text-white border-slate-600">
              Open Lab
            </Button>
          </div>
        </div>
      </section>

      {/* Gamification Summary */}
      <section className="flex flex-col sm:flex-row gap-6 items-center bg-slate-100 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
        <div className="flex-1 w-full">
           <LevelProgress />
        </div>
        
        {progress?.lastActivity && (
          <div className="w-full sm:w-auto shrink-0 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col items-start gap-2">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Continue Learning</span>
            <div className="font-semibold text-lg text-slate-800 dark:text-slate-100">{progress.lastActivity.lessonName || 'Last Lesson'}</div>
            <Button onClick={() => navigate(progress.lastActivity.path || '/learn')} variant="outline" size="sm" className="mt-1 w-full">
              Resume
            </Button>
          </div>
        )}
      </section>

      {/* Modules */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100">Course Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Module 1 */}
          <Card className="flex flex-col h-full hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer" onClick={() => navigate('/learn/jk-flipflop')}>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                   <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <Badge variant="warning">Intermediate</Badge>
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">Module 01: JK Flip-Flop & Race-Around Condition</h3>
              <p className="text-slate-600 dark:text-slate-400 flex-1 mb-6">
                Understand sequential logic, truth tables, timing diagrams, and the infamous race-around condition.
              </p>
              
              <div className="space-y-4 w-full mt-auto">
                <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                  <span>Progress</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {Math.round(progress?.modules?.jkFlipFlop?.completionRate || 0)}%
                  </span>
                </div>
                <ProgressBar value={progress?.modules?.jkFlipFlop?.completionRate || 0} color="bg-blue-500" />
                <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-700">
                  <span>⏱️ 2-3 Hours</span>
                  <span className="text-amber-500">🏆 500 XP Available</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Module 2 */}
          <Card className="flex flex-col h-full hover:border-cyan-400 dark:hover:border-cyan-500 transition-colors cursor-pointer" onClick={() => navigate('/learn/char-codes')}>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-xl">
                   <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
                </div>
                <Badge variant="success">Beginner</Badge>
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">Module 02: Character Codes & Digital Representation</h3>
              <p className="text-slate-600 dark:text-slate-400 flex-1 mb-6">
                Discover how computers represent text using ASCII, Unicode, and UTF-8 encodings.
              </p>
              
              <div className="space-y-4 w-full mt-auto">
                <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                  <span>Progress</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {Math.round(progress?.modules?.charCodes?.completionRate || 0)}%
                  </span>
                </div>
                <ProgressBar value={progress?.modules?.charCodes?.completionRate || 0} color="bg-cyan-500" />
                <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-700">
                  <span>⏱️ 1-2 Hours</span>
                  <span className="text-amber-500">🏆 350 XP Available</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Onboarding Modal */}
      {showOnboarding && (
        <Modal 
          isOpen={showOnboarding} 
          onClose={handleStartLearning}
          title="Welcome to Digital Logic Lab"
          size="md"
        >
          <div className="space-y-4 py-4 text-slate-600 dark:text-slate-300">
            <p>Ready to master digital logic concepts through hands-on practice?</p>
            <ul className="space-y-2 list-none p-0">
              <li className="flex items-center gap-2"><span>📖</span> <strong>Learn:</strong> Read concise, interactive lessons.</li>
              <li className="flex items-center gap-2"><span>🧪</span> <strong>Experiment:</strong> Use interactive simulators to see logic in action.</li>
              <li className="flex items-center gap-2"><span>🤔</span> <strong>Predict:</strong> Test your understanding before the circuit runs.</li>
              <li className="flex items-center gap-2"><span>🏆</span> <strong>Master:</strong> Complete quizzes and challenges to earn XP and level up.</li>
            </ul>
            <div className="pt-4 flex justify-end">
              <Button onClick={handleStartLearning} variant="primary">Let's Go!</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Home;
