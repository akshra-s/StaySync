const express = require("express");
const app = express();
const mongoose=require("mongoose");
const listing=require("./models/listing.js");
const path=require("path");
const methodOverride = require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utility/wrapAsync.js");
const ExError=require("./utility/ExError.js");
const {listingSchema}=require("./schema.js");

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

const validatelist=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errmsg =error.details.map((ele)=>ele.message).join(",");
        throw new ExError(400,errmsg);
    }else{
        next();
    }
};

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
app.get("/listing",wrapAsync(async(req,res)=>{
    const allList=await listing.find({});
    res.render("listing/index.ejs",{allList});
}));
app.get("/listing/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const list = await listing.findById(id);
    if(!list){
        throw new ExError(404,"Listing not found!");
    }
    res.render("listing/show.ejs",{list});
}));

//create route..(CREATE the NEW listing II)..
app.post("/listing", validatelist,
    wrapAsync(async(req,res)=>{
    const newlist = new listing(req.body.listing);
    await newlist.save();
    res.redirect("/listing");
}));

//edit route.. (renders a form I)..
app.get("/listing/:id/edit",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const list = await listing.findById(id);
    if(!list){
        throw new ExError(404,"Listing not found!");
    }
    res.render("listing/edit.ejs",{list});
}));

//update route.. (UPDATE the EDITED listing II)
app.put("/listing/:id",validatelist,
    wrapAsync(async(req,res)=>{
    let {id} = req.params;
    await listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listing/${id}`);
}));

//DELETE ROUTE
app.delete("/listing/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let delList=await listing.findByIdAndDelete(id);
    console.log(delList);
    res.redirect("/listing");
}));

//For All invalid routes..
app.use((req,res,next)=>{
    next(new ExError(404,"Page Not Found !"));
});
app.use((err,req,res,next)=>{
    let{status=500,message="Something Went Wrong !"}=err;
    res.status(status).render("error.ejs",{message});
});

app.listen(8080,()=>{
    console.log("Server is listening to port 8080");
});
