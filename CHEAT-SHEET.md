# 📋 Cheat Sheet: Vibe Coding → Spec-Driven Dev

## The Spectrum (pick your spot)

```
← Fast & Risky                          Safe & Intentional →

  PURE VIBE    →    BULLET POINTS    →    CUSTOM RULES    →    FULL GSD
  "just prompt"     3 lines before        .cursorrules /       /gsd-new-project
                    you prompt             instructions         full loop

  ✅ Prototyping    ✅ Small features     ✅ Team projects      ✅ Production systems
  ✅ Learning       ✅ Scripts             ✅ Medium apps        ✅ Complex features
  ❌ Production     ❌ Complex logic      ❌ Regulated          ✅ Compliance/audit
```

---

## 🚀 Quick Win: The 3-Bullet Spec

Before your next AI prompt, write:

1. **WHAT** should it do? (the feature in one sentence)
2. **WHAT SHOULDN'T** it do? (constraints & edge cases)
3. **HOW WILL I VERIFY** it works? (acceptance criteria)

**Example:**
```
1. Add Redis caching to GET /products with 5-min TTL
2. Must handle 500 concurrent requests on cache miss without stampeding DB
3. Verify: load test with 500 VUs after cache flush → 0 errors, 1 DB hit
```

---

## 🛡️ The GSD Loop (6 commands)

```bash
npx @opengsd/get-shit-done-redux@latest   # Install

/gsd-new-project          # Vision → Requirements → Roadmap
/gsd-discuss-phase 1      # Capture YOUR decisions
/gsd-plan-phase 1         # Research → Plan → Verify
/gsd-execute-phase 1      # AI builds in fresh contexts
/gsd-verify-work 1        # Acceptance testing
/gsd-ship 1               # PR from verified work
```

---

## 🐛 Top 3 AI Code Failures to Watch For

| Pattern | What Happens | How to Prevent |
|---------|-------------|----------------|
| **Cache Stampede** | All requests hit DB when cache expires | Singleflight / mutex pattern |
| **Silent Data Corruption** | Works in tests, breaks under concurrency | Property-based testing, load tests |
| **Retry Storm** | Infinite retries cascade across services | Exponential backoff + circuit breaker |

---

## 📊 The Numbers (2026)

- **1.7×** more production issues in AI code vs human code
- **62%** of AI code has security/design flaws
- **92%** of devs use AI tools daily
- **60%+** of new code is AI-generated

---

## 🔗 Resources

- **GSD**: github.com/open-gsd/get-shit-done-redux
- **This talk's demo**: github.com/[speaker]/vibe-vs-spec-talk
- **Key reads**:
  - "7 Hidden Production Bugs AI Agents Create" — pockit.tools/blog
  - "Silent Failures" — speedscale.com/blog
  - "Are Bugs Inevitable with AI Agents?" — stackoverflow.blog

---

## 💡 One Thing to Remember

> "A spec is just a prompt that respects the reader."

**Think first. Vibe second.**
