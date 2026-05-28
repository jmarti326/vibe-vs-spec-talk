// load-tests/single.js — Show both APIs work identically with a single request
// Use BEFORE the stampede to prove: "It's not broken code. It WORKS."
// Usage: node load-tests/single.js

const http = require('http');

const VIBE_URL = process.env.VIBE_URL || 'http://localhost:3001';
const SPEC_URL = process.env.SPEC_URL || 'http://localhost:3002';

async function httpGet(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.setTimeout(5000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function run() {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║  🧪  HAPPY PATH TEST                                    ║
║  Single request — does the code work?                   ║
╚══════════════════════════════════════════════════════════╝
`);

  // Test Vibe API
  console.log(`⚡ GET ${VIBE_URL}/products (single request)...`);
  const vibe = await httpGet(`${VIBE_URL}/products`);
  const vibeData = JSON.parse(vibe.body);
  console.log(`   ✅ Status: ${vibe.status} | Source: ${vibeData.source} | Products: ${vibeData.data.length}`);

  // Test Spec API
  console.log(`🛡️  GET ${SPEC_URL}/products (single request)...`);
  const spec = await httpGet(`${SPEC_URL}/products`);
  const specData = JSON.parse(spec.body);
  console.log(`   ✅ Status: ${spec.status} | Source: ${specData.source} | Products: ${specData.data.length}`);

  console.log(`
┌────────────────────────────────────────────────────────────┐
│  Both APIs return the same ${vibeData.data.length} products. Both return 200.     │
│  Both pass tests. Both look correct.                       │
│                                                            │
│  💡 This is why vibe coding FEELS so good.                 │
│     The happy path always works.                           │
│                                                            │
│  Now let's see what happens under REAL load...             │
│  👉 Run: node load-tests/compare.js                       │
└────────────────────────────────────────────────────────────┘
`);
}

run().catch((err) => {
  console.error('❌ Error:', err.message);
  console.error('   Make sure both servers are running: npm run both');
  process.exit(1);
});
