const express = require("express");
const app = express();
const PORT = 3004;

app.get("/logistic", (req, res) => {
  try {
    const company = req.query.company;
    const location = ["New York", "London", "Tokyo"];

    console.log(`[Logistic Service] request recieved for company = ${company}`);

    res.json({
      company,
      time: Date.now(),
      location,
    });

    console.log(`[Logistic Service] responded with location=${location}`);
  } catch (e) {
    console.error("[Logistic Service] Error:", e.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`Logistic Service running on port ${PORT}`));
