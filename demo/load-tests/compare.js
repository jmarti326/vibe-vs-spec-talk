// load-tests/compare.js — Run stampede test against both APIs and compare
// This is the "live moment" in the talk — one command, dramatic results.
// Usage: node load-tests/compare.js

const { execSync } = require('child_process');
const http = require('http');

const VIBE_URL = process.env.VIBE_URL || 'http://localhost:3001';
const SPEC_URL = process.env.SPEC_URL || 'http://localhost:3002';
const CONCURRENT = parseInt(process.env.CONCURRENT || '200', 10);

async function httpGet(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function resetServer(url) {
  return new Promise((resolve, reject) => {
    const req = http.request(`${url}/reset`, { method: 'POST' }, (res) => {
      res.on('data', () => {});
      res.on('end', resolve);
    });
    req.on('error', reject);
    req.end();
  });
}

async function stampede(url, count) {
  // Fire all requests simultaneously
  const start = Date.now();
  const promises = Array.from({ length: count }, () =>
    httpGet(`${url}/products`).catch((err) => ({ status: 0, error: err.message }))
  );
  const results = await Promise.all(promises);
  const elapsed = Date.now() - start;

  const successes = results.filter((r) => r.status === 200).length;
  const failures = results.filter((r) => r.status !== 200).length;
  const times = results
    .filter((r) => r.status === 200)
    .map(() => elapsed); // Approximate (all fired together)

  // Get DB hit count
  let dbHits = '?';
  try {
    const stats = await httpGet(`${url}/stats`);
    dbHits = JSON.parse(stats.body).dbHitCount;
  } catch {}

  return { successes, failures, elapsed, dbHits, total: count };
}

async function run() {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║  🎬  CACHE STAMPEDE SHOWDOWN                             ║
║  ${CONCURRENT} concurrent requests after cache flush              ║
╚══════════════════════════════════════════════════════════╝
`);

  // Warm up both
  console.log('⏳ Warming up caches...');
  await httpGet(`${VIBE_URL}/products`).catch(() => {});
  await httpGet(`${SPEC_URL}/products`).catch(() => {});
  await new Promise((r) => setTimeout(r, 1000));

  // Reset both
  console.log('🔥 Flushing caches...\n');
  await resetServer(VIBE_URL).catch(() => {});
  await resetServer(SPEC_URL).catch(() => {});
  await new Promise((r) => setTimeout(r, 500));

  // STAMPEDE — Vibe version
  console.log(`⚡ Stampeding VIBE API (${VIBE_URL}) with ${CONCURRENT} requests...`);
  const vibeResult = await stampede(VIBE_URL, CONCURRENT);

  // Reset spec
  await resetServer(SPEC_URL).catch(() => {});
  await new Promise((r) => setTimeout(r, 500));

  // STAMPEDE — Spec version
  console.log(`🛡️  Stampeding SPEC API (${SPEC_URL}) with ${CONCURRENT} requests...`);
  const specResult = await stampede(SPEC_URL, CONCURRENT);

  // Results
  console.log(`
┌────────────────────────────────────────────────────────────┐
│                    RESULTS                                  │
├─────────────────────┬──────────────────┬───────────────────┤
│                     │  ⚡ VIBE API      │  🛡️ SPEC API      │
├─────────────────────┼──────────────────┼───────────────────┤
│ Successes           │  ${String(vibeResult.successes).padEnd(15)} │  ${String(specResult.successes).padEnd(16)} │
│ Failures            │  ${String(vibeResult.failures).padEnd(15)} │  ${String(specResult.failures).padEnd(16)} │
│ Total time          │  ${String(vibeResult.elapsed + 'ms').padEnd(15)} │  ${String(specResult.elapsed + 'ms').padEnd(16)} │
│ DB Hits             │  ${String(vibeResult.dbHits).padEnd(15)} │  ${String(specResult.dbHits).padEnd(16)} │
├─────────────────────┼──────────────────┼───────────────────┤
│ Verdict             │  ${vibeResult.failures > 0 ? '💥 STAMPEDE!    ' : '✅ OK            '} │  ${specResult.failures > 0 ? '💥 STAMPEDE!     ' : '✅ PROTECTED     '} │
└─────────────────────┴──────────────────┴───────────────────┘
`);

  if (vibeResult.dbHits > 1 && specResult.dbHits <= 1) {
    console.log(`
💡 The vibe-coded API hit the database ${vibeResult.dbHits} times (one per request).
   The spec-driven API hit it ${specResult.dbHits} time (singleflight protected the rest).
   
   Same AI. Same model. Same developer.
   The difference? A spec that said "handle concurrent cache misses."
`);
  }
}

run().catch(console.error);
