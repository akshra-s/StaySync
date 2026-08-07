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
const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");
const session=require("express-session");
// const cookieParser=require("cookie-parser");
const flash = require("connect-flash");
const passport=require("passport");
const LocalStrategy= require("passport-local");
const user=require("./models/user.js");

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
// app.use(cookieParser());
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

//SESSION 
const sessionopts={
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },
};

//flash
app.use(session(sessionopts));
app.use(flash());

//Passport (authentication)
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

//Routes..
//Testing route..
// app.get("/demo",async(req,res)=>{
//     let fakeUser= new user({
//         email:"student@gmail.com",
//         username:"student@2007",
//     });
//     let Myuser=await user.register(fakeUser,"itsapassword");
//     res.send(Myuser);
// });
app.get("/",(req,res)=>{
    res.send("Root is working!");
});

//listing routes..
app.use("/listing",listingRouter);

//Reviews routes..
app.use("/listing/:id/review",reviewRouter);

//user routes..
app.use("/",userRouter);

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
