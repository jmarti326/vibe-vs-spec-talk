// shared/mock-redis.js — In-memory Redis mock for testing/rehearsal without Redis
// Usage: set MOCK_REDIS=1 environment variable to use this instead of real Redis

class MockRedis {
  constructor() {
    this.store = new Map();
    this.ttls = new Map();
    this.connected = true;
    console.log('  📦 Using MOCK Redis (in-memory) — set MOCK_REDIS=0 for real Redis');
  }

  async get(key) {
    this._expireCheck(key);
    return this.store.get(key) || null;
  }

  async setex(key, ttl, value) {
    this.store.set(key, value);
    this.ttls.set(key, Date.now() + ttl * 1000);
    return 'OK';
  }

  async del(key) {
    this.store.delete(key);
    this.ttls.delete(key);
    return 1;
  }

  async ttl(key) {
    const expiry = this.ttls.get(key);
    if (!expiry) return -2;
    const remaining = Math.ceil((expiry - Date.now()) / 1000);
    return remaining > 0 ? remaining : -2;
  }

  async connect() {
    return this;
  }

  on() { return this; }
  catch() { return this; }

  _expireCheck(key) {
    const expiry = this.ttls.get(key);
    if (expiry && Date.now() > expiry) {
      this.store.delete(key);
      this.ttls.delete(key);
    }
  }
}

module.exports = MockRedis;
