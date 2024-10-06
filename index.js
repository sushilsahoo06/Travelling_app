const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing");
const path=require("path");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");


main().then((res)=>{
  console.log("connection succesfull !");
}).catch((er)=>{
  console.log(er)
})

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderlost');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
app.listen(8080,()=>{
  console.log(`Serveris running on port 8080`)
});

// app.get("/sampleListing",async(req,res)=>{
//   try{
//     let newListing= new Listing({
//       title:"My new villa",
//       description:"By the beach",
//       price : 12000,
//       location:"calanguta ,goa",
//       country:"India",
//     })
//     await newListing.save();
//     console.log("sample was saved");
//     res.send("successful testing !!");
//   }catch(error){
//     console.error("Error saving listing:", error);
//     res.status(500).send("Error saving listing.");
//   }
// });
app.get("/",(req,res)=>{
  console.log("server is working !");
  res.send("hii , i am root !")
});
//index route
app.get("/listing",async (eeq,res)=>{
  const allList=await Listing.find({});
  res.render("listing/app.ejs",{allList});
});

//show route
app.get("/listing/:id",async (req,res)=>{
  let {id}=req.params;
  const listing=await Listing.findById(id);
  res.render("listing/show.ejs",{listing})
})