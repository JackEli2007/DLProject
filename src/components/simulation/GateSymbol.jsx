import React from 'react';

const GateSymbol = ({ type = 'and', x = 0, y = 0, scale = 1 }) => {
  // Base dimensions roughly 40x40
  const transform = `translate(${x}, ${y}) scale(${scale})`;
  
  const gates = {
    and: (
      <g stroke="currentColor" fill="none" strokeWidth="2" className="text-slate-800 dark:text-slate-200">
        <path d="M 0,0 L 20,0 A 20 20 0 0 1 20,40 L 0,40 Z" />
      </g>
    ),
    or: (
      <g stroke="currentColor" fill="none" strokeWidth="2" className="text-slate-800 dark:text-slate-200">
        <path d="M 0,0 C 10,0 20,0 30,20 C 20,40 10,40 0,40 C 10,20 10,20 0,0 Z" />
      </g>
    ),
    not: (
      <g stroke="currentColor" fill="none" strokeWidth="2" className="text-slate-800 dark:text-slate-200">
        <path d="M 0,0 L 30,20 L 0,40 Z" />
        <circle cx="35" cy="20" r="5" />
      </g>
    ),
    nand: (
      <g stroke="currentColor" fill="none" strokeWidth="2" className="text-slate-800 dark:text-slate-200">
        <path d="M 0,0 L 20,0 A 20 20 0 0 1 20,40 L 0,40 Z" />
        <circle cx="45" cy="20" r="5" />
      </g>
    ),
    nor: (
      <g stroke="currentColor" fill="none" strokeWidth="2" className="text-slate-800 dark:text-slate-200">
        <path d="M 0,0 C 10,0 20,0 30,20 C 20,40 10,40 0,40 C 10,20 10,20 0,0 Z" />
        <circle cx="35" cy="20" r="5" />
      </g>
    )
  };

  return (
    <g transform={transform}>
      {gates[type] || gates.and}
      <text x="15" y="25" fill="currentColor" className="text-[10px] font-mono text-slate-500 dark:text-slate-400" textAnchor="middle" stroke="none">
        {type.toUpperCase()}
      </text>
    </g>
  );
};

export default GateSymbol;
