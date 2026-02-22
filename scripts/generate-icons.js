/**
 * Generates extension icons (16×16, 48×48, 128×128 PNG) using only Node built-ins.
 * Run: node scripts/generate-icons.js
 */
import { deflateSync } from 'zlib';
import { writeFileSync, mkdirSync } from 'fs';

// --- CRC32 ---
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  crcTable[n] = c;
}
function crc32(buf) {
  let crc = 0xffffffff;
  for (const byte of buf) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

// --- PNG helpers ---
function chunk(type, data) {
  const t = Buffer.from(type, 'ascii');
  const crcVal = crc32(Buffer.concat([t, data]));
  const out = Buffer.alloc(12 + data.length);
  out.writeUInt32BE(data.length, 0);
  t.copy(out, 4);
  data.copy(out, 8);
  out.writeUInt32BE(crcVal, 8 + data.length);
  return out;
}

function makePNG(size, draw) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // RGB

  const stride = 1 + size * 3; // filter byte + RGB pixels
  const raw = Buffer.alloc(size * stride);
  for (let y = 0; y < size; y++) {
    raw[y * stride] = 0; // filter: None
    for (let x = 0; x < size; x++) {
      const [r, g, b] = draw(x, y, size);
      const off = y * stride + 1 + x * 3;
      raw[off] = r;
      raw[off + 1] = g;
      raw[off + 2] = b;
    }
  }

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}

// --- Icon design: indigo page with ruled lines ---
function drawIcon(x, y, size) {
  const m = Math.round(size * 0.14);      // margin
  const inset = size - m * 2;

  // Background
  if (x < m || x >= size - m || y < m || y >= size - m) return [30, 27, 75];

  // Ruled lines
  const lm = Math.round(inset * 0.1);    // left margin inside page
  const rm = Math.round(inset * 0.85);   // right margin of lines
  const spacing = Math.max(3, Math.round(inset / 4));
  const thick = Math.max(1, Math.round(size / 28));
  const rel = y - m;

  if (
    rel >= spacing &&
    rel % spacing < thick &&
    rel < inset - spacing &&
    x > m + lm &&
    x < m + rm
  ) {
    return [170, 164, 220]; // soft indigo lines
  }

  return [242, 241, 255]; // near-white page
}

// --- Generate ---
mkdirSync('public/icons', { recursive: true });
for (const size of [16, 48, 128]) {
  const out = `public/icons/icon-${size}.png`;
  writeFileSync(out, makePNG(size, drawIcon));
  console.log(`Generated ${out} (${size}×${size})`);
}
