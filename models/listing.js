const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema= new Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String
  },
  image:{
    filename:{
      type:String,
    },
    url:{
      type:String,
    default: "https://unsplash.com/photos/a-group-of-people-standing-on-top-of-a-beach-next-to-the-ocean-aAfFLVbIwsc",
    set:(v) => v === "" ? "https://unsplash.com/photos/a-group-of-people-standing-on-top-of-a-beach-next-to-the-ocean-aAfFLVbIwsc" : v,
    }
  },
  price:{
    type:Number,
    required:true,
  },
  location:{
    type:String
  },
  country:{
    type:String,
    required:true,
  }
}, { timestamps: true });
const Listing=mongoose.model("Listing",listingSchema);//creat a model

module.exports=Listing;