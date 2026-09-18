import React, { useState, useEffect } from 'react';
import { charToAllCodes, getASCIICategory } from '../../simulations/characterCodes';
import { encodeUTF8, encodeUTF8Steps } from '../../simulations/utf8Encoder';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import BitDisplay from '../../components/charcode/BitDisplay';
import ConversionFlow from '../../components/charcode/ConversionFlow';
import ByteVisualizer from '../../components/charcode/ByteVisualizer';

export default function CharExplorer() {
  const [inputChar, setInputChar] = useState('A');
  const [data, setData] = useState(null);

  useEffect(() => {
    if (inputChar) {
      try {
        const cp = inputChar.codePointAt(0);
        const codes = charToAllCodes(inputChar);
        const asciiCat = getASCIICategory(codes.ascii?.decimal);
        const utf8Data = encodeUTF8(cp);
        const utf8Steps = encodeUTF8Steps(cp);
        
        // Transform utf8Steps into format expected by ByteVisualizer
        const visualizerBytes = [];
        for (let i = 0; i < utf8Steps.byteCount; i++) {
          visualizerBytes.push({
            header: utf8Steps.headerBits[i].join(''),
            payload: utf8Steps.payloadBits[i].join(''),
            type: utf8Steps.byteCount === 1 ? 'ascii' : (i === 0 ? 'start' : 'cont')
          });
        }
        
        setData({ ...codes, asciiCat, utf8: utf8Data, visualizerBytes });
      } catch (e) {
        setData(null);
      }
    } else {
      setData(null);
    }
  }, [inputChar]);

  const quickExamples = ['A', 'Z', '0', '9', '@', '!', 'é', '中', '😀'];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Character Code Explorer</h1>
        <p className="text-slate-600 dark:text-slate-400">Discover how characters are represented in different encoding systems.</p>
      </header>

      {/* Input Section */}
      <Card className="p-6 bg-white dark:bg-slate-900 shadow-lg text-center border border-slate-200 dark:border-slate-800">
        <div className="mb-4">
          <label htmlFor="charInput" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Enter a single character:</label>
          <input
            id="charInput"
            type="text"
            value={inputChar}
            onChange={(e) => setInputChar(e.target.value.substring(0, 2))} // allow emoji surrogates
            className="text-4xl text-center p-4 w-32 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
            placeholder="A"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {quickExamples.map(char => (
            <Button key={char} variant="secondary" onClick={() => setInputChar(char)}>
              {char}
            </Button>
          ))}
        </div>
      </Card>

      {/* Output Section */}
      {data ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Character Display */}
          <Card className="p-8 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800">
            <div className="text-8xl font-serif mb-4">{data.character}</div>
            <div className="text-lg font-mono text-slate-500">U+{data.unicode.hex}</div>
          </Card>

          {/* ASCII Section */}
          {data.ascii ? (
            <Card className="p-6 bg-white dark:bg-slate-900">
              <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
                ASCII
                {data.asciiCat && <Badge color="blue">{data.asciiCat}</Badge>}
              </h3>
              <div className="space-y-4 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Decimal:</span>
                  <span className="text-slate-900 dark:text-slate-100">{data.ascii.decimal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Hex:</span>
                  <span className="text-slate-900 dark:text-slate-100">{data.ascii.hex}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Octal:</span>
                  <span className="text-slate-900 dark:text-slate-100">{data.ascii.decimal.toString(8).padStart(3, '0')}</span>
                </div>
                <div className="pt-2">
                  <span className="text-slate-500 block mb-2">Binary:</span>
                  <BitDisplay bits={data.ascii.binary} size="md" />
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-6 bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center">
              <p className="text-slate-500 dark:text-slate-400 italic">Not available in standard ASCII (0-127)</p>
            </Card>
          )}

          {/* UTF-8 Section */}
          <Card className="p-6 bg-white dark:bg-slate-900 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">UTF-8 Encoding ({data.utf8.byteCount} byte{data.utf8.byteCount > 1 ? 's' : ''})</h3>
            <ByteVisualizer bytes={data.visualizerBytes} />
          </Card>

          {/* Flow Diagram */}
          <div className="md:col-span-2 mt-4">
            <ConversionFlow char={data.character} representations={data} />
          </div>
        </div>
      ) : (
        <Card className="p-8 text-center text-slate-500 dark:text-slate-400">
          Enter a valid character to see its representations.
        </Card>
      )}
    </div>
  );
}
