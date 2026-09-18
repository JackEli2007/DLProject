import React, { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Tabs from '../../components/ui/Tabs';
import BitDisplay from '../../components/charcode/BitDisplay';
import ConversionFlow from '../../components/charcode/ConversionFlow';
import { charToAllCodes } from '../../simulations/characterCodes';
import { validateBinary, validateHex, validateDecimal } from '../../utils/validators';

export default function Converter() {
  const [activeTab, setActiveTab] = useState('character');
  const [inputValue, setInputValue] = useState('A');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const tabs = [
    { id: 'character', label: 'Character' },
    { id: 'decimal', label: 'Decimal (ASCII)' },
    { id: 'binary', label: 'Binary (ASCII)' },
    { id: 'hex', label: 'Hex (ASCII)' },
    { id: 'unicode', label: 'Unicode (U+)' }
  ];

  useEffect(() => {
    processInput();
  }, [inputValue, activeTab]);

  const processInput = () => {
    setError('');
    setData(null);
    if (!inputValue.trim()) return;

    try {
      let char = '';
      
      switch (activeTab) {
        case 'character':
          char = Array.from(inputValue)[0];
          break;
        case 'decimal':
          if (!validateDecimal(inputValue) || parseInt(inputValue) > 127) {
            setError('Enter a valid ASCII decimal (0-127)');
            return;
          }
          char = String.fromCharCode(parseInt(inputValue));
          break;
        case 'binary':
          const cleanBin = inputValue.replace(/\s/g, '');
          if (!validateBinary(cleanBin) || cleanBin.length > 8) {
            setError('Enter up to 8 bits of binary');
            return;
          }
          char = String.fromCharCode(parseInt(cleanBin, 2));
          break;
        case 'hex':
          const cleanHex = inputValue.replace(/^0x/i, '');
          if (!validateHex(cleanHex) || parseInt(cleanHex, 16) > 127) {
            setError('Enter a valid ASCII hex value (00-7F)');
            return;
          }
          char = String.fromCharCode(parseInt(cleanHex, 16));
          break;
        case 'unicode':
          const cleanUni = inputValue.replace(/^U\+/i, '');
          if (!validateHex(cleanUni)) {
            setError('Enter a valid hex code point');
            return;
          }
          char = String.fromCodePoint(parseInt(cleanUni, 16));
          break;
        default:
          return;
      }

      const codes = charToAllCodes(char);
      setData(codes);
    } catch (err) {
      setError('Invalid input format');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Universal Character Converter</h1>
        <p className="text-slate-600 dark:text-slate-400">Convert between characters, ASCII codes, and Unicode.</p>
      </header>

      <Card className="bg-white dark:bg-slate-900 shadow-md">
        <div className="border-b border-slate-200 dark:border-slate-800">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={(id) => { setActiveTab(id); setInputValue(''); }} />
        </div>
        
        <div className="p-8 flex flex-col items-center justify-center">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4 block text-center">
            Enter {tabs.find(t => t.id === activeTab)?.label}
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="text-3xl text-center p-4 w-64 border-2 border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 focus:ring-blue-500 focus:border-blue-500"
            placeholder={
              activeTab === 'character' ? 'A' :
              activeTab === 'decimal' ? '65' :
              activeTab === 'binary' ? '01000001' :
              activeTab === 'hex' ? '41' : '0041'
            }
          />
          {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
          
          <div className="mt-6 flex flex-col items-center">
            <span className="text-xs text-slate-500 mb-2">Live Examples (Click to test flow)</span>
            <div className="flex flex-wrap justify-center gap-2">
              {activeTab === 'character' && ['A', 'Z', '0', '9', '@', 'é', '中', '😀'].map(ex => (
                <button key={ex} onClick={() => setInputValue(ex)} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg text-sm font-medium transition-colors">{ex}</button>
              ))}
              {activeTab === 'decimal' && ['65', '90', '48', '57', '64'].map(ex => (
                <button key={ex} onClick={() => setInputValue(ex)} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg text-sm font-medium transition-colors">{ex}</button>
              ))}
              {activeTab === 'binary' && ['01000001', '01011010', '00110000', '00111001'].map(ex => (
                <button key={ex} onClick={() => setInputValue(ex)} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg text-sm font-mono text-xs transition-colors">{ex}</button>
              ))}
              {activeTab === 'hex' && ['41', '5A', '30', '39', '40'].map(ex => (
                <button key={ex} onClick={() => setInputValue(ex)} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg text-sm font-mono transition-colors">{ex}</button>
              ))}
              {activeTab === 'unicode' && ['0041', '00E9', '4E2D', '1F600'].map(ex => (
                <button key={ex} onClick={() => setInputValue(ex)} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg text-sm font-mono transition-colors">U+{ex}</button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {data && !error && (
        <Card className="p-6 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm flex flex-col items-center">
              <span className="text-xs text-slate-500 uppercase tracking-wider mb-2">Character</span>
              <span className="text-4xl font-serif">{data.character}</span>
            </div>
            
            {data.ascii ? (
              <>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm flex flex-col items-center">
                  <span className="text-xs text-slate-500 uppercase tracking-wider mb-2">Decimal</span>
                  <span className="text-2xl font-mono">{data.ascii.decimal}</span>
                </div>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm flex flex-col items-center">
                  <span className="text-xs text-slate-500 uppercase tracking-wider mb-2">Hex</span>
                  <span className="text-2xl font-mono">{data.ascii.hex}</span>
                </div>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm flex flex-col items-center">
                  <span className="text-xs text-slate-500 uppercase tracking-wider mb-2">Binary</span>
                  <BitDisplay bits={data.ascii.binary} size="sm" />
                </div>
              </>
            ) : (
              <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-lg shadow-sm col-span-1 md:col-span-3 flex items-center justify-center">
                <span className="text-slate-500">Not representable in ASCII</span>
              </div>
            )}
          </div>
          
          <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
            <ConversionFlow char={data.character} representations={data} />
          </div>
        </Card>
      )}
    </div>
  );
}
