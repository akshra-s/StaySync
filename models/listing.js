const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const review = require("./review");
const defimg="https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const listingSchema= new Schema({
    title: {
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image: {
        url:String,
        filename:String,
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
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"review",
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"user",
    },
    category: {
        type: String,
        enum: [
            "Trending",
            "Rooms",
            "Iconic Cities",
            "Beach",
            "Lakefront",
            "Mountains",
            "Farms",
            "Camping",
            "Pools",
            "Arctic"
        ],
        required: true,
    },
    geometry: {  //GeoJSON format.........
    type: {
        type: String,
        enum: ["Point"],
        // required: true,
    },
    coordinates: {
        type: [Number],
        // required: true,
    },
    },

});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await review.deleteMany({_id:{$in: listing.reviews}});
    }
});

const listing=mongoose.model("listing",listingSchema);
module.exports = listing;