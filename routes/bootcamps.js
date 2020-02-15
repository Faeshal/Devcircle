const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "show all bootcamp" });
});

router.get("/:id", (req, res) => {
  res.status(200).json({
    success: true,
    message: "show single bootcamp : " + req.params.id
  });
});

router.post("/", (req, res) => {
  res.status(200).json({ success: true, message: "created bootcamp" });
});

router.put("/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "updated bootcamp : " + req.params.id });
});

router.delete("/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `Deleted bootcamp ${req.params.id}` });
});

module.exports = router;
