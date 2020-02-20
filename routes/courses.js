const express = require("express");
const router = express.Router({ mergeParams: true });
const Course = require("../models/Course");
const advancedResults = require("../middleware/advancedResults");
const { protect, Authorize } = require("../middleware/auth");
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse
} = require("../controllers/courses");

// * Course Route
router
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description"
    }),
    getCourses
  )
  .post(protect, Authorize("publisher", "admin"), addCourse);

router
  .route("/:id")
  .get(getCourse)
  .put(protect, Authorize("publisher", "admin"), updateCourse)
  .delete(protect, Authorize("publisher", "admin"), deleteCourse);

module.exports = router;
