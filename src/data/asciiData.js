export const asciiCategories = [
  { id: 'control', name: 'Control Characters', range: '0-31, 127', color: 'gray' },
  { id: 'space', name: 'Space', range: '32', color: 'slate' },
  { id: 'symbol', name: 'Symbols & Punctuation', range: '33-47, 58-64, 91-96, 123-126', color: 'purple' },
  { id: 'digit', name: 'Digits', range: '48-57', color: 'blue' },
  { id: 'uppercase', name: 'Uppercase Letters', range: '65-90', color: 'green' },
  { id: 'lowercase', name: 'Lowercase Letters', range: '97-122', color: 'cyan' },
];

export const asciiTable = Array.from({ length: 128 }, (_, i) => {
  const hex = i.toString(16).padStart(2, '0').toUpperCase();
  const binary = i.toString(2).padStart(8, '0');
  
  let char = String.fromCharCode(i);
  let displayChar = char;
  let category = 'control';
  let description = '';

  if (i < 32 || i === 127) {
    category = 'control';
    char = ['NUL', 'SOH', 'STX', 'ETX', 'EOT', 'ENQ', 'ACK', 'BEL', 'BS', 'TAB', 'LF', 'VT', 'FF', 'CR', 'SO', 'SI', 'DLE', 'DC1', 'DC2', 'DC3', 'DC4', 'NAK', 'SYN', 'ETB', 'CAN', 'EM', 'SUB', 'ESC', 'FS', 'GS', 'RS', 'US'][i] || 'DEL';
    displayChar = '␀'; // Simplified for all controls
    description = char;
  } else if (i === 32) {
    category = 'space';
    char = 'SPACE';
    displayChar = ' ';
    description = 'Space';
  } else if ((i >= 33 && i <= 47) || (i >= 58 && i <= 64) || (i >= 91 && i <= 96) || (i >= 123 && i <= 126)) {
    category = 'symbol';
    description = 'Symbol or Punctuation';
  } else if (i >= 48 && i <= 57) {
    category = 'digit';
    description = `Digit ${char}`;
  } else if (i >= 65 && i <= 90) {
    category = 'uppercase';
    description = `Latin capital letter ${char}`;
  } else if (i >= 97 && i <= 122) {
    category = 'lowercase';
    description = `Latin small letter ${char}`;
  }

  return { decimal: i, hex, binary, char, displayChar, category, description };
});
