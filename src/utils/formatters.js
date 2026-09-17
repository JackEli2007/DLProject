/**
 * Format a number as binary string with specified width
 * @param {number} num - Number to convert
 * @param {number} width - Desired bit width (default 8)
 * @returns {string} Binary string padded to width
 */
export const toBinary = (num, width = 8) => {
  return (num >>> 0).toString(2).padStart(width, '0');
};

/**
 * Format a number as hexadecimal string
 * @param {number} num - Number to convert
 * @param {boolean} uppercase - Use uppercase letters
 * @returns {string} Hex string with leading zeros for byte alignment
 */
export const toHex = (num, uppercase = true) => {
  const hex = num.toString(16).padStart(2, '0');
  return uppercase ? hex.toUpperCase() : hex;
};

/**
 * Format a number as octal string
 * @param {number} num - Number to convert
 * @returns {string} Octal string
 */
export const toOctal = (num) => {
  return num.toString(8).padStart(3, '0');
};

/**
 * Format Unicode code point as U+XXXX
 * @param {number} codePoint - Unicode code point
 * @returns {string} Formatted code point
 */
export const formatCodePoint = (codePoint) => {
  return `U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}`;
};

/**
 * Parse binary string to number
 * @param {string} binary - Binary string
 * @returns {number|null} Parsed number or null if invalid
 */
export const parseBinary = (binary) => {
  const cleaned = binary.replace(/\s/g, '');
  if (!/^[01]+$/.test(cleaned)) return null;
  return parseInt(cleaned, 2);
};

/**
 * Parse hex string to number
 * @param {string} hex - Hexadecimal string (with or without 0x prefix)
 * @returns {number|null} Parsed number or null if invalid
 */
export const parseHex = (hex) => {
  const cleaned = hex.replace(/^0x/i, '').replace(/\s/g, '');
  if (!/^[0-9a-fA-F]+$/.test(cleaned)) return null;
  return parseInt(cleaned, 16);
};

/**
 * Format XP number with comma separators
 * @param {number} xp - XP value
 * @returns {string} Formatted XP string
 */
export const formatXP = (xp) => {
  return xp.toLocaleString();
};

/**
 * Calculate percentage with bounds
 * @param {number} value - Current value
 * @param {number} total - Total value
 * @returns {number} Percentage (0-100)
 */
export const toPercent = (value, total) => {
  if (total === 0) return 0;
  return Math.min(100, Math.max(0, Math.round((value / total) * 100)));
};

/**
 * Format time duration in minutes
 * @param {number} minutes - Duration in minutes
 * @returns {string} Human-readable duration
 */
export const formatDuration = (minutes) => {
  if (minutes < 60) return `${minutes} min`;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
};
