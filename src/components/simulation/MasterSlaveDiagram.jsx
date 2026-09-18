import React from 'react';
import SignalLine from './SignalLine';

const MasterSlaveDiagram = ({ clock, j = 1, k = 1, masterQ, masterQBar, slaveQ, slaveQBar, animateSignal = false }) => {
  // Dimensions and layout
  const w = 600;
  const h = 250;
  
  // Box coordinates
  const boxW = 80;
  const boxH = 100;
  
  // Master Box
  const mbX = 150;
  const mbY = (h - boxH) / 2;
  
  // Slave Box
  const sbX = 350;
  const sbY = (h - boxH) / 2;
  
  // Input coords (J, K)
  const inStartX = 50;
  const jY = mbY + 25;
  const kY = mbY + 75;
  
  // Clock coords
  const clkStartX = 50;
  const clkStartY = h - 30;
  const clkLineY = h - 30;
  
  // Intermediate (Master Q/QBar -> Slave J/K)
  const mqY = mbY + 25;
  const mqbY = mbY + 75;
  
  // Output coords
  const outEndX = w - 50;
  const sqY = sbY + 25;
  const sqbY = sbY + 75;

  return (
    <div className="w-full mx-auto bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto drop-shadow-sm font-mono">
        
        {/* Signal Lines - Inputs to Master */}
        <SignalLine x1={inStartX} y1={jY} x2={mbX} y2={jY} active={j === 1} animated={animateSignal} label="J" />
        <SignalLine x1={inStartX} y1={kY} x2={mbX} y2={kY} active={k === 1} animated={animateSignal} label="K" />
        
        {/* Clock Line Main */}
        <SignalLine x1={clkStartX} y1={clkLineY} x2={sbX + boxW / 2} y2={clkLineY} active={clock === 1} animated={animateSignal} label="CLK" />
        
        {/* Clock to Master (Upwards) */}
        <SignalLine x1={mbX + boxW / 2} y1={clkLineY} x2={mbX + boxW / 2} y2={mbY + boxH} active={clock === 1} animated={animateSignal} />
        
        {/* Clock Inverter node (triangle + circle) */}
        <path d={`M ${sbX + boxW / 2 - 10} ${clkLineY} L ${sbX + boxW / 2 + 10} ${clkLineY} L ${sbX + boxW / 2} ${clkLineY - 15} Z`} className="fill-slate-300 dark:fill-slate-600 stroke-slate-500" />
        <circle cx={sbX + boxW / 2} cy={clkLineY - 20} r="4" className="fill-slate-100 dark:fill-slate-800 stroke-slate-500" />
        
        {/* Clock to Slave (Upwards from inverter) */}
        <SignalLine x1={sbX + boxW / 2} y1={clkLineY - 24} x2={sbX + boxW / 2} y2={sbY + boxH} active={clock === 0} animated={animateSignal} />
        
        {/* Intermediate Lines (Master Q -> Slave J) */}
        <SignalLine x1={mbX + boxW} y1={mqY} x2={sbX} y2={mqY} active={masterQ === 1} animated={animateSignal} label="Qm" />
        <SignalLine x1={mbX + boxW} y1={mqbY} x2={sbX} y2={mqbY} active={masterQBar === 1} animated={animateSignal} label="Qm̅" />
        
        {/* Output Lines */}
        <SignalLine x1={sbX + boxW} y1={sqY} x2={outEndX} y2={sqY} active={slaveQ === 1} animated={animateSignal} />
        <SignalLine x1={sbX + boxW} y1={sqbY} x2={outEndX} y2={sqbY} active={slaveQBar === 1} animated={animateSignal} />

        {/* Input labels */}
        <text x={inStartX - 10} y={jY + 4} textAnchor="end" className="text-sm font-bold fill-slate-700 dark:fill-slate-300">J: {j}</text>
        <text x={inStartX - 10} y={kY + 4} textAnchor="end" className="text-sm font-bold fill-slate-700 dark:fill-slate-300">K: {k}</text>
        <text x={clkStartX - 10} y={clkLineY + 4} textAnchor="end" className="text-sm font-bold fill-slate-700 dark:fill-slate-300">CLK: {clock}</text>

        {/* Output labels */}
        <text x={outEndX + 10} y={sqY + 4} textAnchor="start" className="text-sm font-bold fill-slate-700 dark:fill-slate-300">Q = {slaveQ}</text>
        <text x={outEndX + 10} y={sqbY + 4} textAnchor="start" className="text-sm font-bold fill-slate-700 dark:fill-slate-300">Q̅ = {slaveQBar}</text>

        {/* Master Block */}
        <rect x={mbX} y={mbY} width={boxW} height={boxH} rx="4" className="fill-blue-50 dark:fill-blue-900/20 stroke-blue-400 dark:stroke-blue-600" strokeWidth="2" />
        <text x={mbX + boxW/2} y={mbY + boxH/2} textAnchor="middle" className="text-sm font-bold fill-blue-800 dark:fill-blue-200">MASTER</text>
        
        {/* Master Ports */}
        <text x={mbX + 10} y={jY + 4} className="text-xs font-bold fill-slate-500">J</text>
        <text x={mbX + 10} y={kY + 4} className="text-xs font-bold fill-slate-500">K</text>
        <text x={mbX + boxW - 10} y={mqY + 4} textAnchor="end" className="text-xs font-bold fill-slate-500">Q</text>
        <text x={mbX + boxW - 10} y={mqbY + 4} textAnchor="end" className="text-xs font-bold fill-slate-500">Q̅</text>
        <path d={`M ${mbX + boxW/2 - 6} ${mbY + boxH} L ${mbX + boxW/2 + 6} ${mbY + boxH} L ${mbX + boxW/2} ${mbY + boxH - 8} Z`} className="fill-slate-400 stroke-none" />

        {/* Slave Block */}
        <rect x={sbX} y={sbY} width={boxW} height={boxH} rx="4" className="fill-green-50 dark:fill-green-900/20 stroke-green-400 dark:stroke-green-600" strokeWidth="2" />
        <text x={sbX + boxW/2} y={sbY + boxH/2} textAnchor="middle" className="text-sm font-bold fill-green-800 dark:fill-green-200">SLAVE</text>
        
        {/* Slave Ports */}
        <text x={sbX + 10} y={sqY + 4} className="text-xs font-bold fill-slate-500">J</text>
        <text x={sbX + 10} y={sqbY + 4} className="text-xs font-bold fill-slate-500">K</text>
        <text x={sbX + boxW - 10} y={sqY + 4} textAnchor="end" className="text-xs font-bold fill-slate-500">Q</text>
        <text x={sbX + boxW - 10} y={sqbY + 4} textAnchor="end" className="text-xs font-bold fill-slate-500">Q̅</text>
        <path d={`M ${sbX + boxW/2 - 6} ${sbY + boxH} L ${sbX + boxW/2 + 6} ${sbY + boxH} L ${sbX + boxW/2} ${sbY + boxH - 8} Z`} className="fill-slate-400 stroke-none" />

      </svg>
    </div>
  );
};

export default MasterSlaveDiagram;
