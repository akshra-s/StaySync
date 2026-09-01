require("dotenv").config();

const mongoose=require("mongoose");
const initData=require("./data.js");
const listing=require("../models/listing.js");

async function initdb(){
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/StaySync");
        console.log("connected to db");

        const count=await listing.countDocuments();

        if(count>0){
            console.log(`Database already has ${count} listings. Nothing was changed.`);
            await mongoose.disconnect();
            return;
        }

        const data=initData.data.map(obj=>({
            ...obj,
            owner:"6a795568561d43fd0aacbf2f"
        }));

        await listing.insertMany(data);

        console.log("data initialized");
        await mongoose.disconnect();
    }catch(err){
        console.log(err);
        await mongoose.disconnect();
    }
}

initdb();