export const charLessons = [
  {
    id: 'char-01',
    title: 'What Character Encoding Means',
    section: 'Basics',
    order: 1,
    difficulty: 'beginner',
    estimatedMinutes: 5,
    xpReward: 20,
    content: [
      { type: 'explain', title: 'The Concept of Encoding', text: 'Computers only understand numbers (0s and 1s). To store text, we need an agreed-upon system to translate characters into numbers.' },
      { type: 'keypoint', text: 'Character encoding is a map that assigns a unique number to every character.' },
      { type: 'predict', question: 'If we assign A=1, B=2, C=3, what does 321 mean?', options: ['ABC', 'CBA', 'BCA'], correct: 1 },
    ]
  },
  {
    id: 'char-02',
    title: 'Why Computers Need Character Codes',
    section: 'Basics',
    order: 2,
    difficulty: 'beginner',
    estimatedMinutes: 4,
    xpReward: 20,
    content: [
      { type: 'explain', title: 'Digital Communication', text: 'Without standard codes, a file created on one computer would look like gibberish on another. Standardization is key to digital communication.' },
      { type: 'keypoint', text: 'Standards like ASCII ensure that byte 01000001 is always read as "A" everywhere.' },
    ]
  },
  {
    id: 'char-03',
    title: 'ASCII Introduction',
    section: 'ASCII',
    order: 3,
    difficulty: 'beginner',
    estimatedMinutes: 5,
    xpReward: 20,
    content: [
      { type: 'explain', title: 'American Standard Code for Information Interchange', text: 'ASCII is one of the oldest standard character encodings. It uses 7 bits to represent 128 unique characters.' },
      { type: 'keypoint', text: 'ASCII includes English letters, numbers, punctuation, and control characters.' },
    ]
  },
  {
    id: 'char-04',
    title: 'ASCII Decimal Values',
    section: 'ASCII',
    order: 4,
    difficulty: 'beginner',
    estimatedMinutes: 6,
    xpReward: 20,
    content: [
      { type: 'explain', title: 'Decimal Representation', text: 'Each ASCII character corresponds to a decimal number from 0 to 127. For example, uppercase "A" is 65, and lowercase "a" is 97.' },
      { type: 'interact', component: 'AsciiDecimalExplorer', instruction: 'Type characters to see their decimal ASCII values.' },
    ]
  },
  {
    id: 'char-05',
    title: 'ASCII Binary Representation',
    section: 'ASCII',
    order: 5,
    difficulty: 'beginner',
    estimatedMinutes: 6,
    xpReward: 20,
    content: [
      { type: 'explain', title: 'Binary Mapping', text: 'The decimal values are converted to 7-bit binary for the computer. "A" (65) becomes 1000001 in binary.' },
      { type: 'keypoint', text: 'An 8th bit (parity bit) was historically used for error checking.' },
    ]
  },
  {
    id: 'char-06',
    title: 'ASCII Hexadecimal Representation',
    section: 'ASCII',
    order: 6,
    difficulty: 'intermediate',
    estimatedMinutes: 5,
    xpReward: 25,
    content: [
      { type: 'explain', title: 'Hex Mapping', text: 'Hexadecimal is a convenient shorthand for binary. "A" (65) is 41 in hex (4*16 + 1).' },
      { type: 'predict', question: 'If "A" is Hex 41, what is "B"?', options: ['40', '42', '51'], correct: 1 },
    ]
  },
  {
    id: 'char-07',
    title: 'Extended ASCII Context',
    section: 'ASCII',
    order: 7,
    difficulty: 'intermediate',
    estimatedMinutes: 5,
    xpReward: 25,
    content: [
      { type: 'explain', title: 'Using the 8th Bit', text: 'By using a full 8-bit byte, Extended ASCII provides 256 characters (0-255). This allows for symbols and accented letters.' },
      { type: 'keypoint', text: 'There are many different "Extended ASCII" sets depending on the region (e.g., ISO-8859-1).' },
    ]
  },
  {
    id: 'char-08',
    title: 'Unicode Introduction',
    section: 'Unicode',
    order: 8,
    difficulty: 'intermediate',
    estimatedMinutes: 6,
    xpReward: 30,
    content: [
      { type: 'explain', title: 'A Universal Standard', text: 'ASCII only supports English. Unicode was created to represent every character in every language, plus symbols and emojis.' },
      { type: 'keypoint', text: 'Unicode aims to unify all character sets into one massive standard.' },
    ]
  },
  {
    id: 'char-09',
    title: 'Unicode Code Points',
    section: 'Unicode',
    order: 9,
    difficulty: 'advanced',
    estimatedMinutes: 6,
    xpReward: 35,
    content: [
      { type: 'explain', title: 'U+ Notation', text: 'Characters in Unicode are assigned a "Code Point" written as U+ followed by hexadecimal digits (e.g., U+0041 for "A").' },
      { type: 'interact', component: 'UnicodeExplorer', instruction: 'Search for characters to see their code points.' },
    ]
  },
  {
    id: 'char-10',
    title: 'UTF-8 Encoding',
    section: 'Unicode',
    order: 10,
    difficulty: 'advanced',
    estimatedMinutes: 7,
    xpReward: 40,
    content: [
      { type: 'explain', title: 'Variable Width Encoding', text: 'UTF-8 is an encoding scheme for Unicode. It uses 1 to 4 bytes per character. It is backwards compatible with ASCII.' },
      { type: 'keypoint', text: 'Standard ASCII characters take 1 byte in UTF-8, making it very space-efficient for English.' },
    ]
  },
  {
    id: 'char-11',
    title: 'UTF-8 Byte Representation',
    section: 'Unicode',
    order: 11,
    difficulty: 'advanced',
    estimatedMinutes: 8,
    xpReward: 45,
    content: [
      { type: 'explain', title: 'How it works', text: 'The first few bits of a UTF-8 sequence tell the computer how many bytes the character uses. For example, 110xxxxx indicates a 2-byte sequence.' },
      { type: 'practice', component: 'Utf8Builder', instruction: 'Construct a UTF-8 byte sequence.' },
    ]
  },
  {
    id: 'char-12',
    title: 'EBCDIC',
    section: 'Other',
    order: 12,
    difficulty: 'intermediate',
    estimatedMinutes: 5,
    xpReward: 25,
    content: [
      { type: 'explain', title: 'IBM Mainframes', text: 'Extended Binary Coded Decimal Interchange Code (EBCDIC) is an older encoding used primarily on IBM mainframes.' },
      { type: 'keypoint', text: 'Unlike ASCII, EBCDIC is not sequential for the alphabet (there are gaps between letters).' },
    ]
  },
  {
    id: 'char-13',
    title: 'Comparison of Character Coding Systems',
    section: 'Other',
    order: 13,
    difficulty: 'intermediate',
    estimatedMinutes: 5,
    xpReward: 30,
    content: [
      { type: 'explain', title: 'ASCII vs Unicode vs EBCDIC', text: 'ASCII is small and fast. EBCDIC is legacy. Unicode is comprehensive. UTF-8 bridges ASCII and Unicode efficiently.' },
    ]
  },
  {
    id: 'char-14',
    title: 'Character → Number Representation',
    section: 'Conversions',
    order: 14,
    difficulty: 'intermediate',
    estimatedMinutes: 5,
    xpReward: 30,
    content: [
      { type: 'explain', title: 'Encoding', text: 'The process of turning text into a numerical format that computers can store and transmit.' },
      { type: 'practice', component: 'TextToHex', instruction: 'Convert the word "HELLO" to Hex.' },
    ]
  },
  {
    id: 'char-15',
    title: 'Number → Character Representation',
    section: 'Conversions',
    order: 15,
    difficulty: 'intermediate',
    estimatedMinutes: 5,
    xpReward: 30,
    content: [
      { type: 'explain', title: 'Decoding', text: 'The process of taking numerical data and translating it back into human-readable text.' },
      { type: 'practice', component: 'HexToText', instruction: 'Decode the Hex sequence to find the hidden word.' },
    ]
  },
  {
    id: 'char-16',
    title: 'Encoding vs Decoding',
    section: 'Conversions',
    order: 16,
    difficulty: 'beginner',
    estimatedMinutes: 4,
    xpReward: 20,
    content: [
      { type: 'explain', title: 'Two Sides of the Coin', text: 'Encoding is writing. Decoding is reading. A mismatch (e.g., encoded as UTF-8, decoded as Windows-1252) causes corrupted text (Mojibake).' },
    ]
  },
  {
    id: 'char-17',
    title: 'Practical Uses of Character Encoding',
    section: 'Applications',
    order: 17,
    difficulty: 'beginner',
    estimatedMinutes: 5,
    xpReward: 25,
    content: [
      { type: 'explain', title: 'Everywhere', text: 'Web pages specify their encoding (usually UTF-8) in HTML tags. Databases configure collations and character sets.' },
      { type: 'keypoint', text: 'Always use UTF-8 for new projects to ensure global compatibility.' },
    ]
  }
];
