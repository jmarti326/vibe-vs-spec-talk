# Presentation: "Vibe Coding is Fun… Until Prod Breaks: Why Spec-Driven Dev Wins"

## Session Type: 45–60 min talk + live demos
## Target Audience: Mixed levels (beginners → seniors)

---

## 🎯 Narrative Arc

**The Story:** Take the audience on a journey from the dopamine rush of vibe coding → the horror of production failures → the discipline of spec-driven development → showing them it's NOT boring, it's actually MORE fun because you ship with confidence.

### Act Structure:
1. **ACT 1 – The Seduction** (7 min): Vibe coding is amazing. Show the magic.
2. **ACT 2 – The Reckoning** (9 min): But here's what happens at 2 AM when prod breaks.
3. **ACT 3 – The Way + The Proof** (22 min): Spec-driven dev + GSD with head-to-head demo.
4. **Honest Limitations** (4 min): When vibe coding IS the right choice.
5. **ACT 5 – The Call** (5 min): Takeaways + community call to action.

---

## 📋 Detailed Outline

### Opening Hook (3 min)
- Start with a meme/screenshot: "It works on my machine" → "It worked in my prompt"
- Poll: "Who here has shipped AI-generated code to production?" (show of hands)
- Set the tone: "This is NOT an anti-AI talk. This is a pro-discipline talk."

---

### ACT 1: The Seduction of Vibe Coding (7 min)

**Key points:**
- Define vibe coding (Andrej Karpathy coined it)
- 92% of US devs using AI-assisted tools daily in 2026
- 60%+ of new code is AI-generated
- Show the appeal: natural language → working app in minutes

**Demo #1: "The Magic" (pre-recorded, ~90 sec)**
- Show AI building a simple REST API with auth
- It works! Tests pass! Ship it! 🎉
- Audience feels the dopamine

**Audience connection points:**
- Beginners: "Wow, I can build this without knowing syntax!"
- Mid-level: "This saves me hours of boilerplate!"
- Seniors: "This is great for prototyping..."

**Transition beat:** "But wait... let's look closer at what we actually shipped." → Reveal a subtle flaw in Demo #1's code (e.g., no rate limiting, plaintext token storage). The audience becomes a participant in the failure.

---

### ACT 2: The Reckoning (9 min)

**Engagement moment:** "Raise your hand if you've been paged for AI-generated code."

**The Data (big numbers, cited):**
- AI code introduces 1.7x more issues than human code in production
- 62% of AI-generated code contains security/design flaws
- Security issues at 1.5–2x the rate of human code

**Three Killer Failure Patterns (not five — keep it tight):**
1. **Cache Stampedes** – AI generates "correct" cache logic but 100 requests hit expired cache simultaneously → DB overwhelm
2. **Silent Data Corruption** – Passes all tests, fails with real-world concurrency
3. **Retry Storms** – Error handling loops infinitely under failure conditions

**Storytelling moment:**
- "Picture this: Friday evening, you shipped a feature built in 20 minutes with AI. Saturday 2 AM your phone rings. The cache stampede took down the checkout flow. Your 'fast' feature just cost the company $50K in lost revenue."

**Audience quiz:** Show two code implementations side by side. "Which one is AI-generated?" Reveals how plausible-looking AI bugs are.

**The Root Cause:**
- No shared architectural understanding
- No verification beyond "it compiles and tests pass"
- Context window limitations → AI loses track of the big picture

---

### ACT 3: Spec-Driven Dev – The Way + The Proof (22 min)

**The Bridge:** "The answer isn't to stop using AI. The answer is to give AI the STRUCTURE it needs."

**Principles First (8 min):**

What is Spec-Driven Development?
- Specifications as the single source of truth
- Define WHAT before HOW
- Human decisions → AI execution
- Verification at every step

Approaches in the ecosystem:
- ADRs (Architecture Decision Records)
- RFC processes
- Custom system prompts with architectural constraints
- Cursor rules / .github/copilot-instructions
- **GSD** as a full framework implementation

**The Three Problems GSD Solves:**
1. **Context Bloat** → Fresh subagent contexts for heavy work
2. **No Shared Memory** → Structured artifacts (PROJECT.md, REQUIREMENTS.md, ROADMAP.md, STATE.md)
3. **No Verification** → Dedicated verify step with debug agents

**Engagement:** "What would YOUR spec say for a caching feature?" → 60 seconds of audience brainstorming

**The GSD Loop (visual animation, fast — not a spoken list):**
```
New Project → Discuss → Plan → Execute → Verify → Ship → Repeat
```

**Demo #2: "The Showdown" (12 min, mostly pre-recorded with live narration)**

Setup: Adding a caching layer to an API endpoint

*Round 1 – Vibe Coding (pre-recorded, 3 min):*
- Prompt: "Add Redis caching to the /products endpoint"
- AI generates code. Tests pass. Deploy.
- Hit it with concurrent requests → cache stampede
- Show the failure

*Round 2 – Spec-Driven with GSD (pre-recorded with pauses for narration, 6 min):*
- `/gsd-discuss-phase`: "What's our cache invalidation strategy? Stampede protection?"
- `/gsd-plan-phase`: AI researches patterns, plans mutex/lock approach
- `/gsd-execute-phase`: Generates code WITH stampede protection
- `/gsd-verify-work`: Confirms concurrent behavior handled
- Same concurrent requests → works perfectly

*Live moment (3 min):*
- Hit BOTH pre-deployed endpoints with a load test tool live
- Show the difference in real-time metrics

