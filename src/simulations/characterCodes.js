const getUnicodeName = (codePoint) => {
  if (codePoint === 32) return 'SPACE';
  if (codePoint >= 48 && codePoint <= 57) return `DIGIT ${String.fromCodePoint(codePoint)}`;
  if (codePoint >= 65 && codePoint <= 90) return `LATIN CAPITAL LETTER ${String.fromCodePoint(codePoint)}`;
  if (codePoint >= 97 && codePoint <= 122) return `LATIN SMALL LETTER ${String.fromCodePoint(codePoint)}`;
  return 'CHARACTER';
};

const EBCDIC_TABLE = {
  'A': 0xC1, 'B': 0xC2, 'C': 0xC3, 'D': 0xC4, 'E': 0xC5, 'F': 0xC6, 'G': 0xC7, 'H': 0xC8, 'I': 0xC9,
  'J': 0xD1, 'K': 0xD2, 'L': 0xD3, 'M': 0xD4, 'N': 0xD5, 'O': 0xD6, 'P': 0xD7, 'Q': 0xD8, 'R': 0xD9,
  'S': 0xE2, 'T': 0xE3, 'U': 0xE4, 'V': 0xE5, 'W': 0xE6, 'X': 0xE7, 'Y': 0xE8, 'Z': 0xE9,
  'a': 0x81, 'b': 0x82, 'c': 0x83, 'd': 0x84, 'e': 0x85, 'f': 0x86, 'g': 0x87, 'h': 0x88, 'i': 0x89,
  'j': 0x91, 'k': 0x92, 'l': 0x93, 'm': 0x94, 'n': 0x95, 'o': 0x96, 'p': 0x97, 'q': 0x98, 'r': 0x99,
  's': 0xA2, 't': 0xA3, 'u': 0xA4, 'v': 0xA5, 'w': 0xA6, 'x': 0xA7, 'y': 0xA8, 'z': 0xA9,
  '0': 0xF0, '1': 0xF1, '2': 0xF2, '3': 0xF3, '4': 0xF4, '5': 0xF5, '6': 0xF6, '7': 0xF7, '8': 0xF8, '9': 0xF9,
  ' ': 0x40, '.': 0x4B, '<': 0x4C, '(': 0x4D, '+': 0x4E, '|': 0x4F, '&': 0x50, '!': 0x5A, '$': 0x5B, '*': 0x5C, ')': 0x5D,
  ';': 0x5E, '-': 0x60, '/': 0x61, ',': 0x6B, '%': 0x6C, '_': 0x6D, '>': 0x6E, '?': 0x6F, '`': 0x79, ':': 0x7A, '#': 0x7B,
  '@': 0x7C, "'": 0x7D, '=': 0x7E, '"': 0x7F
};

export const getEBCDIC = (char) => {
  const code = EBCDIC_TABLE[char];
  if (code !== undefined) {
    return {
      decimal: code,
      hex: code.toString(16).toUpperCase().padStart(2, '0'),
      binary: code.toString(2).padStart(8, '0'),
    };
  }
  return null;
};

export const charToAllCodes = (char) => {
  if (!char || char.length === 0) return null;
  const codePoint = char.codePointAt(0);
  
  let utf8Bytes = [];
  if (codePoint <= 0x7F) utf8Bytes = [codePoint];
  else if (codePoint <= 0x7FF) utf8Bytes = [0xC0 | (codePoint >> 6), 0x80 | (codePoint & 0x3F)];
  else if (codePoint <= 0xFFFF) utf8Bytes = [0xE0 | (codePoint >> 12), 0x80 | ((codePoint >> 6) & 0x3F), 0x80 | (codePoint & 0x3F)];
  else utf8Bytes = [0xF0 | (codePoint >> 18), 0x80 | ((codePoint >> 12) & 0x3F), 0x80 | ((codePoint >> 6) & 0x3F), 0x80 | (codePoint & 0x3F)];
  
  const utf8 = {
    bytes: utf8Bytes,
    hex: utf8Bytes.map(b => b.toString(16).toUpperCase().padStart(2, '0')),
    binary: utf8Bytes.map(b => b.toString(2).padStart(8, '0')),
    byteCount: utf8Bytes.length
  };

  return {
    character: String.fromCodePoint(codePoint),
    ascii: codePoint <= 127 ? {
      decimal: codePoint,
      hex: codePoint.toString(16).toUpperCase().padStart(2, '0'),
      binary: codePoint.toString(2).padStart(8, '0'),
      octal: codePoint.toString(8).padStart(3, '0'),
    } : null,
    unicode: {
      codePoint: codePoint,
      hex: `U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}`,
      name: getUnicodeName(codePoint),
    },
    utf8,
    ebcdic: getEBCDIC(String.fromCodePoint(codePoint)),
  };
};

export const decimalToChar = (decimal) => String.fromCodePoint(decimal);
export const binaryToChar = (binary) => String.fromCodePoint(parseInt(binary, 2));
export const hexToChar = (hex) => String.fromCodePoint(parseInt(hex, 16));
export const codePointToChar = (cp) => String.fromCodePoint(cp);

export const getASCIICategory = (code) => {
  if (code < 32 || code === 127) return 'control';
  if (code === 32) return 'space';
  if (code >= 48 && code <= 57) return 'digit';
  if (code >= 65 && code <= 90) return 'uppercase';
  if (code >= 97 && code <= 122) return 'lowercase';
  return 'symbol';
};

export const getASCIITable = () => {
  const table = [];
  for (let i = 0; i <= 127; i++) {
    table.push({
      decimal: i,
      hex: i.toString(16).toUpperCase().padStart(2, '0'),
      binary: i.toString(2).padStart(8, '0'),
      char: i > 32 && i < 127 ? String.fromCharCode(i) : (i === 32 ? 'SPACE' : 'CTRL'),
      category: getASCIICategory(i),
      description: `ASCII ${i}`
    });
  }
  return table;
};

export const getEncodingComparison = () => [
  { name: 'ASCII', year: 1963, bits: 7, characters: 128, desc: 'Original standard for English text' },
  { name: 'Extended ASCII', year: 1981, bits: 8, characters: 256, desc: 'Adds regional characters' },
  { name: 'Unicode', year: 1991, bits: 'variable', characters: '> 149,000', desc: 'Universal character set' },
  { name: 'UTF-8', year: 1993, bits: '8-32', characters: 'All Unicode', desc: 'Dominant web encoding' },
  { name: 'EBCDIC', year: 1963, bits: 8, characters: 256, desc: 'IBM mainframe standard' },
];
