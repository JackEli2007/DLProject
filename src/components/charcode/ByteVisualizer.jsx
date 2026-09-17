import React from 'react';

const ByteVisualizer = ({ bytes = [] }) => {
  // bytes: [{ header: '110', payload: '00010', type: 'start' }, { header: '10', payload: '100001', type: 'cont' }]
  return (
    <div className="flex flex-col gap-4">
      {bytes.map((byteObj, idx) => {
        const { header, payload, type } = byteObj;
        
        return (
          <div key={`byte-${idx}`} className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">
              Byte {idx + 1} {type === 'start' ? '(Leading)' : type === 'cont' ? '(Continuation)' : '(ASCII)'}
            </span>
            <div className="flex rounded-lg overflow-hidden border border-slate-300 dark:border-slate-600 font-mono text-lg shadow-sm">
              {/* Header section */}
              {header && (
                <div 
                  className="flex bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-400"
                  aria-label={`Header bits: ${header}`}
                >
                  {header.split('').map((bit, i) => (
                    <div key={`h-${i}`} className="w-10 h-12 flex items-center justify-center border-r border-amber-200 dark:border-amber-800/50">
                      {bit}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Payload section */}
              {payload && (
                <div 
                  className="flex flex-1 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-800 dark:text-cyan-400"
                  aria-label={`Payload bits: ${payload}`}
                >
                  {payload.split('').map((bit, i) => (
                    <div key={`p-${i}`} className="flex-1 min-w-[2.5rem] h-12 flex items-center justify-center border-r border-cyan-100 dark:border-cyan-800/50 last:border-r-0 font-bold">
                      {bit}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex mt-1 text-xs text-slate-400">
              {header && <div className="text-center text-amber-600/70 dark:text-amber-500/70" style={{ width: `${header.length * 2.5}rem` }}>Header</div>}
              {payload && <div className="text-center text-cyan-600/70 dark:text-cyan-500/70 flex-1">Payload / Data Bits</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ByteVisualizer;
