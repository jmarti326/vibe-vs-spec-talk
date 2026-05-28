// shared/db.js — Simulated "slow" products database
// Uses in-memory data with artificial latency to simulate real DB behavior

const products = [];

function seedProducts(count = 500) {
  products.length = 0;
  const categories = ['Electronics', 'Books', 'Clothing', 'Home', 'Sports'];
  const adjectives = ['Premium', 'Classic', 'Modern', 'Vintage', 'Ultra'];
  const nouns = ['Widget', 'Gadget', 'Tool', 'Device', 'Kit'];

  for (let i = 0; i < count; i++) {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    products.push({
      id: i + 1,
      name: `${adj} ${noun} ${i + 1}`,
      price: Math.round((Math.random() * 200 + 10) * 100) / 100,
      category: categories[Math.floor(Math.random() * categories.length)],
      description: `A fine ${adj.toLowerCase()} ${noun.toLowerCase()} for everyday use.`,
    });
  }
}

// Simulate a "slow" database query with concurrency pressure
// Under stampede conditions, each concurrent query adds latency (connection pool exhaustion)
let activeQueries = 0;

async function slowQuery(delayMs = 150) {
  activeQueries++;
  const concurrencyPenalty = Math.min(activeQueries * 10, 500); // Simulate pool exhaustion
  const totalDelay = delayMs + concurrencyPenalty;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      activeQueries--;
      // Simulate DB connection timeout under extreme load
      if (totalDelay > 500) {
        reject(new Error(`DB query timeout (${totalDelay}ms) - connection pool exhausted`));
      } else {
        resolve([...products]);
      }
    }, totalDelay);
  });
}

// Seed on load
seedProducts(500);

module.exports = { slowQuery, seedProducts, products };
