import React, { useRef, useEffect } from 'react';

const TimingDiagram = ({ signals = [], width = 600, height = 300, maxSteps = 20 }) => {
  const scrollRef = useRef(null);
  
  // Auto-scroll to end when new data arrives
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [signals]);

  const labelWidth = 80;
  const stepWidth = 30;
  const trackHeight = height / (signals.length || 1);
  const signalHeight = trackHeight * 0.6;
  const paddingY = (trackHeight - signalHeight) / 2;

  // Calculate required width based on data points
  const maxDataLen = Math.max(0, ...signals.map(s => (s.data || s.values || []).length));
  const innerWidth = Math.max(width - labelWidth, maxDataLen * stepWidth + stepWidth);

  return (
    <div className="flex border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800">
      {/* Y-axis Labels */}
      <div className="w-[80px] flex-shrink-0 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 z-10 flex flex-col">
        {signals.map((signal, i) => (
          <div 
            key={`label-${i}`} 
            style={{ height: trackHeight }}
            className="flex items-center justify-end pr-4 text-sm font-mono font-bold text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-700/50 last:border-b-0"
          >
            {signal.name}
          </div>
        ))}
      </div>

      {/* Waveforms */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-x-auto relative"
        style={{ height }}
      >
        <svg width={innerWidth} height={height} className="block">
          <defs>
            <pattern id="grid" width={stepWidth} height={height} patternUnits="userSpaceOnUse">
              <line x1={stepWidth} y1="0" x2={stepWidth} y2={height} stroke="currentColor" className="text-slate-100 dark:text-slate-700/30" strokeWidth="1" />
            </pattern>
          </defs>
          
          <rect width={innerWidth} height={height} fill="url(#grid)" />

          {signals.map((signal, trackIdx) => {
            const yOffset = trackIdx * trackHeight;
            const color = signal.color || '#3b82f6';
            const dataArr = signal.data || signal.values || [];
            
            // Generate path for the digital waveform
            let d = '';
            for (let i = 0; i < dataArr.length; i++) {
              const val = dataArr[i];
              const prevVal = i > 0 ? dataArr[i-1] : val;
              
              const x1 = i * stepWidth;
              const x2 = (i + 1) * stepWidth;
              
              const y1 = yOffset + paddingY + (prevVal === 1 ? 0 : signalHeight);
              const y2 = yOffset + paddingY + (val === 1 ? 0 : signalHeight);
              
              if (i === 0) {
                d += `M ${x1} ${y2} L ${x2} ${y2} `;
              } else {
                // Draw vertical transition if changed
                if (val !== prevVal) {
                  d += `L ${x1} ${y2} `;
                }
                // Draw horizontal hold
                d += `L ${x2} ${y2} `;
              }
            }

            return (
              <g key={`track-${trackIdx}`}>
                {/* Baseline Guide */}
                <line 
                  x1={0} y1={yOffset + trackHeight} 
                  x2={innerWidth} y2={yOffset + trackHeight} 
                  stroke="currentColor" 
                  className="text-slate-200 dark:text-slate-700" 
                  strokeWidth="1" 
                />
                
                {/* Waveform Path */}
                <path 
                  d={d} 
                  fill="none" 
                  stroke={color} 
                  strokeWidth="2" 
                  strokeLinejoin="round" 
                />
                
                {/* Dots on transitions or steps for clarity */}
                {dataArr.map((v, i) => (
                  <circle 
                    key={`dot-${i}`}
                    cx={i * stepWidth}
                    cy={yOffset + paddingY + (v === 1 ? 0 : signalHeight)}
                    r="2"
                    fill={color}
                  />
                ))}
              </g>
            );
          })}
          
          {/* Highlight current step/time */}
          {maxDataLen > 0 && (
            <line 
              x1={(maxDataLen - 1) * stepWidth} 
              y1="0" 
              x2={(maxDataLen - 1) * stepWidth} 
              y2={height} 
              stroke="#8b5cf6" 
              strokeWidth="2" 
              strokeDasharray="4 4" 
              className="opacity-50"
            />
          )}
        </svg>
      </div>
    </div>
  );
};

export default TimingDiagram;
