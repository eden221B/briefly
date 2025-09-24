// backend/models/Summary.js
const mongoose = require("mongoose");

const SummarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
  productTitle: { type: String, required: true },
  source: { url: String, siteName: String },
  rawData: Object,
  aiSummary: {
    bullets: [String],
    pros: [String],
    cons: [String],
    price: {
      amount: Number,
      currency: String
    },
    valueScore: Number,
    recommendation: String
  },
}, { timestamps: true });

module.exports = mongoose.model("Summary", SummarySchema);
