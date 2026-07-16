const express = require("express");
const app = express();
const mongoose=require("mongoose");
const listing=require("./models/listing.js");
const path=require("path");
const methodOverride = require("method-override");
const ejsMate=require("ejs-mate");

//connection..
main()
    .then(()=>{
        console.log("connected to db");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/StaySync");
};

//.....
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

//Routes..

//Testing route..
app.get("/",(req,res)=>{
    res.send("Root is working!");
});

//new route..(renders a form I)..
app.get("/listing/new",(req,res)=>{
    res.render("listing/new.ejs");
});

//show route..
app.get("/listing",async(req,res)=>{
    const allList=await listing.find({});
    res.render("listing/index.ejs",{allList});
});
app.get("/listing/:id",async(req,res)=>{
    let {id} = req.params;
    const list=await listing.findById(id);
    res.render("listing/show.ejs",{list});
});

//create route..(CREATE the NEW listing II)..
app.post("/listing",async(req,res)=>{
    const newlist=new listing(req.body.listing); 
    await newlist.save();
    res.redirect("/listing");
});

//edit route.. (renders a form I)..
app.get("/listing/:id/edit",async(req,res)=>{
    let {id} = req.params;
    const list=await listing.findById(id);
    res.render("listing/edit.ejs",{list});
});
//update route.. (UPDATE the EDITED listing II)
app.put("/listing/:id",async(req,res)=>{
    let {id} = req.params;
    await listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listing/${id}`);
});

//DELETE ROUTE
app.delete("/listing/:id",async(req,res)=>{
    let {id} = req.params;
    let delList=await listing.findByIdAndDelete(id);
    console.log(delList);
    res.redirect("/listing");
});

app.listen(8080,()=>{
    console.log("Server is listening to port 8080");
});
