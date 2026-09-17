import React from 'react';

const ProgressBar = ({
  value = 0,
  label,
  showPercent = true,
  color = 'blue',
  size = 'md'
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-emerald-500',
    cyan: 'bg-cyan-500',
    purple: 'bg-purple-500',
  };

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>}
          {showPercent && <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{Math.round(clampedValue)}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden ${sizes[size]}`}>
        <div
          className={`${colors[color]} h-full rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedValue}%` }}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
