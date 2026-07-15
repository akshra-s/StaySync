const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const dbSchema= new Schema({
    title: {
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image: {
        type:String,
        default:"https://www.magnific.com/free-photo/hand-presenting-model-house-home-loan-campaign_15667726.htm#fromView=keyword&page=1&position=6&uuid=a6bbf401-2468-4578-95dc-54fac6b267fa&query=House",
        set:(v) => v===""? "https://www.magnific.com/free-photo/hand-presenting-model-house-home-loan-campaign_15667726.htm#fromView=keyword&page=1&position=6&uuid=a6bbf401-2468-4578-95dc-54fac6b267fa&query=House":v,
    },
    price:{
        type:Number,
        required:true,
    },
    location : {
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    }
});

const listing=mongoose.model("listing",dbSchema);
module.exports = listing;