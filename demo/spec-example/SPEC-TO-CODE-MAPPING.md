# 🎯 Spec → Code: The Mapping

## The Vibe Prompt (what the AI got)

```
"Add Redis caching to GET /products. Cache 5 min. Invalidate on write."
```

### What it produced:
```javascript
const cached = await redis.get(key);
if (cached) return res.json(JSON.parse(cached));
const data = await db.query('SELECT * FROM products');
await redis.setex(key, 300, JSON.stringify(data));  // ← That's it. Done.
```
✅ Works for 1 user. 💥 Dies with 200.

---

## The Spec (what the AI got instead)

| Spec Line | → | Code Feature |
|-----------|---|--------------|
| "Handle concurrent cache misses" | → | `singleflight()` — only 1 DB query |
| "Serve stale if Redis/DB unavailable" | → | `stale:${key}` with 3x TTL fallback |
| "Compress cached payloads" | → | `gzip()` + base64 encoding |
| "Probabilistic early refresh" | → | 10% chance refresh when TTL < 20% |
| "Connection resilience" | → | Auto-reconnect with backoff |

### What it produced:
```javascript
// Only ONE request hits DB, others wait for the result
const data = await singleflight(key, async () => {
  const products = await slowQuery();
  await setCache(key, products, CACHE_TTL);  // compressed + stale copy
  return products;
});
```
✅ Works for 1 user. ✅ Works for 10,000.

---

## 🌱 Minimum Viable Spec (start here!)

You don't need a full GSD spec. Start with just 3 questions:

```markdown
## Before prompting AI, answer:

1. What should this do?
   → Cache products for 5 min, invalidate on writes

2. What should this NOT do? (edge cases)
   → Don't let all users hit DB at once when cache expires
   → Don't crash if Redis goes down

3. How will I verify it works?
   → Fire 200 concurrent requests, expect 1 DB hit
```

**That's 30 seconds of thinking. It would have prevented the stampede.**

---

## The Spectrum (pick your level)

```
🎮 Pure Vibe     →  "Add caching"
📝 3 Bullets     →  What / What NOT / How to verify
📋 Phase Spec    →  Requirements + decisions + criteria
🏗️ Full GSD      →  Discuss → Plan → Execute → Verify
```

**Rule of thumb:** If users depend on it, move one step right.
