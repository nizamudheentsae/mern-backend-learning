const express = require("express");
const mongoose = require("mongoose");
const customerRoutes = require("./routes/customerRoutes");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/customers", customerRoutes);

// Mongoose Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/careerPathDB")
  .then(() => {
    console.log("✅ Connected to MongoDB with Mongoose");

    app.listen(5000, () => {
      console.log("🚀 Server running on port 5000");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });