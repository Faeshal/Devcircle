const Bootcamp = require("../models/Bootcamp");
const errorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async.js");
const geocoder = require("../utils/geocoder");

// @desc    Get All bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  // copy req.query
  const reqQuery = { ...req.query };

  // field to exclude
  const removeFields = ["select", "sort"];

  // loop over removeField and delete the from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  console.log(req.query);

  // Create query String
  let queryStr = JSON.stringify(reqQuery);

  // Create Operators($gt,$gte,etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // finding resource
  query = Bootcamp.find(JSON.parse(queryStr));

  // select field
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // sort field
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    // -field = ascending
    query = query.sort("-createdAt");
  }

  // executing query
  const bootcamp = await query;
  res
    .status(200)
    .json({ success: true, count: bootcamp.length, data: bootcamp });
});

// @desc    Get Single Bootcamp
// @route   GET /api/v1/bootcamp/:id
// @access  Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new errorResponse(`Bootcamp no found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc    Create bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp
  });
});

// @desc    Edit bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!bootcamp) {
    return next(
      new errorResponse(`Bootcamp no found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return next(
      new errorResponse(`Bootcamp no found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});

// @desc   Get bootcamp within a radius
// @route   GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access  Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // calc radius using radian formula
  // divide distby radiusof Earth
  // Earth Radius = 3963 mil / 6378 km
  const radius = distance / 3963;
  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });
  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});
