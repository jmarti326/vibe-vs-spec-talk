// shared/seed.js — Seed is now automatic on import, but this script can re-seed
const { seedProducts } = require('./db');
seedProducts(500);
console.log('✅ Seeded 500 products into memory.');
