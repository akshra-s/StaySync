const express=require("express");
const router = express.Router();
const wrapAsync = require("../utility/wrapAsync.js");
const passport =require("passport");
const { saveRedirectUrl,isloggedin } = require("../middleware.js");
const UserCtrl=require("../controllers/user.js");

//login..
router
    .route("/signup")
    .get(UserCtrl.userForm)
    .post(UserCtrl.signinUser
);

//login..
router
    .route("/login")
    .get(UserCtrl.loginForm)
    .post(saveRedirectUrl,
        passport.authenticate("local",
        {failureRedirect:"/login",failureFlash:true,}),UserCtrl.loginUser
);

//logout..
router.get("/logout",UserCtrl.Logout);

//wishlist..
router.get("/wishlist", isloggedin, wrapAsync(UserCtrl.getWishlist));
router.post("/listing/:id/wishlist", isloggedin, wrapAsync(UserCtrl.postWishlist));
router.post("/listing/:id/wishlist/remove", isloggedin, wrapAsync(UserCtrl.delWishlist));
module.exports = router;