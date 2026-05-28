---
theme: default
title: "Vibe Coding is Fun… Until Prod Breaks"
info: |
  ## Why Spec-Driven Dev Wins
  A talk about making AI coding tools work FOR you, not against you.
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
---

# Vibe Coding is Fun…<br>Until Prod Breaks

## Why Spec-Driven Dev Wins

<div class="pt-12">
  <span class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

<!--
Welcome everyone! Take a breath. Make eye contact. Smile.
"Hey everyone, I'm [name]. I love AI coding tools. I use them every day. And today I'm going to break one on stage."
-->

---
layout: center
class: text-center
---

# 🙋 Quick Poll

## Who here has shipped AI-generated code to production?

<v-click>

## ...and who's 100% confident in what it's doing?

</v-click>

<v-click>

<div class="text-2xl mt-8 opacity-80">
This is NOT an anti-AI talk.<br>
This is a <span class="text-green-400 font-bold">pro-discipline</span> talk.
</div>

</v-click>

<!--
Wait for hands. Count silently. "Wow, that's a lot."
Second question: pause dramatically as hands drop.
Third reveal: this line is your thesis statement. Say it with conviction.
"I ship more code with AI than without. The question is HOW."
-->

---
layout: section
---

# ACT 1
## The Seduction of Vibe Coding

---

# The Golden Age

<div class="grid grid-cols-2 gap-8">
<div>

## What is Vibe Coding?

> "You just see things, say things, run things, and copy-paste things — and it mostly works."
>
> — Andrej Karpathy, 2025

Natural language → Working software

No syntax. No boilerplate. Just... vibes.

</div>
<div>

## The Numbers (2026)

<v-clicks>

- **92%** of US devs use AI tools daily
- **60%+** of new code is AI-generated
- **74%** report productivity gains

</v-clicks>

</div>
</div>

---

# 🎶 Demo: Let's Vibe for a Second 🪩✨

<div class="text-xl mb-4 opacity-70">
"Build me a REST API with JWT auth, password hashing, and a protected /profile endpoint." 🎤🔥
</div>

<!-- Embed pre-recorded terminal here -->
<div class="border border-gray-600 rounded-lg p-4 bg-gray-900 h-80 flex items-center justify-center">
  <span class="text-gray-400 text-lg">[ 🎬 Pre-recorded demo: 90 seconds 🍿 ]</span>
</div>

<v-click>

<div class="text-center text-2xl mt-4">
✅ Tests pass. ✅ Endpoints work. 🚀 Ship it!
</div>

</v-click>

---

# But Wait...

<div class="grid grid-cols-3 gap-4 mt-8">

<div class="border border-red-500/50 rounded p-4 bg-red-900/20">
<h3 class="text-red-400">🔓 No Rate Limiting</h3>
<p class="text-sm">Login endpoint: brute-force away</p>
</div>

<div class="border border-red-500/50 rounded p-4 bg-red-900/20">
<h3 class="text-red-400">🍪 Token in localStorage</h3>
<p class="text-sm">XSS = instant account takeover</p>
</div>

<div class="border border-red-500/50 rounded p-4 bg-red-900/20">
<h3 class="text-red-400">💉 No Input Validation</h3>
<p class="text-sm">Username field accepts anything</p>
</div>

</div>

<v-click>

<div class="text-center text-2xl mt-8">
Every test passes. Every endpoint works.<br>
<span class="text-red-400">A pentester would have a field day.</span>
</div>

</v-click>

---
layout: section
---

# ACT 2
## The Reckoning

<div class="text-xl opacity-60">
"Raise your hand if you've been paged for AI-generated code."
</div>

---

# The Data

<div class="grid grid-cols-3 gap-8 mt-12">

<div class="text-center">
<div class="text-6xl font-bold text-red-400">1.7×</div>
<div class="mt-2 opacity-80">more issues in production<br>than human-written code</div>
</div>

<div class="text-center">
<div class="text-6xl font-bold text-red-400">62%</div>
<div class="mt-2 opacity-80">of AI code contains<br>security/design flaws</div>
</div>

<div class="text-center">
<div class="text-6xl font-bold text-red-400">75%</div>
<div class="mt-2 opacity-80">more logic errors<br>causing outages</div>
</div>

</div>

<div class="text-xs mt-8 opacity-40 text-center">
Sources: StackOverflow Blog (2026), Second Talent AI Code Quality Report, ACM TechBrief
</div>

---

# Three Ways AI Code Kills Production

<v-clicks>

## 1. 🌊 Cache Stampede
Cache expires → 500 requests all miss → all hit DB → DB dies

## 2. 👻 Silent Data Corruption
Works in tests, breaks under real concurrency → no one notices for weeks

## 3. 🔁 Retry Storm
Error → retry instantly → infinite loop → cascading failure across services

</v-clicks>

---
layout: quote
---

# The 2 AM Story

"Friday evening. You shipped a feature built in 20 minutes with AI. Saturday 2 AM, your phone rings.

