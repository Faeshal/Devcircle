const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async.js");
const Bootcamp = require("../models/Bootcamp");
const Review = require("../models/Review");

// * @route   GET /api/v1/reviews
// * @route   GET /api/v1/bootcamps/:bootcampId/reviews
// @desc    Get
// @access  Public

exports.getReviews = asyncHandler(async (req, res) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// * @route GET /api/v1/reviews/:id
// @desc    Get Single Review
// @access  Public

exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description"
  });

  if (!review) {
    return next(
      new ErrorResponse(`No Reviews found for this id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: review });
});