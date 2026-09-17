import React from 'react';

const LevelProgress = ({ level = 1, xpProgress = 0, xpCurrent = 0, xpNext = 100 }) => {
  const progressPercent = Math.min(100, Math.max(0, xpProgress));
  
  return (
    <div className="flex items-center gap-3 w-full max-w-xs">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white dark:ring-slate-800 z-10 flex-shrink-0">
        {level}
      </div>
      
      <div className="flex-1 -ml-6 pl-6 bg-slate-100 dark:bg-slate-800 rounded-r-full h-8 relative flex items-center">
        {/* Track */}
        <div className="absolute inset-y-0 left-5 right-1 rounded-full overflow-hidden p-1">
          <div className="w-full h-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-500 transition-all duration-700 ease-out rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        
        {/* Tooltip / Text Overlay (optional, visually hidden but accessible) */}
        <div className="sr-only">
          Level {level}. Progress: {xpCurrent} out of {xpNext} XP.
        </div>
      </div>
    </div>
  );
};

export default LevelProgress;
