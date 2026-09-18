import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const TOPICS = [
  {
    id: 'jk-flipflop',
    title: 'JK Flip-Flop',
    subtitle: 'Sequential Logic & Memory Elements',
    color: 'blue',
    gradient: 'from-blue-600 to-cyan-500',
    borderColor: 'border-blue-500/30',
    bgColor: 'from-blue-900/30 to-slate-900',
    examples: [
      { emoji: '🚦', title: 'Traffic Light Controller', desc: 'Traffic lights cycle through Red → Green → Yellow using JK flip-flops. Each clock pulse advances to the next state — the flip-flop "remembers" which light is currently on.', path: '/lab/jk-simulator' },
      { emoji: '⏰', title: 'Digital Clock', desc: 'A 32,768 Hz crystal oscillator is divided down using cascaded JK flip-flops in toggle mode (J=K=1). Each flip-flop halves the frequency — 15 stages produce a 1 Hz pulse (1 second).', path: '/lab/jk-simulator' },
      { emoji: '💾', title: 'Computer RAM', desc: 'Every bit in your computer\'s memory is a flip-flop. 8 GB RAM = 64 billion flip-flops, each storing either 0 or 1. SET (J=1,K=0) writes a 1, RESET (J=0,K=1) writes a 0.', path: '/lab/jk-experiment' },
    ],
    labs: [
      { path: '/lab/jk-simulator', title: '🔬 JK Simulator', desc: 'Interactive circuit with toggle switches, LEDs, truth table & live timing diagram' },
      { path: '/lab/jk-experiment', title: '🧪 Guided Experiments', desc: 'Predict-then-verify: guess the output, then run the simulation to check' },
    ]
  },
  {
    id: 'race-around',
    title: 'Race-Around Condition',
    subtitle: 'Timing Hazards & Master-Slave Solution',
    color: 'amber',
    gradient: 'from-red-500 to-amber-500',
    borderColor: 'border-amber-500/30',
    bgColor: 'from-red-900/20 to-slate-900',
    examples: [
      { emoji: '🏗️', title: 'Glitchy Elevator Controller', desc: 'Old elevators used level-triggered flip-flops. If the clock pulse lasted too long while J=K=1, the floor counter would toggle multiple times — the elevator might skip floors or oscillate between them!', path: '/lab/race-around' },
      { emoji: '🏭', title: 'Industrial Safety Interlock', desc: 'Factory machines have safety interlocks using flip-flops. Race-around in a level-triggered latch could cause the safety signal to oscillate — briefly restarting a machine while a guard door is open.', path: '/lab/race-around' },
      { emoji: '🔧', title: 'The Master-Slave Fix', desc: 'Engineers solved race-around by splitting the flip-flop into two stages: Master captures input on CLK HIGH (slave locked), then Slave copies output on CLK LOW (master locked). Output changes exactly once per cycle.', path: '/lab/master-slave' },
    ],
    labs: [
      { path: '/lab/race-around', title: '⚡ Race-Around Simulation', desc: 'Drag the pulse width slider into the danger zone and watch the output toggle uncontrollably' },
      { path: '/lab/master-slave', title: '🔌 Master-Slave Comparison', desc: 'Live circuit diagram comparing level-triggered (broken) vs master-slave (correct) with timing diagrams' },
    ]
  },
  {
    id: 'char-codes',
    title: 'Character Codes',
    subtitle: 'ASCII, Unicode & UTF-8 Encoding',
    color: 'cyan',
    gradient: 'from-cyan-500 to-teal-400',
    borderColor: 'border-cyan-500/30',
    bgColor: 'from-cyan-900/20 to-slate-900',
    examples: [
      { emoji: '⌨️', title: 'Typing on a Keyboard', desc: 'When you press "A", the keyboard sends ASCII code 65 (binary 01000001) to the CPU. Lowercase "a" is 97 (01100001) — just 1 bit different! That\'s why case conversion is so fast.', path: '/lab/converter' },
      { emoji: '😀', title: 'Emojis in Messages', desc: 'The 😀 emoji is Unicode U+1F600. In UTF-8, it takes 4 bytes: F0 9F 98 80. Your phone encodes it, sends it, and the recipient\'s phone decodes the same 4 bytes back into 😀.', path: '/lab/char-explorer' },
      { emoji: '🌐', title: 'Every Web Page', desc: 'Every website declares <meta charset="UTF-8"> in its HTML. Without this, the browser wouldn\'t know how to decode the bytes into readable text — you\'d see garbled "mojibake" instead.', path: '/lab/ascii-explorer' },
    ],
    labs: [
      { path: '/lab/char-explorer', title: '🔍 Character Explorer', desc: 'Type any character to see its ASCII decimal, hex, binary, Unicode code point, and UTF-8 bytes' },
      { path: '/lab/ascii-explorer', title: '📊 ASCII Table', desc: 'Full interactive 128-character ASCII table with categories, search, and binary display' },
      { path: '/lab/unicode-explorer', title: '🌍 Unicode Explorer', desc: 'Browse Unicode blocks: Latin, Greek, CJK, Emoji, Mathematical symbols and more' },
      { path: '/lab/utf8-visualizer', title: '🔢 UTF-8 Visualizer', desc: 'See how each character is encoded byte-by-byte into 1, 2, 3, or 4 UTF-8 bytes' },
      { path: '/lab/converter', title: '🔄 Universal Converter', desc: 'Convert freely between text, binary, hexadecimal, and decimal representations' },
      { path: '/lab/comparison', title: '⚖️ Encoding Comparison', desc: 'Compare ASCII vs Unicode vs UTF-8 vs EBCDIC side by side' },
    ]
  }
];

