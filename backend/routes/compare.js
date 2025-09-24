// backend/routes/compare.js
const express = require("express");
const router = express.Router();

// Import your mocked service
const { compareProducts } = require("../services/openaiService");

// POST /api/compare
router.post("/", async (req, res) => {
  try {
    const { products, criteria } = req.body;

    // Use mocked compareProducts function
    const result = await compareProducts(products, criteria);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Comparison failed" });
  }
});

module.exports = router;
