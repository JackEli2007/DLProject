export const simulateRaceAround = (j, k, currentQ, pulseWidth, propagationDelay) => {
  if (propagationDelay <= 0) return { toggleSequence: [currentQ], finalQ: currentQ, raceDetected: false, toggleCount: 0 };
  
  if (j === 1 && k === 1 && pulseWidth > propagationDelay) {
    const toggleCount = Math.floor(pulseWidth / propagationDelay);
    const toggleSequence = [currentQ];
    let q = currentQ;
    for (let i = 0; i < toggleCount; i++) {
      q = q === 1 ? 0 : 1;
      toggleSequence.push(q);
    }
    return { toggleSequence, finalQ: q, raceDetected: toggleCount > 1, toggleCount };
  } else {
    // Normal operation (max 1 state change)
    let finalQ = currentQ;
    if (j === 0 && k === 1) finalQ = 0;
    else if (j === 1 && k === 0) finalQ = 1;
    else if (j === 1 && k === 1) finalQ = currentQ === 1 ? 0 : 1;
    
    const changed = finalQ !== currentQ;
    return {
      toggleSequence: changed ? [currentQ, finalQ] : [currentQ],
      finalQ,
      raceDetected: false,
      toggleCount: changed ? 1 : 0
    };
  }
};

export const getRaceAroundThreshold = (propagationDelay) => propagationDelay;

export const wouldCauseRaceAround = (j, k, pulseWidth, propagationDelay) => {
  return j === 1 && k === 1 && pulseWidth > propagationDelay;
};

export const getRaceAroundExplanation = (toggleCount, raceDetected) => {
  if (!raceDetected) {
    return "Normal operation. The clock pulse is short enough that the flip-flop output settles to a single stable state.";
  }
  return `Race-around condition detected! The clock pulse was held HIGH long enough for the output to toggle ${toggleCount} times. Because the final output state depends on the exact pulse width and propagation delay, it becomes unpredictable.`;
};
