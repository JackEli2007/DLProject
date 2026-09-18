import React from 'react';

const FlowNode = ({ title, value, color }) => (
  <div className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 bg-white dark:bg-slate-800 shadow-sm transition-transform hover:scale-105 z-10 w-40 h-24 ${color}`}>
    <span className="text-xs font-bold uppercase tracking-wider mb-2 opacity-80">{title}</span>
    <span className="text-lg font-mono font-bold">{value}</span>
  </div>
);

const ConversionFlow = ({ char, representations }) => {
  const r = representations || {};
  
  // Extract display strings from the complex objects
  const unicodeDisplay = r.unicode?.hex || '?';
  const asciiDisplay = r.ascii ? r.ascii.decimal : 'N/A';
  const utf8Display = r.utf8 ? r.utf8.hex.join(' ') : '?';
  const binaryDisplay = r.ascii ? r.ascii.binary : (r.utf8 ? r.utf8.binary.join(' ') : '?');

  return (
    <div className="relative flex flex-col items-center w-full max-w-2xl mx-auto py-8">
      {/* Background connecting lines */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        {/* Vertical line from Char to Unicode */}
        <div className="absolute top-12 bottom-1/2 w-0.5 bg-slate-300 dark:bg-slate-600" />
        {/* Horizontal branch */}
        <div className="absolute top-1/2 w-64 h-0.5 bg-slate-300 dark:bg-slate-600" />
        {/* Vertical drops to ASCII and UTF8 */}
        <div className="absolute top-1/2 bottom-32 -ml-32 w-0.5 bg-slate-300 dark:bg-slate-600" />
        <div className="absolute top-1/2 bottom-32 ml-32 w-0.5 bg-slate-300 dark:bg-slate-600" />
        {/* Merge back to Binary */}
        <div className="absolute bottom-24 -ml-32 w-32 h-0.5 bg-slate-300 dark:bg-slate-600" />
        <div className="absolute bottom-24 ml-32 w-32 h-0.5 bg-slate-300 dark:bg-slate-600" />
        <div className="absolute bottom-12 bottom-24 w-0.5 bg-slate-300 dark:bg-slate-600" />
      </div>

      {/* Nodes */}
      <div className="flex flex-col items-center gap-16 w-full">
        {/* Top: Character */}
        <div className="flex justify-center z-10">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-slate-800 dark:bg-white text-white dark:text-slate-900 text-2xl font-serif font-bold shadow-lg">
            {char || '?'}
          </div>
        </div>

        {/* Middle: Unicode */}
        <div className="flex justify-center w-full z-10">
          <FlowNode title="Code Point" value={unicodeDisplay} color="border-blue-400 text-blue-600 dark:text-blue-400" />
        </div>

        {/* Lower Middle: ASCII & UTF8 */}
        <div className="flex justify-between w-full max-w-sm px-8 z-10">
          <FlowNode title="ASCII Dec" value={asciiDisplay} color="border-purple-400 text-purple-600 dark:text-purple-400" />
          <FlowNode title="UTF-8 Hex" value={utf8Display} color="border-cyan-400 text-cyan-600 dark:text-cyan-400" />
        </div>

        {/* Bottom: Binary */}
        <div className="flex justify-center w-full z-10">
          <FlowNode title="Binary" value={binaryDisplay} color="border-emerald-400 text-emerald-600 dark:text-emerald-400" />
        </div>
      </div>
    </div>
  );
};

export default ConversionFlow;
