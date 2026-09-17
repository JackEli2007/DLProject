import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { charToAllCodes } from '../../simulations/characterCodes';
import { useProgress } from '../../context/ProgressContext';

export default function ComparisonLab() {
  const [inputChar, setInputChar] = useState('A');
  const { updateProgress } = useProgress();
  
  // Game state
  const [gameMode, setGameMode] = useState(false);
  const [selectedSource, setSelectedSource] = useState(null);
  const [matches, setMatches] = useState({}); // sourceId -> targetId
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong'
  
  const systems = [
    { id: 'ascii', name: 'ASCII', bits: 7, chars: 128 },
    { id: 'utf8', name: 'UTF-8', bits: '8-32', chars: '1,114,112' },
    { id: 'ebcdic', name: 'EBCDIC', bits: 8, chars: 256 }
  ];

  const codes = inputChar ? charToAllCodes(Array.from(inputChar)[0]) : null;

  // Simple game data
  const gameItems = {
    sources: [
      { id: 's1', value: 'A' },
      { id: 's2', value: 'a' },
      { id: 's3', value: '0' },
      { id: 's4', value: 'Space' }
    ],
    targets: [
      { id: 't1', value: '65', matches: 's1' },
      { id: 't2', value: '97', matches: 's2' },
      { id: 't3', value: '48', matches: 's3' },
      { id: 't4', value: '32', matches: 's4' }
    ]
  };

  const handleTargetClick = (targetId) => {
    if (!selectedSource) return;
    
    const target = gameItems.targets.find(t => t.id === targetId);
    if (target.matches === selectedSource) {
      setMatches(prev => ({ ...prev, [selectedSource]: targetId }));
      setFeedback('correct');
      if (Object.keys(matches).length + 1 === gameItems.sources.length) {
         updateProgress('charCodes', { gameScore: 100 });
      }
    } else {
      setFeedback('wrong');
    }
    
    setTimeout(() => {
      setFeedback(null);
      setSelectedSource(null);
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">Encoding Comparison Lab</h1>
        <div className="flex justify-center gap-4">
          <Button variant={!gameMode ? 'primary' : 'secondary'} onClick={() => setGameMode(false)}>
            Compare Systems
          </Button>
          <Button variant={gameMode ? 'primary' : 'secondary'} onClick={() => setGameMode(true)}>
            Matching Game
          </Button>
        </div>
      </header>

      {!gameMode ? (
        <div className="space-y-8">
          <Card className="p-6 bg-white dark:bg-slate-900 flex justify-center items-center gap-4">
            <span className="font-medium text-slate-700 dark:text-slate-300">Test Character:</span>
            <input
              type="text"
              value={inputChar}
              onChange={e => setInputChar(e.target.value)}
              className="text-2xl p-2 w-16 text-center border rounded bg-slate-50 dark:bg-slate-950"
              maxLength={2}
            />
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {systems.map(sys => (
              <Card key={sys.id} className="p-6 bg-white dark:bg-slate-900">
                <h3 className="text-xl font-bold mb-4">{sys.name}</h3>
                <div className="text-sm text-slate-500 mb-6 space-y-1">
                  <p>Bits per char: {sys.bits}</p>
                  <p>Max chars: {sys.chars}</p>
                </div>
                
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg min-h-[100px] flex flex-col items-center justify-center">
                  {codes ? (
                    sys.id === 'ascii' ? (
                      codes.ascii ? <span className="text-2xl font-mono">{codes.ascii.hex} (Hex)</span> : <span className="text-slate-500 text-sm">Not supported</span>
                    ) : sys.id === 'utf8' ? (
                      <span className="text-xl font-mono">U+{codes.unicode.hex}</span>
                    ) : (
                      codes.ebcdic ? <span className="text-2xl font-mono">{codes.ebcdic.hex} (Hex)</span> : <span className="text-slate-500 text-sm">Not supported</span>
                    )
                  ) : <span className="text-slate-400">Enter a char</span>}
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <Card className="p-8 bg-white dark:bg-slate-900 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Match Character to ASCII Decimal</h2>
          <div className="flex flex-col md:flex-row justify-between gap-12">
            
            {/* Sources */}
            <div className="flex-1 space-y-4">
              <h3 className="text-lg font-semibold text-center mb-4 text-slate-600">Characters</h3>
              {gameItems.sources.map(src => {
                const isMatched = !!matches[src.id];
                const isSelected = selectedSource === src.id;
                
                return (
                  <button
                    key={src.id}
                    disabled={isMatched}
                    onClick={() => setSelectedSource(src.id)}
                    className={`w-full p-4 text-xl font-bold rounded-xl transition-all ${
                      isMatched ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 opacity-50 cursor-not-allowed' :
                      isSelected ? 'bg-blue-500 text-white shadow-lg scale-105' :
                      'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {src.value}
                  </button>
                )
              })}
            </div>

            {/* Targets */}
            <div className="flex-1 space-y-4">
              <h3 className="text-lg font-semibold text-center mb-4 text-slate-600">ASCII Decimal</h3>
              {gameItems.targets.map(tgt => {
                const isMatched = Object.values(matches).includes(tgt.id);
                const isTargeted = selectedSource && !isMatched;
                
                return (
                  <button
                    key={tgt.id}
                    disabled={isMatched || !selectedSource}
                    onClick={() => handleTargetClick(tgt.id)}
                    className={`w-full p-4 text-xl font-mono rounded-xl transition-all ${
                      isMatched ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 opacity-50 border-2 border-green-500' :
                      isTargeted ? 'bg-slate-50 dark:bg-slate-950 border-2 border-dashed border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer' :
                      'bg-slate-100 dark:bg-slate-800 cursor-not-allowed opacity-70'
                    } ${feedback === 'wrong' && selectedSource === tgt.matches ? 'animate-pulse bg-red-100' : ''}`}
                  >
                    {tgt.value}
                  </button>
                )
              })}
            </div>

          </div>
          
          {Object.keys(matches).length === gameItems.sources.length && (
            <div className="mt-12 text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">Round Complete!</h3>
              <p className="text-green-800 dark:text-green-200">+50 XP Awarded</p>
              <Button className="mt-4" onClick={() => { setMatches({}); setSelectedSource(null); }}>Play Again</Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
