// backend/routes/ai.js
const express = require("express");
const router = express.Router();
const { summarize, compare } = require("../controllers/aiController");
const auth = require("../middleware/auth");

// Protected endpoints
router.post("/summarize", auth, summarize);
router.post("/compare", auth, compare);

module.exports = router;
