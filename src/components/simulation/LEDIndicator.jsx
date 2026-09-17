import React from 'react';

const LEDIndicator = ({ value, label, size = 'md' }) => {
  const isHigh = value === 1;

  const sizes = {
    sm: { outer: 'w-6 h-6', inner: 'w-4 h-4', text: 'text-xs' },
    md: { outer: 'w-10 h-10', inner: 'w-6 h-6', text: 'text-sm' },
    lg: { outer: 'w-16 h-16', inner: 'w-10 h-10', text: 'text-base' }
  };

  const currentSize = sizes[size];
  
  const glowClass = isHigh 
    ? 'bg-emerald-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]' 
    : 'bg-red-500 shadow-none opacity-80';
    
  const borderClass = isHigh ? 'border-emerald-700' : 'border-red-800';
  const textClass = isHigh ? 'text-emerald-500' : 'text-red-500';

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div 
        className={`relative rounded-full border-2 bg-slate-800 flex items-center justify-center transition-all duration-300 ${currentSize.outer} ${borderClass}`}
        role="status"
        aria-label={`${label || 'LED'} is ${isHigh ? 'HIGH' : 'LOW'}`}
      >
        <div className={`rounded-full transition-all duration-300 ${currentSize.inner} ${glowClass}`} />
        <span className={`absolute inset-0 flex items-center justify-center font-bold text-white z-10 ${currentSize.text} drop-shadow-md`}>
          {value}
        </span>
      </div>
      
      {label && (
        <div className="text-center">
          <span className="block font-medium text-slate-700 dark:text-slate-300">{label}</span>
          <span className={`block font-bold ${textClass} ${currentSize.text}`}>
            {isHigh ? 'HIGH' : 'LOW'}
          </span>
        </div>
      )}
    </div>
  );
};

export default LEDIndicator;
