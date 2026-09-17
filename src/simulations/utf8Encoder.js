export const getUTF8Template = (byteCount) => {
  switch (byteCount) {
    case 1: return ['0xxxxxxx'];
    case 2: return ['110xxxxx', '10xxxxxx'];
    case 3: return ['1110xxxx', '10xxxxxx', '10xxxxxx'];
    case 4: return ['11110xxx', '10xxxxxx', '10xxxxxx', '10xxxxxx'];
    default: return [];
  }
};

export const encodeUTF8 = (codePoint) => {
  let bytes = [];
  if (codePoint <= 0x7F) {
    bytes = [codePoint];
  } else if (codePoint <= 0x7FF) {
    bytes = [0xC0 | (codePoint >> 6), 0x80 | (codePoint & 0x3F)];
  } else if (codePoint <= 0xFFFF) {
    bytes = [0xE0 | (codePoint >> 12), 0x80 | ((codePoint >> 6) & 0x3F), 0x80 | (codePoint & 0x3F)];
  } else if (codePoint <= 0x10FFFF) {
    bytes = [0xF0 | (codePoint >> 18), 0x80 | ((codePoint >> 12) & 0x3F), 0x80 | ((codePoint >> 6) & 0x3F), 0x80 | (codePoint & 0x3F)];
  } else {
    throw new Error('Invalid code point');
  }
  
  return {
    bytes,
    hex: bytes.map(b => b.toString(16).toUpperCase().padStart(2, '0')),
    binary: bytes.map(b => b.toString(2).padStart(8, '0')),
    byteCount: bytes.length
  };
};

export const encodeUTF8Steps = (codePoint) => {
  if (codePoint < 0 || codePoint > 0x10FFFF) throw new Error("Code point out of range");
  
  const binaryStr = codePoint.toString(2);
  let byteCount = 1;
  if (codePoint > 0x7F) byteCount = 2;
  if (codePoint > 0x7FF) byteCount = 3;
  if (codePoint > 0xFFFF) byteCount = 4;
  
  const template = getUTF8Template(byteCount);
  const result = encodeUTF8(codePoint);
  
  const filledBits = result.binary;
  const headerBits = [];
  const payloadBits = [];
  
  for (let i = 0; i < byteCount; i++) {
    const tmpl = template[i];
    const header = [];
    const payload = [];
    for (let j = 0; j < 8; j++) {
      const bit = parseInt(filledBits[i][j], 10);
      if (tmpl[j] === 'x') {
        payload.push(bit);
      } else {
        header.push(bit);
      }
    }
    headerBits.push(header);
    payloadBits.push(payload);
  }
  
  return {
    codePoint,
    binaryCodePoint: binaryStr,
    byteCount,
    template,
    filledBits,
    resultBytes: result.bytes,
    resultHex: result.hex,
    resultBinary: result.binary,
    headerBits,
    payloadBits
  };
};

export const decodeUTF8 = (bytes) => {
  if (!bytes || bytes.length === 0) return null;
  let codePoint = 0;
  if ((bytes[0] & 0x80) === 0) {
    codePoint = bytes[0];
  } else if ((bytes[0] & 0xE0) === 0xC0 && bytes.length === 2) {
    codePoint = ((bytes[0] & 0x1F) << 6) | (bytes[1] & 0x3F);
  } else if ((bytes[0] & 0xF0) === 0xE0 && bytes.length === 3) {
    codePoint = ((bytes[0] & 0x0F) << 12) | ((bytes[1] & 0x3F) << 6) | (bytes[2] & 0x3F);
  } else if ((bytes[0] & 0xF8) === 0xF0 && bytes.length === 4) {
    codePoint = ((bytes[0] & 0x07) << 18) | ((bytes[1] & 0x3F) << 12) | ((bytes[2] & 0x3F) << 6) | (bytes[3] & 0x3F);
  } else {
    throw new Error('Invalid UTF-8 sequence');
  }
  
  return {
    codePoint,
    character: String.fromCodePoint(codePoint)
  };
};
