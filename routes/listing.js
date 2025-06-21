const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const{listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner,validateListing } = require("../middleware.js");


const listingcontroller = require("../controllers/listings.js");
const multer  = require("multer");
const {storage} = require("../cloudconfig.js")
const upload = multer({storage});

router
.route("/")
.get( wrapAsync(listingcontroller.index))
.post(isLoggedIn,  upload.single("listing[image][url]"), validateListing,wrapAsync  (listingcontroller.createListing));


//New Route
router.get("/new", isLoggedIn, listingcontroller.renderNewForm);

router
.route("/:id")
.get(wrapAsync  (listingcontroller.showListing))
.put(isLoggedIn, isOwner, upload.single("listing[image][url]"),validateListing, wrapAsync (listingcontroller.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync (listingcontroller.destroyListing));


//Edit Route
router.get("/:id/edit", isLoggedIn,isLoggedIn,wrapAsync (listingcontroller.renderEditForm));


module.exports = router;