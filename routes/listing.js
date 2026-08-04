const express=require("express");
const router=express.Router();
const wrapAsync=require("../utility/wrapAsync.js");
const {listingSchema}=require("../schema.js");
const ExError=require("../utility/ExError.js");
const listing=require("../models/listing.js");

//VALIDATIONS..
const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errmsg =error.details.map((ele)=>ele.message).join(",");
        throw new ExError(400,errmsg);
    }else{
        next();
    }
};


//new route..(renders a form I)..
router.get("/new",(req,res)=>{
    res.render("listing/new.ejs");
});
router.get("/",wrapAsync(async(req,res)=>{
    const allList=await listing.find({});
    res.render("listing/index.ejs",{allList});
}));
//show route..
router.get("/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const list = await listing.findById(id).populate("reviews");
    if(!list){
        req.flash("error", "Listing Does Not Exist !");
        return res.redirect("/listing");
    }
    res.render("listing/show.ejs",{list});
}));

//create route..(CREATE the NEW listing II)..
router.post("/", validateListing,
    wrapAsync(async(req,res)=>{
    const newlist = new listing(req.body.listing);
    await newlist.save();
    req.flash("success", "Listing created successfully!");
    res.redirect("/listing");
}));

//edit route.. (renders a form I)..
router.get("/:id/edit",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const list = await listing.findById(id);
    if(!list){
        req.flash("error", "Listing Does Not Exist !");
        return res.redirect("/listing");
    }
    res.render("listing/edit.ejs",{list});
}));

//update route.. (UPDATE the EDITED listing II)
router.put("/:id",validateListing,
    wrapAsync(async(req,res)=>{
    let {id} = req.params;
    await listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listing/${id}`);
}));

//DELETE ROUTE
router.delete("/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let delList=await listing.findByIdAndDelete(id);
    console.log(delList);
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listing");
}));

module.exports=router;