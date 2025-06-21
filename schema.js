const joi = require("joi");
const Listing = require("./models/listing");
const Review = require("./models/review");

module.exports. listingSchema =joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        location: joi.string().required(),
        country: joi.string().required().min(0),
        price:joi.number().required(),
        image: joi.object({
            url: joi.string().allow('', null),
           filename: joi.string().allow('', null)
           }).allow(null)

    }).required()
});

module.exports. reviewSchema = joi.object({
    review:joi.object({
        rating:joi.number().required().min(1).max(5),
        comment:joi.string().required(),
    }).required()
});