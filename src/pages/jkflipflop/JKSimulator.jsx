import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createJKFlipFlop, clockPulse, getConditionName, getTruthTable, getCharacteristicEquation } from '../../simulations/jkFlipFlop';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import ToggleSwitch from '../../components/ui/ToggleSwitch';
import Badge from '../../components/ui/Badge';
import CircuitDiagram from '../../components/simulation/CircuitDiagram';
import ClockControl from '../../components/simulation/ClockControl';
import LEDIndicator from '../../components/simulation/LEDIndicator';
import TruthTable from '../../components/simulation/TruthTable';
import TimingDiagram from '../../components/simulation/TimingDiagram';

export default function JKSimulator() {
  const [flipFlop, setFlipFlop] = useState(createJKFlipFlop());
  const [j, setJ] = useState(0);
  const [k, setK] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [history, setHistory] = useState({ clock: [0], j: [0], k: [0], q: [0], qBar: [1] });
  const [clockHigh, setClockHigh] = useState(false);
  const [animateSignal, setAnimateSignal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const timerRef = useRef(null);

  const step = useCallback(() => {
    setClockHigh(true);
    setAnimateSignal(true);
    
    setTimeout(() => {
      const result = clockPulse(flipFlop, j, k);
      setFlipFlop(result);
      
      setHistory(prev => {
        const newClock = [...prev.clock, 1, 0].slice(-30);
        const newJ = [...prev.j, j, j].slice(-30);
        const newK = [...prev.k, k, k].slice(-30);
        const newQ = [...prev.q, result.q, result.q].slice(-30);
        const newQBar = [...prev.qBar, result.qBar, result.qBar].slice(-30);
        
        return { clock: newClock, j: newJ, k: newK, q: newQ, qBar: newQBar };
      });
      
      setTimeout(() => {
        setClockHigh(false);
        setAnimateSignal(false);
      }, speed / 3);
    }, speed / 3);
  }, [flipFlop, j, k, speed]);

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
    setFlipFlop(createJKFlipFlop());
    setHistory({ clock: [0], j: [0], k: [0], q: [0], qBar: [1] });
    setJ(0);
    setK(0);
  };

  const handleDemo = async () => {
    handleReset();
    const sequence = [
      { j: 1, k: 0 },
      { j: 0, k: 0 },
      { j: 0, k: 1 },
      { j: 1, k: 1 },
      { j: 1, k: 1 },
      { j: 1, k: 1 },
    ];
    
    let currentJ = 0;
    let currentK = 0;
    let currentFF = createJKFlipFlop();
    
    for (const stepConfig of sequence) {
      setJ(stepConfig.j);
      setK(stepConfig.k);
      currentJ = stepConfig.j;
      currentK = stepConfig.k;
      
      await new Promise(r => setTimeout(r, 500));
      setClockHigh(true);
      setAnimateSignal(true);
      
      await new Promise(r => setTimeout(r, 500));
      currentFF = clockPulse(currentFF, currentJ, currentK);
      setFlipFlop(currentFF);
      
      setHistory(prev => ({
        clock: [...prev.clock, 1, 0].slice(-30),
        j: [...prev.j, currentJ, currentJ].slice(-30),
        k: [...prev.k, currentK, currentK].slice(-30),
        q: [...prev.q, currentFF.q, currentFF.q].slice(-30),
        qBar: [...prev.qBar, currentFF.qBar, currentFF.qBar].slice(-30)
      }));
      
      await new Promise(r => setTimeout(r, 500));
      setClockHigh(false);
      setAnimateSignal(false);
    }
  };

  const conditionName = getConditionName(j, k);
  
  const getBadgeColor = (cond) => {
    switch(cond) {
      case 'HOLD': return 'info';
      case 'RESET': return 'danger';
      case 'SET': return 'success';
      case 'TOGGLE': return 'warning';
      default: return 'info';
    }
  };

  return (
    <div className={`p-4 md:p-8 flex flex-col gap-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 overflow-y-auto' : 'max-w-7xl mx-auto'}`}>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-100">JK Flip-Flop Simulator</h1>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleDemo}>Demo Sequence</Button>
          <Button variant="secondary" onClick={() => setIsFullscreen(!isFullscreen)}>
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel */}
        <Card className="p-6 flex flex-col gap-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-slate-200">Circuit & Controls</h2>
            <Badge variant={getBadgeColor(conditionName)}>{conditionName}</Badge>
          </div>

          <div className="flex justify-around items-center bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
            <div className="flex flex-col gap-6">
              <ToggleSwitch label="J Input" checked={j === 1} onChange={(val) => setJ(val ? 1 : 0)} />
              <ToggleSwitch label="K Input" checked={k === 1} onChange={(val) => setK(val ? 1 : 0)} />
            </div>
            
            <div className="flex-1 max-w-xs mx-4">
              <CircuitDiagram 
                j={j} k={k} clock={clockHigh ? 1 : 0} 
                q={flipFlop.q} qBar={flipFlop.qBar} 
                animateSignal={animateSignal} 
              />
            </div>
            
            <div className="flex flex-col gap-6">
              <LEDIndicator value={flipFlop.q} label="Q" size="lg" />
              <LEDIndicator value={flipFlop.qBar} label="Q̅" size="lg" />
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-slate-700">
            <ClockControl 
              onStep={step} onStart={() => setIsRunning(true)} 
              onStop={() => setIsRunning(false)} onReset={handleReset}
              isRunning={isRunning} speed={speed} onSpeedChange={setSpeed}
            />
          </div>
        </Card>

        {/* Right Panel */}
        <Card className="p-6 flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-slate-200">Behavior & Logic</h2>
          
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50 flex flex-col gap-2">
            <span className="text-sm text-slate-400">Characteristic Equation:</span>
            <code className="text-lg text-cyan-400 text-center block font-mono">
              {getCharacteristicEquation()}
            </code>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { j: 0, k: 0, label: 'HOLD', desc: 'Q(next) = Q' },
              { j: 0, k: 1, label: 'RESET', desc: 'Q(next) = 0' },
              { j: 1, k: 0, label: 'SET', desc: 'Q(next) = 1' },
              { j: 1, k: 1, label: 'TOGGLE', desc: 'Q(next) = Q̅' }
            ].map(cond => {
              const active = j === cond.j && k === cond.k;
              return (
                <div 
                  key={cond.label}
                  onClick={() => { setJ(cond.j); setK(cond.k); }}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    active ? 'bg-blue-600/20 border-blue-500' : 'bg-slate-800 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <div className="font-bold text-slate-200">J={cond.j} K={cond.k} <span className="text-xs text-slate-400 ml-1">{cond.label}</span></div>
                  <div className="text-sm text-slate-400 mt-1">{cond.desc}</div>
                </div>
              );
            })}
          </div>

          <div className="flex-1 overflow-auto">
             <TruthTable 
               columns={['J', 'K', 'Q(t)', 'Q(t+1)', 'Condition']}
               rows={getTruthTable()}
               highlightRow={(row) => row.j === j && row.k === k && row.q === flipFlop.q}
               onRowClick={(row) => { setJ(row.j); setK(row.k); }}
             />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold text-slate-200 mb-4">Timing Diagram</h2>
        <div className="h-64">
          <TimingDiagram 
            signals={[
              { name: 'CLK', data: history.clock, color: '#f59e0b' },
              { name: 'J', data: history.j, color: '#3b82f6' },
              { name: 'K', data: history.k, color: '#ec4899' },
              { name: 'Q', data: history.q, color: '#22c55e' },
              { name: 'Q̅', data: history.qBar, color: '#ef4444' }
            ]}
            maxSteps={30}
          />
        </div>
      </Card>
    </div>
  );
}
