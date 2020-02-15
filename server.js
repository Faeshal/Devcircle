const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const PORT = process.env.PORT || 5000;

dotenv.config({ path: "./config/config.env" });
app.use(morgan("short"));

// SECTION : Routing
app.get("/api/v1/bootcamps", (req, res) => {
  res.status(200).json({ success: true, message: "show all bootcamp" });
});

app.get("/api/v1/bootcamps/:id", (req, res) => {
  res.status(200).json({
    success: true,
    message: "show single bootcamp : " + req.params.id
  });
});

app.post("/api/v1/bootcamps", (req, res) => {
  res.status(200).json({ success: true, message: "created bootcamp" });
});

app.put("/api/v1/bootcamps/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "updated bootcamp : " + req.params.id });
});

app.delete("/api/v1/bootcamps/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `Deleted bootcamp ${req.params.id}` });
});

// SECTION : SERVER LISTEN
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
