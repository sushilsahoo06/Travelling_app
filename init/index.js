const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

main().then((res)=>{
  console.log("connection succesfull !");
}).catch((er)=>{
  console.log(er)
})

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderlost');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const initDB= async()=>{
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("data was initialized")
}
//initDB();
