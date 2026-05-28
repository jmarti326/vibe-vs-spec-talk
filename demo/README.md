# Demo: Vibe Coding vs Spec-Driven — Cache Stampede Showdown

## Quick Start

```bash
# 1. Install dependencies
cd demo
npm install

# 2. Seed the database (500 products)
npm run seed

# 3. Start Redis (required)
# Option A: Docker
docker run -d --name demo-redis -p 6379:6379 redis:alpine

# Option B: Local Redis (if installed)
redis-server --daemonize yes

# 4. Start both APIs
npm run both
# Vibe API: http://localhost:3001
# Spec API: http://localhost:3002

# 5. Run the stampede comparison (THE LIVE MOMENT)
node load-tests/compare.js
```

## What This Demonstrates

### The Vibe-Coded Version (port 3001)
- Generated from: "Add Redis caching to GET /products. Cache 5 min. Invalidate on write."
- **Works perfectly** with single requests
- **Dies** under concurrent load when cache expires (stampede)
- Every concurrent request independently hits the database

### The Spec-Driven Version (port 3002)
- Built from a GSD spec that defined:
  - Singleflight pattern (only 1 request fetches, others wait)
  - Probabilistic early refresh (prevent expiry cliff)
  - Stale-on-error fallback (graceful degradation)
  - Compression (memory efficiency)
  - Connection resilience
- **Works perfectly** with single requests AND concurrent load
- Only 1 DB hit regardless of concurrent request count

## For the Talk

### Pre-Recording the Demo
```bash
# Install asciinema for terminal recording
# https://asciinema.org/

# Record the comparison
asciinema rec demo-recording.cast -c "node load-tests/compare.js"

# Or use VHS (https://github.com/charmbracelet/vhs) for GIF output
```

### The Live Moment
The only thing you do LIVE on stage:
```bash
node load-tests/compare.js
```

This runs in ~5 seconds and produces a dramatic comparison table.

### If Redis Isn't Available
The spec-driven version gracefully falls back to direct DB queries.
The vibe version crashes with a 500 error. (This is ALSO a good demo point!)

### Adjusting Concurrency
```bash
# Default: 200 concurrent requests
CONCURRENT=500 node load-tests/compare.js

# For a more dramatic demo:
CONCURRENT=1000 node load-tests/compare.js
```

## k6 Load Tests (Alternative)

If you have [k6](https://k6.io) installed:
```bash
# Test vibe API
k6 run load-tests/stampede.js --env TARGET=http://localhost:3001

# Test spec API
k6 run load-tests/stampede.js --env TARGET=http://localhost:3002
```

k6 produces prettier output and more metrics, but the Node.js comparison script
is simpler to run and doesn't require additional tools.

## Project Structure

```
demo/
├── package.json
├── run-both.js            # Starts both servers
├── shared/
│   ├── db.js              # SQLite setup + slow query simulation
│   └── seed.js            # Seed 500 products
├── vibe-api/
│   └── server.js          # The naive "vibe-coded" version
├── spec-api/
│   └── server.js          # The robust "spec-driven" version
└── load-tests/
    ├── stampede.js         # k6 load test script
    └── compare.js         # Node.js comparison (THE LIVE SCRIPT)
```

## Expected Results

### Vibe API (200 concurrent after flush):
- ❌ 10-40% failure rate
- ❌ 150-200 DB hits (one per request!)
- ❌ 2000-5000ms average response time
- ❌ Timeout errors

### Spec API (200 concurrent after flush):
- ✅ 0% failure rate
- ✅ 1 DB hit (singleflight!)
- ✅ 80-200ms average response time
- ✅ All requests served
