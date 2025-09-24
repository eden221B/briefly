const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require('./routes/auth');

const aiRoutes = require("./routes/ai");
const summaryRoutes = require("./routes/summaries");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/ai", aiRoutes);
app.use("/api/summaries", summaryRoutes);
const compareRouter = require("./routes/compare");

app.use("/api/compare", compareRouter);

// Test route
app.get("/", (req, res) => {
  res.send("AI Shopping Companion Backend Running 🚀");
});

// Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
