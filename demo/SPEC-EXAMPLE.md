# GSD Spec Example: Redis Caching Layer

> This is the spec that was written BEFORE the AI generated code.
> It captures the architectural decisions a human made — giving AI
> the context it needs to build production-ready code.

---

## PROJECT.md (excerpt)

```markdown
# Product Catalog API

## Vision
Fast, reliable product catalog API serving 10K+ concurrent users.

## Non-Functional Requirements
- P99 latency < 200ms under normal load
- Graceful degradation when dependencies fail
- Zero data loss during cache transitions
```

---

## Phase Spec: Add Redis Caching

### Context
The `/products` endpoint currently hits the database on every request.
Average response time is 150ms. Under peak load (500+ concurrent),
DB connection pool exhausts and requests timeout.

### Requirements
1. Cache product listings in Redis with 5-minute TTL
2. Serve stale data if Redis or DB is temporarily unavailable
3. Handle concurrent cache misses without stampeding the database
4. Compress cached payloads to reduce Redis memory usage
5. Invalidate cache on any write operation (POST/PUT/DELETE)

### Architectural Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Stampede protection | Singleflight pattern | Simple, in-process, no external deps needed |
| Cache refresh | Probabilistic early expiry | Prevents cliff-edge expiration for all users |
| Failure mode | Stale-while-error | Users see old data rather than errors |
| Compression | gzip (base64 encoded) | 60-80% size reduction for JSON arrays |
| Key strategy | `products:{endpoint_path}` | Supports per-page caching later |
| Stale TTL | 3x fresh TTL | Enough time to recover from outages |

### What This MUST Handle
- 500 concurrent requests hitting an expired cache key simultaneously
- Redis being completely unavailable for up to 60 seconds
- Database being slow (5s+ response) without cascading failures

### What This Should NOT Do
- Don't cache error responses
- Don't invalidate all keys on a single product update (surgical invalidation)
- Don't block requests waiting for cache population (return stale or DB)

### Verification Criteria
- [ ] 500 concurrent requests on expired key: exactly 1 DB query
- [ ] Redis killed mid-request: stale data served, no 500 errors
- [ ] Cache invalidation on POST: next GET reflects new data within 1s
- [ ] Memory usage: cached payload < 40% of raw JSON size
- [ ] P99 under stampede < 300ms

---

## GSD Discussion Notes (from `/gsd-discuss-phase`)

```
Q: What happens if the singleflight leader fails mid-query?
A: All waiters get the error. They should fall back to stale cache or direct DB.

Q: Should we use distributed locks (Redis SETNX) instead of in-process singleflight?
A: No. We're single-instance for now. Singleflight is simpler and faster.
   If we go multi-instance, revisit with Redis-based distributed lock.

Q: Compression -- is it worth it for <1KB payloads?
A: Only compress if payload > 1KB. Below that, overhead isn't worth it.
   (For the demo, we always compress since we have 500 products.)

Q: How do we monitor cache health?
A: Log cache hit/miss ratio. Alert if hit rate drops below 80% for 5 min.
   (Not implementing alerting now, but log the metrics.)
```

---

## What the AI Received vs What It Would Get Without a Spec

### Without spec (vibe coding prompt):
```
"Add Redis caching to the GET /products endpoint.
Cache for 5 minutes. Invalidate on POST/PUT/DELETE."
```
Result: AI generates correct-looking code that stampedes under load.

### With spec (GSD-generated context for executor):
```
Task: Implement Redis caching for GET /products

Constraints:
- Use singleflight pattern (in-process Map) for stampede protection
- Implement stale-on-error: keep stale copy at 3x TTL
- Compress payloads > 1KB with gzip (base64 encode for Redis)
- Probabilistic early refresh: 10% chance when TTL < 20% remaining
- Cache key pattern: products:{req.originalUrl}
- Connection resilience: lazy connect, retry with backoff, max 3 retries

Verification: The load test will fire 500 concurrent requests after
cache flush. Expected: exactly 1 DB hit, 0 errors, P99 < 300ms.
```
Result: AI generates robust code that handles the exact scenarios specified.

---

## The Point

**The spec took 15 minutes of thinking.**
**It saved hours of debugging and a potential production outage.**

The AI is the same. The model is the same. The developer is the same.
The only difference: one got vibes, one got a spec.
