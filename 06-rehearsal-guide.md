# 🎤 Rehearsal Guide

## Before Rehearsal

- [ ] Redis running (`docker compose up -d` in demo/)
- [ ] Both APIs tested (`npm run both` then `curl localhost:3001/products`)
- [ ] Load test verified (`node load-tests/compare.js`)
- [ ] Slides running (`npm run dev` in slides/)
- [ ] Timer ready (phone or laptop timer)
- [ ] Recording yourself (optional but recommended)

---

## Rehearsal Run-Through

### Target: 53 minutes of content (7 min buffer for Q&A)

---

### ⏱️ 0:00 — Opening Hook (target: 3 min)

**Mark START time.**

- [ ] Deliver meme/opening line
- [ ] Run the escalating poll (shipped AI code → confident in it)
- [ ] "This is not an anti-AI talk" framing
- [ ] Transition to ACT 1

**Check: Are you at 3:00 or under? If over 4:00, tighten the poll.**

---

### ⏱️ 3:00 — ACT 1: The Seduction (target: 7 min, end by 10:00)

- [ ] Define vibe coding (Karpathy quote)
- [ ] Hit the 3 stats (92%, 60%, 74%)
- [ ] Play pre-recorded Demo #1 (90 sec)
- [ ] Narrate over it naturally
- [ ] The Reveal Beat: highlight 3 security flaws
- [ ] Transition line: "So what happens when we ship code like this?"

**Check: Are you at 10:00? If over 11:00, narrate faster over demo.**

---

### ⏱️ 10:00 — ACT 2: The Reckoning (target: 9 min, end by 19:00)

- [ ] Engagement: "Raise hand if paged for AI code"
- [ ] Data slide: 1.7x, 62%, 75% (don't linger — 60 sec max)
- [ ] Pattern 1: Cache Stampede (60 sec)
- [ ] Pattern 2: Silent Data Corruption (45 sec)
- [ ] Pattern 3: Retry Storm (45 sec)
- [ ] The 2 AM story (take your time here — this is emotional)
- [ ] Code quiz: show two implementations, reveal answer
- [ ] Root causes (30 sec — brief!)
- [ ] Transition: "The answer isn't to stop using AI..."

**Check: Are you at 19:00? This section tends to run long. Cut a pattern if needed.**

---

### ⏱️ 19:00 — ACT 3: The Way + Showdown (target: 22 min, end by 41:00)

**Part A: Principles (8 min, end by 27:00)**
- [ ] "Give AI STRUCTURE" bridge
- [ ] Spec-driven principles (4 bullets, fast)
- [ ] The spectrum (Pure Vibe → Full GSD)
- [ ] Introduce GSD: "one implementation"
- [ ] Three problems it solves (context, memory, verification)
- [ ] Audience engagement: "What would YOUR spec say?" (60 sec)
- [ ] GSD loop animation (DON'T read each command — visual only)

**Check: Are you at 27:00? If over 28:00, cut the spectrum explanation shorter.**

**Part B: The Showdown Demo (12 min, end by 41:00)**
- [ ] Setup context: "Same task, two approaches"
- [ ] Play Round 1 recording (vibe coding → stampede failure) — 3 min
- [ ] Narrate what's happening, point out the flaw
- [ ] Play Round 2 recording (spec-driven → success) — 4 min
- [ ] Highlight: discuss → plan → execute → verify
- [ ] **LIVE MOMENT**: Run `node load-tests/compare.js` — 2 min
- [ ] React to results naturally
- [ ] Progressive table reveal — 2 min
- [ ] Punchline: "2 min to code, 2 hours to debug vs 20 min to ship, sleep all night"

**Check: Are you at 41:00? The live moment can run long. Skip table animation if tight.**

---

### ⏱️ 41:00 — Honest Limitations (target: 4 min, end by 45:00)

- [ ] "When TO vibe code" list (30 sec)
- [ ] "When to spec" list (30 sec)
- [ ] GSD's real costs (15 min, tokens, learning curve)
- [ ] "It's not binary — find your balance"
- [ ] Minimum viable spec: "3 bullet points"

**Check: Are you at 45:00? This section should feel quick and breezy.**

---

### ⏱️ 45:00 — ACT 5: Takeaways (target: 5 min, end by 50:00)

- [ ] Three personas: early career / mid / senior (60 sec each)
- [ ] Closing engagement: "1-5 scale... bump by 1"
- [ ] Call to action: npx command OR "just 3 bullet points"
- [ ] Closing line: "Vibe coding is fun. Shipping with confidence is funner."
- [ ] Pause. Smile. Let it land.

**Mark END time. Target: 50:00-53:00.**

---

## Post-Rehearsal Review

### Timing Analysis
- Total time: _____ min
- Sections that ran long: _____
- Sections that felt rushed: _____

### Energy Check
- Where did I lose energy? _____
- Where did it peak? _____
- Did the live demo work smoothly? Y/N

### Content Check
- Any transitions that felt awkward? _____
- Any explanations that felt too long? _____
- Did the audience moments feel natural? _____

### Technical Check
- [ ] Demo recordings played without issues
- [ ] Live load test produced expected results
- [ ] Slides advanced smoothly
- [ ] No unexpected terminal output

---

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Running over time | Cut Pattern 2 (silent corruption) — least visual |
| Demo recording won't play | Switch to backup GIF slides |
| Live load test fails | Show pre-captured terminal screenshot |
| Audience quiet during "shout out" | Seed with your own answer first |
| Lost in slides | Each slide has a speaker note — glance at laptop |
| Energy dips in ACT 3 | Speed up the principles, get to the demo faster |

---

## Rehearsal Log

| Date | Total Time | Notes |
|------|-----------|-------|
| | | |
| | | |
| | | |
