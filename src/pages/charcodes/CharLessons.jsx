import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { charLessons } from '../../data/charLessons';
import { useProgress } from '../../context/ProgressContext';
import { useToast } from '../../context/ToastContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ProgressBar from '../../components/ui/ProgressBar';

export default function CharLessons() {
  const navigate = useNavigate();
  const { progress, updateProgress } = useProgress();
  const { addToast } = useToast();
  const [currentLessonIndex, setCurrentLessonIndex] = useState(
    progress?.charCodes?.currentLesson || 0
  );

  const lesson = charLessons[currentLessonIndex] || charLessons[0];
  
  if (!lesson) {
    return <div className="p-8 text-center text-slate-800 dark:text-slate-200">No lessons available.</div>;
  }

  const handleNext = () => {
    if (currentLessonIndex < charLessons.length - 1) {
      const nextIndex = currentLessonIndex + 1;
      setCurrentLessonIndex(nextIndex);
      updateProgress('charCodes', { currentLesson: nextIndex });
    } else {
      updateProgress('charCodes', { completed: true });
      addToast('Character Codes Module Completed!', 'success');
      navigate('/');
    }
  };

  const handlePrev = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Sidebar */}
      <aside className="md:w-1/4 flex-shrink-0">
        <Card className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-slate-100">Lessons</h2>
          <nav className="flex flex-col gap-2">
            {charLessons.map((l, idx) => (
              <button
                key={l.id}
                onClick={() => setCurrentLessonIndex(idx)}
                className={`text-left px-3 py-2 rounded transition-colors ${
                  idx === currentLessonIndex
                    ? 'bg-blue-500 text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {idx + 1}. {l.title}
              </button>
            ))}
          </nav>
        </Card>
      </aside>

      {/* Main Content */}
      <main className="md:w-3/4 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            {lesson.title}
          </h1>
          <div className="w-1/3">
            <ProgressBar 
              value={currentLessonIndex + 1} 
              max={charLessons.length} 
              label={`Lesson ${currentLessonIndex + 1} of ${charLessons.length}`}
            />
          </div>
        </div>

        <Card className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
          <div className="prose dark:prose-invert max-w-none">
            {(lesson.content || []).map((block, idx) => {
              if (block.type === 'explain') {
                return (
                  <div key={idx} className="mb-6">
                    <h3 className="text-xl font-bold mb-2">{block.title}</h3>
                    <p className="text-lg">{block.text}</p>
                  </div>
                );
              }
              if (block.type === 'keypoint') {
                return (
                  <div key={idx} className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-4 rounded-r">
                    <strong className="text-blue-700 dark:text-blue-300">Key Point: </strong>
                    {block.text}
                  </div>
                );
              }
              if (block.type === 'interact' || block.type === 'practice') {
                return (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-4 text-center border border-slate-200 dark:border-slate-700">
                    <p className="mb-4 font-medium text-slate-700 dark:text-slate-300">Try It: {block.instruction}</p>
                    <Button variant="outline" onClick={() => navigate('/lab/converter')}>Open Converter</Button>
                  </div>
                );
              }
              if (block.type === 'predict') {
                return (
                  <div key={idx} className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 p-4 rounded-lg mb-4">
                    <p className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Question:</p>
                    <p className="text-amber-900 dark:text-amber-100">{block.question}</p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </Card>

        <div className="flex justify-between items-center mt-4">
          <Button 
            onClick={handlePrev} 
            disabled={currentLessonIndex === 0}
            variant="secondary"
          >
            Previous
          </Button>
          <Button onClick={handleNext} variant="primary">
            {currentLessonIndex < charLessons.length - 1 ? 'Next Lesson' : 'Complete Module'}
          </Button>
        </div>
      </main>
    </div>
  );
}
