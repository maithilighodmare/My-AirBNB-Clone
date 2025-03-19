const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");

const MONGO_URL ="mongodb://127.0.0.1:27017/wanderlust"

main().then(()=>{   
    console.log("connected to db");
})
.catch((err) => {
    console.log(err);
});
async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.get("/",(req,res)=>{
    res.send("Hi! I am root.")
});
// Index Route
app.get("/listings", async(req,res)=>{
 const allListings = await Listing.find({});
 res.render("listings/index.ejs",{allListings});
});
// New Route
app.get("/listings/new", (req,res)=>{
    res.render("listings/new.ejs");
})
// Show Route
app.get("/listings/:id", async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});
// Create route
app.post("/listings" , async (req,res)=>{

   const newListing = new Listing(req.body.listing);
   await newListing.save();
   res.redirect("/listings");
});
// Edit Route
app.get("/listings/:id/edit",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});
// Update route

app.put("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});
// Delete Route
app.delete("/listings/:id", async (req,res)=>{
    let {id} = req.params;
  let deletedListings = await Listing.findByIdAndDelete(id);
  console.log(deletedListings);
  res.redirect("/listings");
})
// app.get("/testlistings" , async(req,res) =>{
//  let sampleListing = new  Listing({
//     title: "Aha",
//     description:"oho",
//     price:1223,
//     location: "nag",
//     country:"India"
//  });
//    await sampleListing.save();
//    console.log("Sample was saved");
//    res.send("successfull");
// });

app.listen(8080 ,()=>{
    console.log("server is listing to port 8080");
})