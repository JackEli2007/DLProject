import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import PredictionPrompt from '../../components/quiz/PredictionPrompt';
import { useProgress } from '../../context/ProgressContext';
import { useToast } from '../../context/ToastContext';
import { jkLessons } from '../../data/jkLessons';

export default function JKLessons() {
  const [currentStep, setCurrentStep] = useState(0);
  const { progress, awardXP, completeLesson, unlockAchievement } = useProgress();
  const { success } = useToast();
  const navigate = useNavigate();

  const lesson = jkLessons?.[currentStep] || {
    title: 'Loading...',
    blocks: []
  };

  const handleNext = () => {
    if (currentStep < jkLessons.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      completeLesson('jk-flip-flop');
      awardXP(100);
      success('Lesson Completed! +100 XP');
      navigate('/jkflipflop/simulator');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(s => s - 1);
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
      <aside className="w-full md:w-64 flex-shrink-0">
        <Card className="p-4 sticky top-4">
          <h2 className="text-xl font-bold text-slate-100 mb-4">Lessons</h2>
          <ul className="space-y-2">
            {jkLessons.map((l, idx) => (
              <li 
                key={idx}
                className={`p-2 rounded cursor-pointer text-sm ${idx === currentStep ? 'bg-blue-600/20 text-blue-400 font-bold border border-blue-500/50' : 'text-slate-400 hover:bg-slate-800'}`}
                onClick={() => setCurrentStep(idx)}
              >
                {idx + 1}. {l.title}
              </li>
            ))}
          </ul>
        </Card>
      </aside>

      <main className="flex-1">
        <Card className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-slate-100">{lesson.title}</h1>
            <Badge variant="info">Step {currentStep + 1} of {jkLessons.length}</Badge>
          </div>

          <div className="space-y-6 text-slate-300">
            {lesson.blocks.map((block, idx) => {
              if (block.type === 'explain') return <p key={idx} className="text-lg leading-relaxed">{block.content}</p>;
              if (block.type === 'keypoint') return <div key={idx} className="p-4 bg-yellow-500/10 border-l-4 border-yellow-500 rounded text-yellow-100">{block.content}</div>;
              if (block.type === 'predict') return (
                 <PredictionPrompt 
                   key={idx}
                   question={block.question}
                   options={block.options}
                   correctAnswer={block.correctAnswer}
                   onVerify={(isCorrect) => {
                     if(isCorrect) awardXP(10);
                   }}
                 />
              );
              if (block.type === 'interact') return (
                <div key={idx} className="p-4 border border-slate-700 rounded-lg bg-slate-800/50">
                  <p className="text-sm text-slate-400 mb-2">Interactive Demo:</p>
                  {/* Inline demo would go here based on block.demoId */}
                  <div className="h-32 flex items-center justify-center text-slate-500 italic border border-dashed border-slate-600 rounded">Interactive Demo placeholder</div>
                </div>
              );
              return null;
            })}
          </div>

          <div className="mt-12 pt-6 border-t border-slate-700 flex justify-between">
            <Button variant="secondary" onClick={handlePrev} disabled={currentStep === 0}>Previous</Button>
            <Button variant="primary" onClick={handleNext}>
              {currentStep === jkLessons.length - 1 ? 'Finish Lesson' : 'Next Step'}
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
