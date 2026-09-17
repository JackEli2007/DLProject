export const practiceProblems = {
  jkFlipFlop: {
    beginner: [
      { id: 'p-jk-b1', type: 'mcq', question: 'If J=1, K=0, what is Q after the clock pulse?', options: ['0', '1', 'Toggles', 'No change'], correct: 1, explanation: 'J=1, K=0 sets the flip-flop to 1.' },
      { id: 'p-jk-b2', type: 'mcq', question: 'If J=0, K=1, what is Q after the clock pulse?', options: ['0', '1', 'Toggles', 'No change'], correct: 0, explanation: 'J=0, K=1 resets the flip-flop to 0.' },
      { id: 'p-jk-b3', type: 'mcq', question: 'If J=0, K=0, what happens to Q?', options: ['Sets to 1', 'Resets to 0', 'Holds state', 'Toggles state'], correct: 2, explanation: '0,0 is the hold condition.' },
      { id: 'p-jk-b4', type: 'mcq', question: 'Which inputs cause the JK flip-flop to toggle?', options: ['0,0', '0,1', '1,0', '1,1'], correct: 3, explanation: '1,1 toggles the output.' },
      { id: 'p-jk-b5', type: 'mcq', question: 'A flip-flop stores how many bits of information?', options: ['1', '2', '4', '8'], correct: 0, explanation: 'A flip-flop stores a single bit.' },
      { id: 'p-jk-b6', type: 'mcq', question: 'Q and Q̅ are always:', options: ['Equal', 'Opposite (complements)', '0', '1'], correct: 1, explanation: 'They are complementary outputs.' }
    ],
    intermediate: [
      { id: 'p-jk-i1', type: 'mcq', question: 'If Q(current)=1, J=1, K=1, what is Q(next)?', options: ['0', '1', 'Undefined'], correct: 0, explanation: 'Toggles from 1 to 0.' },
      { id: 'p-jk-i2', type: 'mcq', question: 'If Q(current)=0, J=0, K=1, what is Q(next)?', options: ['0', '1', 'Undefined'], correct: 0, explanation: 'Reset keeps it at 0.' },
      { id: 'p-jk-i3', type: 'mcq', question: 'If Q(current)=1, J=0, K=0, what is Q(next)?', options: ['0', '1', 'Undefined'], correct: 1, explanation: 'Hold keeps it at 1.' },
      { id: 'p-jk-i4', type: 'mcq', question: 'What does a clock signal do?', options: ['Powers circuit', 'Synchronizes changes', 'Provides data'], correct: 1, explanation: 'Clock synchronizes changes.' },
      { id: 'p-jk-i5', type: 'mcq', question: 'J and K are named after:', options: ['Jack Kilby', 'Jump and Kill', 'John and Karl', 'Nothing'], correct: 1, explanation: 'Often referred to as Jump and Kill.' },
      { id: 'p-jk-i6', type: 'mcq', question: 'In a JK flip-flop built from NAND gates, the outputs feed back to:', options: ['The inputs of the same gate', 'The inputs of the other input NAND gate', 'Ground'], correct: 1, explanation: 'Outputs feedback to the input steering gates.' }
    ],
    advanced: [
      { id: 'p-jk-a1', type: 'mcq', question: 'Which equation represents the JK characteristic?', options: ['Q+ = JQ + KQ', 'Q+ = JQ̅ + K̅Q', 'Q+ = J+K'], correct: 1, explanation: 'Q(t+1) = JQ̅ + K̅Q' },
      { id: 'p-jk-a2', type: 'mcq', question: 'If J=1, K=1 and a 1MHz clock is applied, what is the output frequency of Q?', options: ['1MHz', '2MHz', '500kHz', '0Hz'], correct: 2, explanation: 'It toggles every clock cycle, halving the frequency (500kHz).' },
      { id: 'p-jk-a3', type: 'mcq', question: 'Setup time is:', options: ['Time input must be stable before clock edge', 'Time input must be stable after clock edge', 'Delay of output'], correct: 0, explanation: 'Setup time is before the clock edge.' },
      { id: 'p-jk-a4', type: 'mcq', question: 'Hold time is:', options: ['Time input must be stable before clock edge', 'Time input must be stable after clock edge', 'Delay of output'], correct: 1, explanation: 'Hold time is after the clock edge.' },
      { id: 'p-jk-a5', type: 'mcq', question: 'To implement a D flip-flop using a JK flip-flop, you connect:', options: ['J to D, K to D', 'J to D, K to NOT D', 'J to NOT D, K to D'], correct: 1, explanation: 'D requires J=D, K=D̅' },
      { id: 'p-jk-a6', type: 'mcq', question: 'To implement a T flip-flop using a JK flip-flop, you connect:', options: ['J to T, K to T', 'J to T, K to NOT T', 'J to 1, K to 1'], correct: 0, explanation: 'T requires J=T, K=T' }
    ]
  },
  raceAround: {
    beginner: [
      { id: 'p-ra-b1', type: 'mcq', question: 'Race-around occurs when J=? and K=?', options: ['0,0', '1,0', '0,1', '1,1'], correct: 3, explanation: 'Occurs in the toggle state.' },
      { id: 'p-ra-b2', type: 'mcq', question: 'Does race-around happen in edge-triggered flip-flops?', options: ['Yes', 'No'], correct: 1, explanation: 'Edge triggering prevents it.' },
      { id: 'p-ra-b3', type: 'mcq', question: 'Does race-around happen in level-triggered flip-flops?', options: ['Yes', 'No'], correct: 0, explanation: 'Yes, if pulse is too long.' },
      { id: 'p-ra-b4', type: 'mcq', question: 'Race-around results in an output that is:', options: ['Stable 1', 'Stable 0', 'Unpredictable/Oscillating'], correct: 2, explanation: 'It toggles multiple times unpredictably.' },
      { id: 'p-ra-b5', type: 'mcq', question: 'Which flip-flop architecture was designed specifically to solve race-around before edge-triggering was common?', options: ['D Flip-Flop', 'T Flip-Flop', 'Master-Slave JK'], correct: 2, explanation: 'Master-Slave was the solution.' },
      { id: 'p-ra-b6', type: 'mcq', question: 'If propagation delay > clock pulse width, does race-around occur?', options: ['Yes', 'No'], correct: 1, explanation: 'No, but making delay longer than pulse is impractical.' }
    ],
    intermediate: [
      { id: 'p-ra-i1', type: 'mcq', question: 'In Master-Slave, when clock is HIGH, the Master is:', options: ['Active', 'Inactive'], correct: 0, explanation: 'Master takes input on HIGH.' },
      { id: 'p-ra-i2', type: 'mcq', question: 'In Master-Slave, when clock is HIGH, the Slave is:', options: ['Active', 'Inactive'], correct: 1, explanation: 'Slave is inactive on HIGH.' },
      { id: 'p-ra-i3', type: 'mcq', question: 'In Master-Slave, data transfers to output Q on which clock transition?', options: ['LOW to HIGH', 'HIGH to LOW'], correct: 1, explanation: 'Transfers when slave becomes active (HIGH to LOW).' },
      { id: 'p-ra-i4', type: 'mcq', question: 'What component sits between the Master and Slave clock inputs?', options: ['AND gate', 'NOT gate (Inverter)', 'OR gate'], correct: 1, explanation: 'An inverter ensures they trigger on opposite phases.' },
      { id: 'p-ra-i5', type: 'mcq', question: 'Race-around is a problem of:', options: ['Combinational logic', 'Timing and feedback', 'Power supply'], correct: 1, explanation: 'It is a timing issue caused by immediate feedback.' },
      { id: 'p-ra-i6', type: 'mcq', question: 'If clock width is 50ns and propagation delay is 10ns, how many times might it toggle?', options: ['1', '2', '5', 'It will be unstable'], correct: 3, explanation: 'It will toggle roughly 5 times, leading to an unstable final state.' }
    ],
    advanced: [
      { id: 'p-ra-a1', type: 'mcq', question: 'To ensure proper Master-Slave operation, the clock signals to master and slave must be:', options: ['Non-overlapping', 'In-phase', 'Double frequency'], correct: 0, explanation: 'They must never be active at the same time.' },
      { id: 'p-ra-a2', type: 'mcq', question: 'What is "clock skew"?', options: ['A type of flip flop', 'Delay difference between clock arriving at different components', 'Clock voltage drop'], correct: 1, explanation: 'Clock skew can cause timing failures in synchronous systems.' },
      { id: 'p-ra-a3', type: 'mcq', question: 'Which is faster typically?', options: ['Level-triggered Latch', 'Master-Slave Flip-Flop', 'Edge-Triggered Flip-Flop'], correct: 0, explanation: 'Latches have less internal gate delay.' },
      { id: 'p-ra-a4', type: 'mcq', question: 'In a real IC, propagation delay varies with:', options: ['Temperature', 'Voltage', 'Both', 'Neither'], correct: 2, explanation: 'Environmental factors affect delay.' },
      { id: 'p-ra-a5', type: 'mcq', question: 'Why don\'t D flip-flops suffer from race-around natively?', options: ['They have no feedback', 'They are always edge triggered in modern designs', 'Both'], correct: 2, explanation: 'Modern D flip-flops are edge triggered.' },
      { id: 'p-ra-a6', type: 'mcq', question: 'If J=1, K=0, can race-around occur?', options: ['Yes', 'No'], correct: 1, explanation: 'No, because it just sets to 1 and stays 1. Feedback doesn\'t cause further toggles.' }
    ]
  },
  charCodes: {
    beginner: [
      { id: 'p-cc-b1', type: 'mcq', question: 'ASCII maps characters to:', options: ['Colors', 'Numbers', 'Sounds'], correct: 1, explanation: 'It encodes characters to numerical values.' },
      { id: 'p-cc-b2', type: 'mcq', question: 'Decimal for "A"?', options: ['65', '97', '48'], correct: 0, explanation: 'A=65.' },
      { id: 'p-cc-b3', type: 'mcq', question: 'Decimal for "a"?', options: ['65', '97', '48'], correct: 1, explanation: 'a=97.' },
      { id: 'p-cc-b4', type: 'mcq', question: 'Decimal for "0"?', options: ['0', '32', '48'], correct: 2, explanation: '0=48.' },
      { id: 'p-cc-b5', type: 'mcq', question: 'Decimal for Space?', options: ['0', '32', '255'], correct: 1, explanation: 'Space=32.' },
      { id: 'p-cc-b6', type: 'mcq', question: 'Standard ASCII is how many bits?', options: ['7', '8', '16'], correct: 0, explanation: '7 bits.' }
    ],
    intermediate: [
      { id: 'p-cc-i1', type: 'mcq', question: 'Hex for "A"?', options: ['41', '61', '30'], correct: 0, explanation: 'Hex 41 = Dec 65.' },
      { id: 'p-cc-i2', type: 'mcq', question: 'Hex for "0"?', options: ['41', '61', '30'], correct: 2, explanation: 'Hex 30 = Dec 48.' },
      { id: 'p-cc-i3', type: 'mcq', question: 'Unicode was created to:', options: ['Save space', 'Support all languages', 'Encrypt data'], correct: 1, explanation: 'Unicode handles all world scripts.' },
      { id: 'p-cc-i4', type: 'mcq', question: 'UTF-8 is:', options: ['Fixed 8-bit', 'Fixed 16-bit', 'Variable width (1-4 bytes)'], correct: 2, explanation: 'UTF-8 uses 1 to 4 bytes.' },
      { id: 'p-cc-i5', type: 'mcq', question: 'EBCDIC is used mostly by:', options: ['Apple', 'Microsoft', 'IBM Mainframes'], correct: 2, explanation: 'Legacy IBM systems use EBCDIC.' },
      { id: 'p-cc-i6', type: 'mcq', question: 'Which character is Dec 10?', options: ['Space', 'Line Feed (Newline)', 'Null'], correct: 1, explanation: '10 is Line Feed.' }
    ],
    advanced: [
      { id: 'p-cc-a1', type: 'mcq', question: 'In UTF-8, characters 0-127 take how many bytes?', options: ['1', '2', '3', '4'], correct: 0, explanation: '1 byte, identical to ASCII.' },
      { id: 'p-cc-a2', type: 'mcq', question: 'What is a BOM (Byte Order Mark) used for?', options: ['Encrypting text', 'Indicating endianness in UTF-16/32', 'Compressing text'], correct: 1, explanation: 'BOM shows byte order.' },
      { id: 'p-cc-a3', type: 'mcq', question: 'Mojibake occurs when:', options: ['Text is decoded with the wrong encoding', 'Text is too long', 'Hardware fails'], correct: 0, explanation: 'Wrong decoding map = garbled text.' },
      { id: 'p-cc-a4', type: 'mcq', question: 'Unicode code points are usually written as:', options: ['U+XXXX', '0xXXXX', '&XXXX;'], correct: 0, explanation: 'U+ followed by hex.' },
      { id: 'p-cc-a5', type: 'mcq', question: 'How many bits does Extended ASCII use?', options: ['7', '8', '16'], correct: 1, explanation: '8 bits for 256 characters.' },
      { id: 'p-cc-a6', type: 'mcq', question: 'If a UTF-8 byte starts with 1110xxxx, it is the first byte of a:', options: ['1-byte sequence', '2-byte sequence', '3-byte sequence'], correct: 2, explanation: 'Three 1s = 3 byte sequence.' }
    ]
  }
};
