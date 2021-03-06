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

// * @route POST /api/v1/bootcamps/:bootcampId/reviews
// @desc    Create Review for user
// @access  Private

exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `No Bootcamp with the id of ${req.params.bootcampId}`,
        404
      )
    );
  }

  const review = await Review.create(req.body);

  res.status(201).json({ success: true, data: review });
});

// * @route PUT /api/v1/reviews/:id
// @desc    Update Review
// @access  Private

exports.updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`No Reviews found for this id ${req.params.id}`, 404)
    );
  }

  // make sure review belongs to user or user is admin
  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`No Authorize to update reviews`, 401));
  }
  await review.update(req.params.id);

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: review });
});

// * @route DELETE /api/v1/reviews/:id
// @desc    Delete Review
// @access  Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`Review no found with id ${req.params.id}`, 404)
    );
  }

  // check user is review owner
  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User with id ${req.params.id} is not authorized to Delete this Review`,
        401
      )
    );
  }

  await review.remove();
  res.status(200).json({ success: true, data: {} });
});
