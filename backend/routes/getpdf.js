const express = require("express");
const router = express.Router();
const axios = require("axios");
const pool = require("../config/db");

router.get("/getpdf/:fileid", async (req, res) => {
  const { fileid } = req.params;

  if (!fileid) {
    return res.status(400).json({ error: "Missing fileid parameter" });
  }

  try {
    const result = await pool.query(
      "SELECT file_url FROM Inbox WHERE file_id = $1",
      [fileid]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "File not found" });
    }

    const url = result.rows[0].file_url;

    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });
    console.log(response.data);

    const pdfData = Buffer.from(response.data, "binary");
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="file.pdf"`);
    res.setHeader("Content-Length", pdfData.length);
    res.send(pdfData);
  } catch (error) {
    console.error("Error fetching and serving PDF:", error);
    res.status(500).json({ error: "Error fetching the PDF" });
  }
});

module.exports = router;
