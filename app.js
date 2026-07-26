//Requirements..

const express = require("express");
const app = express();
const mongoose=require("mongoose");
const listing=require("./models/listing.js");
const path=require("path");
const methodOverride = require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utility/wrapAsync.js");
const ExError=require("./utility/ExError.js");
const review=require("./models/review.js");
const {listingSchema}=require("./schema.js");
const {reviewSchema}=require("./schema.js");
const listings=require("./routes/listing.js");

//Connection..
main()
    .then(()=>{
        console.log("connected to db");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/StaySync");
};

//TOOLS..
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));




const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
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

app.use("/listing",listings);

//Reviews

// post review..
app.post("/listing/:id/review",validateReview,wrapAsync(async (req,res)=>{
    let list=await listing.findById(req.params.id);
    let newReview= new review(req.body.review);
    list.reviews.push(newReview);
    await newReview.save();
    await list.save();
    res.redirect(`/listing/${list._id}`);
}));
//delete review..
app.delete("/listing/:id/review/:reviewid",wrapAsync(async(req,res)=>{
    let {id,reviewid} = req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
    await review.findByIdAndDelete(reviewid);
    res.redirect(`/listing/${id}`);
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
