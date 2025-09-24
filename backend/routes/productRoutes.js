const express = require("express");
const router = express.Router();
const { summarizeProduct, compareProducts } = require("../services/openaiService");
const ProductSummary = require("../models/ProductSummary"); // mongoose model

// Summarize a product
router.post("/summarize", async (req, res) => {
  try {
    const { rawText, userId } = req.body;
    const aiSummary = await summarizeProduct(rawText);

    // Save to DB
    const summaryDoc = await ProductSummary.create({
      userId,
      productIds: [],
      aiSummary
    });

    res.json(summaryDoc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to summarize product" });
  }
});

// Compare multiple products
router.post("/compare", async (req, res) => {
  try {
    const { products, criteria } = req.body;
    const aiComparison = await compareProducts(products, criteria);

    res.json({ aiComparison });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to compare products" });
  }
});

module.exports = router;
