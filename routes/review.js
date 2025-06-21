const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { validatereview, isLoggedIn, isReviewAuthor } = require("../middleware.js");


const reviewController = require("../controllers/review.js");



// reviews

router.post("/", isLoggedIn, validatereview, wrapAsync(reviewController.createReview));

//delete review

router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync (reviewController.destroyReview));

module.exports = router;