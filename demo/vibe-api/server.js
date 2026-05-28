// vibe-api/server.js
// ============================================================
// THE VIBE-CODED VERSION
// Generated from prompt: "Add Redis caching to GET /products.
// Cache for 5 minutes. Invalidate on POST/PUT/DELETE."
// ============================================================
// This code "works" — tests pass, linting passes, it handles
// the happy path perfectly. But it has a critical flaw under
// concurrent load: CACHE STAMPEDE.
// ============================================================

const express = require('express');
const { getRedisWithFallback } = require('../shared/get-redis');
const { slowQuery } = require('../shared/db');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;
const CACHE_TTL = 300; // 5 minutes

// Track DB hits for demo visibility
let dbHitCount = 0;
let redis;

async function start() {
  redis = await getRedisWithFallback();

  // GET /products — cached
  app.get('/products', async (req, res) => {
    try {
      const cached = await redis.get('products:all');

      if (cached) {
        return res.json({
          source: 'cache',
          dbHits: dbHitCount,
          data: JSON.parse(cached),
        });
      }

      // Cache miss — hit the database
      // BUG: When 500 requests arrive simultaneously after cache expires,
      // ALL of them will reach this point and ALL will hit the DB.
      // This is the "cache stampede" or "thundering herd" problem.
      dbHitCount++;
      const products = await slowQuery();

      await redis.setex('products:all', CACHE_TTL, JSON.stringify(products));

      res.json({
        source: 'db',
        dbHits: dbHitCount,
        data: products,
      });
    } catch (err) {
      // BUG: If Redis is down, the entire endpoint fails.
      // No fallback, no stale serving, just a 500.
      console.error(`💥 [VIBE-API] ${err.message}`);
      res.status(500).json({
        error: 'Service unavailable',
        detail: err.message,
        hint: 'No fallback configured — this is what your users see at 2 AM',
      });
    }
  });

  // POST /products — invalidate cache
  app.post('/products', async (req, res) => {
    await redis.del('products:all');
    res.status(201).json({ id: Date.now() });
  });

  // GET /stats — for the demo dashboard
  app.get('/stats', (req, res) => {
    res.json({ dbHitCount, port: PORT, version: 'vibe' });
  });

  // POST /reset — reset counters for demo
  app.post('/reset', async (req, res) => {
    dbHitCount = 0;
    await redis.del('products:all');
    res.json({ reset: true });
  });

  app.listen(PORT, () => {
    console.log(`⚡ VIBE API running on port ${PORT}`);
    console.log(`   Cache TTL: ${CACHE_TTL}s | No stampede protection`);
  });
}

start().catch(console.error);

module.exports = app;
