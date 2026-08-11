const mongoose=require("mongoose");
const initData=require("./data.js");
const listing=require("../models/listing.js");

main()
    .then(()=>{
        console.log("connected to db");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/StaySync");
};

const initdb = async()=>{
    await listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"6a795568561d43fd0aacbf2f"}));
    await listing.insertMany(initData.data);
    console.log("data initialized");
};
initdb();