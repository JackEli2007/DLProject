export const createMasterSlaveJK = () => ({
  master: { q: 0, qBar: 1 },
  slave: { q: 0, qBar: 1 },
  clockPhase: 'idle', // 'idle' | 'high' | 'falling'
});

export const clockHigh = (msff, j, k) => {
  // Master responds to J,K using its current slave output as feedback
  const masterNextQ = (j & (msff.slave.q ^ 1)) | ((k ^ 1) & msff.slave.q);
  return {
    ...msff,
    master: { q: masterNextQ, qBar: masterNextQ === 1 ? 0 : 1 },
    clockPhase: 'high'
  };
};

export const clockLow = (msff) => {
  // Slave takes master's Q as its new state
  return {
    ...msff,
    slave: { q: msff.master.q, qBar: msff.master.qBar },
    clockPhase: 'falling'
  };
};

export const fullClockCycle = (msff, j, k) => {
  const afterHigh = clockHigh(msff, j, k);
  const afterLow = clockLow(afterHigh);
  
  let transition = 'HOLD';
  if (j === 0 && k === 1) transition = 'RESET';
  else if (j === 1 && k === 0) transition = 'SET';
  else if (j === 1 && k === 1) transition = 'TOGGLE';

  return {
    master: afterLow.master,
    slave: afterLow.slave,
    finalQ: afterLow.slave.q,
    finalQBar: afterLow.slave.qBar,
    transition
  };
};

export const getMasterSlaveExplanation = () => {
  return "A master-slave JK flip-flop prevents the race-around condition by separating input capture from output generation. During the HIGH phase of the clock, only the master flip-flop responds to the inputs. The slave is disabled and holds its state. When the clock goes LOW (falling edge), the master is disabled and the slave takes the master's state, updating the final output. Because the output only changes once per clock cycle, continuous toggling (race-around) is impossible.";
};
