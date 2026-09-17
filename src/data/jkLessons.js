export const jkLessons = [
  {
    id: 'jk-01',
    title: 'What is a Flip-Flop?',
    section: 'Foundations',
    order: 1,
    difficulty: 'beginner',
    estimatedMinutes: 5,
    xpReward: 20,
    content: [
      { type: 'explain', title: 'Memory in Digital Circuits', text: 'A flip-flop is the fundamental building block of sequential logic. It can store a single bit of data (0 or 1).' },
      { type: 'keypoint', text: 'Unlike combinational circuits, flip-flops can REMEMBER their previous state.' },
      { type: 'interact', component: 'BasicLatch', instruction: 'Toggle the input and observe how the output holds its value.' },
      { type: 'predict', question: 'If the input changes from 1 to 0, what happens to the stored output?', options: ['It changes to 0', 'It stays at its previous value', 'It toggles'], correct: 1 },
    ]
  },
  {
    id: 'jk-02',
    title: 'Sequential Logic',
    section: 'Foundations',
    order: 2,
    difficulty: 'beginner',
    estimatedMinutes: 5,
    xpReward: 20,
    content: [
      { type: 'explain', title: 'Time Matters', text: 'In sequential logic, the output depends not only on the current inputs but also on the history of inputs (the state).' },
      { type: 'keypoint', text: 'Synchronous sequential circuits use a clock signal to coordinate state changes.' },
    ]
  },
  {
    id: 'jk-03',
    title: 'SR Flip-Flop Context',
    section: 'Foundations',
    order: 3,
    difficulty: 'intermediate',
    estimatedMinutes: 6,
    xpReward: 25,
    content: [
      { type: 'explain', title: 'The Predecessor', text: 'The Set-Reset (SR) flip-flop sets Q to 1 or resets Q to 0. However, if both S=1 and R=1, the output is undefined or unstable.' },
      { type: 'keypoint', text: 'The invalid S=R=1 state is a major flaw that needed fixing.' },
    ]
  },
  {
    id: 'jk-04',
    title: 'JK Flip-Flop Introduction',
    section: 'JK Basics',
    order: 4,
    difficulty: 'beginner',
    estimatedMinutes: 5,
    xpReward: 20,
    content: [
      { type: 'explain', title: 'The Solution', text: 'The JK flip-flop refines the SR flip-flop. It behaves identically for Set and Reset, but resolves the S=R=1 problem by making it a "Toggle" state.' },
      { type: 'interact', component: 'JkOverview', instruction: 'Compare SR and JK responses to the 1,1 input.' },
    ]
  },
  {
    id: 'jk-05',
    title: 'J and K Inputs',
    section: 'JK Basics',
    order: 5,
    difficulty: 'beginner',
    estimatedMinutes: 4,
    xpReward: 20,
    content: [
      { type: 'explain', title: 'Naming', text: 'J stands for "Jump" (Set) and K stands for "Kill" (Reset). These inputs control the state transitions.' },
      { type: 'keypoint', text: 'J acts like S (Set), K acts like R (Reset).' },
    ]
  },
  {
    id: 'jk-06',
    title: 'Clock Signal',
    section: 'JK Basics',
    order: 6,
    difficulty: 'intermediate',
    estimatedMinutes: 6,
    xpReward: 25,
    content: [
      { type: 'explain', title: 'The Metronome', text: 'The clock signal is a continuous square wave. The flip-flop only reads J and K inputs and changes its state during specific parts of the clock cycle.' },
      { type: 'predict', question: 'Why use a clock?', options: ['To save power', 'To synchronize multiple flip-flops', 'To increase speed'], correct: 1 },
    ]
  },
  {
    id: 'jk-07',
    title: 'Q and Q̅ Outputs',
    section: 'JK Basics',
    order: 7,
    difficulty: 'beginner',
    estimatedMinutes: 4,
    xpReward: 20,
    content: [
      { type: 'explain', title: 'Complementary States', text: 'A flip-flop typically has two outputs: Q (the normal state) and Q̅ (the inverted state). If Q is 1, Q̅ is 0.' },
    ]
  },
  {
    id: 'jk-08',
    title: 'JK Truth Table',
    section: 'Operation',
    order: 8,
    difficulty: 'intermediate',
    estimatedMinutes: 8,
    xpReward: 35,
    content: [
      { type: 'explain', title: 'The Master Guide', text: 'The truth table defines Q(next) for every combination of J, K, and current Q. It has four main modes: Hold, Reset, Set, and Toggle.' },
      { type: 'interact', component: 'TruthTableExplorer', instruction: 'Click through the rows to see the corresponding circuit states.' },
    ]
  },
  {
    id: 'jk-09',
    title: 'Hold Condition J=0, K=0',
    section: 'Operation',
    order: 9,
    difficulty: 'beginner',
    estimatedMinutes: 4,
    xpReward: 20,
    content: [
      { type: 'explain', title: 'No Change', text: 'When J=0 and K=0, the flip-flop ignores the clock and maintains its current state Q. This is the memory mode.' },
    ]
  },
  {
    id: 'jk-10',
    title: 'Reset Condition J=0, K=1',
    section: 'Operation',
    order: 10,
    difficulty: 'beginner',
    estimatedMinutes: 4,
    xpReward: 20,
    content: [
      { type: 'explain', title: 'Clear to 0', text: 'When J=0 and K=1, the flip-flop sets Q to 0 on the next clock trigger, regardless of its previous state.' },
    ]
  },
  {
    id: 'jk-11',
    title: 'Set Condition J=1, K=0',
    section: 'Operation',
    order: 11,
    difficulty: 'beginner',
    estimatedMinutes: 4,
    xpReward: 20,
    content: [
      { type: 'explain', title: 'Set to 1', text: 'When J=1 and K=0, the flip-flop sets Q to 1 on the next clock trigger.' },
    ]
  },
  {
    id: 'jk-12',
    title: 'Toggle Condition J=1, K=1',
    section: 'Operation',
    order: 12,
    difficulty: 'intermediate',
    estimatedMinutes: 6,
    xpReward: 30,
    content: [
      { type: 'explain', title: 'Flip the State', text: 'This is the magic of JK. If J=1 and K=1, Q changes to the opposite of its current state (0 becomes 1, 1 becomes 0).' },
      { type: 'practice', component: 'TogglePractice', instruction: 'Apply multiple clock pulses with J=1, K=1 to see the output alternate.' },
    ]
  },
  {
    id: 'jk-13',
    title: 'Characteristic Table',
    section: 'Theory',
    order: 13,
    difficulty: 'advanced',
    estimatedMinutes: 5,
    xpReward: 35,
    content: [
      { type: 'explain', title: 'Condensed Form', text: 'The characteristic table summarizes the truth table by defining Q(t+1) strictly in terms of J, K, and Q(t).' },
    ]
  },
  {
    id: 'jk-14',
    title: 'Characteristic Equation Q(next) = JQ̅ + K̅Q',
    section: 'Theory',
    order: 14,
    difficulty: 'advanced',
    estimatedMinutes: 8,
    xpReward: 40,
    content: [
      { type: 'explain', title: 'Boolean Expression', text: 'Derived from Karnaugh maps, this equation mathematically describes the JK flip-flop behavior.' },
      { type: 'keypoint', text: 'Q(t+1) = J·Q̅(t) + K̅·Q(t)' },
    ]
  },
  {
    id: 'jk-15',
    title: 'Timing Behavior',
    section: 'Timing',
    order: 15,
    difficulty: 'advanced',
    estimatedMinutes: 6,
    xpReward: 35,
    content: [
      { type: 'explain', title: 'Delays Matter', text: 'Propagation delay is the time it takes for a change in input to affect the output. Setup and hold times dictate when inputs must be stable around the clock edge.' },
    ]
  },
  {
    id: 'jk-16',
    title: 'Clock Triggering',
    section: 'Timing',
    order: 16,
    difficulty: 'intermediate',
    estimatedMinutes: 6,
    xpReward: 30,
    content: [
      { type: 'explain', title: 'Level vs Edge', text: 'Level-triggered latches respond as long as the clock is high. Edge-triggered flip-flops only respond at the exact moment the clock transitions (low-to-high or high-to-low).' },
    ]
  },
  {
    id: 'jk-17',
    title: 'Race-Around Condition',
    section: 'Race-Around',
    order: 17,
    difficulty: 'advanced',
    estimatedMinutes: 8,
    xpReward: 50,
    content: [
      { type: 'explain', title: 'The Problem', text: 'In a level-triggered JK flip-flop with J=1, K=1, the output toggles. If the clock pulse stays high longer than the propagation delay, the output toggles multiple times unpredictably.' },
      { type: 'interact', component: 'RaceAroundSim', instruction: 'Increase the clock width and observe the unstable toggling.' },
    ]
  },
  {
    id: 'jk-18',
    title: 'Why Race-Around Occurs',
    section: 'Race-Around',
    order: 18,
    difficulty: 'advanced',
    estimatedMinutes: 7,
    xpReward: 40,
    content: [
      { type: 'explain', title: 'Feedback Loop', text: 'The outputs Q and Q̅ are fed back to the input gates. When J=K=1, the flip-flop inverts its state. Once inverted, the new state feeds back immediately while the clock is still high, triggering another inversion.' },
    ]
  },
  {
    id: 'jk-19',
    title: 'Effect of Clock Pulse Width',
    section: 'Race-Around',
    order: 19,
    difficulty: 'advanced',
    estimatedMinutes: 5,
    xpReward: 35,
    content: [
      { type: 'explain', title: 'Width vs Delay', text: 'Race-around happens when Clock Pulse Width (tp) > Propagation Delay (Δt). The state changes multiple times within one clock pulse.' },
    ]
  },
  {
    id: 'jk-20',
    title: 'Methods of Preventing Race-Around',
    section: 'Race-Around',
    order: 20,
    difficulty: 'intermediate',
    estimatedMinutes: 5,
    xpReward: 30,
    content: [
      { type: 'explain', title: 'Solutions', text: 'We can prevent race-around by: 1) Using Edge-Triggering. 2) Using a Master-Slave configuration. 3) Making propagation delay greater than clock pulse width (impractical).' },
    ]
  },
  {
    id: 'jk-21',
    title: 'Master-Slave JK Flip-Flop',
    section: 'Solutions',
    order: 21,
    difficulty: 'advanced',
    estimatedMinutes: 10,
    xpReward: 60,
    content: [
      { type: 'explain', title: 'Two Stages', text: 'It uses two flip-flops. The Master takes inputs on the high clock. The Slave takes inputs from the Master on the low clock. They never trigger simultaneously.' },
      { type: 'interact', component: 'MasterSlaveSim', instruction: 'Trace the data flow from Master to Slave during a full clock cycle.' },
    ]
  },
  {
    id: 'jk-22',
    title: 'Edge-Triggered Behavior',
    section: 'Solutions',
    order: 22,
    difficulty: 'intermediate',
    estimatedMinutes: 6,
    xpReward: 40,
    content: [
      { type: 'explain', title: 'Modern Solution', text: 'Most modern ICs use edge-triggering. The flip-flop only samples inputs for a tiny fraction of a second during the edge, preventing multiple toggles.' },
    ]
  },
  {
    id: 'jk-23',
    title: 'Practical Applications',
    section: 'Conclusion',
    order: 23,
    difficulty: 'beginner',
    estimatedMinutes: 5,
    xpReward: 30,
    content: [
      { type: 'explain', title: 'Where are they used?', text: 'JK flip-flops are versatile and are used to build shift registers, counters (like digital clocks), and memory registers.' },
      { type: 'keypoint', text: 'Because of its toggle feature, it is the primary building block for counters.' },
    ]
  }
];
