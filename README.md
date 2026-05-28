# 🎬 Presentation Package — Quick Reference

## Folder Structure

```
vibe-vs-spec-talk/
├── 00-presentation-plan.md    # Full outline & timing (revised)
├── 01-critic-review.md        # Review findings
├── 02-speaker-notes.md        # Word-for-word talking points
├── 03-demo-scenarios.md       # Technical demo documentation
├── 04-ideas-and-angles.md     # Creative alternatives & spicy takes
├── 05-final-review.md         # Audience persona & energy analysis
├── demo/                      # RUNNABLE demo project
│   ├── README.md              # How to run the demos
│   ├── docker-compose.yml     # Redis setup
│   ├── package.json           # Dependencies
│   ├── run-both.js            # Start both APIs
│   ├── shared/
│   │   ├── db.js              # Simulated slow DB
│   │   └── seed.js            # Data seeder
│   ├── vibe-api/
│   │   └── server.js          # 💥 The naive version (breaks)
│   ├── spec-api/
│   │   └── server.js          # 🛡️ The robust version (works)
│   └── load-tests/
│       ├── stampede.js         # k6 load test
│       └── compare.js         # Node.js comparison (THE LIVE SCRIPT)
└── slides/
    ├── package.json            # Slidev config
    └── slides.md               # Full slide deck (Slidev markdown)
```

## Quick Start Commands

```bash
# Run the demo
cd demo
docker compose up -d        # Start Redis
npm run both                # Start both APIs (ports 3001 + 3002)
node load-tests/compare.js  # 🎬 THE LIVE MOMENT

# Run the slides
cd slides
npm install
npm run dev                 # Opens at localhost:3030
```

## Talk Summary (60 min)

| Time | Section | Key Moment |
|------|---------|------------|
| 0-3 | Hook | Poll: "Who's shipped AI code to prod?" |
| 3-10 | ACT 1: Seduction | Pre-recorded demo + reveal flaws |
| 10-19 | ACT 2: Reckoning | Stats + 3 failure patterns + quiz |
| 19-41 | ACT 3: The Way | Principles → GSD → LIVE stampede test |
| 41-45 | Limitations | When vibe coding IS the right choice |
| 45-53 | Takeaways | Per-level advice + "bump by 1" challenge |
| 53-60 | Q&A | Open questions |

## Preparation Checklist

- [ ] Install Redis (docker compose up -d)
- [ ] Run `npm install` in demo/
- [ ] Run `npm install` in slides/
- [ ] Test `node load-tests/compare.js` — get consistent results
- [ ] Record Demo #1 (auth API generation) with asciinema/VHS
- [ ] Record Demo #2 (GSD flow) with asciinema/VHS
- [ ] Test slides on projector resolution
- [ ] Rehearse 3x with timer (target: under 53 min)
- [ ] Prepare backup GIFs for all demos
- [ ] Test engagement tools (Mentimeter/Slido if using)
