const express=require("express");
const router = express.Router();
const user=require("../models/user.js");
const listing=require("../models/listing.js");
const wrapAsync = require("../utility/wrapAsync.js");
const passport =require("passport");
const { saveRedirectUrl,isloggedin } = require("../middleware.js");

//login..
router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});
router.post("/signup",async(req,res,next)=>{
    try{
        let{username,email,password}=req.body;
        const newUser=new user({email,username});
        const registeredUser =await user.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to StaySync!");
            res.redirect("/listing");
        });
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
});
//login..
router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});
router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local",
        {failureRedirect:"/login",failureFlash:true,}),
        (req,res)=>{
            req.flash("success","Welcome Back To StaySync !");
            let redirectUrl=res.locals.redirectUrl || "/listing";
            res.redirect(redirectUrl);
});
router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You Logged out !");
        res.redirect("/listing");
    });
});
//wishlist..
router.get("/wishlist", isloggedin, wrapAsync(async (req, res) => {
    const currUser = await user.findById(req.user._id).populate("wishlist");
    res.render("users/wishlist.ejs", { currUser });
}));
router.post("/listing/:id/wishlist", isloggedin, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const list = await listing.findById(id);
    if (!list) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listing");
    }
    const currUser = await user.findById(req.user._id);
    if (!currUser.wishlist.includes(list._id)) {
        currUser.wishlist.push(list._id);
        await currUser.save();
    }
    req.flash("success", "Added to your wishlist!");
    res.redirect(req.get("Referrer") || "/listing");
}));
router.post("/listing/:id/wishlist/remove", isloggedin, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const currUser = await user.findById(req.user._id);
    currUser.wishlist = currUser.wishlist.filter(
        listingId => !listingId.equals(id)
    );
    await currUser.save();
    req.flash("success", "Removed from your wishlist!");
    res.redirect(req.get("Referrer") || "/listing");
}));
module.exports = router;