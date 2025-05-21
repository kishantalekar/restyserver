const pdfParse = require("pdf-parse");

const ping = (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
};

const extractPdf = async (req, res) => {
  try {
    const pdfBuffer = req.file.buffer;
    const data = await pdfParse(pdfBuffer);

    res.json({
      text: data.text,
      html: data.html || "",
      metadata: {
        info: data.info,
        numpages: data.numpages,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to extract or analyze PDF content");
  }
};

module.exports = {
  ping,
  extractPdf,
};