The cache stampede took down the checkout flow.

Your **'fast' feature** just cost the company **$50K in lost revenue**."

<!--
Slow down here. Lower your voice. Make this feel personal.
"This isn't hypothetical. This happened to a team I know."
Let it breathe. 3-second pause after "$50K in lost revenue."
-->

---

# 🧠 Pop Quiz

<div class="grid grid-cols-2 gap-8 mt-4">

<div class="border rounded p-4 bg-gray-900">
<h3>Version A</h3>

```javascript
app.get('/products', async (req, res) => {
  const cached = await redis.get(key);
  if (cached) return res.json(JSON.parse(cached));
  const data = await db.query('SELECT * FROM products');
  await redis.setex(key, 300, JSON.stringify(data));
  res.json(data);
});
```

</div>

<div class="border rounded p-4 bg-gray-900">
<h3>Version B</h3>

```javascript
app.get('/products', async (req, res) => {
  const cached = await redis.get(key);
  if (cached) return res.json(JSON.parse(cached));
  const data = await fetchWithLock(key, () =>
    db.query('SELECT * FROM products'));
  await redis.setex(key, 300, JSON.stringify(data));
  res.json(data);
});
```

</div>
</div>

<v-click>

<div class="text-center text-xl mt-6">
Version A is AI-generated. It <span class="text-green-400">reads perfectly</span>. It <span class="text-red-400">breaks at scale</span>.<br>
The bugs aren't in the syntax — they're in the <strong>assumptions</strong>.
</div>

</v-click>

---
layout: section
---

# ACT 3
## The Way

<div class="text-xl opacity-60">
"The answer isn't to stop using AI.<br>
It's to give AI the STRUCTURE it needs."
</div>

---

# Spec-Driven Development

<div class="grid grid-cols-2 gap-8">
<div>

## The Principle

1. **Define WHAT** before HOW
2. **Human decisions** → AI execution
3. **Verify** at every step
4. **Persist** knowledge across sessions

</div>
<div>

## The Spectrum

```
← Exploration          Production →

Pure    Bullet   Custom    Full
Vibe    Points   Rules     GSD
 |        |        |        |
```

<v-click>

Pick your spot based on **who depends on the code**.

</v-click>

</div>
</div>

---

# GSD: One Implementation

**A spec-driven development system for AI coding tools.**

<div class="grid grid-cols-3 gap-4 mt-8">

<div class="border border-blue-500/50 rounded p-4">
<h3 class="text-blue-400">🧠 Context Engineering</h3>
<p class="text-sm">Fresh subagent contexts keep quality high. Main window stays at 30-40%.</p>
</div>

<div class="border border-green-500/50 rounded p-4">
<h3 class="text-green-400">📝 Persistent Memory</h3>
<p class="text-sm">PROJECT.md → REQUIREMENTS.md → ROADMAP.md → STATE.md survive sessions.</p>
</div>

<div class="border border-purple-500/50 rounded p-4">
<h3 class="text-purple-400">✅ Verification Built-In</h3>
<p class="text-sm">Dedicated verify step with debug agents BEFORE shipping.</p>
</div>

</div>

<v-click>

<div class="text-center mt-6 opacity-70">

```
New Project → Discuss → Plan → Execute → Verify → Ship → Repeat
```

</div>

</v-click>

---
layout: center
---

# 🎤 Audience Moment

## You're adding Redis caching to a products API.

## What should your spec include?

<div class="text-xl opacity-60 mt-4">
(Shout them out!)
</div>

<!-- Expected answers: TTL, invalidation, stampede protection, fallback, compression, key strategy -->

---

# Demo: The Showdown 🥊

<div class="grid grid-cols-2 gap-8">

<div class="border border-red-500/30 rounded p-6">
<h2 class="text-red-400">⚡ Vibe Coding</h2>

Prompt: *"Add Redis caching to /products"*

- ✅ Code generated
- ✅ Tests pass
- ✅ Deployed
- 🔥 **200 concurrent requests...**

</div>

<div class="border border-green-500/30 rounded p-6">
<h2 class="text-green-400">🛡️ Spec-Driven (GSD)</h2>

Spec: *Singleflight + stale fallback + compression*

- ✅ Discussed edge cases
- ✅ Planned with research
- ✅ Executed + verified
- 💪 **200 concurrent requests...**

</div>
</div>

<!-- Pre-recorded demo follows -->

---

# 🔴 LIVE: The Load Test

<div class="text-center text-xl mb-8">
Same database. Same Redis. Same 200 requests. Different approach.
</div>

<!-- Run: node load-tests/compare.js -->
<div class="border border-gray-600 rounded-lg p-4 bg-gray-900 h-64 flex items-center justify-center">
  <span class="text-gray-400 text-lg">[ LIVE: node load-tests/compare.js ]</span>
</div>

