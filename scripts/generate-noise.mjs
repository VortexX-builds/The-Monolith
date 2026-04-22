// Generates a 256x256 grayscale noise tile PNG using only Node.js built-ins
import { writeFileSync } from 'fs'
import { deflateSync } from 'zlib'
import { mkdirSync } from 'fs'

const W = 256
const H = 256

// Raw pixel data: each row = 1 filter byte (0=None) + W pixel bytes
const raw = Buffer.alloc(H * (1 + W))
for (let y = 0; y < H; y++) {
  raw[y * (1 + W)] = 0
  for (let x = 0; x < W; x++) {
    raw[y * (1 + W) + 1 + x] = Math.floor(Math.random() * 256)
  }
}

const compressed = deflateSync(raw)

function crc32(buf) {
  let c = 0xffffffff
  const table = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let v = n
    for (let k = 0; k < 8; k++) v = v & 1 ? 0xedb88320 ^ (v >>> 1) : v >>> 1
    table[n] = v
  }
  for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii')
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const body = Buffer.concat([typeBytes, data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([len, body, crc])
}

const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

// IHDR
const ihdr = Buffer.alloc(13)
ihdr.writeUInt32BE(W, 0)
ihdr.writeUInt32BE(H, 4)
ihdr[8] = 8  // bit depth
ihdr[9] = 0  // color type: grayscale
ihdr[10] = 0 // compression
ihdr[11] = 0 // filter
ihdr[12] = 0 // interlace

const png = Buffer.concat([
  signature,
  chunk('IHDR', ihdr),
  chunk('IDAT', compressed),
  chunk('IEND', Buffer.alloc(0)),
])

mkdirSync('public/textures', { recursive: true })
writeFileSync('public/textures/noise-tile.png', png)
console.log('noise-tile.png generated:', png.length, 'bytes')
