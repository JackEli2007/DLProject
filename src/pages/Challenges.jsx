import React from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { useProgress } from '../context/ProgressContext';
import { challenges } from '../data/challenges';
import { useNavigate } from 'react-router-dom';

const Challenges = () => {
  const { progress } = useProgress();
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Challenges</h1>
        <p className="text-slate-600 dark:text-slate-400">Put your skills to the test with these logic challenges.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(challenges || []).map((challenge) => {
          const isCompleted = progress?.completedChallenges?.includes(challenge.id);
          
          return (
            <Card key={challenge.id} className="flex flex-col border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant={challenge.difficulty === 'Hard' ? 'danger' : challenge.difficulty === 'Medium' ? 'warning' : 'success'}>
                    {challenge.difficulty}
                  </Badge>
                  {isCompleted && <span className="text-xl" title="Completed">🏆</span>}
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">{challenge.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 flex-1 mb-6">{challenge.description}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700 mt-auto">
                  <span className="font-semibold text-amber-500">+{challenge.xpReward} XP</span>
                  <Button 
                    variant={isCompleted ? 'outline' : 'primary'} 
                    onClick={() => navigate(`/challenges/${challenge.id}`)}
                  >
                    {isCompleted ? 'Replay' : 'Start Challenge'}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Challenges;