const Lab = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-7xl mx-auto space-y-10">
      {/* Hero */}
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-sm font-medium text-blue-400">Interactive Simulations</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 mb-3">
          Digital Logic Laboratory
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Explore real-world applications of digital electronics through hands-on interactive simulations. 
          Click any lab below to start experimenting.
        </p>
      </div>

      {/* Topics */}
      {TOPICS.map((topic) => (
        <div key={topic.id} className="space-y-4">
          {/* Topic Header */}
          <div className="flex items-center gap-4">
            <div className={`h-1 flex-1 rounded bg-gradient-to-r ${topic.gradient} opacity-30`} />
            <h2 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${topic.gradient}`}>
              {topic.title}
            </h2>
            <div className={`h-1 flex-1 rounded bg-gradient-to-r ${topic.gradient} opacity-30`} />
          </div>
          <p className="text-center text-slate-400 text-sm -mt-2 mb-4">{topic.subtitle}</p>

          {/* Real-Life Examples */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topic.examples.map((ex, i) => (
              <button key={i} onClick={() => navigate(ex.path)} className={`text-left p-5 bg-gradient-to-br ${topic.bgColor} rounded-xl border ${topic.borderColor} hover:scale-[1.02] transition-transform cursor-pointer group`}>
                <div className="text-3xl mb-3">{ex.emoji}</div>
                <h3 className="text-sm font-bold text-slate-200 mb-2 group-hover:text-white transition-colors">{ex.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{ex.desc}</p>
              </button>
            ))}
          </div>

          {/* Lab Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {topic.labs.map((lab) => (
              <button
                key={lab.path}
                onClick={() => navigate(lab.path)}
                className={`text-left p-4 rounded-xl bg-slate-800/60 border ${topic.borderColor} hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer`}
              >
                <h4 className="font-bold text-slate-100 group-hover:text-white mb-1">{lab.title}</h4>
                <p className="text-xs text-slate-400 group-hover:text-slate-300">{lab.desc}</p>
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Footer */}
      <div className="text-center py-6 border-t border-slate-800">
        <p className="text-sm text-slate-500">
          Digital Logic Lab • Interactive Educational Simulations • JK Flip-Flop • Race-Around • Character Codes
        </p>
      </div>
    </div>
  );
};

export default Lab;
