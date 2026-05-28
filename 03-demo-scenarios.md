# Demo Scenarios — Technical Setup

## Overview

Three demo scenarios for the talk. All should be **pre-recorded** as default,
with ONE live moment (the load test comparison at the end).

---

## Demo #1: "The Magic" (pre-recorded, 90 seconds)

### What to show:
A vibe-coded REST API with authentication generated in one prompt.

### The Prompt:
```
Build me a Node.js Express REST API with:
- User registration and login
- JWT authentication with refresh tokens
- Password hashing with bcrypt
- Protected /profile endpoint
- Basic error handling
Write tests too.
```

### Expected Output:
```
src/
├── server.js
├── routes/
│   ├── auth.js          # register, login, refresh
│   └── profile.js       # protected route
├── middleware/
│   └── auth.js          # JWT verification
├── models/
│   └── user.js          # user schema
└── tests/
    └── auth.test.js     # happy path tests
```

### The Reveal — Hidden Flaws to Highlight:
1. **No rate limiting** on login endpoint → brute force vulnerable
2. **Token in localStorage** suggestion in comments → XSS vulnerable
3. **No input validation** on username/email → injection risk
4. **No refresh token rotation** → stolen token = permanent access
5. **Tests only check happy path** → no edge cases

### Talking Point:
"Every test passes. Every endpoint works. But a pentester would have a field day."

---

## Demo #2: "The Showdown" — Vibe Coding Round

### Scenario:
Adding Redis caching to a `/products` endpoint in an existing Express API.

### The Vibe Prompt:
```
Add Redis caching to the GET /products endpoint.
Cache for 5 minutes. Invalidate on POST/PUT/DELETE.
```

### Expected Generated Code (problematic):
```javascript
// routes/products.js — Vibe-coded version
const redis = require('redis');
const client = redis.createClient();

app.get('/products', async (req, res) => {
  const cached = await client.get('products');
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  
  const products = await db.query('SELECT * FROM products');
  await client.setEx('products', 300, JSON.stringify(products));
  res.json(products);
});

app.post('/products', async (req, res) => {
  const product = await db.query('INSERT INTO products...', req.body);
  await client.del('products');  // invalidate cache
  res.json(product);
});
```

### Why This Breaks Under Load:
1. **Cache stampede**: When the key expires, ALL concurrent requests hit the DB simultaneously
2. **No connection pooling** for Redis client
3. **No error handling** if Redis is down (entire app fails)
4. **Full table cached as one key** — memory issues at scale
5. **No compression** for large payloads

### Load Test Script (k6):
```javascript
// load-test-stampede.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    stampede: {
      executor: 'shared-iterations',
      vus: 500,
      iterations: 500,
      maxDuration: '10s',
    },
  },
};

export default function () {
  // All 500 VUs hit simultaneously after cache expires
  const res = http.get('http://localhost:3000/products');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
}
```

### Expected Failure Output:
```
✗ status is 200......... 62% (312/500)
✗ response time < 500ms. 23% (115/500)

running (10.2s), 0/500 VUs
     http_req_duration... avg=2340ms  min=45ms  max=9800ms
     http_req_failed..... 38% (188/500)
```

---

## Demo #2: "The Showdown" — Spec-Driven Round (GSD)

### GSD Discussion Phase:
```
/gsd-discuss-phase

Discussion points:
- Cache key strategy: per-endpoint, include query params?
- TTL: 5 min, but use probabilistic early expiration (jitter)?
- Stampede protection: singleflight/mutex pattern
- Fallback: serve stale if Redis is down?
- Invalidation: exact key delete or pattern-based?
- Memory: compress large payloads? Pagination-aware caching?
```

### GSD Plan Output (summarized):
```markdown
## Phase Plan: Redis Caching Layer

### Research Findings:
- Singleflight pattern prevents stampedes (one request fetches, others wait)
- Probabilistic early expiration reduces thundering herd
- Stale-while-revalidate provides graceful degradation

### Implementation Plan:
1. Create cache middleware with singleflight mutex
2. Add probabilistic early refresh (10% chance at 80% TTL)
3. Implement stale-on-error fallback
4. Add Redis connection pool with retry logic
5. Compress payloads > 1KB
6. Cache per-query (include pagination params in key)

### Verification Criteria:
- [ ] 500 concurrent requests on expired key: 0 errors, < 200ms p99
- [ ] Redis down: serves stale data, logs warning
- [ ] Cache invalidation: POST reflects in next GET within 1s
```

