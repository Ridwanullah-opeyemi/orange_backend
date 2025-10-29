const cloudinary = require("cloudinary").v2;
const env = require("dotenv")
env.config()

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_secret: process.env.cloud_api_secret, 
    api_key: process.env.cloud_api_key
});

module.exports = cloudinary;