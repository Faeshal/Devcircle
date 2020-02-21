const express = require("express");
const router = express.Router();
const Bootcamp = require("../models/Bootcamp");
const advancedResults = require("../middleware/advancedResults");
// include course router
const courseRouter = require("./courses");
const reviewRouter = require("./reviews");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload
} = require("../controllers/bootcamps");

// Security Middleware
const { protect, Authorize } = require("../middleware/auth");

//mounting router
router.use("/:bootcampId/courses", courseRouter);
router.use("/:bootcampId/reviews", reviewRouter);

// * Bootcamp Route
router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, Authorize("publisher", "admin"), createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, Authorize("publisher", "admin"), updateBootcamp)
  .delete(protect, Authorize("publisher", "admin"), deleteBootcamp);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router
  .route("/:id/photo")
  .put(protect, Authorize("publisher", "admin"), bootcampPhotoUpload);

module.exports = router;
