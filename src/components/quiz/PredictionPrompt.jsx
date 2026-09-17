import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const PredictionPrompt = ({ question, options, correctAnswer, onPredict, onVerify, simulationResult }) => {
  const [phase, setPhase] = useState(0); // 0: Predict, 1: Verify, 2: Result
  const [prediction, setPrediction] = useState(null);

  const handlePredict = (id) => {
    setPrediction(id);
    onPredict && onPredict(id);
    setPhase(1);
  };

  const handleVerify = () => {
    onVerify && onVerify();
    setPhase(2);
  };

  const isCorrect = prediction === correctAnswer;

  return (
    <Card className="border-l-4 border-l-purple-500">
      <div className="mb-4 flex justify-between items-center">
        <Badge variant="info">Experiment Mode</Badge>
        <span className="text-sm font-semibold text-slate-500">
          {phase === 0 ? 'Step 1: Predict' : phase === 1 ? 'Step 2: Simulate' : 'Step 3: Verify'}
        </span>
      </div>

      <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-4">
        {question}
      </h3>

      {phase === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handlePredict(opt.id)}
              className="p-3 text-center border-2 border-slate-200 dark:border-slate-700 rounded-lg hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all font-medium text-slate-700 dark:text-slate-200"
            >
              {opt.text}
            </button>
          ))}
        </div>
      )}

      {phase === 1 && (
        <div className="flex flex-col items-center justify-center py-6">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            You predicted: <strong className="text-slate-800 dark:text-white">{options.find(o => o.id === prediction)?.text}</strong>
          </p>
          <p className="text-sm text-slate-500 mb-6 text-center max-w-sm">
            Now, use the simulation tools to test your prediction. When you have the result, click Verify.
          </p>
          <Button variant="primary" onClick={handleVerify}>
            Verify Result
          </Button>
        </div>
      )}

      {phase === 2 && (
        <div className={`p-6 rounded-lg text-center ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
            {isCorrect ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          <h4 className={`text-xl font-bold mb-2 ${isCorrect ? 'text-emerald-800 dark:text-emerald-400' : 'text-red-800 dark:text-red-400'}`}>
            {isCorrect ? 'Prediction Correct!' : 'Prediction Incorrect'}
          </h4>
          <p className="text-slate-600 dark:text-slate-300">
            {simulationResult || `The correct answer was: ${options.find(o => o.id === correctAnswer)?.text}`}
          </p>
          <Button variant="ghost" className="mt-4" onClick={() => setPhase(0)}>
            Try Another
          </Button>
        </div>
      )}
    </Card>
  );
};

export default PredictionPrompt;
