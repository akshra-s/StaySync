const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    cloud_key:process.env.CLOUD_API_KEY,
    cloud_secret:process.env.CLOUD_SECRET
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'StaySync_proj',
    alllowedFormats:["png","jpeg","jpg"],
  },
});

module.export ={
    cloudinary,
    storage
};