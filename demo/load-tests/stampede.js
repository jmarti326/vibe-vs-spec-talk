// load-tests/stampede.js — k6 load test simulating cache stampede
// Install k6: https://k6.io/docs/getting-started/installation/
// Run: k6 run load-tests/stampede.js --env TARGET=http://localhost:3001

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter, Trend } from 'k6/metrics';

// Custom metrics for the demo dashboard
const dbHits = new Counter('db_hits_total');
const errorCount = new Counter('error_count');
const cacheHitRate = new Trend('cache_hit_rate');

const TARGET = __ENV.TARGET || 'http://localhost:3001';

export const options = {
  scenarios: {
    // Phase 1: Warm up the cache
    warmup: {
      executor: 'shared-iterations',
      vus: 1,
      iterations: 1,
      maxDuration: '5s',
      exec: 'warmup',
    },
    // Phase 2: Wait for cache to expire (simulated by flushing)
    flush: {
      executor: 'shared-iterations',
      vus: 1,
      iterations: 1,
      startTime: '3s',
      maxDuration: '5s',
      exec: 'flushCache',
    },
    // Phase 3: STAMPEDE — 200 concurrent requests hitting expired cache
    stampede: {
      executor: 'shared-iterations',
      vus: 200,
      iterations: 200,
      startTime: '6s',
      maxDuration: '30s',
      exec: 'stampede',
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% of requests should be under 1s
    http_req_failed: ['rate<0.05'], // Less than 5% failures
  },
};

export function warmup() {
  // Hit the endpoint once to populate the cache
  const res = http.get(`${TARGET}/products`);
  check(res, {
    'warmup: status 200': (r) => r.status === 200,
    'warmup: got data': (r) => JSON.parse(r.body).data.length > 0,
  });
  console.log(`✅ Cache warmed up (source: ${JSON.parse(res.body).source})`);
}

export function flushCache() {
  // Reset the server state — simulates cache expiry
  sleep(1);
  const res = http.post(`${TARGET}/reset`);
  check(res, { 'flush: reset successful': (r) => r.status === 200 });
  console.log('🔥 Cache flushed — stampede incoming!');
  sleep(1);
}

export function stampede() {
  const res = http.get(`${TARGET}/products`);

  const success = check(res, {
    'stampede: status 200': (r) => r.status === 200,
    'stampede: response < 500ms': (r) => r.timings.duration < 500,
    'stampede: response < 1000ms': (r) => r.timings.duration < 1000,
  });

  if (res.status === 200) {
    try {
      const body = JSON.parse(res.body);
      if (body.source === 'db') {
        dbHits.add(1);
      }
    } catch {}
  } else {
    errorCount.add(1);
  }
}

export function handleSummary(data) {
  const totalReqs = data.metrics.http_reqs ? data.metrics.http_reqs.values.count : 0;
  const failRate = data.metrics.http_req_failed
    ? data.metrics.http_req_failed.values.rate
    : 0;
  const avgDuration = data.metrics.http_req_duration
    ? data.metrics.http_req_duration.values.avg
    : 0;
  const p95Duration = data.metrics.http_req_duration
    ? data.metrics.http_req_duration.values['p(95)']
    : 0;

  const summary = `
╔══════════════════════════════════════════════════╗
║  STAMPEDE TEST RESULTS                           ║
║  Target: ${TARGET.padEnd(39)}║
╠══════════════════════════════════════════════════╣
║  Total Requests:    ${String(totalReqs).padEnd(28)}║
║  Failure Rate:      ${(failRate * 100).toFixed(1).padEnd(28)}%║
║  Avg Response Time: ${avgDuration.toFixed(0).padEnd(25)}ms ║
║  P95 Response Time: ${p95Duration.toFixed(0).padEnd(25)}ms ║
╚══════════════════════════════════════════════════╝
`;
  console.log(summary);

  return {};
}
