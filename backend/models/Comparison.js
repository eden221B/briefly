const mongoose = require("mongoose");

const ComparisonSchema = new mongoose.Schema({
  userId: { type: String, required: false },
  productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Summary" }],
  aiComparison: {
    comparisons: [
      {
        productTitle: String,
        pros: [String],
        cons: [String],
        price: { amount: Number, currency: String },
        valueScore: Number
      }
    ],
    bestOption: String,
    rationale: String
  },
  criteria: {
    budget: Number,
    priority: { type: String, enum: ["price", "quality", "features"], default: "price" }
  }
}, { timestamps: true });

module.exports = mongoose.model("Comparison", ComparisonSchema);
