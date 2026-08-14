const express=require("express");
const router=express.Router();
const wrapAsync=require("../utility/wrapAsync.js");
const listing=require("../models/listing.js");
const {isloggedin,isOwner,validateListing,validateReview}=require("../middleware.js");


//new route..(renders a form I)..
router.get("/new",isloggedin,(req,res)=>{
    res.render("listing/new.ejs");
});
//index route
router.get("/",wrapAsync(async(req,res)=>{
    const allList=await listing.find({});
    res.render("listing/index.ejs",{allList});
}));
//show route..
router.get("/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const list = await listing.findById(id)
    .populate({path:"reviews",
        populate:{
            path:"author",
        },
    })
    .populate("owner");
    if(!list){
        req.flash("error", "Listing Does Not Exist !");
        return res.redirect("/listing");
    }
    res.render("listing/show.ejs",{list});
}));

//create route..(CREATE the NEW listing II)..
router.post("/",isloggedin, validateListing,
    wrapAsync(async(req,res)=>{
    const newlist = new listing(req.body.listing);
    newlist.owner=req.user._id;
    await newlist.save();
    req.flash("success", "Listing created successfully!");
    res.redirect("/listing");
}));

//edit route.. (renders a form I)..
router.get("/:id/edit",isloggedin,isOwner,wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const list = await listing.findById(id);
    if(!list){
        req.flash("error", "Listing Does Not Exist !");
        return res.redirect("/listing");
    }
    res.render("listing/edit.ejs",{list});
}));

//update route.. (UPDATE the EDITED listing II)
router.put("/:id",isloggedin,isOwner,validateListing,
    wrapAsync(async(req,res)=>{
    let {id} = req.params;
    await listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listing/${id}`);
}));

//delete route..
router.delete("/:id",isloggedin,isOwner,wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let delList=await listing.findByIdAndDelete(id);
    console.log(delList);
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listing");
}));

module.exports=router;