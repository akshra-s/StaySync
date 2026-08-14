const express=require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync=require("../utility/wrapAsync.js");
const ExError=require("../utility/ExError.js");
const listing=require("../models/listing.js");
const review=require("../models/review.js");
const {validateReview, isloggedin,isreviewAuthor}=require("../middleware.js");

//routes..
// post review..
router.post("/",isloggedin,validateReview,wrapAsync(async (req,res)=>{
    let list=await listing.findById(req.params.id);
    let newReview= new review(req.body.review);
    newReview.author=req.user._id; 
    list.reviews.push(newReview);
    await newReview.save();
    await list.save();
    req.flash("success", "Review added successfully!");
    res.redirect(`/listing/${list._id}`);
}));
//delete review..
router.delete("/:reviewid",isloggedin,isreviewAuthor,wrapAsync(async(req,res)=>{
    let {id,reviewid} = req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
    await review.findByIdAndDelete(reviewid);
    req.flash("success", "Review deleted successfully!");
    res.redirect(`/listing/${id}`);
}));

module.exports=router;