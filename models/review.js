const mongoose=require("mongoose");
const { type } = require("../Schema");
const Schema=mongoose.Schema;

const reviewSchema= new Schema({
  Comment:{
    type:String,
  },
  rating:{
    type:Number,
    min:1,
    max:5
  },
  createdAt:{
    type:data,
    default:Data.now()
  }
});
module.exports=mongoose.model("Review",reviewSchema);