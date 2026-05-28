// shared/get-redis.js — Returns real Redis or mock based on environment
const Redis = require('ioredis');
const MockRedis = require('./mock-redis');

function getRedis(options = {}) {
  if (process.env.MOCK_REDIS === '1') {
    return new MockRedis();
  }

  const redis = new Redis({
    host: '127.0.0.1',
    port: 6379,
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
      if (times > 3) {
        console.warn('  ⚠️  Redis unavailable after 3 retries — falling back to mock');
        return null;
      }
      return Math.min(times * 100, 1000);
    },
    lazyConnect: true,
    ...options,
  });

  return redis;
}

// Auto-fallback: try real Redis, fall back to mock if unavailable
async function getRedisWithFallback(options = {}) {
  if (process.env.MOCK_REDIS === '1') {
    return new MockRedis();
  }

  const redis = new Redis({
    host: '127.0.0.1',
    port: 6379,
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
      if (times > 2) return null;
      return Math.min(times * 50, 500);
    },
    lazyConnect: true,
    ...options,
  });

  try {
    await redis.connect();
    await redis.ping();
    return redis;
  } catch {
    console.warn('  ⚠️  Redis not available — using in-memory mock');
    redis.disconnect();
    return new MockRedis();
  }
}

module.exports = { getRedis, getRedisWithFallback };
