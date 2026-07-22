const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const defimg="https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

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
        type: String,
        default: defimg,
        set: (v) =>
            v === ""
                ? defimg
                : v,
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
});

const listing=mongoose.model("listing",dbSchema);
module.exports = listing;