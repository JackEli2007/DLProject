import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useProgress } from '../context/ProgressContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

const finalChallengeSteps = [
  {
    id: 'fc-1',
    title: 'JK Flip-Flop Prediction',
    type: 'multiple-choice',
    question: 'A JK Flip-Flop is currently in state Q=0. The inputs J=1 and K=0 are applied. What happens on the next clock pulse?',
    options: [
      { id: 'a', text: 'It remains 0 (Hold)' },
      { id: 'b', text: 'It becomes 1 (Set)' },
      { id: 'c', text: 'It toggles to 1' },
      { id: 'd', text: 'It resets to 0' }
    ],
    correctAnswer: 'b',
    explanation: 'J=1 and K=0 is the SET condition. The output Q will become 1.'
  },
  {
    id: 'fc-2',
    title: 'Identify Race-Around',
    type: 'multiple-choice',
    question: 'Which of the following conditions causes the Race-Around condition in a level-triggered JK Flip-Flop?',
    options: [
      { id: 'a', text: 'J=1, K=1 and clock pulse width > propagation delay' },
      { id: 'b', text: 'J=0, K=0 and clock pulse width < propagation delay' },
      { id: 'c', text: 'J=1, K=0 and clock pulse width > propagation delay' },
      { id: 'd', text: 'Master-Slave configuration with J=1, K=1' }
    ],
    correctAnswer: 'a',
    explanation: 'When J=1, K=1, the output toggles. If the clock remains high longer than the propagation delay, it will toggle multiple times.'
  },
  {
    id: 'fc-3',
    title: 'Character Code Conversion',
    type: 'interactive-convert',
    question: 'Convert the decimal ASCII value 65 to Binary.',
    correctAnswer: '01000001',
    explanation: 'Decimal 65 is 64 + 1, which corresponds to binary 01000001. This is the ASCII code for "A".'
  },
  {
    id: 'fc-4',
    title: 'BCD vs Binary',
    type: 'multiple-choice',
    question: 'How is the decimal number 59 represented in BCD (Binary-Coded Decimal)?',
    options: [
      { id: 'a', text: '0011 1011 (Normal binary 59)' },
      { id: 'b', text: '0101 1001 (5 and 9)' },
      { id: 'c', text: '1001 0101 (9 and 5)' },
      { id: 'd', text: '0101 1111 (5 and F)' }
    ],
    correctAnswer: 'b',
    explanation: 'In BCD, each decimal digit is encoded separately using 4 bits. 5 is 0101, and 9 is 1001. So 59 is 0101 1001.'
  }
];

export default function Challenges() {
  const { awardXP, unlockAchievement } = useProgress();
  const { addToast } = useToast();
  const navigate = useNavigate();
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  // Custom states for interactive challenges
  const [inputValue, setInputValue] = useState('');

  const step = finalChallengeSteps[currentStepIndex];

  const handleAnswer = (answer) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    
    const isCorrect = answer === step.correctAnswer;
    if (isCorrect) {
      setScore(s => s + 1);
      awardXP(30);
      addToast('Correct! +30 XP', 'success');
    } else {
      addToast('Not quite.', 'error');
    }
    
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentStepIndex < finalChallengeSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setInputValue('');
    } else {
      setIsComplete(true);
      unlockAchievement('logic-master');
      awardXP(100);
      addToast('Challenge Complete! +100 XP', 'success');
    }
  };

  if (isComplete) {
    return (
      <div className="w-full max-w-3xl mx-auto p-4 md:p-8 text-center space-y-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4">
          DIGITAL LOGIC LAB COMPLETE
        </h1>
        <Card className="p-8 bg-slate-900/80 border-blue-500/50 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)] text-slate-100">
          <div className="space-y-4 mb-8">
            <h2 className="text-2xl font-bold">Challenge Results</h2>
            <div className="text-6xl mb-4 font-mono text-cyan-400">{score} / {finalChallengeSteps.length}</div>
            <p className="text-slate-300">You have completed the Final Interactive Challenge!</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left">
            <div className="bg-slate-800 p-4 rounded-lg flex items-center justify-between">
              <span>JK Flip-Flop</span>
              <span className="text-green-400 text-xl">✓</span>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg flex items-center justify-between">
              <span>Race-Around</span>
              <span className="text-green-400 text-xl">✓</span>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg flex items-center justify-between">
              <span>Character Codes</span>
              <span className="text-green-400 text-xl">✓</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" onClick={() => navigate('/progress')}>View Progress & Badges</Button>
            <Button variant="primary" onClick={() => navigate('/')}>Return Home</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Final Challenge</h1>
          <p className="text-slate-600 dark:text-slate-400">Combine all your knowledge to solve these problems.</p>
        </div>
        <div className="text-slate-500 font-mono">
          Step {currentStepIndex + 1} of {finalChallengeSteps.length}
        </div>
      </div>

      <Card className="p-6 md:p-8">
        <h2 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-100">{step.title}</h2>
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">{step.question}</p>

        {step.type === 'multiple-choice' && (
          <div className="space-y-4">
            {step.options.map(opt => {
              const isSelected = selectedAnswer === opt.id;
              const isCorrect = opt.id === step.correctAnswer;
              
              let style = "border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800";
              if (showResult) {
                if (isCorrect) style = "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300";
                else if (isSelected && !isCorrect) style = "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300";
                else style = "border-slate-300 dark:border-slate-700 opacity-50";
              } else if (isSelected) {
                style = "border-blue-500 ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20";
              }

              return (
                <button
                  key={opt.id}
                  disabled={showResult}
                  onClick={() => handleAnswer(opt.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${style}`}
                >
                  <span className="font-semibold">{opt.id.toUpperCase()}.</span> {opt.text}
                </button>
              );
            })}
          </div>
        )}

        {step.type === 'interactive-convert' && (
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <input
                type="text"
                value={inputValue}
                disabled={showResult}
                onChange={(e) => setInputValue(e.target.value.replace(/[^01]/g, '').slice(0, 8))}
                placeholder="00000000"
                className="text-4xl text-center p-4 w-64 font-mono tracking-widest border-2 border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-sm text-slate-500 mt-2">Enter 8 bits (0s and 1s)</p>
            </div>
            
            {!showResult && (
              <div className="flex justify-center">
                <Button onClick={() => handleAnswer(inputValue)} disabled={inputValue.length < 8}>
                  Submit Answer
                </Button>
              </div>
            )}
            
            {showResult && (
              <div className={`p-4 rounded-xl border ${selectedAnswer === step.correctAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'}`}>
                {selectedAnswer === step.correctAnswer ? 'Correct!' : `Incorrect. You entered ${selectedAnswer || 'nothing'}.`}
              </div>
            )}
          </div>
        )}

        {showResult && (
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 animate-fadeIn">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Explanation:</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">{step.explanation}</p>
            <Button variant="primary" onClick={handleNext} className="w-full sm:w-auto">
              {currentStepIndex < finalChallengeSteps.length - 1 ? 'Next Challenge' : 'Complete Lab'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
