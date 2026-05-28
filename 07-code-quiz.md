# 🧠 Code Quiz — Spot the AI-Generated Code

> Use this during ACT 2. Show both versions. Ask audience to guess which is AI.
> The point: AI code LOOKS correct. The bugs are in the assumptions, not the syntax.

---

## Quiz 1: Rate Limiter (Easy — good for mixed audience)

### Version A
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);
```

### Version B
```javascript
const rateLimits = new Map();

app.use('/api/', (req, res, next) => {
  const key = req.ip;
  const now = Date.now();
  const window = rateLimits.get(key) || { count: 0, start: now };

  if (now - window.start > 900000) {
    window.count = 1;
    window.start = now;
  } else {
    window.count++;
  }

  rateLimits.set(key, window);

  if (window.count > 100) {
    return res.status(429).json({ error: 'Too many requests' });
  }
  next();
});
```

### Answer
**Version B is AI-generated.** It reinvents the wheel instead of using the battle-tested
library. It also has bugs: no cleanup of old entries (memory leak), no distributed support,
and `req.ip` can be spoofed without trust proxy configuration.

Version A uses a well-known library that handles all these edge cases.

**Talking point:** "AI loves to reimplement things from scratch. It looks impressive
but misses years of edge-case fixes baked into established packages."

---

## Quiz 2: Password Hashing (Medium — security focused)

### Version A
```javascript
const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}
```

### Version B
```javascript
const bcrypt = require('bcrypt');

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

async function verifyPassword(password, hash) {
  const isMatch = await bcrypt.compare(password, hash);
  if (!isMatch) {
    throw new Error('Invalid password');
  }
  return true;
}
```

### Answer
**Version B is AI-generated.** Two subtle issues:
1. Throwing an error on password mismatch creates a timing side-channel and leaks
   information in stack traces (error messages should never reveal auth details)
2. Cost factor of 10 is below current recommendations (12+ for 2026)

Version A is cleaner: returns boolean, proper cost factor, no information leakage.

**Talking point:** "Both work. Both pass tests. But Version B has a security smell
that only shows up in a penetration test or audit."

---

## Quiz 3: Concurrent Data Fetch (Hard — architecture)

### Version A
```javascript
async function getUserDashboard(userId) {
  const user = await db.getUser(userId);
  const orders = await db.getOrders(userId);
  const recommendations = await ai.getRecommendations(userId);
  const notifications = await db.getNotifications(userId);

  return { user, orders, recommendations, notifications };
}
```

### Version B
```javascript
async function getUserDashboard(userId) {
  const [user, orders, recommendations, notifications] = await Promise.all([
    db.getUser(userId),
    db.getOrders(userId),
    ai.getRecommendations(userId).catch(() => []),
    db.getNotifications(userId),
  ]);

  return { user, orders, recommendations, notifications };
}
```

### Answer
**Version A is AI-generated.** It fetches sequentially when all four queries are
independent — 4x slower for no reason. Also, if `ai.getRecommendations` is slow
or fails, the entire dashboard is blocked.

Version B runs in parallel AND gracefully degrades (recommendations fallback to empty).

**Talking point:** "AI generates code that's CORRECT but not OPTIMAL. It doesn't
think about how your users will experience 800ms of sequential fetches vs 200ms parallel."

---

## How to Use in the Talk

1. Show BOTH versions side by side (use the slides' two-column layout)
2. Ask: "Which one was AI-generated?"
3. Give audience 10-15 seconds to think
4. Reveal the answer
5. Explain the subtle flaw
6. Reinforce: "The bugs aren't in the syntax. They're in the ASSUMPTIONS."

**Pick ONE quiz** for the talk (don't do all three — pacing).
- Quiz 1 for a beginner-heavy audience
- Quiz 2 for a security-aware audience
- Quiz 3 for a senior-heavy audience
