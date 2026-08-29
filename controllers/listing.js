const listing=require("../models/listing");



module.exports.index=async(req,res)=>{
    const allList=await listing.find({});
    res.render("listing/index.ejs",{allList});
};
module.exports.newlistform=(req,res)=>{
    res.render("listing/new.ejs");
}
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
}
module.exports.postlist=async(req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;

    const newlist = new listing(req.body.listing);
    newlist.owner=req.user._id;
    newlist.image={url,filename};
    await newlist.save();
    req.flash("success", "Listing created successfully!");
    res.redirect("/listing");
}
module.exports.editlist=async(req,res)=>{
    let {id} = req.params;
    const list = await listing.findById(id);
    if(!list){
        req.flash("error", "Listing Does Not Exist !");
        return res.redirect("/listing");
    }
    res.render("listing/edit.ejs",{list});
}
module.exports.updatelist=async(req,res)=>{
    let {id} = req.params;
    await listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listing/${id}`);
}
module.exports.delList=async(req,res)=>{
    let {id} = req.params;
    let delList=await listing.findByIdAndDelete(id);
    console.log(delList);
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listing");
}