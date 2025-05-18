const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World from Backend Service(konggggg)");
});

app.listen(port, () => {
  console.log(`Backend service listening at http://localhost:${port}`);
});
