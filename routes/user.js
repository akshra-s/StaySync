const express=require("express");
const router = express.Router();
const user=require("../models/user.js");
const wrapAsync = require("../utility/wrapAsync.js");
const passport =require("passport");

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});
router.post("/signup",wrapAsync(async(req,res)=>{
    try{
        let{username,email,password}=req.body;
        const newUser=new user({email,username});
        const registeredUser =await user.register(newUser,password);
        console.log(registeredUser);
        req.flash("success","Welcome to StaySync!");
        res.redirect("/listing");
    }
    catch(e){
        req.flash("success",e.message);
        res.redirect("/listing");
    }
}));

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});
router.post("/login",
    passport.authenticate("local",
        {faliureRedirect:"/login",faliureFlash:true,}),
        async(req,res)=>{
            req.flash("success","Welcome Back To StaySync !");
            res.redirect("/listings");
});
module.exports = router;