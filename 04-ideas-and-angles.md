# Ideas & Creative Angles to Explore

## 🧠 Alternative Titles (in case you want options)

1. "Vibe Coding is Fun… Until Prod Breaks: Why Spec-Driven Dev Wins" ← current
2. "From Vibes to Verified: Making AI Code Production-Ready"
3. "Think First, Vibe Second: The Spec-Driven AI Workflow"
4. "The 2 AM Test: Why Your AI Code Needs a Spec"
5. "Context Rot & Cache Stampedes: A Love Story About Specs"

---

## 🎬 Opening Hook Alternatives

**Option A (current): Meme + Poll**
- Safe, works everywhere, easy laugh

**Option B: Live Fail**
- Start with a LIVE vibe-coded feature that fails on stage
- "Let me build something real quick..." → it breaks → "And THAT is what we're talking about today"
- High risk, high reward

**Option C: Audience Story**
- "Who has a production horror story involving AI-generated code? ... [pick one] ... That's Act 2 of today's talk."
- Very engaging but depends on audience participation

**Option D: The Receipt**
- Show a real PagerDuty/incident timeline screenshot (anonymized)
- "This is from three weeks ago. 47 minutes of downtime. Root cause? A prompt."

---

## 🎭 Recurring Motifs / Running Jokes

Consider a recurring visual/joke that builds through the talk:

1. **"The confidence meter"** — show a gauge that starts at 100% when vibe coding, drops to 0% when prod breaks, rebuilds to 95% with specs. Reference it multiple times.

2. **"Friday deploy counter"** — a counter in the corner: "Days since last Friday deploy disaster: 0"

3. **"The AI said it was fine"** — recurring stamp/badge on slides where AI passed something that later broke

---

## 💡 Unconventional Demo Ideas

### "Audience-Driven Vibe Code"
- Let the audience CHOOSE what to build via live poll (Mentimeter/Slido)
- Vibe code it live (pre-prepare 3 options so you're ready for any)
- Then show what a spec would add
- Very engaging but requires prep for multiple paths

### "Code Autopsy"
- Show a real (anonymized) production incident
- Walk backward from the outage to the prompt that caused it
- "CSI: Production" vibes

### "Spec Speedrun"
- Challenge: write a spec in 2 minutes with audience input
- Then show how AI with that spec produces dramatically better code
- Proves specs don't have to be slow/bureaucratic

### "The Junior vs Senior Prompt"
- Same feature, two prompts: one from a junior (vague), one from a senior (spec-like)
- Show the difference in output quality
- Point: "The spec IS the prompt. A better prompt IS a spec."

---

## 🎯 Audience Engagement Tools

### Tech options:
- **Mentimeter** — live polls, word clouds, scales (free tier works)
- **Slido** — Q&A + polls (often built into conference platforms)
- **Show of hands** — zero setup, works everywhere
- **QR code** — link to a live dashboard showing results

### Engagement moments throughout (5 planned):
1. Opening poll (hands)
2. "Been paged?" (hands)
3. Code quiz (visual)
4. Spec brainstorm (shout-out)
5. Closing scale (reflection)

### Optional additions:
- **Word cloud**: "One word: how do you feel about AI-generated code?" → usually gets "excited," "scared," "fast," "dangerous"
- **Live Q&A queue**: Open a Slido from minute 1, address top-voted questions in Q&A

---

## 🌶️ Spicy Takes (use sparingly for energy)

- "Vibe coding is just Stack Overflow with better marketing"
- "Your AI doesn't have opinions. It has VIBES. And vibes don't survive a load test."
- "A spec is just a prompt that respects the reader"
- "We spent 20 years learning to not deploy on Fridays. Then AI said 'hold my beer.'"
- "The AI is not your cofounder. It's your intern. Give it a BRIEF."

---

## 📊 Slide Ideas That Pop

### "The Confidence Curve"
```
Confidence ↑
   |    /\              /————————
   |   /  \            /
   |  /    \          /
   | /      \________/
   |/
   +————————————————————————→ Time
   Code  Deploy  2AM   Fix  Spec  Ship  Sleep
   done          call        written      well
```

### "The Cost of Fast"
| | Vibe Coding | Spec-Driven |
|---|---|---|
| Development time | 5 min | 20 min |
| Debug time (expected) | 0 min | 0 min |
| Debug time (actual) | 3 hours | 10 min |
| Sleep lost | 4 hours | 0 |
| **Total real cost** | **7+ hours** | **30 min** |

### "The Spectrum"
```
← Exploration                    Production →

  Pure     Bullet    Custom     Full      Traditional
  Vibe     Points   Instructions  GSD      Waterfall
   |         |         |          |           |
   ←————— Where most people are
                          Where most code SHOULD be ——→
```

---

## 🔗 Cross-Promotion / Community Hooks

- Offer the slides + demo code on GitHub after the talk
- Create a `/vibe-vs-spec` example repo people can clone and run
- Discord/community link for follow-up discussion
- "Challenge": try spec-driven for one week, share results in the community channel

---

## 🤔 Questions to Answer Before Finalizing

1. **What's the venue?** Conference stage vs meetup vs virtual changes energy/engagement approach
2. **Will there be WiFi?** Affects live demo feasibility
3. **Projector resolution?** Dark theme + code readability
4. **Is there a Q&A moderator?** Or do you handle questions yourself?
5. **Recording?** If recorded, avoid anything that dates quickly (specific version numbers, etc.)
6. **What comes before/after your talk?** Context affects energy level of audience
7. **Any sponsor concerns?** If GSD or competitors are sponsors, adjust tone accordingly
8. **Do you want slides-as-code?** (reveal.js, Slidev, etc.) or traditional (Keynote/Google Slides)?
