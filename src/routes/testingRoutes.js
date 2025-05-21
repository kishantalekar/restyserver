const express = require("express");
const router = express.Router();
const { createTesting } = require("../controllers/testingController");

// Create new testing entry
router.post("/testing", createTesting);

module.exports = router;
