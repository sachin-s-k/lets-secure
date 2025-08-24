require("dotenv").config();
const express = require("express");
const app = express();

app.get("/calc", (req, res) => {
  const expr = req.query.expr; // ❌ unsanitized input
  try {
    const result = eval(expr); // 🚨 dangerous
    res.send("Result: " + result);
  } catch (e) {
    res.send("Error: " + e.message);
  }
});

app.listen(3000, () => console.log("http://localhost:3000"));
