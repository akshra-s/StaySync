module.exports.isloggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error","Kindly Login to procceed further !");
        return res.redirect("/login");
    }
    next();
};