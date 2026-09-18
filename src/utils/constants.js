// Application-wide constants

export const APP_NAME = 'Digital Logic Lab';
export const APP_VERSION = '1.0.0';

// localStorage keys
export const STORAGE_KEYS = {
  PROGRESS: 'dll_progress',
  THEME: 'dll_theme',
  ONBOARDING: 'dll_onboarding_complete',
};

// XP thresholds for each level
export const LEVEL_THRESHOLDS = [
  0,     // Level 1
  100,   // Level 2
  250,   // Level 3
  500,   // Level 4
  1000,  // Level 5
  2000,  // Level 6
  4000,  // Level 7
  7000,  // Level 8
  11000, // Level 9
  16000, // Level 10
];

// Module definitions
export const MODULES = {
  JK_FLIPFLOP: 'jkFlipFlop',
  CHAR_CODES: 'charCodes',
};

export const MODULE_INFO = {
  [MODULES.JK_FLIPFLOP]: {
    id: MODULES.JK_FLIPFLOP,
    title: 'JK Flip-Flop & Race-Around Condition',
    shortTitle: 'JK Flip-Flop',
    number: '01',
    description: 'Master sequential logic circuits through interactive simulation',
    difficulty: 'Intermediate',
    estimatedTime: '3-4 hours',
    totalXP: 500,
    icon: '⚡',
    color: 'blue',
  },
  [MODULES.CHAR_CODES]: {
    id: MODULES.CHAR_CODES,
    title: 'Character Codes & Digital Representation',
    shortTitle: 'Character Codes',
    number: '02',
    description: 'Explore how computers represent text through encoding systems',
    difficulty: 'Intermediate',
    estimatedTime: '2-3 hours',
    totalXP: 400,
    icon: '🔤',
    color: 'cyan',
  },
};

// Navigation items
export const NAV_ITEMS = [
  { path: '/', label: 'Laboratory', icon: 'flask' },
  { path: '/lab/jk-simulator', label: 'JK Simulator', icon: 'home' },
  { path: '/lab/race-around', label: 'Race-Around', icon: 'target' },
  { path: '/lab/master-slave', label: 'Master-Slave', icon: 'trophy' },
  { path: '/lab/char-explorer', label: 'Char Explorer', icon: 'book' },
  { path: '/lab/ascii-explorer', label: 'ASCII Table', icon: 'help-circle' },
  { path: '/lab/converter', label: 'Converter', icon: 'bar-chart' },
];

// Difficulty levels
export const DIFFICULTY = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
};

// Default progress state
export const DEFAULT_PROGRESS = {
  modules: {
    jkFlipFlop: {
      completed: [],
      currentLesson: 0,
      unlocked: [0],
    },
    charCodes: {
      completed: [],
      currentLesson: 0,
      unlocked: [0],
    },
  },
  quizScores: {},
  challengeScores: {},
  xp: 0,
  level: 1,
  achievements: [],
  preferences: {
    theme: 'dark',
    reducedMotion: false,
  },
  lastActivity: null,
  streak: 0,
  totalLessonsCompleted: 0,
  totalQuizzesTaken: 0,
  totalChallengesCompleted: 0,
};
