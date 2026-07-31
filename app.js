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
const {listingSchema, reviewSchema}=require("./schema.js");
const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");
const cookieParser=require("cookie-parser");
const flash = require("connect-flash");

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
app.use(cookieParser());
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});


//Routes..
//Testing route..
app.get("/",(req,res)=>{
    res.send("Root is working!");
});

//listing routes..
app.use("/listing",listings);

//Reviews routes..
app.use("/listing/:id/review",reviews);

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
