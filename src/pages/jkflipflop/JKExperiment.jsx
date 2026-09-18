import React, { useState } from 'react';
import { createJKFlipFlop, clockPulse } from '../../simulations/jkFlipFlop';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import PredictionPrompt from '../../components/quiz/PredictionPrompt';
import CircuitDiagram from '../../components/simulation/CircuitDiagram';
import ProgressBar from '../../components/ui/ProgressBar';
import { useProgress } from '../../context/ProgressContext';

const experiments = [
  { j: 1, k: 0, initialQ: 0, question: 'Set J=1, K=0. Starting Q=0. What will Q become?', correct: 1 },
  { j: 0, k: 0, initialQ: 1, question: 'Set J=0, K=0. Starting Q=1. What will Q become?', correct: 1 },
  { j: 0, k: 1, initialQ: 1, question: 'Set J=0, K=1. Starting Q=1. What will Q become?', correct: 0 },
  { j: 1, k: 1, initialQ: 0, question: 'Set J=1, K=1. Starting Q=0. What will Q become?', correct: 1 },
  { j: 1, k: 1, initialQ: 1, question: 'Set J=1, K=1. Starting Q=1. What will Q become?', correct: 0 },
  { j: 0, k: 0, initialQ: 0, question: 'Set J=0, K=0. Starting Q=0. What will Q become?', correct: 0 },
  { j: 1, k: 0, initialQ: 1, question: 'Set J=1, K=0. Starting Q=1. What will Q become?', correct: 1 },
  { j: 0, k: 1, initialQ: 0, question: 'Set J=0, K=1. Starting Q=0. What will Q become?', correct: 0 },
  { j: 1, k: 0, initialQ: 0, followUp: { j: 1, k: 1 }, question: 'Apply J=1,K=0 then J=1,K=1. What is final Q?', correct: 0 },
  { j: 0, k: 1, initialQ: 1, followUp: { j: 1, k: 0 }, question: 'Apply J=0,K=1 then J=1,K=0. What is final Q?', correct: 1 },
  { j: 1, k: 1, initialQ: 0, followUp: { j: 1, k: 1 }, question: 'Apply TOGGLE twice from Q=0. What is final Q?', correct: 0 },
  { j: 1, k: 1, initialQ: 1, followUp: { j: 0, k: 0 }, question: 'Apply TOGGLE then HOLD from Q=1. What is final Q?', correct: 0 },
  { j: 0, k: 1, initialQ: 0, followUp: { j: 0, k: 0 }, question: 'Apply RESET then HOLD. What is final Q?', correct: 0 },
];

export default function JKExperiment() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState('predict'); // predict, verify, done
  const [simResult, setSimResult] = useState(null);
  
  const { awardXP, progress } = useProgress();

  const experiment = experiments[currentIndex];

  const handlePredict = (prediction) => {
    // Run simulation
    let ff = createJKFlipFlop();
    ff.q = experiment.initialQ;
    ff.qBar = experiment.initialQ === 1 ? 0 : 1;
    
    ff = clockPulse(ff, experiment.j, experiment.k);
    if (experiment.followUp) {
      ff = clockPulse(ff, experiment.followUp.j, experiment.followUp.k);
    }
    
    setSimResult(ff.q);
    
    if (prediction === experiment.correct) {
      setScore(s => s + 1);
      awardXP(15);
    }
    
    setPhase('verify');
  };

  const nextExperiment = () => {
    if (currentIndex < experiments.length - 1) {
      setCurrentIndex(i => i + 1);
      setPhase('predict');
      setSimResult(null);
    } else {
      setPhase('done');
    }
  };

  if (phase === 'done') {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <Card className="p-8 text-center">
          <h2 className="text-3xl font-bold text-slate-100 mb-4">Experiment Complete!</h2>
          <p className="text-xl text-slate-300 mb-8">You scored {score} out of {experiments.length}</p>
          <Button onClick={() => { setCurrentIndex(0); setScore(0); setPhase('predict'); }}>Retry</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-100">Guided Experiments</h1>
        <div className="flex items-center gap-4">
          <div className="text-slate-400 font-medium">Score: {score} / {experiments.length}</div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
            <span className="text-amber-400">⚡</span>
            <span className="text-sm font-bold text-amber-300">
              {progress.xp} XP
            </span>
            <span className="text-xs font-semibold text-amber-500/80 bg-amber-500/10 px-2 py-0.5 rounded-full ml-1">
              Lv.{progress.level}
            </span>
          </div>
        </div>
      </div>
      
      <ProgressBar progress={(currentIndex / experiments.length) * 100} />

      <Card className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/3 flex justify-center">
            <CircuitDiagram 
              j={experiment.followUp && phase==='verify' ? experiment.followUp.j : experiment.j} 
              k={experiment.followUp && phase==='verify' ? experiment.followUp.k : experiment.k} 
              clock={phase === 'verify' ? 1 : 0} 
              q={phase === 'verify' ? simResult : experiment.initialQ} 
              qBar={phase === 'verify' ? (simResult === 1 ? 0 : 1) : (experiment.initialQ === 1 ? 0 : 1)} 
            />
          </div>
          
          <div className="w-full md:w-2/3">
            <PredictionPrompt 
              key={currentIndex}
              question={experiment.question}
              options={[
                { label: 'Q = 0', value: 0 },
                { label: 'Q = 1', value: 1 }
              ]}
              correctAnswer={experiment.correct}
              onPredict={handlePredict}
              simulationResult={simResult}
            />
            
            {phase === 'verify' && (
              <div className="mt-6 flex justify-end">
                <Button onClick={nextExperiment}>Next Experiment</Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
