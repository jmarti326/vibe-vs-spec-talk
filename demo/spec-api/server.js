// spec-api/server.js
// ============================================================
// THE SPEC-DRIVEN VERSION
// Built from GSD spec that defined:
// - Singleflight pattern for stampede protection
// - Probabilistic early refresh
// - Stale-on-error fallback
// - Compression for large payloads
// - Connection resilience
// ============================================================
// Same feature, same AI, same developer. The only difference:
// a spec that captured architectural decisions BEFORE coding.
// ============================================================

const express = require('express');
const Redis = require('ioredis');
const zlib = require('zlib');
const { promisify } = require('util');
const { slowQuery } = require('../shared/db');

const gzip = promisify(zlib.gzip);
const gunzip = promisify(zlib.gunzip);

const app = express();
app.use(express.json());

const redis = new Redis({
  host: '127.0.0.1',
  port: 6379,
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    return Math.min(times * 50, 2000);
  },
  enableReadyCheck: true,
  lazyConnect: true,
});

redis.connect().catch(() => {
  console.warn('⚠️  Redis not available — will serve from DB with stale fallback');
});

const db = null; // Using in-memory store
const PORT = process.env.PORT || 3002;
const CACHE_TTL = 300;

let dbHitCount = 0;

// ─── SINGLEFLIGHT: Prevent cache stampede ───────────────────
// Only ONE request fetches from DB; all others wait for that result.
const inFlight = new Map();

function singleflight(key, fetchFn) {
  if (inFlight.has(key)) {
    return inFlight.get(key);
  }
  const promise = fetchFn().finally(() => inFlight.delete(key));
  inFlight.set(key, promise);
  return promise;
}

// ─── PROBABILISTIC EARLY REFRESH ────────────────────────────
// Reduces thundering herd by refreshing cache before expiry
function shouldRefreshEarly(ttlRemaining, maxTtl) {
  if (ttlRemaining < 0) return false;
  const ratio = ttlRemaining / maxTtl;
  if (ratio > 0.2) return false; // Only consider when <20% TTL left
  return Math.random() < 0.1; // 10% chance per request
}

// ─── CACHE HELPERS ──────────────────────────────────────────
async function getFromCache(key) {
  try {
    const raw = await redis.get(key);
    if (!raw) return null;
    const buf = Buffer.from(raw, 'base64');
    const decompressed = await gunzip(buf);
    return JSON.parse(decompressed.toString());
  } catch {
    return null;
  }
}

async function setCache(key, data, ttl) {
  try {
    const compressed = await gzip(JSON.stringify(data));
    const encoded = compressed.toString('base64');
    await Promise.all([
      redis.setex(key, ttl, encoded),
      redis.setex(`stale:${key}`, ttl * 3, encoded), // Stale copy lives 3x longer
    ]);
  } catch (err) {
    console.warn('Cache write failed:', err.message);
  }
}

// ─── ROUTES ─────────────────────────────────────────────────

app.get('/products', async (req, res) => {
  const cacheKey = 'products:all';

  try {
    // Try fresh cache first
    const [cached, ttlRemaining] = await Promise.all([
      getFromCache(cacheKey),
      redis.ttl(cacheKey).catch(() => -1),
    ]);

    if (cached) {
      // Probabilistic early refresh (non-blocking, in background)
      if (shouldRefreshEarly(ttlRemaining, CACHE_TTL)) {
        singleflight(`refresh:${cacheKey}`, async () => {
          const fresh = await slowQuery();
          dbHitCount++;
          await setCache(cacheKey, fresh, CACHE_TTL);
        }).catch(() => {}); // Fire-and-forget
      }

      return res.json({
        source: 'cache',
        dbHits: dbHitCount,
        data: cached,
      });
    }

    // Cache miss — singleflight fetch (only ONE DB query)
    const data = await singleflight(cacheKey, async () => {
      dbHitCount++;
      const products = await slowQuery();
      await setCache(cacheKey, products, CACHE_TTL);
      return products;
    });

    res.json({
      source: 'db',
      dbHits: dbHitCount,
      data,
    });
  } catch (err) {
    // STALE-ON-ERROR: Serve old data rather than fail
    const stale = await getFromCache(`stale:${cacheKey}`);
    if (stale) {
      console.warn(`Serving stale for ${cacheKey}: ${err.message}`);
      return res.json({
        source: 'stale',
        dbHits: dbHitCount,
        data: stale,
      });
    }

    // Last resort: direct DB query (no cache)
    try {
      dbHitCount++;
      const products = await slowQuery();
      return res.json({
        source: 'db-fallback',
        dbHits: dbHitCount,
        data: products,
      });
    } catch (dbErr) {
      res.status(500).json({ error: 'Service unavailable', detail: dbErr.message });
    }
  }
});

app.post('/products', async (req, res) => {
  // In a real app this would write to DB
  await Promise.all([
    redis.del('products:all').catch(() => {}),
    redis.del('stale:products:all').catch(() => {}),
  ]);
  res.status(201).json({ id: Date.now() });
});

// GET /stats — for the demo dashboard
app.get('/stats', (req, res) => {
  res.json({ dbHitCount, port: PORT, version: 'spec-driven' });
});

// POST /reset — reset counters for demo
app.post('/reset', async (req, res) => {
  dbHitCount = 0;
  await redis.del('products:all').catch(() => {});
  await redis.del('stale:products:all').catch(() => {});
  res.json({ reset: true });
});

app.listen(PORT, () => {
  console.log(`🛡️  SPEC-DRIVEN API running on port ${PORT}`);
  console.log(`   Cache TTL: ${CACHE_TTL}s | Singleflight ✓ | Stale fallback ✓ | Compression ✓`);
});

module.exports = app;
