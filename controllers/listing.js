const listing=require("../models/listing");
const User=require("../models/user");
module.exports.index = async (req, res) => {
    const { category } = req.query;
    let allList;
    if (category) {
        allList = await listing.find({ category });
    } else {
        allList = await listing.find({});
    }
    res.render("listing/index.ejs", { allList });
};
module.exports.newlistform=(req,res)=>{
    res.render("listing/new.ejs");
};
module.exports.showlist=async(req,res)=>{
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
};
module.exports.postlist = async (req, res, next) => {

    const newlist = new listing(req.body.listing);

    newlist.owner = req.user._id;

    if (req.file) {
        newlist.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    let address = req.body.listing.location + ", " + req.body.listing.country;

    let response = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&limit=1&apiKey=${process.env.GEOAPIFY_API_KEY}`
    );

    let data = await response.json();

    if (data.features && data.features.length > 0) {
        newlist.geometry = data.features[0].geometry;
    }

    await newlist.save();

    req.flash("success", "Listing created successfully!");
    res.redirect("/listing");
};
module.exports.editlist=async(req,res)=>{
    let {id} = req.params;
    const list = await listing.findById(id);
    if(!list){
        req.flash("error", "Listing Does Not Exist !");
        return res.redirect("/listing");
    }
    let orgImage=list.image.url;
    orgImage=orgImage.replace("/upload","/upload/w_250");
    res.render("listing/edit.ejs",{list,orgImage});
};
module.exports.updatelist=async(req,res)=>{
    let {id}=req.params;
    let list=await listing.findById(id);
    Object.assign(list,req.body.listing);
    let address=req.body.listing.location+", "+req.body.listing.country;
    let response=await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&limit=1&apiKey=${process.env.GEOAPIFY_API_KEY}`
    );
    let data=await response.json();
    if(data.features && data.features.length>0){
        list.geometry=data.features[0].geometry;
    }
    if(typeof req.file!=="undefined"){
        list.image={
            url:req.file.path,
            filename:req.file.filename
        };
    }
    await list.save();
    req.flash("success","Listing updated successfully!");
    res.redirect(`/listing/${id}`);
};
module.exports.delList=async(req,res)=>{
    let {id}=req.params;

    let delList=await listing.findByIdAndDelete(id);

    if(delList){
        await User.updateMany(
            {wishlist:id},
            {$pull:{wishlist:id}} //removes the deleted listing
        );
    }

    req.flash("success","Listing deleted successfully!");
    res.redirect("/listing");
};