<!--
SWITCH TO TERMINAL NOW.
1. Run: npm run demo:reset (clean state)
2. Run: node load-tests/single.js (show happy path first!)
3. Say: "Both work perfectly. Same 500 products. Same 200 OK. Now watch..."
4. Run: node load-tests/compare.js
5. Let the results speak. Pause. Let audience react.
6. Say: "Same AI. Same model. Same developer. The difference? A spec."
SWITCH BACK TO SLIDES.
-->

---

# Results

<v-clicks>

| Aspect | ⚡ Vibe Coding | 🛡️ Spec-Driven |
|--------|:---:|:---:|
| Time to first code | 2 min ✅ | 15 min |
| Time to production-ready | ??? (rollbacks) | 20 min ✅ |
| Context management | Ad hoc | Engineered |
| Verification | "It compiles" | Structured |
| DB hits under stampede | 200 💥 | 1 ✅ |
| Sleep quality | 💀 | 😴 |

</v-clicks>

<v-click>

<div class="text-center text-xl mt-4">
"Vibe: 2 min to code, 2 hours to debug at 2 AM"<br>
"Spec: 20 min to ship, sleep through the night"
</div>

</v-click>

---
layout: section
---

# Honest Limitations
## When TO Vibe Code

---

# The Right Tool for the Job

<div class="grid grid-cols-2 gap-8">
<div>

## ✅ Vibe Away

- Prototyping & exploration
- Hack days & learning
- Throwaway scripts
- Personal projects
- "What would this look like?"

</div>
<div>

## 🛡️ Write the Spec

- Users depend on it
- Team collaboration
- Regulated/compliance
- Complex edge cases
- "This must work at 3 AM"

</div>
</div>

<v-click>

<div class="text-center mt-8 text-xl">
It's not binary. <strong>Find YOUR balance on the spectrum.</strong>
</div>

</v-click>

---

# GSD's Real Costs

<v-clicks>

- ⏱️ ~15 minutes upfront thinking per phase
- 💰 More API calls (subagents = more tokens)
- 📚 Learning curve for the 6-command loop
- 🔨 Overkill for a 50-line script

</v-clicks>

<v-click>

<div class="border border-yellow-500/50 rounded p-4 mt-8 bg-yellow-900/10">
💡 <strong>Minimum viable spec:</strong> Write 3 bullet points before your next AI prompt.
What should it do? What should it NOT do? How will you verify it works?
</div>

</v-click>

---
layout: section
---

# Takeaways
## Your Level, Your Move

---

# What to Do Next

<div class="grid grid-cols-3 gap-6">

<div class="border rounded p-4">
<h3 class="text-blue-400">🌱 Early Career</h3>
<ul class="text-sm">
<li>Vibe code to learn — but ask AI WHY</li>
<li>GSD can teach you architecture</li>
<li>Start noticing the gaps</li>
</ul>
</div>

<div class="border rounded p-4">
<h3 class="text-green-400">🌿 Mid-Career</h3>
<ul class="text-sm">
<li>This is your superpower</li>
<li>Learn to write clear specs</li>
<li>Be the person who ships reliably</li>
</ul>
</div>

<div class="border rounded p-4">
<h3 class="text-purple-400">🌳 Senior+</h3>
<ul class="text-sm">
<li>Your judgment is MORE valuable</li>
<li>You're the architect; AI is the contractor</li>
<li>Amplify your expertise</li>
</ul>
</div>

</div>

---
layout: center
class: text-center
---

# On a scale of 1-5...

## How often do you write specs before prompting AI?

<div class="text-xl mt-8 opacity-80">
Whatever your number...<br>
try bumping it up by <span class="text-green-400 font-bold text-4xl">1</span> this week.
</div>

---
layout: center
class: text-center
---

# Try It

<div class="text-2xl mt-4">

```bash
npx @opengsd/get-shit-done-redux@latest
```

</div>

<div class="mt-8 text-xl opacity-80">
Or lighter: just write 3 bullet points before your next prompt.<br>
<strong>Think first. Vibe second.</strong>
</div>

<div class="mt-12 text-sm opacity-50">
github.com/open-gsd/get-shit-done-redux
</div>

---
layout: center
class: text-center
---

# Vibe coding is fun.

# Shipping with confidence is <span class="text-green-400">funner</span>.

<div class="text-6xl mt-8">🎤</div>

<div class="mt-12 text-lg opacity-60">
Thank you! Questions?
</div>

<!--
Say "funner" with a smile — it's intentionally casual.
"Thank you. I'd love to hear YOUR horror stories or wins. Questions?"
Stay available after for hallway conversations — that's where the real impact happens.
-->

---
layout: end
---

# Links & Resources

- 📊 Slides + Demo: github.com/jmarti326/vibe-vs-spec-talk
- 🔧 GSD: github.com/open-gsd/get-shit-done-redux
- 📖 StackOverflow Blog: "Are bugs inevitable with AI coding agents?"
- 📖 ACM: "AI Vibe Coding Could Reshape Software Dev"
- 📖 Pockit: "7 Hidden Production Bugs AI Agents Create"
