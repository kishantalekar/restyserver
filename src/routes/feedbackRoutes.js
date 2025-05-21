const express = require("express");
const router = express.Router();
const {
  createFeedback,
  getAllFeedback,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
} = require("../controllers/feedbackController");

// Create new feedback
router.post("/", createFeedback);

// Get all feedback
router.get("/", getAllFeedback);

// Get feedback by ID
router.get("/:id", getFeedbackById);

// Update feedback
router.put("/:id", updateFeedback);

// Delete feedback
router.delete("/:id", deleteFeedback);

module.exports = router;
