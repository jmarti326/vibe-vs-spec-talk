// run-both.js — Start both API servers simultaneously for the demo
const { spawn } = require('child_process');
const path = require('path');

console.log('🎬 Starting both APIs for the demo showdown...\n');

const vibe = spawn('node', [path.join(__dirname, 'vibe-api', 'server.js')], {
  env: { ...process.env, PORT: '3001' },
  stdio: 'inherit',
});

const spec = spawn('node', [path.join(__dirname, 'spec-api', 'server.js')], {
  env: { ...process.env, PORT: '3002' },
  stdio: 'inherit',
});

process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down both servers...');
  vibe.kill();
  spec.kill();
  process.exit(0);
});

process.on('SIGTERM', () => {
  vibe.kill();
  spec.kill();
  process.exit(0);
});
