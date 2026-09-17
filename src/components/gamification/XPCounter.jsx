import React, { useState, useEffect } from 'react';

const XPCounter = ({ xp = 0, recentGain = 0 }) => {
  const [displayXp, setDisplayXp] = useState(xp);
  const [showGain, setShowGain] = useState(false);

  useEffect(() => {
    if (recentGain > 0) {
      setShowGain(true);
      
      // Simple counting animation
      let start = displayXp;
      const end = xp;
      const duration = 1000;
      const startTime = performance.now();
      
      const animate = (time) => {
        const progress = Math.min((time - startTime) / duration, 1);
        setDisplayXp(Math.floor(start + (end - start) * progress));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
      
      const timer = setTimeout(() => setShowGain(false), 2000);
      return () => clearTimeout(timer);
    } else {
      setDisplayXp(xp);
    }
  }, [xp, recentGain]);

  return (
    <div className="relative inline-flex flex-col items-center">
      <div className="flex items-center gap-1.5 bg-purple-100 dark:bg-purple-900/30 px-3 py-1.5 rounded-full border border-purple-200 dark:border-purple-800/50 text-purple-700 dark:text-purple-300 font-bold shadow-sm">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
        <span className="font-mono">{displayXp.toLocaleString()}</span>
        <span className="text-xs uppercase tracking-wide opacity-80">XP</span>
      </div>
      
      {/* Floating gain animation */}
      <div className={`absolute -top-6 right-0 text-emerald-500 font-bold transition-all duration-700 pointer-events-none
        ${showGain ? 'opacity-100 -translate-y-4' : 'opacity-0 translate-y-0'}`}
      >
        +{recentGain}
      </div>
    </div>
  );
};

export default XPCounter;
