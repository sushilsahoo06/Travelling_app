const joi=require("joi");
const Listing = require("./models/listing");

const listingSchema=joi.object({
  Listing:joi.object({
    title:joi.string().required(),
    description:joi.string().required(),
    image:joi.string().allow("",null),
    price:joi.number().required().min(100),
    location:joi.string().required(),
    country:joi.string().required()
  }).required()
});

module.exports=listingSchema;

//review schema
const Joi = require("joi");

const reviewSchema = Joi.object({
  Comment: Joi.string().required(),
  Rating: Joi.number().required().min(1).max(5),
});

module.exports.reviewSchema = reviewSchema;
