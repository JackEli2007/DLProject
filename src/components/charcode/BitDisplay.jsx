import React from 'react';

const BitDisplay = ({ bits = '00000000', highlightBits = [], label, size = 'md' }) => {
  const bitArray = bits.split('');
  
  const sizes = {
    sm: 'w-6 h-8 text-sm',
    md: 'w-8 h-10 text-base',
    lg: 'w-10 h-12 text-lg'
  };

  return (
    <div className="flex flex-col items-center">
      {label && <span className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-400">{label}</span>}
      <div className="flex flex-col items-center gap-1">
        <div className="flex gap-1">
          {bitArray.map((_, i) => (
            <span key={`pos-${i}`} className="w-8 text-center text-xs text-slate-400 font-mono">
              {7 - i}
            </span>
          ))}
        </div>
        <div className="flex gap-1">
          {bitArray.map((bit, i) => {
            const isHigh = bit === '1';
            const isHighlighted = highlightBits.includes(i);
            
            return (
              <div 
                key={`bit-${i}`}
                className={`
                  flex items-center justify-center font-mono font-bold rounded border transition-colors duration-200
                  ${sizes[size]}
                  ${isHigh ? 'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-700/50' : 'bg-slate-100 text-slate-400 border-slate-200 dark:bg-slate-800 dark:text-slate-500 dark:border-slate-700'}
                  ${isHighlighted ? 'ring-2 ring-purple-500 ring-offset-1 dark:ring-offset-slate-900' : ''}
                `}
                aria-label={`Bit position ${7 - i}: ${bit}`}
              >
                {bit}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BitDisplay;
