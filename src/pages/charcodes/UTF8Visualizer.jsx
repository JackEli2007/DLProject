import React, { useState } from 'react';
import { encodeUTF8Steps } from '../../simulations/utf8Encoder';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ByteVisualizer from '../../components/charcode/ByteVisualizer';

export default function UTF8Visualizer() {
  const [inputChar, setInputChar] = useState('é');
  const examples = ['A', 'é', '中', '😀'];

  const getSteps = () => {
    try {
      return encodeUTF8Steps(inputChar);
    } catch (e) {
      return null;
    }
  };

  const steps = getSteps();

  const getTemplateDisplay = (byteCount) => {
    const templates = {
      1: '0xxxxxxx',
      2: '110xxxxx 10xxxxxx',
      3: '1110xxxx 10xxxxxx 10xxxxxx',
      4: '11110xxx 10xxxxxx 10xxxxxx 10xxxxxx'
    };
    return templates[byteCount] || '';
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">UTF-8 Encoding Visualizer</h1>
        <p className="text-slate-600 dark:text-slate-400">See exactly how Unicode code points are converted into bytes.</p>
      </header>

      {/* Input Section */}
      <Card className="p-6 bg-white dark:bg-slate-900 flex flex-col md:flex-row items-center gap-6 justify-center">
        <div className="flex flex-col items-center">
          <label className="text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Enter a Character</label>
          <input
            type="text"
            value={inputChar}
            onChange={(e) => setInputChar(Array.from(e.target.value)[0] || '')}
            className="text-4xl text-center p-3 w-24 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Or try examples</span>
          <div className="flex gap-2">
            {examples.map(ex => (
              <Button key={ex} variant={inputChar === ex ? 'primary' : 'secondary'} onClick={() => setInputChar(ex)}>
                {ex}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Visualization Steps */}
      {steps ? (
        <div className="space-y-6">
          <Card className="p-6 border-l-4 border-blue-500 bg-white dark:bg-slate-900">
            <h3 className="font-bold text-lg mb-2">1. Get Unicode Code Point</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">Every character is assigned a unique hexadecimal number.</p>
            <div className="text-3xl font-mono text-center bg-slate-50 dark:bg-slate-800 py-4 rounded">
              U+{steps.codePointHex}
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-purple-500 bg-white dark:bg-slate-900">
            <h3 className="font-bold text-lg mb-2">2. Convert to Binary</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">Convert the hex value to raw binary bits.</p>
            <div className="text-2xl font-mono text-center tracking-widest text-purple-600 dark:text-purple-400 bg-slate-50 dark:bg-slate-800 py-4 rounded">
              {steps.codePointBits}
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-amber-500 bg-white dark:bg-slate-900">
            <h3 className="font-bold text-lg mb-2">3. Determine Byte Count & Template</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Based on the code point size, UTF-8 uses 1 to 4 bytes. This character needs <strong className="text-amber-600">{steps.byteCount} byte{steps.byteCount > 1 ? 's' : ''}</strong>.
            </p>
            <div className="text-xl font-mono text-center text-slate-700 dark:text-slate-300 bg-amber-50 dark:bg-amber-900/20 py-4 rounded">
              {getTemplateDisplay(steps.byteCount)}
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-green-500 bg-white dark:bg-slate-900">
            <h3 className="font-bold text-lg mb-2">4. Fill Template with Bits</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              The raw binary bits fill the 'x' placeholders from right to left.
            </p>
            <div className="mt-6 flex justify-center">
               <ByteVisualizer bytes={steps.utf8BinaryBytes} />
            </div>
          </Card>
        </div>
      ) : (
        <Card className="p-8 text-center text-slate-500">
          Enter a valid character to see the visualization.
        </Card>
      )}
    </div>
  );
}
