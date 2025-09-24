
// Mock AI service for product summaries and comparisons
async function summarizeProduct(rawText) {
    const title = rawText.split(" ").slice(0, 5).join(" ") + "...";
  
    // Slightly randomize bullets order or selection
    const bulletsList = [
      "High performance",
      "Sleek design",
      "Long battery life",
      "Lightweight",
      "Affordable",
      "Durable",
      "Compact size",
      "Premium build"
    ];
    const shuffledBullets = bulletsList.sort(() => 0.5 - Math.random()).slice(0, 5);
  
    // Randomize pros and cons a bit
    const prosOptions = ["Lightweight", "Long battery life", "Good value", "Excellent sound", "Fast charging"];
    const consOptions = ["Limited upgrade options", "Integrated graphics", "High price", "Bulky design", "No water resistance"];
    const pros = prosOptions.sort(() => 0.5 - Math.random()).slice(0, 3);
    const cons = consOptions.sort(() => 0.5 - Math.random()).slice(0, 2);
  
    // Random price and value score
    const priceAmount = 500 + Math.floor(Math.random() * 200); // 500-699 USD
    const valueScore = 6 + Math.floor(Math.random() * 5);       // 6-10
  
    // Simple dynamic recommendation
    const recommendations = [
      "Recommended for students and professionals",
      "Ideal for gaming and multimedia",
      "Great for office work and productivity",
      "Perfect for travel and daily use",
      "Best choice for budget-conscious users"
    ];
    const recommendation = recommendations[Math.floor(Math.random() * recommendations.length)];
  
    return { 
      productTitle: title, 
      bullets: shuffledBullets, 
      pros, 
      cons, 
      price: { amount: priceAmount, currency: "USD" }, 
      valueScore, 
      recommendation 
    };
  }
  
  async function compareProducts(products, criteria) {
    const comparisons = products.map((p, index) => {
      const summary = p.aiSummary || {
        pros: ["Good performance", "Value for money"],
        cons: ["Minor limitations"],
        price: { amount: 500 + index * 50, currency: "USD" },
        valueScore: 7 + index
      };
  
      // Slightly vary valueScore and price for variety
      const randomValueScore = summary.valueScore + Math.floor(Math.random() * 3) - 1; // -1,0,+1
      const randomPrice = summary.price.amount + Math.floor(Math.random() * 50) - 20;  // -20 to +29 USD
  
      return {
        productTitle: p.productTitle || `Product ${index + 1}`,
        pros: summary.pros,
        cons: summary.cons,
        price: { amount: randomPrice, currency: "USD" },
        valueScore: randomValueScore
      };
    });
  
    let bestOption = comparisons[0].productTitle;
    let highestScore = comparisons[0].valueScore;
    let lowestPrice = comparisons[0].price.amount;
  
    comparisons.forEach(c => {
      if (
        c.valueScore > highestScore ||
        (c.valueScore === highestScore && c.price.amount < lowestPrice)
      ) {
        bestOption = c.productTitle;
        highestScore = c.valueScore;
        lowestPrice = c.price.amount;
      }
    });
  
    const rationale = `Selected based on highest valueScore and affordable price.`;
  
    return { comparisons, bestOption, rationale };
  }
  
  module.exports = { summarizeProduct, compareProducts };
  