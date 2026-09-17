import React from 'react';

const SignalLine = ({ x1, y1, x2, y2, active = false, animated = false, label }) => {
  const color = active ? '#22c55e' : '#64748b'; // Emerald 500 for high, Slate 500 for low
  
  return (
    <g className="transition-all duration-200">
      {/* Invisible thicker line for easier clicking/hovering if needed later */}
      <line 
        x1={x1} y1={y1} x2={x2} y2={y2} 
        stroke="transparent" 
        strokeWidth="10" 
      />
      
      {/* Background line (solid) */}
      <line 
        x1={x1} y1={y1} x2={x2} y2={y2} 
        stroke={color} 
        strokeWidth="2"
        className={active ? '' : 'dark:stroke-slate-600'}
      />
      
      {/* Animated dashed line on top for HIGH signals */}
      {active && animated && (
        <line 
          x1={x1} y1={y1} x2={x2} y2={y2} 
          stroke="#fff" 
          strokeWidth="2" 
          strokeDasharray="4 4"
          className="animate-[dash_1s_linear_infinite] opacity-50"
        />
      )}
      
      {/* Optional Label */}
      {label && (
        <text 
          x={(x1 + x2) / 2} 
          y={(y1 + y2) / 2 - 5} 
          fill={active ? '#22c55e' : '#94a3b8'}
          className="text-[10px] font-mono font-bold"
          textAnchor="middle"
        >
          {label}
        </text>
      )}

      {/* Embedded CSS animation for dashed lines */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to {
            stroke-dashoffset: -8;
          }
        }
      `}} />
    </g>
  );
};

export default SignalLine;
