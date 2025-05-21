const express = require("express");
const router = express.Router();
const {
  createTesting,
  getAllTests,
} = require("../controllers/testingController");

// Create new testing entry
router.post("/testing", createTesting);

router.get("/testing", getAllTests);

module.exports = router;
