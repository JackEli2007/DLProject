import React, { useEffect, useState } from 'react';

const AchievementPopup = ({ achievement, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      // Trigger entrance animation
      requestAnimationFrame(() => setIsVisible(true));
      
      // Auto-dismiss after 4 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for exit animation
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  if (!achievement) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 pointer-events-none flex flex-col gap-2">
      <div 
        className={`bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-700/50 shadow-xl rounded-xl p-4 flex items-center gap-4 min-w-[300px] transform transition-all duration-300 ease-out origin-bottom-right
          ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}`
        }
      >
        <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/40 text-amber-500 rounded-full flex items-center justify-center flex-shrink-0 animate-[bounce_1s_infinite]">
          {achievement.icon || (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a.75.75 0 01.67.41l2.09 4.22 4.67.68a.75.75 0 01.42 1.28l-3.38 3.3.8 4.65a.75.75 0 01-1.09.79L10 15.3l-4.18 2.2a.75.75 0 01-1.09-.79l.8-4.65-3.38-3.3a.75.75 0 01.42-1.28l4.67-.68 2.09-4.22A.75.75 0 0110 2z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <div>
          <p className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-0.5">Achievement Unlocked!</p>
          <h4 className="text-sm font-bold text-slate-800 dark:text-white">{achievement.title}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{achievement.description}</p>
        </div>
      </div>
    </div>
  );
};

export default AchievementPopup;
