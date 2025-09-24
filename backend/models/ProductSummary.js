const mongoose = require("mongoose");

const ProductSummarySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productIds: [{ type: String }],
  aiSummary: { type: Object },
  aiComparison: { type: Object },
  criteria: { type: Object }
}, { timestamps: true });

module.exports = mongoose.model("ProductSummary", ProductSummarySchema);
