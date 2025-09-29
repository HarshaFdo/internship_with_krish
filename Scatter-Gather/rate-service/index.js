const express = require("express");
const app = express();
const PORT = 3001;

app.get("/rate", (req, res) => {
  try {
    const company = req.query.company;
    const value = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;

    console.log(`[Rate Service] request recieved for company = ${company}`);

    res.json({
      company,
      time: Date.now(),
      value,
    });

    console.log(`[Rate Service] responded with value=${value}`);
  } catch (e) {
    console.error("[Rate Service] Error:", e.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`Rate Service running on port ${PORT}`));
