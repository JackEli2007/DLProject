import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function UnicodeExplorer() {
  const [inputChar, setInputChar] = useState('🌟');

  const blocks = [
    { name: 'Basic Latin', range: 'U+0000-007F', examples: ['A', 'a', '1', '@'] },
    { name: 'Latin Supplement', range: 'U+0080-00FF', examples: ['é', 'ñ', '©', 'µ'] },
    { name: 'Greek', range: 'U+0370-03FF', examples: ['α', 'β', 'γ', 'Δ'] },
    { name: 'CJK', range: 'U+4E00-9FFF', examples: ['中', '文', '字', '猫'] },
    { name: 'Emoji', range: 'U+1F300-1F9FF', examples: ['😀', '🌟', '🚀', '💻'] }
  ];

  const getCodePoint = (char) => {
    return 'U+' + char.codePointAt(0).toString(16).toUpperCase().padStart(4, '0');
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Unicode Explorer</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Unicode assigns a unique numerical value (Code Point) to every character, 
          regardless of the platform, program, or language.
        </p>
      </header>

      {/* Explanation Section */}
      <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4">Character ≠ Code Point ≠ Encoding</h2>
        <div className="flex flex-col md:flex-row items-center justify-around gap-4 text-center">
          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm flex-1">
            <div className="text-4xl mb-2">A</div>
            <div className="font-semibold text-slate-700 dark:text-slate-300">Character</div>
            <div className="text-sm text-slate-500">The abstract concept</div>
          </div>
          <div className="text-2xl text-blue-400">→</div>
          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm flex-1 border-2 border-blue-400">
            <div className="text-2xl font-mono mb-2">U+0041</div>
            <div className="font-semibold text-slate-700 dark:text-slate-300">Code Point</div>
            <div className="text-sm text-slate-500">The unique ID</div>
          </div>
          <div className="text-2xl text-blue-400">→</div>
          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm flex-1">
            <div className="text-lg font-mono mb-2">01000001</div>
            <div className="font-semibold text-slate-700 dark:text-slate-300">Encoding (UTF-8)</div>
            <div className="text-sm text-slate-500">The bytes in memory</div>
          </div>
        </div>
      </Card>

      {/* Explorer Tool */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-1 bg-white dark:bg-slate-900 flex flex-col items-center">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">Test a Character</label>
          <input
            type="text"
            value={inputChar}
            onChange={(e) => {
              const val = e.target.value;
              // Handle surrogate pairs properly
              if (val.length > 0) setInputChar(Array.from(val)[0]);
              else setInputChar('');
            }}
            className="text-6xl text-center p-4 w-32 h-32 border-2 border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 shadow-inner"
          />
          {inputChar && (
            <div className="mt-8 text-center w-full">
              <div className="text-sm text-slate-500 uppercase tracking-wide mb-1">Code Point</div>
              <div className="text-3xl font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 py-2 rounded-lg">
                {getCodePoint(inputChar)}
              </div>
            </div>
          )}
        </Card>

        <Card className="p-6 md:col-span-2 bg-white dark:bg-slate-900">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">Common Unicode Blocks</h2>
          <div className="space-y-6">
            {blocks.map(block => (
              <div key={block.name} className="border-b border-slate-200 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-end mb-3">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">{block.name}</h3>
                  <span className="text-xs font-mono text-slate-500">{block.range}</span>
                </div>
                <div className="flex gap-3">
                  {block.examples.map(ex => (
                    <button
                      key={ex}
                      onClick={() => setInputChar(ex)}
                      className={`w-12 h-12 text-2xl flex items-center justify-center rounded-lg transition-all ${inputChar === ex ? 'bg-blue-500 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
