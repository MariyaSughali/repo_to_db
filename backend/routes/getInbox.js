const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.get("/getinbox", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT file_name, file_url, file_id ,assigned_date FROM Inbox"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching data from Inbox:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
