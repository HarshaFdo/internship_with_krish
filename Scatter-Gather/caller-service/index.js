const express = require("express");
const app = express();
const PORT = 3000;
const http = require("http");

function callService(options, name, timeout = 2000) {
  return new Promise((resolve) => {
    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          console.log(`[Caller Service] ${name} returned invalid JSON`);
          resolve({ value: "no response" });
        }
      });
    });

    req.on("error", () => {
      console.log(`[Caller Service] ${name} is unreachable`);
      resolve({ value: "no response" });
    });

    // handling the timeout
    req.setTimeout(timeout, () => {
      console.log(`[Caller Service] ${name} timed out`);
      req.destroy();
      resolve({ value: "no response" });
    });

    req.end();
  });
}

app.get("/aggregate", async (req, res) => {
  const company = req.query.company;
  console.log(`[Caller Service] Aggregating data for company=${company}`);

  const services = [
    { hostname: "rate-service", path: "/rate", name: "Rate Service", port: 3001 },
    { hostname: "allocation-service", path: "/allocation", name: "Allocation Service", port: 3002 },
    { hostname: "logistic-service", path: "/logistic", name: "Logistic Service", port: 3004 },
  ];

  const [rate, allocation, logistic] = await Promise.all(
    services.map((s) => callService({
          hostname: s.hostname,
          port: s.port,
          path: `${s.path}?company=${company}`,
          method: "GET",
        }, 
        s.name, 
        3000
      ))
  );

  console.log(
    `[Caller Service] Sending aggregated response for company=${company}`
  );

  res.json({
    company,
    time: new Date().toLocaleString(),
    value: rate.value ?? "no response",
    duration: allocation.duration ?? "no response",
    location: logistic.location ?? ["no response"],
  });
});

app.listen(PORT, () => console.log(`Caller Service running on port ${PORT}`));
