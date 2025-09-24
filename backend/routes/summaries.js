// backend/routes/summaries.js
const express = require("express");
const router = express.Router();
const Summary = require("../models/Summary");
const auth = require('../middleware/auth');

// GET /api/summaries (user's summaries)
router.get("/", auth, async (req, res) => {
  try {
    const summaries = await Summary.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, summaries });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:'Server error' });
  }
});
// DELETE /api/summaries/:id
router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Summary.findByIdAndDelete(id);
  
      if (!result) {
        return res.status(404).json({ message: "Summary not found" });
      }
  
      res.json({ success: true, id }); // ✅ return JSON so frontend knows it worked
    } catch (err) {
      console.error("Delete error:", err);
      res.status(500).json({ message: "Server error while deleting" });
    }
  });
  
module.exports = router;
