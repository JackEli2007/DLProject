export const challenges = [
  {
    id: 'ch-01',
    title: 'Predict the Output: Set & Reset',
    module: 'jkFlipFlop',
    difficulty: 'beginner',
    xpReward: 30,
    type: 'prediction',
    description: 'Given a sequence of J, K inputs, predict Q after each clock pulse.',
    steps: [
      { j: 1, k: 0, expectedQ: 1, hint: 'J=1, K=0 is the SET condition' },
      { j: 0, k: 0, expectedQ: 1, hint: 'HOLD keeps the previous state' },
      { j: 0, k: 1, expectedQ: 0, hint: 'J=0, K=1 is the RESET condition' },
    ]
  },
  {
    id: 'ch-02',
    title: 'Predict the Output: Toggle',
    module: 'jkFlipFlop',
    difficulty: 'beginner',
    xpReward: 30,
    type: 'prediction',
    description: 'Understand the toggle behavior of the JK Flip-Flop.',
    steps: [
      { j: 1, k: 1, expectedQ: 1, hint: 'Assuming initial Q=0, toggle makes it 1' },
      { j: 1, k: 1, expectedQ: 0, hint: 'Toggle again flips it to 0' },
      { j: 0, k: 0, expectedQ: 0, hint: 'HOLD keeps it at 0' },
    ]
  },
  {
    id: 'ch-03',
    title: 'Fix the Circuit',
    module: 'jkFlipFlop',
    difficulty: 'intermediate',
    xpReward: 40,
    type: 'configuration',
    description: 'Connect the missing gates to build a functional JK Flip-Flop.',
    steps: [
      { component: 'NAND1', expectedInput1: 'J', expectedInput2: 'Clock' },
      { component: 'NAND2', expectedInput1: 'K', expectedInput2: 'Clock' },
    ]
  },
  {
    id: 'ch-04',
    title: 'Race Detector',
    module: 'jkFlipFlop',
    difficulty: 'intermediate',
    xpReward: 50,
    type: 'discovery',
    description: 'Configure the clock width to trigger a race-around condition.',
    steps: [
      { j: 1, k: 1, clockWidth: 50, propDelay: 10, expectedOutput: 'race-around', hint: 'Make clock width much larger than propagation delay' }
    ]
  },
  {
    id: 'ch-05',
    title: 'Master-Slave Setup',
    module: 'jkFlipFlop',
    difficulty: 'advanced',
    xpReward: 60,
    type: 'configuration',
    description: 'Configure the clock for Master and Slave stages.',
    steps: [
      { stage: 'Master', expectedClock: 'CLK' },
      { stage: 'Slave', expectedClock: 'NOT CLK' },
    ]
  },
  {
    id: 'ch-06',
    title: 'Decode at Speed',
    module: 'charCodes',
    difficulty: 'beginner',
    xpReward: 30,
    type: 'speed',
    description: 'Quickly decode the decimal ASCII values.',
    steps: [
      { input: 65, expected: 'A' },
      { input: 97, expected: 'a' },
      { input: 48, expected: '0' },
    ]
  },
  {
    id: 'ch-07',
    title: 'Encode at Speed',
    module: 'charCodes',
    difficulty: 'beginner',
    xpReward: 30,
    type: 'speed',
    description: 'Quickly provide the decimal ASCII value for the characters.',
    steps: [
      { input: 'B', expected: 66 },
      { input: 'z', expected: 122 },
      { input: '1', expected: 49 },
    ]
  },
  {
    id: 'ch-08',
    title: 'Hexadecimal Decoder',
    module: 'charCodes',
    difficulty: 'intermediate',
    xpReward: 40,
    type: 'speed',
    description: 'Decode hexadecimal ASCII values.',
    steps: [
      { input: '41', expected: 'A' },
      { input: '20', expected: ' ' },
      { input: '30', expected: '0' },
    ]
  },
  {
    id: 'ch-09',
    title: 'Identify the Encoding',
    module: 'charCodes',
    difficulty: 'intermediate',
    xpReward: 40,
    type: 'discovery',
    description: 'Determine which encoding (ASCII, UTF-8, EBCDIC) is used.',
    steps: [
      { input: '01000001', expected: 'ASCII', hint: 'Standard 8-bit A' },
      { input: '11110000 10011111 10011000 10000000', expected: 'UTF-8', hint: '4-byte sequence' },
    ]
  },
  {
    id: 'ch-10',
    title: 'Unicode Code Points',
    module: 'charCodes',
    difficulty: 'advanced',
    xpReward: 50,
    type: 'speed',
    description: 'Match emojis to their Unicode Code Points.',
    steps: [
      { input: 'U+1F600', expected: '😀' },
      { input: 'U+1F44D', expected: '👍' },
    ]
  },
  {
    id: 'ch-11',
    title: 'Timing Challenge',
    module: 'jkFlipFlop',
    difficulty: 'advanced',
    xpReward: 60,
    type: 'prediction',
    description: 'Predict the output considering propagation delays.',
    steps: [
      { time: '10ns', expectedQ: 0, hint: 'Before propagation' },
      { time: '20ns', expectedQ: 1, hint: 'After propagation' },
    ]
  },
  {
    id: 'ch-12',
    title: 'Edge Triggered Prediction',
    module: 'jkFlipFlop',
    difficulty: 'advanced',
    xpReward: 50,
    type: 'prediction',
    description: 'Predict output for a positive edge-triggered JK Flip-Flop.',
    steps: [
      { clkLevel: 'high', j: 1, k: 0, expectedQ: 0, hint: 'Ignores level, only triggers on edge' },
      { clkEdge: 'positive', j: 1, k: 0, expectedQ: 1, hint: 'Triggers on rising edge' },
    ]
  },
  {
    id: 'ch-13',
    title: 'UTF-8 Byte Length',
    module: 'charCodes',
    difficulty: 'advanced',
    xpReward: 50,
    type: 'prediction',
    description: 'Determine how many bytes UTF-8 needs to encode a given code point.',
    steps: [
      { codePoint: 'U+0041', expectedBytes: 1 },
      { codePoint: 'U+03B1', expectedBytes: 2 },
      { codePoint: 'U+1F600', expectedBytes: 4 },
    ]
  },
  {
    id: 'ch-14',
    title: 'Counter Sequence',
    module: 'jkFlipFlop',
    difficulty: 'advanced',
    xpReward: 70,
    type: 'prediction',
    description: 'Predict the state of a 2-bit counter using JK Flip-Flops.',
    steps: [
      { clock: 1, expectedQ1: 0, expectedQ0: 1 },
      { clock: 2, expectedQ1: 1, expectedQ0: 0 },
      { clock: 3, expectedQ1: 1, expectedQ0: 1 },
    ]
  },
  {
    id: 'ch-15',
    title: 'Control Character Hunt',
    module: 'charCodes',
    difficulty: 'intermediate',
    xpReward: 40,
    type: 'discovery',
    description: 'Identify common ASCII control characters.',
    steps: [
      { desc: 'Null', expected: 0 },
      { desc: 'Line Feed', expected: 10 },
      { desc: 'Carriage Return', expected: 13 },
    ]
  }
];
