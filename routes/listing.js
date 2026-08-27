const express=require("express");
const router=express.Router();
const wrapAsync=require("../utility/wrapAsync.js");
const listing=require("../models/listing.js");
const {isloggedin,isOwner,validateListing,validateReview}=require("../middleware.js");
const listingctrl=require("../controllers/listing.js");

//new route..(renders a form)..
router.get("/new",isloggedin,listingctrl.newlistform);

router
    .route("/")
    .get(wrapAsync(listingctrl.index)) //index route
    .post(isloggedin, validateListing,//create route
        wrapAsync(listingctrl.postlist)
);

router
    .route("/:id")
    .get(wrapAsync(listingctrl.showlist))//show route
    .put(isloggedin,isOwner,validateListing,//update route
        wrapAsync(listingctrl.updatelist))
    .delete(isloggedin,isOwner,//delete route
        wrapAsync(listingctrl.delList)
);

//edit route.. (renders a form I)..
router.get("/:id/edit",isloggedin,isOwner,wrapAsync(listingctrl.editlist));

module.exports=router;