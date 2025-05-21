const express = require("express");
const router = express.Router();
const { ping, extractPdf } = require("../controllers/pdfController");
const upload = require("../middleware/uploadMiddleware");

router.get("/ping", ping);
router.post("/extract-pdf", upload.single("pdf"), extractPdf);

module.exports = router;
