const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/Review");
const advancedResults = require("../middleware/advancedResults");
const { protect, Authorize } = require("../middleware/auth");
const { getReviews, getReview, addReview } = require("../controllers/reviews");

router
  .route("/")
  .get(
    advancedResults(Review, { path: "bootcamp", select: "name description" }),
    getReviews
  )
  .post(protect, Authorize("user", "admin"), addReview);

router.route("/:id").get(getReview);

module.exports = router;
