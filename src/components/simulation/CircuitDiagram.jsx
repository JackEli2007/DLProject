import React from 'react';
import SignalLine from './SignalLine';

const CircuitDiagram = ({ j, k, clock, q, qBar, animateSignal = false }) => {
  // Dimensions and layout
  const w = 400;
  const h = 250;
  
  // Box coordinates
  const boxW = 100;
  const boxH = 120;
  const boxX = (w - boxW) / 2;
  const boxY = (h - boxH) / 2;
  
  // Input coords
  const inStartX = 50;
  const jY = boxY + 30;
  const kY = boxY + 90;
  
  // Clock coords
  const clkStartX = boxX + boxW / 2;
  const clkStartY = h - 30;
  const clkEndY = boxY + boxH;
  
  // Output coords
  const outEndX = w - 50;
  const qY = boxY + 30;
  const qbY = boxY + 90;

  return (
    <div className="w-full max-w-md mx-auto bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto drop-shadow-sm font-mono">
        
        {/* Signal Lines */}
        {/* J Input */}
        <SignalLine x1={inStartX} y1={jY} x2={boxX} y2={jY} active={j === 1} animated={animateSignal} label="J" />
        {/* K Input */}
        <SignalLine x1={inStartX} y1={kY} x2={boxX} y2={kY} active={k === 1} animated={animateSignal} label="K" />
        
        {/* Clock Input - bottom up */}
        <SignalLine x1={clkStartX} y1={clkStartY} x2={clkStartX} y2={clkEndY} active={clock === 1} animated={animateSignal} label="CLK" />
        
        {/* Q Output */}
        <SignalLine x1={boxX + boxW} y1={qY} x2={outEndX} y2={qY} active={q === 1} animated={animateSignal} />
        {/* QBar Output */}
        <SignalLine x1={boxX + boxW} y1={qbY} x2={outEndX} y2={qbY} active={qBar === 1} animated={animateSignal} />

        {/* Input labels/values */}
        <text x={inStartX - 10} y={jY + 4} textAnchor="end" className="text-sm font-bold fill-slate-700 dark:fill-slate-300">J: {j}</text>
        <text x={inStartX - 10} y={kY + 4} textAnchor="end" className="text-sm font-bold fill-slate-700 dark:fill-slate-300">K: {k}</text>
        <text x={clkStartX} y={clkStartY + 15} textAnchor="middle" className="text-sm font-bold fill-slate-700 dark:fill-slate-300">CLK: {clock}</text>

        {/* Output labels/values */}
        <text x={outEndX + 10} y={qY + 4} textAnchor="start" className="text-sm font-bold fill-slate-700 dark:fill-slate-300">Q = {q}</text>
        <text x={outEndX + 10} y={qbY + 4} textAnchor="start" className="text-sm font-bold fill-slate-700 dark:fill-slate-300">Q̅ = {qBar}</text>

        {/* The JK Flip-Flop Block */}
        <rect 
          x={boxX} y={boxY} 
          width={boxW} height={boxH} 
          rx="8"
          className="fill-white dark:fill-slate-800 stroke-slate-400 dark:stroke-slate-600"
          strokeWidth="2"
        />
        
        {/* Block Title */}
        <text x={boxX + boxW/2} y={boxY + boxH/2 + 5} textAnchor="middle" className="text-lg font-bold fill-slate-800 dark:fill-white">JK</text>
        <text x={boxX + boxW/2} y={boxY + boxH/2 + 25} textAnchor="middle" className="text-xs fill-slate-500 dark:fill-slate-400">Flip-Flop</text>

        {/* Port Labels inside box */}
        <text x={boxX + 10} y={jY + 4} className="text-xs font-bold fill-slate-600 dark:fill-slate-400">J</text>
        <text x={boxX + 10} y={kY + 4} className="text-xs font-bold fill-slate-600 dark:fill-slate-400">K</text>
        <text x={boxX + boxW - 10} y={qY + 4} textAnchor="end" className="text-xs font-bold fill-slate-600 dark:fill-slate-400">Q</text>
        <text x={boxX + boxW - 10} y={qbY + 4} textAnchor="end" className="text-xs font-bold fill-slate-600 dark:fill-slate-400">Q̅</text>

        {/* Clock Triangle symbol inside box */}
        <path 
          d={`M ${clkStartX - 8} ${clkEndY} L ${clkStartX + 8} ${clkEndY} L ${clkStartX} ${clkEndY - 10} Z`}
          className="fill-slate-400 dark:fill-slate-500 stroke-none"
        />

      </svg>
    </div>
  );
};

export default CircuitDiagram;
