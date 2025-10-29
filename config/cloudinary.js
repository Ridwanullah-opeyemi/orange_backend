import { v2 as cloudinary } from "cloudinary"; 
import env from "dotenv"
env.config()

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_secret: process.env.cloud_api_secret, 
    api_key: process.env.cloud_api_key
});

export default cloudinary;