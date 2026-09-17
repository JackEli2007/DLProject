import React from 'react';

const ToggleSwitch = ({
  checked = false,
  onChange,
  label,
  disabled = false,
  size = 'md',
  showValue = true
}) => {
  const sizes = {
    sm: { width: 'w-10', height: 'h-5', thumb: 'w-4 h-4', translate: 'translate-x-5', text: 'text-xs' },
    md: { width: 'w-14', height: 'h-7', thumb: 'w-6 h-6', translate: 'translate-x-7', text: 'text-sm' },
    lg: { width: 'w-16', height: 'h-8', thumb: 'w-7 h-7', translate: 'translate-x-8', text: 'text-base' }
  };

  const currentSize = sizes[size];

  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(!checked);
    }
  };

  return (
    <label className={`inline-flex items-center ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
      {label && <span className={`mr-3 font-medium text-slate-700 dark:text-slate-300 ${currentSize.text}`}>{label}</span>}
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
          aria-checked={checked}
          role="switch"
        />
        <div 
          className={`block ${currentSize.width} ${currentSize.height} rounded-full transition-colors duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
            checked ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
          }`}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={handleKeyDown}
        >
          {showValue && (
            <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
              <span className={`text-white font-bold ${currentSize.text} ${checked ? 'opacity-100' : 'opacity-0'}`}>1</span>
              <span className={`text-slate-500 dark:text-slate-400 font-bold ${currentSize.text} ${!checked ? 'opacity-100' : 'opacity-0'}`}>0</span>
            </div>
          )}
          <div
            className={`absolute left-0.5 top-0.5 bg-white rounded-full transition-transform duration-200 ease-in-out shadow-sm ${currentSize.thumb} ${
              checked ? currentSize.translate : 'translate-x-0'
            }`}
          />
        </div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
