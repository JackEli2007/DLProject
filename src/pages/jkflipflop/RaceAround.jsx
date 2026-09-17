import React, { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import LEDIndicator from '../../components/simulation/LEDIndicator';
import { simulateRaceAround, getRaceAroundThreshold, wouldCauseRaceAround, getRaceAroundExplanation } from '../../simulations/raceAround';
import { useProgress } from '../../context/ProgressContext';
import { useToast } from '../../context/ToastContext';

export default function RaceAround() {
  const [pulseWidth, setPulseWidth] = useState(1.0);
  const [toggleSequence, setToggleSequence] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const { awardXP, unlockAchievement } = useProgress();
  const { success } = useToast();
  
  const propDelay = 10; // ns
  const threshold = getRaceAroundThreshold(propDelay);
  const isRacing = wouldCauseRaceAround(pulseWidth * propDelay, propDelay);

  const handleApplyPulse = () => {
    const result = simulateRaceAround(pulseWidth * propDelay, propDelay, currentQ);
    setToggleSequence(result.sequence);
    setCurrentQ(result.finalQ);
    
    if (result.toggleCount > 1) {
      success('Race-Around Detected! +50 XP');
      awardXP(50);
      unlockAchievement('race-detector');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
      <h1 className="text-3xl font-bold text-slate-100">Race-Around Condition</h1>
      
      <Card className="p-6 bg-slate-800/80">
        <h2 className="text-xl font-bold text-slate-200 mb-2">What is Race-Around?</h2>
        <p className="text-slate-300">
          {getRaceAroundExplanation()}
        </p>
      </Card>

      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-4">Discovery Challenge</h3>
              <p className="text-slate-400 text-sm mb-4">
                J=1, K=1. Increase the clock pulse width until you observe repeated toggling during a single pulse.
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Pulse Width: {(pulseWidth * propDelay).toFixed(1)} ns</span>
                  <span className="text-slate-400">Prop Delay: {propDelay} ns</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="5.0" 
                  step="0.1" 
                  value={pulseWidth} 
                  onChange={(e) => setPulseWidth(parseFloat(e.target.value))}
                  className="w-full accent-blue-500"
                />
                
                <div className="h-2 rounded-full overflow-hidden flex mt-2 bg-slate-700">
                  <div className="bg-green-500 h-full" style={{ width: `${(threshold / 5) * 100}%` }}></div>
                  <div className="bg-red-500 h-full flex-1"></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Safe Zone</span>
                  <span>Danger Zone (Race-Around)</span>
                </div>
              </div>
            </div>

            <Button onClick={handleApplyPulse} className="w-full">Apply Pulse</Button>
          </div>

          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 flex flex-col items-center justify-center space-y-6">
            <LEDIndicator value={currentQ} label="Current Q" size="lg" />
            
            {toggleSequence.length > 0 && (
              <div className="w-full text-center space-y-2">
                <div className="text-sm text-slate-400">
                  Toggle sequence during pulse:
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {toggleSequence.map((val, idx) => (
                    <div key={idx} className="flex items-center">
                      {idx > 0 && <span className="text-slate-600 mx-1">→</span>}
                      <span className={`w-8 h-8 flex items-center justify-center rounded font-bold ${val === 1 ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'}`}>
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="text-sm font-semibold mt-4 text-slate-300">
                  Toggled {toggleSequence.length - 1} times
                </div>
                {isRacing && <div className="text-red-400 font-bold animate-pulse mt-2">RACE-AROUND DETECTED!</div>}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
