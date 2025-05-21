const cors = require("cors");

const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["x-response-time"],
  credentials: true,
  maxAge: 86400, // 24 hours
};

module.exports = cors(corsOptions);
