const fs = require("fs");
const zlib = require("zlib");
const path = require("path");

function decodePng(file) {
  const buf = fs.readFileSync(file);
  let off = 8;
  const idat = [];
  let w = 0;
  let h = 0;
  let ct = 0;
  let depth = 8;
  let plte = null;
  let trns = null;
  while (off < buf.length) {
    const len = buf.readUInt32BE(off);
    const type = buf.toString("ascii", off + 4, off + 8);
    const data = buf.subarray(off + 8, off + 8 + len);
    if (type === "IHDR") {
      w = data.readUInt32BE(0);
      h = data.readUInt32BE(4);
      depth = data[8];
      ct = data[9];
    } else if (type === "PLTE") plte = data;
    else if (type === "tRNS") trns = data;
    else if (type === "IDAT") idat.push(data);
    else if (type === "IEND") break;
    off += 12 + len;
  }
  const inflated = zlib.inflateSync(Buffer.concat(idat));
  const bpp = ct === 6 ? 4 : ct === 2 ? 3 : ct === 4 ? 2 : ct === 0 ? 1 : 1;
  const stride = w * bpp;
  const rows = [];
  let p = 0;
  let prev = Buffer.alloc(stride);
  for (let y = 0; y < h; y++) {
    const filter = inflated[p++];
    const row = Buffer.from(inflated.subarray(p, p + stride));
    p += stride;
    const out = Buffer.alloc(stride);
    for (let i = 0; i < stride; i++) {
      const left = i >= bpp ? out[i - bpp] : 0;
      const up = prev[i];
      const ul = i >= bpp ? prev[i - bpp] : 0;
      let v = row[i];
      if (filter === 1) v = (v + left) & 255;
      else if (filter === 2) v = (v + up) & 255;
      else if (filter === 3) v = (v + Math.floor((left + up) / 2)) & 255;
      else if (filter === 4) {
        const pa = left + up - ul;
        const da = Math.abs(pa - left);
        const db = Math.abs(pa - up);
        const dc = Math.abs(pa - ul);
        const pr = da <= db && da <= dc ? left : db <= dc ? up : ul;
        v = (v + pr) & 255;
      }
      out[i] = v;
    }
    rows.push(out);
    prev = out;
  }

  function opaque(row, x) {
    if (ct === 6) return row[x * 4 + 3] > 40;
    if (ct === 4) return row[x * 2 + 1] > 40;
    if (ct === 3) {
      const idx = row[x];
      if (!trns) return true;
      if (idx >= trns.length) return true;
      return trns[idx] > 40;
    }
    return true;
  }

  let minX = w, minY = h, maxX = -1, maxY = -1;
  const edge = { top: 0, bottom: 0, left: 0, right: 0 };
  const band = 3;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (!opaque(rows[y], x)) continue;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      if (y < band) edge.top++;
      if (y >= h - band) edge.bottom++;
      if (x < band) edge.left++;
      if (x >= w - band) edge.right++;
    }
  }

  function spanAt(y0, y1) {
    let a = w, b = -1, n = 0;
    for (let y = y0; y < y1; y++) {
      for (let x = 0; x < w; x++) {
        if (!opaque(rows[y], x)) continue;
        n++;
        if (x < a) a = x;
        if (x > b) b = x;
      }
    }
    return n ? `${a}-${b}` : "none";
  }

  const name = path.basename(file);
  console.log(
    `${name} ${w}x${h} ct${ct} bbox ${minX},${minY}-${maxX},${maxY} edges T${edge.top} R${edge.right} B${edge.bottom} L${edge.left}`
  );
  console.log(`  top ${spanAt(0, Math.max(8, Math.floor(h * 0.04)))} mid ${spanAt(Math.floor(h * 0.45), Math.floor(h * 0.55))} bot ${spanAt(h - Math.max(8, Math.floor(h * 0.04)), h)}`);
}

function mask(file, cols = 24, rowsN = 48) {
  const buf = fs.readFileSync(file);
  let off = 8;
  const idat = [];
  let w = 0, h = 0, ct = 0, trns = null;
  while (off < buf.length) {
    const len = buf.readUInt32BE(off);
    const type = buf.toString("ascii", off + 4, off + 8);
    const data = buf.subarray(off + 8, off + 8 + len);
    if (type === "IHDR") {
      w = data.readUInt32BE(0);
      h = data.readUInt32BE(4);
      ct = data[9];
    } else if (type === "tRNS") trns = data;
    else if (type === "IDAT") idat.push(data);
    else if (type === "IEND") break;
    off += 12 + len;
  }
  const inflated = zlib.inflateSync(Buffer.concat(idat));
  const bpp = ct === 6 ? 4 : ct === 2 ? 3 : ct === 4 ? 2 : 1;
  const stride = w * bpp;
  let p = 0;
  let prev = Buffer.alloc(stride);
  const grid = [];
  for (let gy = 0; gy < rowsN; gy++) grid.push(new Array(cols).fill(0));
  for (let y = 0; y < h; y++) {
    const filter = inflated[p++];
    const row = Buffer.from(inflated.subarray(p, p + stride));
    p += stride;
    const out = Buffer.alloc(stride);
    for (let i = 0; i < stride; i++) {
      const left = i >= bpp ? out[i - bpp] : 0;
      const up = prev[i];
      const ul = i >= bpp ? prev[i - bpp] : 0;
      let v = row[i];
      if (filter === 1) v = (v + left) & 255;
      else if (filter === 2) v = (v + up) & 255;
      else if (filter === 3) v = (v + Math.floor((left + up) / 2)) & 255;
      else if (filter === 4) {
        const pa = left + up - ul;
        const da = Math.abs(pa - left);
        const db = Math.abs(pa - up);
        const dc = Math.abs(pa - ul);
        const pr = da <= db && da <= dc ? left : db <= dc ? up : ul;
        v = (v + pr) & 255;
      }
      out[i] = v;
    }
    prev = out;
    const gy = Math.min(rowsN - 1, Math.floor((y / h) * rowsN));
    for (let x = 0; x < w; x += 2) {
      let op = false;
      if (ct === 6) op = out[x * 4 + 3] > 40;
      else if (ct === 4) op = out[x * 2 + 1] > 40;
      else if (ct === 3) {
        const idx = out[x];
        op = !trns || idx >= trns.length || trns[idx] > 40;
      }
      if (!op) continue;
      const gx = Math.min(cols - 1, Math.floor((x / w) * cols));
      grid[gy][gx] = 1;
    }
  }
  return { file: path.basename(file), w, h, cols, rows: rowsN, grid };
}

if (process.argv[2] === "--mask") {
  const out = {};
  for (const f of process.argv.slice(3)) out[path.basename(f)] = mask(f);
  fs.writeFileSync("_pipe_masks.json", JSON.stringify(out));
  console.log("wrote", Object.keys(out).length);
} else {
  const files = process.argv.slice(2);
  for (const f of files) decodePng(f);
}
