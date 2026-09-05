//Requirements..
if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose=require("mongoose");
const path=require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const ExError=require("./utility/ExError.js");
const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");
const session=require("express-session");
const { MongoStore } = require("connect-mongo");
// const cookieParser=require("cookie-parser");
const flash = require("connect-flash");
const passport=require("passport");
const LocalStrategy= require("passport-local");
const user=require("./models/user.js");
const dbUrl=process.env.ATLASDB_URL;
//Connection..
main()
    .then(()=>{
        console.log("connected to db");
    })
    .catch(err => console.log(err));
async function main() {
  await mongoose.connect(dbUrl);
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
const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SESSION_SECRET
    },
    touchAfter:24*3600,
});
store.on("error",(err)=>{
    console.log("Error in Mongo Session Store\n",err);
});
const sessionopts={
    store:store,
    secret:process.env.SESSION_SECRET,
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
    res.locals.currUser=req.user;
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

//root route..
// app.get("/",(req,res)=>{
//     res.send("Root is working!");
// });

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

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
});
