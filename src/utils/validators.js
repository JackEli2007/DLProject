/**
 * Validate binary string input
 * @param {string} input - User input
 * @returns {{ valid: boolean, error: string|null }}
 */
export const validateBinary = (input) => {
  const cleaned = input.trim().replace(/\s/g, '');
  if (cleaned.length === 0) return { valid: false, error: 'Input is empty' };
  if (!/^[01]+$/.test(cleaned)) return { valid: false, error: 'Binary must contain only 0 and 1' };
  if (cleaned.length > 32) return { valid: false, error: 'Binary value too large (max 32 bits)' };
  return { valid: true, error: null };
};

/**
 * Validate hexadecimal string input
 * @param {string} input - User input
 * @returns {{ valid: boolean, error: string|null }}
 */
export const validateHex = (input) => {
  const cleaned = input.trim().replace(/^0x/i, '').replace(/\s/g, '');
  if (cleaned.length === 0) return { valid: false, error: 'Input is empty' };
  if (!/^[0-9a-fA-F]+$/.test(cleaned)) return { valid: false, error: 'Hex must contain only 0-9 and A-F' };
  if (cleaned.length > 8) return { valid: false, error: 'Hex value too large' };
  return { valid: true, error: null };
};

/**
 * Validate decimal string input
 * @param {string} input - User input
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {{ valid: boolean, error: string|null }}
 */
export const validateDecimal = (input, min = 0, max = 1114111) => {
  const cleaned = input.trim();
  if (cleaned.length === 0) return { valid: false, error: 'Input is empty' };
  if (!/^\d+$/.test(cleaned)) return { valid: false, error: 'Must be a whole number' };
  const num = parseInt(cleaned, 10);
  if (num < min || num > max) return { valid: false, error: `Value must be between ${min} and ${max}` };
  return { valid: true, error: null };
};

/**
 * Validate character input (single character)
 * @param {string} input - User input
 * @returns {{ valid: boolean, error: string|null }}
 */
export const validateCharacter = (input) => {
  if (input.length === 0) return { valid: false, error: 'Input is empty' };
  // Handle surrogate pairs for emoji and extended Unicode
  const codePoints = [...input];
  if (codePoints.length > 1) return { valid: false, error: 'Enter a single character' };
  return { valid: true, error: null };
};

/**
 * Validate Unicode code point input (e.g., U+0041 or 0041)
 * @param {string} input - User input
 * @returns {{ valid: boolean, error: string|null }}
 */
export const validateCodePoint = (input) => {
  const cleaned = input.trim().replace(/^U\+/i, '');
  if (cleaned.length === 0) return { valid: false, error: 'Input is empty' };
  if (!/^[0-9a-fA-F]+$/.test(cleaned)) return { valid: false, error: 'Invalid code point format' };
  const num = parseInt(cleaned, 16);
  if (num > 0x10FFFF) return { valid: false, error: 'Code point exceeds Unicode maximum (U+10FFFF)' };
  return { valid: true, error: null };
};
