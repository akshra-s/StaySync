const express=require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync=require("../utility/wrapAsync.js");
const {reviewSchema}=require("../schema.js");
const {listingSchema}=require("../schema.js");
const ExError=require("../utility/ExError.js");
const listing=require("../models/listing.js");
const review=require("../models/review.js");

//validations..
const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errmsg =error.details.map((ele)=>ele.message).join(",");
        throw new ExError(400,errmsg);
    }else{
        next();
    }
};

//routes..
// post review..
router.post("/",validateReview,wrapAsync(async (req,res)=>{
    let list=await listing.findById(req.params.id);
    let newReview= new review(req.body.review);
    list.reviews.push(newReview);
    await newReview.save();
    await list.save();
    res.redirect(`/listing/${list._id}`);
}));
//delete review..
router.delete("/:reviewid",wrapAsync(async(req,res)=>{
    let {id,reviewid} = req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
    await review.findByIdAndDelete(reviewid);
    res.redirect(`/listing/${id}`);
}));

module.exports=router;