import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { STORAGE_KEYS, DEFAULT_PROGRESS, LEVEL_THRESHOLDS } from '../utils/constants.js';

const ProgressContext = createContext(null);

const loadProgress = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to handle new fields added in updates
      return { ...DEFAULT_PROGRESS, ...parsed, modules: { ...DEFAULT_PROGRESS.modules, ...parsed.modules } };
    }
  } catch { /* corrupted storage */ }
  return { ...DEFAULT_PROGRESS };
};

const saveProgress = (progress) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  } catch { /* storage full */ }
};

const calculateLevel = (xp) => {
  let level = 1;
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
      break;
    }
  }
  return level;
};

const getXPForNextLevel = (level) => {
  if (level >= LEVEL_THRESHOLDS.length) return null;
  return LEVEL_THRESHOLDS[level];
};

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(loadProgress);

  // Persist to localStorage on every change
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const awardXP = useCallback((amount, reason = '') => {
    setProgress((prev) => {
      const newXP = prev.xp + amount;
      const newLevel = calculateLevel(newXP);
      const leveledUp = newLevel > prev.level;
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        lastActivity: new Date().toISOString(),
        _lastXPGain: { amount, reason, leveledUp, newLevel },
      };
    });
  }, []);

  const completeLesson = useCallback((moduleId, lessonIndex) => {
    setProgress((prev) => {
      const mod = prev.modules[moduleId];
      if (!mod || mod.completed.includes(lessonIndex)) return prev;
      const newCompleted = [...mod.completed, lessonIndex];
      const nextLesson = lessonIndex + 1;
      const newUnlocked = mod.unlocked.includes(nextLesson)
        ? mod.unlocked
        : [...mod.unlocked, nextLesson];
      return {
        ...prev,
        modules: {
          ...prev.modules,
          [moduleId]: {
            ...mod,
            completed: newCompleted,
            currentLesson: Math.max(mod.currentLesson, nextLesson),
            unlocked: newUnlocked,
          },
        },
        totalLessonsCompleted: prev.totalLessonsCompleted + 1,
        lastActivity: new Date().toISOString(),
      };
    });
  }, []);

  const saveQuizScore = useCallback((quizId, score, total) => {
    setProgress((prev) => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [quizId]: { score, total, date: new Date().toISOString() },
      },
      totalQuizzesTaken: prev.totalQuizzesTaken + 1,
      lastActivity: new Date().toISOString(),
    }));
  }, []);

  const saveChallengeScore = useCallback((challengeId, score) => {
    setProgress((prev) => ({
      ...prev,
      challengeScores: {
        ...prev.challengeScores,
        [challengeId]: { score, date: new Date().toISOString() },
      },
      totalChallengesCompleted: prev.totalChallengesCompleted + 1,
      lastActivity: new Date().toISOString(),
    }));
  }, []);

  const unlockAchievement = useCallback((achievementId) => {
    setProgress((prev) => {
      if (prev.achievements.includes(achievementId)) return prev;
      return {
        ...prev,
        achievements: [...prev.achievements, achievementId],
        lastActivity: new Date().toISOString(),
      };
    });
  }, []);

  const getModuleProgress = useCallback((moduleId, totalLessons) => {
    const mod = progress.modules[moduleId];
    if (!mod) return 0;
    return totalLessons > 0 ? Math.round((mod.completed.length / totalLessons) * 100) : 0;
  }, [progress]);

  const resetProgress = useCallback(() => {
    setProgress({ ...DEFAULT_PROGRESS });
  }, []);

  const xpForNextLevel = getXPForNextLevel(progress.level);
  const xpInCurrentLevel = progress.level > 1 ? LEVEL_THRESHOLDS[progress.level - 1] : 0;
  const xpProgress = xpForNextLevel
    ? Math.round(((progress.xp - xpInCurrentLevel) / (xpForNextLevel - xpInCurrentLevel)) * 100)
    : 100;

  return (
    <ProgressContext.Provider
      value={{
        progress,
        awardXP,
        completeLesson,
        saveQuizScore,
        saveChallengeScore,
        unlockAchievement,
        getModuleProgress,
        resetProgress,
        xpForNextLevel,
        xpProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
