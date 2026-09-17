export const createJKFlipFlop = () => ({ q: 0, qBar: 1 });

export const getConditionName = (j, k) => {
  if (j === 0 && k === 0) return 'HOLD';
  if (j === 0 && k === 1) return 'RESET';
  if (j === 1 && k === 0) return 'SET';
  if (j === 1 && k === 1) return 'TOGGLE';
  return 'UNKNOWN';
};

export const calculateNextQ = (j, k, currentQ) => {
  // Q(next) = J·Q̅ + K̅·Q
  return (j & (currentQ ^ 1)) | ((k ^ 1) & currentQ);
};

export const clockPulse = (ff, j, k) => {
  const nextQ = calculateNextQ(j, k, ff.q);
  const condition = getConditionName(j, k);
  const changed = ff.q !== nextQ;
  return { q: nextQ, qBar: nextQ === 1 ? 0 : 1, transition: condition, changed };
};

export const getTruthTable = () => [
  { j: 0, k: 0, currentQ: 0, nextQ: 0, qBar: 1, condition: 'HOLD' },
  { j: 0, k: 0, currentQ: 1, nextQ: 1, qBar: 0, condition: 'HOLD' },
  { j: 0, k: 1, currentQ: 0, nextQ: 0, qBar: 1, condition: 'RESET' },
  { j: 0, k: 1, currentQ: 1, nextQ: 0, qBar: 1, condition: 'RESET' },
  { j: 1, k: 0, currentQ: 0, nextQ: 1, qBar: 0, condition: 'SET' },
  { j: 1, k: 0, currentQ: 1, nextQ: 1, qBar: 0, condition: 'SET' },
  { j: 1, k: 1, currentQ: 0, nextQ: 1, qBar: 0, condition: 'TOGGLE' },
  { j: 1, k: 1, currentQ: 1, nextQ: 0, qBar: 1, condition: 'TOGGLE' },
];

export const getCharacteristicEquation = () => 'Q(next) = JQ̅ + K̅Q';
