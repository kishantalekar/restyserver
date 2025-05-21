const Testing = require("../models/testingModel");

// Create new testing entry
const createTesting = async (req, res) => {
  try {
    const testing = new Testing(req.body);
    const savedTesting = await testing.save();
    res.status(201).json(savedTesting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllTests = async (req, res) => {
  try {
    const tests = await Testing.find({});
    res.status(200).json({
      success: true,
      data: tests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
module.exports = {
  createTesting,
  getAllTests,
};
