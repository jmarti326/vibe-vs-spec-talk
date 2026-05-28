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

// Simulate a "slow" database query (150ms like a real production DB under load)
async function slowQuery(delayMs = 150) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...products]);
    }, delayMs);
  });
}

// Seed on load
seedProducts(500);

module.exports = { slowQuery, seedProducts, products };
