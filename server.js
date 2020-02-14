const express = require("express");
const app = express();
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;

dotenv.config({ path: "./config/config.env" });

app.get("/", (req, res) => {
  res.json({ nama: "Faeshal", contact: "github.com/faeshal" });
});

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
