import React from 'react';
import Card from '../ui/Card';

const CharacterCard = ({ char, showASCII = true, showUnicode = true, showUTF8 = true, showEBCDIC = false }) => {
  // Helpers
  const getAscii = (c) => c.charCodeAt(0);
  const getHex = (c) => c.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0');
  const getUnicode = (c) => `U+${c.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}`;
  
  // Dummy UTF-8 logic for illustration (assumes ASCII for simplicity if under 128)
  const getUtf8Hex = (c) => {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(c);
    return Array.from(bytes).map(b => b.toString(16).toUpperCase().padStart(2, '0')).join(' ');
  };
  
  // Dummy EBCDIC logic
  const getEbcdicHex = (c) => {
    // Just a placeholder mapping for demo
    const val = c.charCodeAt(0);
    return ((val + 64) % 255).toString(16).toUpperCase().padStart(2, '0'); 
  };

  const c = char || '?';
  const isPrintable = c.charCodeAt(0) > 32;

  return (
    <Card className="max-w-md w-full mx-auto relative overflow-hidden transition-all duration-300">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
      
      <div className="flex flex-col items-center py-6 border-b border-slate-100 dark:border-slate-700/50">
        <div className="w-24 h-24 flex items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-inner mb-4 transition-transform duration-300 hover:scale-105">
          <span className="text-6xl font-serif text-slate-800 dark:text-white" aria-label={`Character: ${c}`}>
            {isPrintable ? c : '·'}
          </span>
        </div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Character</p>
      </div>

      <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50/50 dark:bg-slate-800/30">
        {showASCII && (
          <div className="flex flex-col p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">ASCII (Dec)</span>
            <span className="text-lg font-mono text-slate-700 dark:text-slate-200">{getAscii(c)}</span>
          </div>
        )}
        
        {showASCII && (
          <div className="flex flex-col p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">ASCII (Hex)</span>
            <span className="text-lg font-mono text-slate-700 dark:text-slate-200">0x{getHex(c)}</span>
          </div>
        )}

        {showUnicode && (
          <div className="flex flex-col p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm col-span-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Unicode Code Point</span>
            <span className="text-lg font-mono text-blue-600 dark:text-blue-400">{getUnicode(c)}</span>
          </div>
        )}

        {showUTF8 && (
          <div className="flex flex-col p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm col-span-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">UTF-8 Bytes (Hex)</span>
            <span className="text-lg font-mono text-cyan-600 dark:text-cyan-400">{getUtf8Hex(c)}</span>
          </div>
        )}

        {showEBCDIC && (
          <div className="flex flex-col p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm col-span-2 opacity-70">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">EBCDIC (Hex)</span>
            <span className="text-lg font-mono text-slate-700 dark:text-slate-200">0x{getEbcdicHex(c)}</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CharacterCard;
