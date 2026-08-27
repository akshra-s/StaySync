const express=require("express");
const router=express.Router();
const wrapAsync=require("../utility/wrapAsync.js");
const listing=require("../models/listing.js");
const {isloggedin,isOwner,validateListing,validateReview}=require("../middleware.js");
const listingctrl=require("../controllers/listing.js");

//new route..(renders a form I)..
router.get("/new",isloggedin,listingctrl.newlistform);
//index route
router.get("/",wrapAsync(listingctrl.index));
//show route..
router.get("/:id",wrapAsync(listingctrl.showlist));

//create route..(CREATE the NEW listing II)..
router.post("/",isloggedin, validateListing,
    wrapAsync(listingctrl.postlist));

//edit route.. (renders a form I)..
router.get("/:id/edit",isloggedin,isOwner,wrapAsync(listingctrl.editlist));

//update route.. (UPDATE the EDITED listing II)
router.put("/:id",isloggedin,isOwner,validateListing,
    wrapAsync(listingctrl.updatelist));

//delete route..
router.delete("/:id",isloggedin,isOwner,wrapAsync(listingctrl.delList));

module.exports=router;