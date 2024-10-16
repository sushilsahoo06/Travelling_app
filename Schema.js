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