const multer = require("multer");

// Use memory storage to avoid saving files
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = upload;
