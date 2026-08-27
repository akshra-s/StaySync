const express=require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync=require("../utility/wrapAsync.js");
const ExError=require("../utility/ExError.js");
const listing=require("../models/listing.js");
const review=require("../models/review.js");
const {validateReview, isloggedin,isreviewAuthor}=require("../middleware.js");
const reviewCtrl=require("../controllers/review.js");

//routes..
// post review..
router.post("/",isloggedin,validateReview,wrapAsync(reviewCtrl.postreview));
//delete review..
router.delete("/:reviewid",isloggedin,isreviewAuthor,wrapAsync(reviewCtrl.delReview));

module.exports=router;