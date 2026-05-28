// generate-pptx.js — Generates the presentation as a PowerPoint file
const PptxGenJS = require('pptxgenjs');

const pptx = new PptxGenJS();

// Theme colors
const DARK_BG = '1a1a2e';
const LIGHT_TEXT = 'ffffff';
const ACCENT_GREEN = '4ade80';
const ACCENT_RED = 'f87171';
const ACCENT_BLUE = '60a5fa';
const ACCENT_PURPLE = 'c084fc';
const ACCENT_YELLOW = 'fbbf24';
const SUBTLE_TEXT = 'a0a0b0';
const CODE_BG = '0f0f1a';

pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Vibe vs Spec Talk';
pptx.subject = 'Why Spec-Driven Dev Wins';

// Helper: create a dark slide with title
function darkSlide(title, opts = {}) {
  const slide = pptx.addSlide();
  slide.background = { color: DARK_BG };
  if (title) {
    slide.addText(title, {
      x: 0.5, y: opts.titleY || 0.3, w: '90%',
      fontSize: opts.titleSize || 32,
      color: LIGHT_TEXT,
      bold: true,
      fontFace: 'Segoe UI',
    });
  }
  return slide;
}

// Helper: add code block
function addCode(slide, code, opts = {}) {
  slide.addText(code, {
    x: opts.x || 0.5, y: opts.y || 2.0, w: opts.w || '92%', h: opts.h || 3.5,
    fontSize: opts.fontSize || 12,
    fontFace: 'Cascadia Code',
    color: 'e0e0e0',
    fill: { color: CODE_BG },
    valign: 'top',
    paraSpaceAfter: 2,
    margin: [10, 15, 10, 15],
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 1: Title
// ═══════════════════════════════════════════════════════════════
let slide = pptx.addSlide();
slide.background = { color: DARK_BG };
slide.addText('Vibe Coding is Fun…\nUntil Prod Breaks', {
  x: 0.5, y: 1.5, w: '90%',
  fontSize: 44, color: LIGHT_TEXT, bold: true,
  fontFace: 'Segoe UI', align: 'center', lineSpacingMultiple: 1.3,
});
slide.addText('Why Spec-Driven Dev Wins', {
  x: 0.5, y: 3.8, w: '90%',
  fontSize: 28, color: ACCENT_GREEN,
  fontFace: 'Segoe UI', align: 'center',
});
slide.addText('💻 Community Talk — 2026', {
  x: 0.5, y: 5.5, w: '90%',
  fontSize: 16, color: SUBTLE_TEXT,
  fontFace: 'Segoe UI', align: 'center',
});

// ═══════════════════════════════════════════════════════════════
// SLIDE 2: Quick Poll
// ═══════════════════════════════════════════════════════════════
slide = darkSlide('🙋 Quick Poll');
slide.addText('Who here has shipped AI-generated code\nto production?', {
  x: 0.5, y: 2.0, w: '90%',
  fontSize: 28, color: LIGHT_TEXT, align: 'center',
  fontFace: 'Segoe UI', lineSpacingMultiple: 1.4,
});
slide.addText('...and who\'s 100% confident in what it\'s doing?', {
  x: 0.5, y: 3.8, w: '90%',
  fontSize: 24, color: ACCENT_YELLOW, align: 'center',
  fontFace: 'Segoe UI',
});
slide.addText('This is NOT an anti-AI talk. This is a pro-discipline talk.', {
  x: 0.5, y: 5.2, w: '90%',
  fontSize: 18, color: SUBTLE_TEXT, align: 'center',
  fontFace: 'Segoe UI', italic: true,
});

// ═══════════════════════════════════════════════════════════════
// SLIDE 3: ACT 1 Section
// ═══════════════════════════════════════════════════════════════
slide = pptx.addSlide();
slide.background = { color: '0a0a1a' };
slide.addText('ACT 1', {
  x: 0.5, y: 2.0, w: '90%',
  fontSize: 52, color: ACCENT_BLUE, bold: true, align: 'center',
  fontFace: 'Segoe UI',
});
slide.addText('The Seduction of Vibe Coding', {
  x: 0.5, y: 3.5, w: '90%',
  fontSize: 28, color: LIGHT_TEXT, align: 'center',
  fontFace: 'Segoe UI',
});

// ═══════════════════════════════════════════════════════════════
// SLIDE 4: The Golden Age
// ═══════════════════════════════════════════════════════════════
slide = darkSlide('The Golden Age of Vibe Coding');
slide.addText('"You just see things, say things, run things,\nand copy-paste things — and it mostly works."', {
  x: 0.5, y: 1.8, w: '90%',
  fontSize: 20, color: SUBTLE_TEXT, italic: true, align: 'center',
  fontFace: 'Segoe UI',
});
slide.addText('— Andrej Karpathy, 2025', {
  x: 0.5, y: 2.8, w: '90%',
  fontSize: 14, color: SUBTLE_TEXT, align: 'center',
  fontFace: 'Segoe UI',
});
// Stats
slide.addText('92%', { x: 1.0, y: 3.8, w: 3, fontSize: 48, color: ACCENT_BLUE, bold: true, align: 'center', fontFace: 'Segoe UI' });
slide.addText('of US devs use\nAI tools daily', { x: 1.0, y: 4.8, w: 3, fontSize: 14, color: SUBTLE_TEXT, align: 'center', fontFace: 'Segoe UI' });
slide.addText('60%+', { x: 5.0, y: 3.8, w: 3, fontSize: 48, color: ACCENT_BLUE, bold: true, align: 'center', fontFace: 'Segoe UI' });
slide.addText('of new code is\nAI-generated', { x: 5.0, y: 4.8, w: 3, fontSize: 14, color: SUBTLE_TEXT, align: 'center', fontFace: 'Segoe UI' });
slide.addText('74%', { x: 9.0, y: 3.8, w: 3, fontSize: 48, color: ACCENT_BLUE, bold: true, align: 'center', fontFace: 'Segoe UI' });
slide.addText('report productivity\ngains', { x: 9.0, y: 4.8, w: 3, fontSize: 14, color: SUBTLE_TEXT, align: 'center', fontFace: 'Segoe UI' });

// ═══════════════════════════════════════════════════════════════
// SLIDE 5: Demo #1 placeholder
// ═══════════════════════════════════════════════════════════════
slide = darkSlide('Demo: The Magic ✨');
slide.addText('"Build me a REST API with JWT auth, password hashing,\nand a protected /profile endpoint."', {
  x: 0.5, y: 1.8, w: '90%',
  fontSize: 18, color: SUBTLE_TEXT, italic: true, align: 'center',
  fontFace: 'Segoe UI',
});
slide.addText('[ Pre-recorded terminal demo — 90 seconds ]', {
  x: 1.0, y: 3.0, w: '85%', h: 2.5,
  fontSize: 20, color: '666680', align: 'center', valign: 'middle',
  fill: { color: CODE_BG }, fontFace: 'Cascadia Code',
});
slide.addText('✅ Tests pass    ✅ Endpoints work    🚀 Ship it!', {
  x: 0.5, y: 5.8, w: '90%',
  fontSize: 18, color: ACCENT_GREEN, align: 'center', fontFace: 'Segoe UI',
});

// ═══════════════════════════════════════════════════════════════
// SLIDE 6: But Wait...
// ═══════════════════════════════════════════════════════════════
slide = darkSlide('But Wait…');
const flaws = [
  { icon: '🔓', title: 'No Rate Limiting', desc: 'Login endpoint: brute-force away' },
  { icon: '🍪', title: 'Token in localStorage', desc: 'XSS = instant account takeover' },
  { icon: '💉', title: 'No Input Validation', desc: 'Username accepts anything' },
];
flaws.forEach((flaw, i) => {
  const x = 0.5 + i * 4.2;
  slide.addShape(pptx.ShapeType.roundRect, { x, y: 2.0, w: 3.8, h: 2.5, fill: { color: '2a1a1a' }, line: { color: 'f8717155', width: 1 }, rectRadius: 0.1 });
  slide.addText(`${flaw.icon} ${flaw.title}`, { x, y: 2.2, w: 3.8, fontSize: 16, color: ACCENT_RED, bold: true, align: 'center', fontFace: 'Segoe UI' });
  slide.addText(flaw.desc, { x, y: 3.2, w: 3.8, fontSize: 13, color: SUBTLE_TEXT, align: 'center', fontFace: 'Segoe UI' });
});
slide.addText('Every test passes. Every endpoint works.\nA pentester would have a field day.', {
  x: 0.5, y: 5.2, w: '90%',
  fontSize: 18, color: ACCENT_RED, align: 'center', fontFace: 'Segoe UI',
});

// ═══════════════════════════════════════════════════════════════
// SLIDE 7: ACT 2 Section
// ═══════════════════════════════════════════════════════════════
slide = pptx.addSlide();
slide.background = { color: '0a0a1a' };
slide.addText('ACT 2', {
  x: 0.5, y: 2.0, w: '90%',
  fontSize: 52, color: ACCENT_RED, bold: true, align: 'center',
  fontFace: 'Segoe UI',
});
slide.addText('The Reckoning', {
  x: 0.5, y: 3.5, w: '90%',
  fontSize: 28, color: LIGHT_TEXT, align: 'center',
  fontFace: 'Segoe UI',
});
slide.addText('"Raise your hand if you\'ve been paged for AI-generated code."', {
  x: 0.5, y: 4.8, w: '90%',
  fontSize: 16, color: SUBTLE_TEXT, italic: true, align: 'center',
  fontFace: 'Segoe UI',
});

// ═══════════════════════════════════════════════════════════════
// SLIDE 8: The Data
// ═══════════════════════════════════════════════════════════════
slide = darkSlide('The Data (2026)');
slide.addText('1.7×', { x: 0.5, y: 2.0, w: 4, fontSize: 64, color: ACCENT_RED, bold: true, align: 'center', fontFace: 'Segoe UI' });
slide.addText('more issues in production\nthan human-written code', { x: 0.5, y: 3.5, w: 4, fontSize: 14, color: SUBTLE_TEXT, align: 'center', fontFace: 'Segoe UI' });
slide.addText('62%', { x: 4.5, y: 2.0, w: 4, fontSize: 64, color: ACCENT_RED, bold: true, align: 'center', fontFace: 'Segoe UI' });
slide.addText('of AI code contains\nsecurity/design flaws', { x: 4.5, y: 3.5, w: 4, fontSize: 14, color: SUBTLE_TEXT, align: 'center', fontFace: 'Segoe UI' });
slide.addText('75%', { x: 8.5, y: 2.0, w: 4, fontSize: 64, color: ACCENT_RED, bold: true, align: 'center', fontFace: 'Segoe UI' });
slide.addText('more logic errors\ncausing outages', { x: 8.5, y: 3.5, w: 4, fontSize: 14, color: SUBTLE_TEXT, align: 'center', fontFace: 'Segoe UI' });
slide.addText('Sources: StackOverflow Blog (2026), Second Talent, ACM TechBrief', {
  x: 0.5, y: 6.8, w: '90%', fontSize: 10, color: '555555', align: 'center', fontFace: 'Segoe UI',
});

// ═══════════════════════════════════════════════════════════════
// SLIDE 9: Three Failure Patterns
// ═══════════════════════════════════════════════════════════════
slide = darkSlide('Three Ways AI Code Kills Production');
const patterns = [
  { icon: '🌊', title: 'Cache Stampede', desc: 'Cache expires → 500 requests all miss →\nall hit DB → DB dies' },
  { icon: '👻', title: 'Silent Data Corruption', desc: 'Works in tests, breaks under\nreal concurrency → undetected for weeks' },
  { icon: '🔁', title: 'Retry Storm', desc: 'Error → retry instantly → infinite loop →\ncascading failure across services' },
];
patterns.forEach((p, i) => {
  const y = 1.8 + i * 1.7;
  slide.addText(`${p.icon}  ${p.title}`, { x: 0.8, y, w: 5, fontSize: 22, color: ACCENT_RED, bold: true, fontFace: 'Segoe UI' });
  slide.addText(p.desc, { x: 5.5, y: y + 0.1, w: 7, fontSize: 15, color: SUBTLE_TEXT, fontFace: 'Segoe UI' });
});

// ═══════════════════════════════════════════════════════════════
// SLIDE 10: The 2 AM Story
// ═══════════════════════════════════════════════════════════════
slide = pptx.addSlide();
slide.background = { color: '0f0000' };
slide.addText('The 2 AM Story', { x: 0.5, y: 0.5, w: '90%', fontSize: 28, color: ACCENT_RED, fontFace: 'Segoe UI', bold: true });
slide.addText(
  'Friday evening. You shipped a feature built in\n20 minutes with AI.\n\nSaturday 2 AM, your phone rings.\n\nThe cache stampede took down the checkout flow.\n\nYour "fast" feature just cost the company\n$50K in lost revenue.',
  { x: 1.0, y: 1.8, w: '80%', fontSize: 22, color: LIGHT_TEXT, fontFace: 'Segoe UI', lineSpacingMultiple: 1.5 }
);

// ═══════════════════════════════════════════════════════════════
// SLIDE 11: Code Quiz
// ═══════════════════════════════════════════════════════════════
slide = darkSlide('🧠 Pop Quiz: Which is AI-generated?');
slide.addText('Version A', { x: 0.3, y: 1.5, w: 6, fontSize: 18, color: ACCENT_BLUE, bold: true, fontFace: 'Segoe UI' });
addCode(slide, `app.get('/products', async (req, res) => {
  const cached = await redis.get(key);
  if (cached) return res.json(JSON.parse(cached));
  const data = await db.query(
    'SELECT * FROM products'
  );
  await redis.setex(key, 300,
    JSON.stringify(data));
  res.json(data);
});`, { x: 0.3, y: 2.0, w: 6.2, h: 3.2, fontSize: 11 });

slide.addText('Version B', { x: 6.7, y: 1.5, w: 6, fontSize: 18, color: ACCENT_GREEN, bold: true, fontFace: 'Segoe UI' });
addCode(slide, `app.get('/products', async (req, res) => {
  const cached = await redis.get(key);
  if (cached) return res.json(JSON.parse(cached));
  const data = await fetchWithLock(key, () =>
    db.query('SELECT * FROM products')
  );
  await redis.setex(key, 300,
    JSON.stringify(data));
  res.json(data);
});`, { x: 6.7, y: 2.0, w: 6.2, h: 3.2, fontSize: 11 });

slide.addText('The bugs aren\'t in the syntax — they\'re in the ASSUMPTIONS.', {
  x: 0.5, y: 5.8, w: '90%', fontSize: 16, color: ACCENT_YELLOW, align: 'center', fontFace: 'Segoe UI', italic: true,
});

// ═══════════════════════════════════════════════════════════════
// SLIDE 12: ACT 3 Section
// ═══════════════════════════════════════════════════════════════
slide = pptx.addSlide();
slide.background = { color: '0a0a1a' };
slide.addText('ACT 3', {
  x: 0.5, y: 1.5, w: '90%',
  fontSize: 52, color: ACCENT_GREEN, bold: true, align: 'center',
  fontFace: 'Segoe UI',
});
slide.addText('The Way', {
  x: 0.5, y: 3.0, w: '90%',
  fontSize: 28, color: LIGHT_TEXT, align: 'center',
  fontFace: 'Segoe UI',
});
slide.addText('"The answer isn\'t to stop using AI.\nIt\'s to give AI the STRUCTURE it needs."', {
  x: 0.5, y: 4.3, w: '90%',
  fontSize: 18, color: SUBTLE_TEXT, italic: true, align: 'center',
  fontFace: 'Segoe UI', lineSpacingMultiple: 1.4,
});

// ═══════════════════════════════════════════════════════════════
// SLIDE 13: Spec-Driven Principles
// ═══════════════════════════════════════════════════════════════
slide = darkSlide('Spec-Driven Development');
const principles = [
  '1.  Define WHAT before HOW',
  '2.  Human decisions → AI execution',
  '3.  Verify at every step',
  '4.  Persist knowledge across sessions',
];
principles.forEach((p, i) => {
  slide.addText(p, { x: 1.0, y: 2.0 + i * 0.8, w: 6, fontSize: 20, color: LIGHT_TEXT, fontFace: 'Segoe UI' });
});

slide.addText('The Spectrum:', { x: 7.5, y: 1.8, w: 5, fontSize: 16, color: ACCENT_BLUE, bold: true, fontFace: 'Segoe UI' });
const spectrum = ['Pure Vibe', 'Bullet Points', 'Custom Rules', 'Full GSD'];
spectrum.forEach((s, i) => {
  const colors = [ACCENT_RED, ACCENT_YELLOW, ACCENT_BLUE, ACCENT_GREEN];
  slide.addText(`●  ${s}`, { x: 7.5, y: 2.5 + i * 0.7, w: 5, fontSize: 16, color: colors[i], fontFace: 'Segoe UI' });
});

slide.addText('← Exploration                    Production →', {
  x: 7.5, y: 5.5, w: 5, fontSize: 12, color: SUBTLE_TEXT, fontFace: 'Cascadia Code',
});

// ═══════════════════════════════════════════════════════════════
// SLIDE 14: GSD Introduction
// ═══════════════════════════════════════════════════════════════
slide = darkSlide('GSD: Get Shit Done');
slide.addText('A spec-driven development system for AI coding tools.', {
  x: 0.5, y: 1.5, w: '90%', fontSize: 18, color: SUBTLE_TEXT, fontFace: 'Segoe UI', italic: true,
});

const features = [
  { icon: '🧠', title: 'Context Engineering', desc: 'Fresh subagent contexts.\nMain window stays at 30-40%.', color: ACCENT_BLUE },
  { icon: '📝', title: 'Persistent Memory', desc: 'PROJECT.md → REQUIREMENTS.md\n→ ROADMAP.md → STATE.md', color: ACCENT_GREEN },
  { icon: '✅', title: 'Verification Built-In', desc: 'Dedicated verify step with\ndebug agents BEFORE shipping.', color: ACCENT_PURPLE },
];
features.forEach((f, i) => {
  const x = 0.5 + i * 4.3;
  slide.addShape(pptx.ShapeType.roundRect, { x, y: 2.5, w: 4.0, h: 2.8, fill: { color: '1a1a3e' }, line: { color: f.color + '55', width: 1 }, rectRadius: 0.1 });
  slide.addText(`${f.icon}  ${f.title}`, { x, y: 2.7, w: 4.0, fontSize: 15, color: f.color, bold: true, align: 'center', fontFace: 'Segoe UI' });
  slide.addText(f.desc, { x, y: 3.5, w: 4.0, fontSize: 13, color: SUBTLE_TEXT, align: 'center', fontFace: 'Segoe UI' });
});

slide.addText('New Project  →  Discuss  →  Plan  →  Execute  →  Verify  →  Ship', {
  x: 0.5, y: 5.8, w: '90%', fontSize: 16, color: ACCENT_GREEN, align: 'center', fontFace: 'Cascadia Code',
});

// ═══════════════════════════════════════════════════════════════
// SLIDE 15: Audience Moment
// ═══════════════════════════════════════════════════════════════
slide = darkSlide('🎤 Audience Moment');
slide.addText('You\'re adding Redis caching to a products API.\n\nWhat should your spec include?', {
  x: 0.5, y: 2.0, w: '90%',
  fontSize: 26, color: LIGHT_TEXT, align: 'center', fontFace: 'Segoe UI', lineSpacingMultiple: 1.4,
});
slide.addText('(Shout them out!)', {
  x: 0.5, y: 4.5, w: '90%',
  fontSize: 20, color: SUBTLE_TEXT, align: 'center', fontFace: 'Segoe UI',
});
slide.addText('TTL?  Invalidation strategy?  Stampede protection?  Fallback?  Key strategy?', {
  x: 0.5, y: 5.8, w: '90%',
  fontSize: 14, color: '444455', align: 'center', fontFace: 'Segoe UI', italic: true,
});

// ═══════════════════════════════════════════════════════════════
// SLIDE 16: Demo Showdown Setup
// ═══════════════════════════════════════════════════════════════
slide = darkSlide('Demo: The Showdown 🥊');
// Left side - Vibe
slide.addShape(pptx.ShapeType.roundRect, { x: 0.5, y: 1.5, w: 6, h: 4.5, fill: { color: '1a0a0a' }, line: { color: ACCENT_RED + '55', width: 1 }, rectRadius: 0.1 });
slide.addText('⚡ Vibe Coding', { x: 0.5, y: 1.7, w: 6, fontSize: 20, color: ACCENT_RED, bold: true, align: 'center', fontFace: 'Segoe UI' });
slide.addText('Prompt: "Add Redis caching\nto /products"\n\n✅ Code generated\n✅ Tests pass\n✅ Deployed\n🔥 200 concurrent requests...', {
  x: 0.8, y: 2.5, w: 5.5, fontSize: 15, color: SUBTLE_TEXT, fontFace: 'Segoe UI', lineSpacingMultiple: 1.3,
});

// Right side - Spec
slide.addShape(pptx.ShapeType.roundRect, { x: 6.8, y: 1.5, w: 6, h: 4.5, fill: { color: '0a1a0a' }, line: { color: ACCENT_GREEN + '55', width: 1 }, rectRadius: 0.1 });
slide.addText('🛡️ Spec-Driven (GSD)', { x: 6.8, y: 1.7, w: 6, fontSize: 20, color: ACCENT_GREEN, bold: true, align: 'center', fontFace: 'Segoe UI' });
slide.addText('Spec: Singleflight + stale\nfallback + compression\n\n✅ Discussed edge cases\n✅ Planned with research\n✅ Executed + verified\n💪 200 concurrent requests...', {
  x: 7.1, y: 2.5, w: 5.5, fontSize: 15, color: SUBTLE_TEXT, fontFace: 'Segoe UI', lineSpacingMultiple: 1.3,
});

// ═══════════════════════════════════════════════════════════════
// SLIDE 17: Live Load Test
// ═══════════════════════════════════════════════════════════════
slide = darkSlide('🔴 LIVE: The Load Test');
slide.addText('Same database. Same Redis. Same 200 requests.\nDifferent approach.', {
  x: 0.5, y: 1.5, w: '90%', fontSize: 20, color: SUBTLE_TEXT, align: 'center', fontFace: 'Segoe UI',
});
slide.addText('node load-tests/compare.js', {
  x: 1.5, y: 3.0, w: '75%', h: 2.5,
  fontSize: 22, color: ACCENT_GREEN, align: 'center', valign: 'middle',
  fill: { color: CODE_BG }, fontFace: 'Cascadia Code',
});
slide.addText('[ RUN THIS LIVE ON STAGE ]', {
  x: 0.5, y: 5.8, w: '90%', fontSize: 14, color: ACCENT_YELLOW, align: 'center', fontFace: 'Segoe UI', bold: true,
});

// ═══════════════════════════════════════════════════════════════
// SLIDE 18: Results Table
// ═══════════════════════════════════════════════════════════════
slide = darkSlide('Results');
const tableRows = [
  [{ text: 'Aspect', options: { bold: true } }, { text: '⚡ Vibe Coding', options: { bold: true } }, { text: '🛡️ Spec-Driven', options: { bold: true } }],
  [{ text: 'Time to first code' }, { text: '2 min ✅' }, { text: '15 min' }],
  [{ text: 'Time to production-ready' }, { text: '??? (rollbacks)' }, { text: '20 min ✅' }],
  [{ text: 'Context management' }, { text: 'Ad hoc' }, { text: 'Engineered' }],
  [{ text: 'Verification' }, { text: '"It compiles"' }, { text: 'Structured' }],
  [{ text: 'DB hits under stampede' }, { text: '200 💥' }, { text: '1 ✅' }],
  [{ text: 'Sleep quality' }, { text: '💀' }, { text: '😴' }],
];
slide.addTable(tableRows, {
  x: 0.8, y: 1.5, w: 11.5,
  fontSize: 14, fontFace: 'Segoe UI',
  color: LIGHT_TEXT,
  border: { type: 'solid', color: '333355', pt: 1 },
  rowH: [0.5, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45],
  fill: { color: '1a1a2e' },
  colW: [4, 3.75, 3.75],
  align: 'center',
  valign: 'middle',
});
slide.addText('"Vibe: 2 min to code, 2 hours to debug at 2 AM"\n"Spec: 20 min to ship, sleep through the night"', {
  x: 0.5, y: 5.8, w: '90%', fontSize: 15, color: ACCENT_YELLOW, align: 'center', fontFace: 'Segoe UI', italic: true,
});

// ═══════════════════════════════════════════════════════════════
// SLIDE 19: Honest Limitations
// ═══════════════════════════════════════════════════════════════
slide = darkSlide('When TO Vibe Code');
// Left
slide.addText('✅ Vibe Away', { x: 0.8, y: 1.8, w: 5.5, fontSize: 20, color: ACCENT_GREEN, bold: true, fontFace: 'Segoe UI' });
const vibeOk = ['Prototyping & exploration', 'Hack days & learning', 'Throwaway scripts', 'Personal projects', '"What would this look like?"'];
vibeOk.forEach((item, i) => {
  slide.addText(`•  ${item}`, { x: 1.0, y: 2.6 + i * 0.55, w: 5, fontSize: 15, color: SUBTLE_TEXT, fontFace: 'Segoe UI' });
});
// Right
slide.addText('🛡️ Write the Spec', { x: 7.0, y: 1.8, w: 5.5, fontSize: 20, color: ACCENT_BLUE, bold: true, fontFace: 'Segoe UI' });
const specNeeded = ['Users depend on it', 'Team collaboration', 'Regulated/compliance', 'Complex edge cases', '"This must work at 3 AM"'];
specNeeded.forEach((item, i) => {
  slide.addText(`•  ${item}`, { x: 7.2, y: 2.6 + i * 0.55, w: 5, fontSize: 15, color: SUBTLE_TEXT, fontFace: 'Segoe UI' });
});
slide.addText('It\'s not binary. Find YOUR balance on the spectrum.', {
  x: 0.5, y: 5.8, w: '90%', fontSize: 18, color: LIGHT_TEXT, align: 'center', fontFace: 'Segoe UI', bold: true,
});

// ═══════════════════════════════════════════════════════════════
// SLIDE 20: GSD Costs
// ═══════════════════════════════════════════════════════════════
slide = darkSlide('GSD\'s Real Costs (Honesty Corner)');
const costs = [
  '⏱️  ~15 minutes upfront thinking per phase',
  '💰  More API calls (subagents = more tokens)',
  '📚  Learning curve for the 6-command loop',
  '🔨  Overkill for a 50-line script',
];
costs.forEach((c, i) => {
  slide.addText(c, { x: 1.0, y: 2.0 + i * 0.8, w: 10, fontSize: 18, color: SUBTLE_TEXT, fontFace: 'Segoe UI' });
});
slide.addShape(pptx.ShapeType.roundRect, { x: 1.0, y: 5.0, w: 11, h: 1.2, fill: { color: '1a1a0a' }, line: { color: ACCENT_YELLOW + '55', width: 1 }, rectRadius: 0.1 });
slide.addText('💡 Minimum viable spec: Write 3 bullet points before your next AI prompt.\n     What should it do?  What should it NOT do?  How will you verify?', {
  x: 1.2, y: 5.1, w: 10.5, fontSize: 14, color: ACCENT_YELLOW, fontFace: 'Segoe UI',
});

// ═══════════════════════════════════════════════════════════════
// SLIDE 21: Takeaways by Level
// ═══════════════════════════════════════════════════════════════
slide = darkSlide('Your Level, Your Move');
const levels = [
  { emoji: '🌱', title: 'Early Career', items: ['Vibe code to learn — ask AI WHY', 'GSD teaches architecture', 'Start noticing the gaps'], color: ACCENT_BLUE },
  { emoji: '🌿', title: 'Mid-Career', items: ['This is your superpower', 'Learn to write clear specs', 'Be the one who ships reliably'], color: ACCENT_GREEN },
  { emoji: '🌳', title: 'Senior+', items: ['Your judgment = MORE valuable', 'You\'re the architect', 'AI amplifies your expertise'], color: ACCENT_PURPLE },
];
levels.forEach((level, i) => {
  const x = 0.5 + i * 4.3;
  slide.addShape(pptx.ShapeType.roundRect, { x, y: 1.8, w: 4.0, h: 4.0, fill: { color: '1a1a3e' }, line: { color: level.color + '44', width: 1 }, rectRadius: 0.1 });
  slide.addText(`${level.emoji}  ${level.title}`, { x, y: 2.0, w: 4.0, fontSize: 16, color: level.color, bold: true, align: 'center', fontFace: 'Segoe UI' });
  level.items.forEach((item, j) => {
    slide.addText(`•  ${item}`, { x: x + 0.3, y: 2.8 + j * 0.7, w: 3.5, fontSize: 13, color: SUBTLE_TEXT, fontFace: 'Segoe UI' });
  });
});

// ═══════════════════════════════════════════════════════════════
// SLIDE 22: Scale Question
// ═══════════════════════════════════════════════════════════════
slide = darkSlide('');
slide.addText('On a scale of 1 to 5…', {
  x: 0.5, y: 1.5, w: '90%', fontSize: 32, color: LIGHT_TEXT, align: 'center', fontFace: 'Segoe UI',
});
slide.addText('How often do you write specs\nbefore prompting AI?', {
  x: 0.5, y: 2.8, w: '90%', fontSize: 26, color: SUBTLE_TEXT, align: 'center', fontFace: 'Segoe UI', lineSpacingMultiple: 1.3,
});
slide.addText('Whatever your number…\ntry bumping it up by', {
  x: 0.5, y: 4.5, w: '70%', fontSize: 20, color: LIGHT_TEXT, align: 'center', fontFace: 'Segoe UI',
});
slide.addText('1', {
  x: 8.5, y: 4.2, w: 3, fontSize: 72, color: ACCENT_GREEN, bold: true, align: 'center', fontFace: 'Segoe UI',
});
slide.addText('this week.', {
  x: 0.5, y: 5.8, w: '90%', fontSize: 20, color: LIGHT_TEXT, align: 'center', fontFace: 'Segoe UI',
});

// ═══════════════════════════════════════════════════════════════
// SLIDE 23: Call to Action
// ═══════════════════════════════════════════════════════════════
slide = darkSlide('Try It');
slide.addText('npx @opengsd/get-shit-done-redux@latest', {
  x: 1.5, y: 2.0, w: 10, h: 1.0,
  fontSize: 20, color: ACCENT_GREEN, align: 'center', valign: 'middle',
  fill: { color: CODE_BG }, fontFace: 'Cascadia Code',
});
slide.addText('Or lighter: just write 3 bullet points\nbefore your next prompt.', {
  x: 0.5, y: 3.8, w: '90%', fontSize: 22, color: LIGHT_TEXT, align: 'center', fontFace: 'Segoe UI',
});
slide.addText('Think first. Vibe second.', {
  x: 0.5, y: 5.0, w: '90%', fontSize: 24, color: ACCENT_GREEN, bold: true, align: 'center', fontFace: 'Segoe UI',
});
slide.addText('github.com/open-gsd/get-shit-done-redux', {
  x: 0.5, y: 6.2, w: '90%', fontSize: 14, color: SUBTLE_TEXT, align: 'center', fontFace: 'Segoe UI',
});

// ═══════════════════════════════════════════════════════════════
// SLIDE 24: Closing
// ═══════════════════════════════════════════════════════════════
slide = pptx.addSlide();
slide.background = { color: DARK_BG };
slide.addText('Vibe coding is fun.', {
  x: 0.5, y: 2.0, w: '90%', fontSize: 36, color: LIGHT_TEXT, align: 'center', fontFace: 'Segoe UI',
});
slide.addText('Shipping with confidence is funner.', {
  x: 0.5, y: 3.2, w: '90%', fontSize: 36, color: ACCENT_GREEN, bold: true, align: 'center', fontFace: 'Segoe UI',
});
slide.addText('🎤', {
  x: 0.5, y: 4.5, w: '90%', fontSize: 64, align: 'center',
});
slide.addText('Thank you! Questions?', {
  x: 0.5, y: 6.0, w: '90%', fontSize: 18, color: SUBTLE_TEXT, align: 'center', fontFace: 'Segoe UI',
});

// ═══════════════════════════════════════════════════════════════
// SLIDE 25: Resources
// ═══════════════════════════════════════════════════════════════
slide = darkSlide('Links & Resources');
const resources = [
  '📊  Slides + Demo: github.com/[your-handle]/vibe-vs-spec-talk',
  '🔧  GSD: github.com/open-gsd/get-shit-done-redux',
  '📖  StackOverflow: "Are bugs inevitable with AI coding agents?"',
  '📖  ACM: "AI Vibe Coding Could Reshape Software Dev"',
  '📖  Pockit: "7 Hidden Production Bugs AI Agents Create"',
  '📖  Speedscale: "Silent Failures: Why AI Code Breaks in Production"',
];
resources.forEach((r, i) => {
  slide.addText(r, { x: 1.0, y: 2.0 + i * 0.7, w: 11, fontSize: 16, color: SUBTLE_TEXT, fontFace: 'Segoe UI' });
});

// ═══════════════════════════════════════════════════════════════
// GENERATE FILE
// ═══════════════════════════════════════════════════════════════
const outputPath = 'Vibe-Coding-vs-Spec-Driven.pptx';
pptx.writeFile({ fileName: outputPath })
  .then(() => {
    console.log(`\n✅ PowerPoint generated: ${outputPath}`);
    console.log(`   📊 ${pptx.slides.length} slides`);
    console.log(`   🎨 Dark theme with code blocks`);
    console.log(`   📁 Location: C:\\Users\\juanma\\vibe-vs-spec-talk\\${outputPath}`);
  })
  .catch(err => {
    console.error('❌ Error generating PowerPoint:', err);
  });
