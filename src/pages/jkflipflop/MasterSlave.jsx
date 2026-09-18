import React, { useState, useEffect, useRef, useCallback } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import ClockControl from '../../components/simulation/ClockControl';
import { createMasterSlaveJK, fullClockCycle, clockHigh, clockLow } from '../../simulations/masterSlave';
import TimingDiagram from '../../components/simulation/TimingDiagram';
import LEDIndicator from '../../components/simulation/LEDIndicator';

/* ─── Live Master-Slave SVG Diagram ─── */
const MasterSlaveSVG = ({ clock, j, k, masterQ, masterQBar, slaveQ, slaveQBar, phase }) => {
  const w = 620, h = 260;
  const active = (v) => v === 1 ? '#22c55e' : '#64748b';
  const jColor = j === 1 ? '#3b82f6' : '#64748b';
  const kColor = k === 1 ? '#ec4899' : '#64748b';
  const clkColor = clock === 1 ? '#f59e0b' : '#64748b';
  const invClkColor = clock === 0 ? '#f59e0b' : '#64748b';

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
      {/* Background */}
      <rect width={w} height={h} rx="12" fill="#0f172a" />

      {/* ─── MASTER Box ─── */}
      <rect x={120} y={40} width={140} height={130} rx="8"
        fill={phase === 'high' ? '#1e3a5f' : '#1e293b'}
        stroke={phase === 'high' ? '#3b82f6' : '#334155'} strokeWidth="2" />
      <text x={190} y={65} textAnchor="middle" fill={phase === 'high' ? '#60a5fa' : '#94a3b8'}
        fontSize="14" fontWeight="bold">MASTER</text>
      <text x={190} y={82} textAnchor="middle" fill="#64748b" fontSize="10">
        {phase === 'high' ? '● ACTIVE' : '○ LOCKED'}
      </text>

      {/* Master internal state */}
      <text x={155} y={115} textAnchor="middle" fill="#94a3b8" fontSize="11">Qm</text>
      <rect x={170} y={100} width={40} height={28} rx="4"
        fill={masterQ === 1 ? '#166534' : '#7f1d1d'} stroke={masterQ === 1 ? '#22c55e' : '#ef4444'} strokeWidth="1.5" />
      <text x={190} y={119} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">{masterQ}</text>

      {/* ─── SLAVE Box ─── */}
      <rect x={360} y={40} width={140} height={130} rx="8"
        fill={phase === 'falling' ? '#1a3a2a' : '#1e293b'}
        stroke={phase === 'falling' ? '#22c55e' : '#334155'} strokeWidth="2" />
      <text x={430} y={65} textAnchor="middle" fill={phase === 'falling' ? '#4ade80' : '#94a3b8'}
        fontSize="14" fontWeight="bold">SLAVE</text>
      <text x={430} y={82} textAnchor="middle" fill="#64748b" fontSize="10">
        {phase === 'falling' ? '● ACTIVE' : '○ LOCKED'}
      </text>

      {/* Slave internal state */}
      <text x={395} y={115} textAnchor="middle" fill="#94a3b8" fontSize="11">Qs</text>
      <rect x={410} y={100} width={40} height={28} rx="4"
        fill={slaveQ === 1 ? '#166534' : '#7f1d1d'} stroke={slaveQ === 1 ? '#22c55e' : '#ef4444'} strokeWidth="1.5" />
      <text x={430} y={119} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">{slaveQ}</text>

      {/* ─── Input Lines ─── */}
      {/* J */}
      <line x1={30} y1={80} x2={120} y2={80} stroke={jColor} strokeWidth="2" />
      <text x={20} y={84} textAnchor="end" fill={j === 1 ? '#60a5fa' : '#64748b'} fontSize="12" fontWeight="bold">J={j}</text>
      <text x={125} y={76} fill="#64748b" fontSize="9">J</text>

      {/* K */}
      <line x1={30} y1={140} x2={120} y2={140} stroke={kColor} strokeWidth="2" />
      <text x={20} y={144} textAnchor="end" fill={k === 1 ? '#f472b6' : '#64748b'} fontSize="12" fontWeight="bold">K={k}</text>
      <text x={125} y={136} fill="#64748b" fontSize="9">K</text>

      {/* ─── Master → Slave Connection ─── */}
      <line x1={260} y1={110} x2={360} y2={110} stroke={active(masterQ)} strokeWidth="2.5"
        strokeDasharray={phase === 'falling' ? '0' : '5 3'} />
      <polygon points="355,105 365,110 355,115" fill={active(masterQ)} />
      <text x={310} y={102} textAnchor="middle" fill="#94a3b8" fontSize="9">Qm → Js</text>

      {/* ─── Clock Lines ─── */}
      {/* Clock to Master */}
      <line x1={190} y1={230} x2={190} y2={170} stroke={clkColor} strokeWidth="2" />
      <polygon points="185,175 195,175 190,168" fill={clkColor} />
      <text x={190} y={245} textAnchor="middle" fill={clkColor} fontSize="11" fontWeight="bold">CLK: {clock}</text>

      {/* Clock to Slave (inverted) */}
      <line x1={190} y1={230} x2={430} y2={230} stroke={clkColor} strokeWidth="1.5" strokeDasharray="4 2" />
      {/* Inverter symbol */}
      <polygon points="415,225 425,230 415,235" fill="#64748b" stroke="#94a3b8" strokeWidth="1" />
      <circle cx={428} cy={230} r="4" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1={432} y1={230} x2={432} y2={170} stroke={invClkColor} strokeWidth="2" />
      <polygon points="427,175 437,175 432,168" fill={invClkColor} />
      <text x={432} y={245} textAnchor="middle" fill={invClkColor} fontSize="10">CLK̅</text>

      {/* ─── Output Lines ─── */}
      <line x1={500} y1={90} x2={580} y2={90} stroke={active(slaveQ)} strokeWidth="2.5" />
      <text x={590} y={94} fill={active(slaveQ)} fontSize="12" fontWeight="bold">Q={slaveQ}</text>

      <line x1={500} y1={140} x2={580} y2={140} stroke={active(slaveQBar)} strokeWidth="2.5" />
      <text x={590} y={144} fill={active(slaveQBar)} fontSize="12" fontWeight="bold">Q̅={slaveQBar}</text>

      {/* ─── Output LEDs ─── */}
      <circle cx={570} cy={90} r="6" fill={slaveQ === 1 ? '#22c55e' : '#374151'} 
        stroke={slaveQ === 1 ? '#22c55e' : '#4b5563'} strokeWidth="1" />
      <circle cx={570} cy={140} r="6" fill={slaveQBar === 1 ? '#ef4444' : '#374151'}
        stroke={slaveQBar === 1 ? '#ef4444' : '#4b5563'} strokeWidth="1" />

      {/* Phase indicator */}
      <rect x={220} y={10} width={180} height={24} rx="12" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <text x={310} y={26} textAnchor="middle" fill={phase === 'high' ? '#60a5fa' : phase === 'falling' ? '#4ade80' : '#94a3b8'}
        fontSize="11" fontWeight="bold">
        {phase === 'high' ? '⚡ CLK HIGH → Master Active' : phase === 'falling' ? '⚡ CLK LOW → Slave Active' : '● Idle — Press STEP'}
      </text>
    </svg>
  );
};

