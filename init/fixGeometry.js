require("dotenv").config();

const mongoose = require("mongoose");
const listing = require("../models/listing");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/StaySync");

    const listings = await listing.find({ geometry: { $exists: false } });

    for (let list of listings) {
        try {
            let address = `${list.location}, ${list.country}`;

            let response = await fetch(
                `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&limit=1&apiKey=${process.env.GEOAPIFY_API_KEY}`
            );

            let data = await response.json();

            if (data.features && data.features.length > 0) {
                list.geometry = data.features[0].geometry;
                await list.save();
                console.log("Fixed:", list.title);
            } else {
                console.log("Could not find:", list.title);
            }
        } catch (err) {
            console.log("Error:", list.title, err.message);
        }
    }

    await mongoose.disconnect();
}

main().catch(console.log);