### Generated Code (spec-driven):
```javascript
// middleware/cache.js — Spec-driven version
const Redis = require('ioredis');
const { promisify } = require('util');
const zlib = require('zlib');

const redis = new Redis({
  maxRetriesPerRequest: 3,
  retryStrategy: (times) => Math.min(times * 50, 2000),
  enableReadyCheck: true,
});

// Singleflight: prevent cache stampede
const inFlight = new Map();

function singleflight(key, fetchFn) {
  if (inFlight.has(key)) {
    return inFlight.get(key);
  }
  const promise = fetchFn().finally(() => inFlight.delete(key));
  inFlight.set(key, promise);
  return promise;
}

// Probabilistic early expiration
function shouldRefreshEarly(ttlRemaining, maxTtl) {
  const ratio = ttlRemaining / maxTtl;
  if (ratio > 0.2) return false;
  return Math.random() < 0.1; // 10% chance when under 20% TTL
}

function cacheMiddleware({ ttl = 300, prefix = 'cache' } = {}) {
  return async (req, res, next) => {
    const key = `${prefix}:${req.originalUrl}`;
    
    try {
      const [cached, ttlRemaining] = await Promise.all([
        redis.get(key),
        redis.ttl(key),
      ]);

      if (cached) {
        const data = JSON.parse(zlib.gunzipSync(Buffer.from(cached, 'base64')));
        
        // Probabilistic early refresh (non-blocking)
        if (shouldRefreshEarly(ttlRemaining, ttl)) {
          singleflight(`refresh:${key}`, () => refreshCache(key, req, ttl));
        }
        
        return res.json(data);
      }

      // Cache miss — singleflight fetch
      const data = await singleflight(key, async () => {
        const result = await fetchFromDB(req);
        await setCache(key, result, ttl);
        return result;
      });

      res.json(data);
    } catch (err) {
      // Stale-on-error: try stale cache
      const stale = await redis.get(`stale:${key}`).catch(() => null);
      if (stale) {
        console.warn(`Serving stale cache for ${key}:`, err.message);
        return res.json(JSON.parse(zlib.gunzipSync(Buffer.from(stale, 'base64'))));
      }
      next(err);
    }
  };
}

async function setCache(key, data, ttl) {
  const compressed = zlib.gzipSync(JSON.stringify(data)).toString('base64');
  await Promise.all([
    redis.setex(key, ttl, compressed),
    redis.setex(`stale:${key}`, ttl * 2, compressed), // stale copy lasts 2x
  ]);
}
```

### Load Test Result (spec-driven version):
```
✓ status is 200......... 100% (500/500)
✓ response time < 500ms. 99.8% (499/500)

running (1.4s), 0/500 VUs
     http_req_duration... avg=89ms  min=12ms  max=510ms
     http_req_failed..... 0% (0/500)
```

---

## Live Moment: Side-by-Side Load Test

### Pre-talk Setup:
1. Deploy BOTH versions to separate ports (3001 = vibe, 3002 = spec)
2. Pre-warm both caches
3. Clear caches right before the live moment
4. Have the k6 script ready with both targets

### Live Script:
```bash
# Run against both simultaneously
echo "=== VIBE CODING VERSION (port 3001) ===" && \
k6 run --env TARGET=http://localhost:3001 load-test-stampede.js

echo ""
echo "=== SPEC-DRIVEN VERSION (port 3002) ===" && \
k6 run --env TARGET=http://localhost:3002 load-test-stampede.js
```

### Backup:
If live fails, have pre-recorded terminal output ready as a GIF/video.

---

## Pre-Talk Test Checklist

- [ ] Run Demo #1 recording 3x — ensure it's smooth
- [ ] Run Demo #2 recordings 3x — ensure narration timing works
- [ ] Deploy both API versions locally
- [ ] Run load test 5x against each — consistent results?
- [ ] Test Redis restart scenario (stale fallback works?)
- [ ] Measure actual timing of each demo section
- [ ] Prepare backup slides/GIFs for every demo
- [ ] Test presentation display on projector resolution (1080p usually)
