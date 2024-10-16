const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync");
const ExpressError=require("./utils/expressError");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static("public"));

main().then((res)=>{
  console.log("connection succesfull !");
}).catch((er)=>{
  console.log(er)
})

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderlost');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
app.listen(3000,()=>{
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
app.get("/listing",wrapAsync(async(req,res)=>{
  const allList=await Listing.find({});
  res.render("listing/app.ejs",{allList});
}));

//new route
app.get("/listing/new",(req,res,next)=>{
  try{
    res.render("listing/new.ejs");
  }catch(error){
    next(err)
  }
});
//show route
app.get("/listing/:id",wrapAsync(async(req,res)=>{
  let {id}=req.params;
  const listing=await Listing.findById(id);
  res.render("listing/show.ejs",{listing})
}));

// create route
app.post("/listing",wrapAsync(async (req,res,next)=>{
  let{title,description,price,location,country}=req.body;
  // if (!listing) {
  //   return res.status(404).send("Listing not found");
  // };
  if (!country.match(/^[a-zA-Z\s]+$/)) {
    throw new ExpressError(400, "Invalid country name. Only letters are allowed.");  // Optional validation check
  }
  let newData=new Listing({
    title:title,
    description:description,
    price:price,
    location:location,
    country:country,
  });
  await newData.save();
  res.redirect("/listing");
}));

//edit route
app.get("/listing/:id/Edit",wrapAsync(async(req,res)=>{

  let{id}=req.params;
  let listing=await Listing.findById(id);
  if (!listing) {
    return res.status(404).send("Listing not found");
  };
  res.render("listing/edit.ejs",{listing});

}));
//update route
app.patch("/listing/:id",wrapAsync(async(req,res)=>{
  
    let{id}=req.params;
    let{
      title:title,
      description:description,
      price:price,
      location:location,
      country:country,
    }=req.body
    const updateData=await Listing.findByIdAndUpdate(id,{
      title:title,
      description:description,
      price:price,
      location:location,
      country:country,
    });
    console.log(updateData);
    res.redirect("/listing");

}));
//delete route
app.delete("/listing/:id",wrapAsync(async(req,res)=>{
    let{id}=req.params;
    const deleteData=await Listing.findByIdAndDelete(id);
    console.log(deleteData);
    res.redirect("/listing");
}));

// error middle wire
app.use((err, req, res, next) => {
  console.log(err.name);// Log the error for debugging
  const { statusCode = 500, message = "Something went wrong!" } = err;

  // If the request expects HTML (e.g., from a browser)
  if (req.accepts('html')) {
    res.status(statusCode).render("error/error.ejs",{statusCode,message})
  } 

  // If the request is API-based and expects JSON
  else if (req.accepts('json')) {
    res.status(statusCode).json({ error: message });
  } 

  // Fallback to plain text for other types of requests
  else {
    res.status(statusCode).send(message);
  }
});

app.use((req,res)=>{
  res.status(404).render("error/404.ejs");
}); // Render custom 404 page