**Progressive comparison table (revealed row by row):**
| Aspect | Vibe Coding | Spec-Driven |
|--------|------------|-------------|
| Time to first code | 2 min ✅ | 15 min |
| Time to production-ready | ???  (rollbacks) | 20 min ✅ |
| Context management | Ad hoc | Engineered |
| Verification | "It compiles" | Structured |
| Knowledge retention | Per session | Persisted artifacts |
| Team collaboration | Tribal knowledge | Readable specs |

---

### Honest Limitations & When to Vibe (4 min)

**When vibe coding IS the right choice:**
- Prototyping and exploration
- Hack days and learning
- Throwaway scripts and one-offs
- Personal projects with no users depending on them

**When spec-driven wins:**
- Anything with users depending on it
- Team projects (specs = shared understanding)
- Regulated/compliance environments (audit trail)
- Complex features with edge cases

**GSD's real costs (honesty builds credibility):**
- ~15 min upfront thinking per phase
- More API calls / tokens (subagents cost money)
- Learning curve for the 6-command loop
- Overkill for a 50-line script

**The spectrum:** "It's not binary. Between pure vibe and full GSD, there's: bullet-point plans before prompting, system prompts with constraints, asking AI to self-critique. Find YOUR balance."

---

### ACT 5: Takeaways & Call to Action (5 min)

**For Everyone:**
1. Vibe coding is GREAT for exploration and prototyping
2. Spec-driven development is ESSENTIAL for production
3. The tools exist NOW to have both
4. Human code review remains your strongest defense

**For Beginners:**
- Start learning with vibe coding, but understand WHY things work
- GSD can teach you architecture while building

**For Mid-Level:**
- This is your competitive advantage — shipping reliably
- Learn to write good specs; AI will do the rest

**For Seniors:**
- Your architectural knowledge is MORE valuable, not less
- You're the spec writer, the context engineer, the decision maker
- AI amplifies your expertise

**Closing engagement:** "On a scale of 1-5, how often do you write specs before prompting AI? ...Let's change that number."

**Call to Action:**
- Try GSD: `npx @opengsd/get-shit-done-redux@latest`
- Or lighter: Write 3 bullet points before your next AI prompt
- GitHub: https://github.com/open-gsd/get-shit-done-redux

**Closing line:** "Vibe coding is fun. Shipping with confidence is funner." 🎤

---

## ⏱️ Timing Guide

| Section | Duration | Cumulative |
|---------|----------|-----------|
| Opening Hook + Poll | 3 min | 3 min |
| ACT 1: Seduction (pre-recorded demo) | 7 min | 10 min |
| ACT 2: Reckoning (with quiz) | 9 min | 19 min |
| ACT 3: The Way + Showdown Demo | 22 min | 41 min |
| Honest Limitations | 4 min | 45 min |
| ACT 5: Takeaways + Closing | 5 min | 50 min |
| Buffer | 3 min | 53 min |
| Q&A | 7 min | 60 min |

---

## 🎭 Demo Plan

### Demo Environment Needed:
- Terminal with Claude Code or Copilot CLI installed
- GSD installed and configured
- A sample project (Node.js API with basic structure)
- Redis running locally (for cache demo)
- Load testing tool (k6 or artillery)
- **Pre-recorded versions of ALL demos as DEFAULT**
- One live moment: load testing two pre-deployed endpoints

### Demo Strategy:
- **Default to recordings** with live narration (not the other way around)
- Use asciinema or VHS for terminal recordings
- Keep ONE small live moment (the load test) to maintain energy
- Have backup slides if even the live load test fails
- Test demos 3x minimum before the talk

### Demo Risk Mitigation:
- Pre-deploy both API versions (vibe + spec-driven) before the talk
- Have the load test script ready to go (one command)
- Pre-recorded backup for the load test comparison too
- "Panic button" slide deck can replace ALL live elements

---

## 🎨 Slide Design Notes

- Dark theme (dev-friendly)
- Heavy use of terminal screenshots and code
- Memes sprinkled throughout (keep it fun, not cringe)
- Stats slides with BIG numbers and cited sources
- Minimal text — YOU are the content
- Progressive reveals (especially the comparison table)
- Visual animations for the GSD loop (not bullet lists)

---

## 📚 Sources & References

- Andrej Karpathy on vibe coding (original tweet/post)
- StackOverflow Blog: "Are bugs inevitable with AI coding agents?" (Jan 2026)
- Second Talent: "AI-Generated Code Quality Metrics 2026"
- Pockit Tools: "7 Hidden Production Bugs AI Coding Agents Create"
- Speedscale: "Silent Failures: Why AI Code Breaks in Production"
- ACM: "AI Vibe Coding Could Reshape Software Dev but Lacks Key..." (Apr 2026)
- GSD Repository: https://github.com/open-gsd/get-shit-done-redux

---

## 🔄 Review Notes

### Critic Pass #1 Findings (incorporated above):
- ✅ Merged ACT 3 + ACT 4 to save time
- ✅ Cut live Demo #1 to pre-recorded 90 sec
- ✅ Added "Honest Limitations" section for credibility
- ✅ Added 4 engagement moments (was only 1)
- ✅ Reframed as principles-first, GSD as one example
- ✅ Fixed comparison table to be less biased
- ✅ Added transition beat between ACT 1 → ACT 2
- ✅ Reduced failure patterns from 5 → 3
- ✅ Realistic timing: 53 min content + 7 min Q&A
- ✅ Default to pre-recorded demos with live narration
