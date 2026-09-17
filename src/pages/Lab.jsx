import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const LABS = [
  { id: 'jk-simulator', title: 'JK Flip-Flop Simulator', desc: 'Interactive basic simulator for the JK Flip-Flop logic.', path: '/lab/jk-simulator', module: 'JK Flip-Flop', color: 'blue' },
  { id: 'jk-experiment', title: 'JK Experiment Mode', desc: 'Experiment freely with clock signals and inputs.', path: '/lab/jk-experiment', module: 'JK Flip-Flop', color: 'blue' },
  { id: 'race-around', title: 'Race-Around Simulation', desc: 'Visualize the race-around condition visually.', path: '/lab/race-around', module: 'JK Flip-Flop', color: 'blue' },
  { id: 'master-slave', title: 'Master-Slave Comparison', desc: 'Compare standard JK with Master-Slave configuration.', path: '/lab/master-slave', module: 'JK Flip-Flop', color: 'blue' },
  { id: 'char-explorer', title: 'Character Code Explorer', desc: 'Explore raw binary and hex for characters.', path: '/lab/char-explorer', module: 'Char Codes', color: 'cyan' },
  { id: 'ascii-explorer', title: 'ASCII Table Explorer', desc: 'Interactive ASCII table visualization.', path: '/lab/ascii-explorer', module: 'Char Codes', color: 'cyan' },
  { id: 'unicode-explorer', title: 'Unicode Explorer', desc: 'Browse the vast space of Unicode characters.', path: '/lab/unicode-explorer', module: 'Char Codes', color: 'cyan' },
  { id: 'utf8-visualizer', title: 'UTF-8 Visualizer', desc: 'See how characters are encoded into UTF-8 bytes.', path: '/lab/utf8-visualizer', module: 'Char Codes', color: 'cyan' },
  { id: 'converter', title: 'Universal Converter', desc: 'Convert between text, binary, hex, and dec.', path: '/lab/converter', module: 'Char Codes', color: 'cyan' },
  { id: 'comparison', title: 'Encoding Comparison', desc: 'Compare different encodings side-by-side.', path: '/lab/comparison', module: 'Char Codes', color: 'cyan' },
];

const Lab = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Laboratory Hub</h1>
        <p className="text-slate-600 dark:text-slate-400">Freely explore all the interactive simulators and visualizations.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {LABS.map((lab) => (
          <Card 
            key={lab.id} 
            className="flex flex-col cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all dark:hover:border-slate-500"
            onClick={() => navigate(lab.path)}
          >
            <div className="p-5 flex flex-col h-full">
              <div className="mb-3">
                <Badge variant={lab.color === 'blue' ? 'primary' : 'success'}>{lab.module}</Badge>
              </div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-2">{lab.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 flex-1">{lab.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Lab;
