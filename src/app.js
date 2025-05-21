require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const pdfRoutes = require("./routes/pdfRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const testingRoutes = require("./routes/testingRoutes");

// Import middleware
const errorHandler = require("./middleware/errorHandler");
const requestLogger = require("./middleware/requestLogger");
const corsMiddleware = require("./middleware/cors");
const rateLimiter = require("./middleware/rateLimiter");

const app = express();

// Global Middleware
app.use(requestLogger);
app.use(corsMiddleware);
app.use(rateLimiter);
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Routes
app.use("/api", pdfRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api", testingRoutes);

// Error handling middleware (should be last)
app.use(errorHandler);

module.exports = app;
