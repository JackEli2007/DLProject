import React from 'react';
import Button from '../ui/Button';

const ClockControl = ({
  onStep,
  onStart,
  onStop,
  onReset,
  isRunning,
  speed,
  onSpeedChange
}) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Clock Control</h3>
        <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} aria-label={isRunning ? 'Clock Running' : 'Clock Stopped'} />
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={onStep} 
          disabled={isRunning}
          ariaLabel="Single Clock Step"
        >
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          STEP
        </Button>
        
        {isRunning ? (
          <Button variant="danger" size="sm" onClick={onStop} ariaLabel="Stop Clock" className="flex-1">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="6" width="12" height="12" />
            </svg>
            STOP
          </Button>
        ) : (
          <Button variant="primary" size="sm" onClick={onStart} ariaLabel="Start Clock" className="flex-1">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            START
          </Button>
        )}
        
        <Button variant="ghost" size="sm" onClick={onReset} ariaLabel="Reset Simulation">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </Button>
      </div>

      <div className="mt-2">
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
          <span>SLOW</span>
          <span>SPEED</span>
          <span>FAST</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={speed}
          onChange={(e) => onSpeedChange(parseInt(e.target.value))}
          className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
          aria-label="Clock Speed"
        />
      </div>
    </div>
  );
};

export default ClockControl;
