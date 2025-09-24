// backend/controllers/aiController.js
const Summary = require("../models/Summary");
const Comparison = require("../models/Comparison");
const { summarizeProduct, compareProducts } = require("../services/openaiService");

exports.summarize = async (req, res) => {
  try {
    const { rawData } = req.body;
    if (!rawData) return res.status(400).json({ success:false, message: 'rawData required' });

    // Call OpenAI
    const aiSummary = await summarizeProduct(rawData);

    // Save with userId from middleware
    const summary = await Summary.create({
      userId: req.user.id,
      productTitle: aiSummary.productTitle,
      rawData,
      aiSummary
    });

    res.json({ success: true, summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error: " + err.message });
  }
};

exports.compare = async (req, res) => {
  try {
    const { products, criteria } = req.body;
    if (!Array.isArray(products) || products.length < 2) {
      return res.status(400).json({ success:false, message: 'Provide at least 2 products to compare' });
    }

    // If products lack aiSummary, attempt to use their rawData
    const aiComparison = await compareProducts(products, criteria);

    const comparison = await Comparison.create({
      userId: req.user.id,
      productIds: products.map(p => p._id).filter(Boolean),
      aiComparison,
      criteria
    });

    res.json({ success: true, comparison });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error: " + err.message });
  }
};
