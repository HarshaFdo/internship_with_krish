const express = require("express");
const app = express();
const PORT = 3002;

app.get("/allocation", (req, res) => {
  try {
    const company = req.query.company;
    const duration = Math.floor(Math.random() * (100 - 10 + 1)) + 10;

    console.log(`[Allocation Service] request recieved for company = ${company}`);

    res.json({
      company,
      time: Date.now(),
      duration,
    });

    console.log(`[Allocation Service] responded with duration=${duration}`);
  } catch (e) {
    console.error("[Allocation Service] Error:", e.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`Allocation Service running on port ${PORT}`));
