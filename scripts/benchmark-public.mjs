import { mkdir, writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { dirname } from 'node:path';

// Run against `next start`, not the development server. These are local HTTP
// measurements, not browser Core Web Vitals or a substitute for field data.
const base = process.argv[2] || 'http://localhost:3100';
const output = process.argv[3] || 'test-results/performance.json';
const results = [];
for (const path of ['/', '/about', '/programs', '/visit']) {
  await fetch(new URL(path, base)); // warm the route
  const samples = [];
  let html, headers;
  for (let i = 0; i < 5; i++) {
    const start = performance.now();
    const response = await fetch(new URL(path, base));
    const ttfb = performance.now() - start;
    html = await response.text();
    if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
    headers = Object.fromEntries(['cache-control', 'x-nextjs-cache', 'x-nextjs-prerender'].map(key => [key, response.headers.get(key)]));
    samples.push({ ttfb, total: performance.now() - start });
  }
  const scripts = [...new Set([...html.matchAll(/<script[^>]+src="([^"]+\.js[^"]*)"/g)].map(match => match[1]))];
  let jsBytes = 0, jsGzipBytes = 0;
  for (const src of scripts) {
    const response = await fetch(new URL(src, base));
    if (!response.ok) throw new Error(`Script unavailable: ${src}`);
    const data = Buffer.from(await response.arrayBuffer());
    jsBytes += data.length; jsGzipBytes += gzipSync(data).length;
  }
  const median = key => Number(samples.map(sample => sample[key]).sort((a,b) => a-b)[2].toFixed(1));
  results.push({ path, medianTtfbMs: median('ttfb'), medianTotalMs: median('total'), htmlBytes: Buffer.byteLength(html), htmlGzipBytes: gzipSync(html).length, jsBytes, jsGzipBytes, scripts: scripts.length, headers });
}
await mkdir(dirname(output), { recursive: true });
await writeFile(output, JSON.stringify({ base, measuredAt: new Date().toISOString(), results }, null, 2));
console.table(results.map(({headers, ...result}) => result));
