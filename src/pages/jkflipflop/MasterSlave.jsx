import React, { useState, useEffect, useRef, useCallback } from 'react';
import Card from '../../components/ui/Card';
import ClockControl from '../../components/simulation/ClockControl';
import { createMasterSlaveJK, fullClockCycle, getMasterSlaveExplanation } from '../../simulations/masterSlave';
import { clockPulse } from '../../simulations/jkFlipFlop';
import TimingDiagram from '../../components/simulation/TimingDiagram';

export default function MasterSlave() {
  const [levelFF, setLevelFF] = useState({ q: 0, qBar: 1 });
  const [msFF, setMsFF] = useState(createMasterSlaveJK());
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [history, setHistory] = useState({ clock: [0], levelQ: [0], msQ: [0] });
  
  const timerRef = useRef(null);

  const step = useCallback(() => {
    // Level triggered races around 3 times in this demo
    let currentLevelQ = levelFF.q;
    for(let i=0; i<3; i++) currentLevelQ = currentLevelQ === 1 ? 0 : 1;
    setLevelFF({ q: currentLevelQ, qBar: currentLevelQ === 1 ? 0 : 1 });
    
    // Master-slave only toggles once
    const newMsFF = fullClockCycle(msFF, 1, 1);
    setMsFF(newMsFF);
    
    setHistory(prev => ({
      clock: [...prev.clock, 1, 0].slice(-30),
      levelQ: [...prev.levelQ, currentLevelQ, currentLevelQ].slice(-30),
      msQ: [...prev.msQ, newMsFF.q, newMsFF.q].slice(-30)
    }));
  }, [levelFF, msFF]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(step, speed);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, step, speed]);

  const handleReset = () => {
    setIsRunning(false);
    setLevelFF({ q: 0, qBar: 1 });
    setMsFF(createMasterSlaveJK());
    setHistory({ clock: [0], levelQ: [0], msQ: [0] });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
      <h1 className="text-3xl font-bold text-slate-100">Master-Slave Comparison Lab</h1>
      
      <Card className="p-6 bg-slate-800/80">
        <p className="text-slate-300">{getMasterSlaveExplanation()}</p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-bold text-red-400 mb-4">Level-Triggered JK</h2>
          <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center relative border border-slate-700">
             <div className="text-center space-y-4">
               <div className="text-4xl font-bold text-slate-200">Q = {levelFF.q}</div>
               <div className="text-red-400 text-sm animate-pulse">Race-around occurs during CLK=1</div>
             </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold text-green-400 mb-4">Master-Slave JK</h2>
          <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center relative border border-slate-700">
             <div className="flex gap-4 items-center">
               <div className="p-4 border border-blue-500/50 rounded bg-blue-500/10 text-center">
                 <div className="text-xs text-blue-400 mb-1">Master</div>
                 <div className="text-2xl font-bold text-slate-200">Qm = {msFF.master.q}</div>
               </div>
               <div className="text-slate-500">→</div>
               <div className="p-4 border border-green-500/50 rounded bg-green-500/10 text-center">
                 <div className="text-xs text-green-400 mb-1">Slave (Output)</div>
                 <div className="text-2xl font-bold text-slate-200">Q = {msFF.slave.q}</div>
               </div>
             </div>
          </div>
        </Card>
      </div>
      
      <Card className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="text-slate-300">Inputs: J=1, K=1 (Toggle Mode)</div>
          <ClockControl 
            onStep={step} onStart={() => setIsRunning(true)} 
            onStop={() => setIsRunning(false)} onReset={handleReset}
            isRunning={isRunning} speed={speed} onSpeedChange={setSpeed}
          />
        </div>

        <div className="h-64">
          <TimingDiagram 
            signals={[
              { name: 'CLK', data: history.clock, color: '#f59e0b' },
              { name: 'Level Q (Race)', data: history.levelQ, color: '#ef4444' },
              { name: 'MS Q (Clean)', data: history.msQ, color: '#22c55e' }
            ]}
            maxSteps={30}
          />
        </div>
      </Card>
    </div>
  );
}
