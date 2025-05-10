// server.js
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
// const { GoogleGenAI } = require("@google/genai");

const app = express();
const port = 3000;

// Initialize Gemini AI
console.log(process.env.GEMINI_API_KEY);
// const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

// Use memory storage to avoid saving files
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Function to analyze content using Gemini
// async function analyzeContent(text) {
//   const prompt = `Analyze and structure the following text from a PDF document. Extract key information and organize it into sections. Here's the text:\n\n${text}`;

//   try {
//     // const result = await model.generateContent(prompt);

//     const result = await genAI.models.generateContent({
//       model: "gemini-2.0-flash-001",
//       contents: prompt,
//     });
//     const response = await result.response;
//     return response.text();
//   } catch (error) {
//     console.error("Gemini AI analysis error:", error);
//     return null;
//   }
// }

app.get("/ping", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

app.post("/extract-pdf", upload.single("pdf"), async (req, res) => {
  try {
    const pdfBuffer = req.file.buffer;
    const data = await pdfParse(pdfBuffer);

    res.json({
      text: data.text, // Original plain text
      html: data.html || "", // Experimental: not always populated
      metadata: {
        info: data.info,
        numpages: data.numpages,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to extract or analyze PDF content");
  }
});

app.listen(port, () => {
  console.log(`PDF extract server running at http://localhost:${port}`);
});