/* ─── Main Component ─── */
export default function MasterSlave() {
  const [levelFF, setLevelFF] = useState({ q: 0, qBar: 1 });
  const [msFF, setMsFF] = useState(createMasterSlaveJK());
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [phase, setPhase] = useState('idle');
  const [history, setHistory] = useState({ clock: [0], levelQ: [0], msQ: [0], masterQ: [0] });
  const [j, setJ] = useState(1);
  const [k, setK] = useState(1);
  
  const timerRef = useRef(null);

  const step = useCallback(() => {
    // Phase 1: Clock HIGH — Master captures input
    setPhase('high');
    const afterHigh = clockHigh(msFF, j, k);

    // Level-triggered races around if J=1, K=1. Otherwise it's stable.
    let currentLevelQ = levelFF.q;
    if (j === 1 && k === 1) {
       for(let i=0; i<3; i++) currentLevelQ = currentLevelQ === 1 ? 0 : 1;
    } else if (j === 1 && k === 0) {
       currentLevelQ = 1;
    } else if (j === 0 && k === 1) {
       currentLevelQ = 0;
    }

    setTimeout(() => {
      // Phase 2: Clock LOW — Slave captures master
      setPhase('falling');
      const afterLow = clockLow(afterHigh);
      
      setMsFF(afterLow);
      setLevelFF({ q: currentLevelQ, qBar: currentLevelQ === 1 ? 0 : 1 });
      
      setHistory(prev => ({
        clock: [...prev.clock, 1, 0].slice(-30),
        levelQ: [...prev.levelQ, currentLevelQ, currentLevelQ].slice(-30),
        msQ: [...prev.msQ, afterLow.slave.q, afterLow.slave.q].slice(-30),
        masterQ: [...prev.masterQ, afterHigh.master.q, afterLow.master.q].slice(-30)
      }));

      setTimeout(() => setPhase('idle'), speed / 3);
    }, speed / 2);
  }, [levelFF, msFF, speed, j, k]);

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
    setPhase('idle');
    setLevelFF({ q: 0, qBar: 1 });
    setMsFF(createMasterSlaveJK());
    setHistory({ clock: [0], levelQ: [0], msQ: [0], masterQ: [0] });
  };

  const getModeLabel = () => {
    if (j === 0 && k === 0) return 'HOLD';
    if (j === 1 && k === 0) return 'SET';
    if (j === 0 && k === 1) return 'RESET';
    return 'TOGGLE';
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-100">Master-Slave Comparison Lab</h1>
        <div className="flex gap-4">
          <button 
            onClick={() => setJ(j === 1 ? 0 : 1)}
            className={`px-4 py-2 rounded-lg font-bold border-2 transition-colors ${j === 1 ? 'bg-blue-900 border-blue-500 text-blue-100' : 'bg-slate-800 border-slate-600 text-slate-400'}`}
          >
            J = {j}
          </button>
          <button 
            onClick={() => setK(k === 1 ? 0 : 1)}
            className={`px-4 py-2 rounded-lg font-bold border-2 transition-colors ${k === 1 ? 'bg-pink-900 border-pink-500 text-pink-100' : 'bg-slate-800 border-slate-600 text-slate-400'}`}
          >
            K = {k}
          </button>
          <Badge variant="warning">{getModeLabel()} Mode</Badge>
        </div>
      </div>

      {/* Real-Life Example */}
      <Card className="p-5 bg-gradient-to-r from-slate-800 to-slate-900 border-l-4 border-l-amber-500">
        <h3 className="text-lg font-bold text-amber-400 mb-2">🏭 Real-Life Example: Industrial Safety Interlock</h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          In factories, safety interlocks use flip-flops to ensure machines stop when a guard is opened. 
          If a <span className="text-red-400 font-semibold">level-triggered</span> latch is used and the clock pulse is too long, 
          the race-around condition could cause the safety signal to oscillate — the machine might briefly restart during the "guard open" state. 
          A <span className="text-green-400 font-semibold">Master-Slave</span> design ensures the output changes exactly <strong>once</strong> per clock cycle, 
          making the interlock reliable and safe.
        </p>
      </Card>

      {/* Live SVG Diagram */}
      <Card className="p-4 bg-slate-950 border border-slate-700">
        <h2 className="text-lg font-bold text-slate-200 mb-3 text-center">🔌 Live Master-Slave Circuit Diagram</h2>
        <MasterSlaveSVG
          clock={phase === 'high' ? 1 : 0}
          j={j}
          k={k}
          masterQ={msFF.master.q}
          masterQBar={msFF.master.qBar}
          slaveQ={msFF.slave.q}
          slaveQBar={msFF.slave.qBar}
          phase={phase}
        />
      </Card>

      {/* Side-by-side comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border-2 border-red-500/30">
          <h2 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            Level-Triggered JK (Broken)
          </h2>
          <div className="bg-slate-900 rounded-lg p-6 flex flex-col items-center justify-center border border-slate-700">
            <LEDIndicator value={levelFF.q} label="Q Output" size="lg" />
            <div className="text-red-400 text-sm animate-pulse mt-4 font-semibold">
              ⚠ Toggles 3× per pulse (Unpredictable!)
            </div>
          </div>
        </Card>

        <Card className="p-6 border-2 border-green-500/30">
          <h2 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            Master-Slave JK (Correct)
          </h2>
          <div className="bg-slate-900 rounded-lg p-6 flex flex-col items-center justify-center border border-slate-700">
            <div className="flex gap-6 items-center">
              <div className="text-center">
                <div className="text-xs text-blue-400 mb-1 font-semibold">Master</div>
                <LEDIndicator value={msFF.master.q} label="" size="md" />
              </div>
              <div className="text-slate-500 text-2xl">→</div>
              <div className="text-center">
                <div className="text-xs text-green-400 mb-1 font-semibold">Slave (Output)</div>
                <LEDIndicator value={msFF.slave.q} label="" size="md" />
              </div>
            </div>
            <div className="text-green-400 text-sm mt-4 font-semibold">
              ✓ Toggles exactly 1× per cycle (Predictable!)
            </div>
          </div>
        </Card>
      </div>
      
      {/* Clock Control */}
      <Card className="p-6">
        <ClockControl 
          onStep={step} onStart={() => setIsRunning(true)} 
          onStop={() => setIsRunning(false)} onReset={handleReset}
          isRunning={isRunning} speed={speed} onSpeedChange={setSpeed}
        />
      </Card>

      {/* Timing Diagram */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-slate-200 mb-4">📊 Live Timing Diagram</h2>
        <div className="h-64">
          <TimingDiagram 
            signals={[
              { name: 'CLK', data: history.clock, color: '#f59e0b' },
              { name: 'Master Q', data: history.masterQ, color: '#3b82f6' },
              { name: 'Level Q ✗', data: history.levelQ, color: '#ef4444' },
              { name: 'MS Q ✓', data: history.msQ, color: '#22c55e' }
            ]}
            maxSteps={30}
          />
        </div>
      </Card>

      {/* How it works explanation */}
      <Card className="p-6 bg-slate-800/80">
        <h3 className="text-xl font-bold text-slate-200 mb-4">📖 How Master-Slave Solves Race-Around</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="text-blue-400 font-bold mb-2">Step 1: CLK = HIGH</div>
            <p className="text-slate-300 text-sm">Master captures J & K inputs. Slave is <strong>locked</strong> — output does NOT change yet.</p>
          </div>
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <div className="text-amber-400 font-bold mb-2">Step 2: CLK goes LOW</div>
            <p className="text-slate-300 text-sm">Master is <strong>locked</strong>. Slave copies Master's state → Output Q changes <strong>once</strong>.</p>
          </div>
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="text-green-400 font-bold mb-2">Result: No Race!</div>
            <p className="text-slate-300 text-sm">Because Master and Slave are <strong>never active simultaneously</strong>, continuous toggling is impossible.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
