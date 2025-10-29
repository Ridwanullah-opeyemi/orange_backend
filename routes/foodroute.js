const express =  require('express');
const multer =  require('multer');
const { CloudinaryStorage } =  require("multer-storage-cloudinary");
const cloudinary =  require("../config/cloudinary.js"); 

const { addFood, listFood, removeFood } = require('../controllers/foodController.js'); 

const foodrouter = express.Router();

const newStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "star_images", 
        allowedFormats: ["jpeg", "png", "jpg"],
        transformation: [{ width: 500, height: 500, crop: "limit" }],
    }
});
 
const uploads = multer({ storage: newStorage });

foodrouter.post("/add", uploads.single("image"), addFood); 
foodrouter.get("/list", listFood)
foodrouter.post("/remove", removeFood)
 
 
module.exports = foodrouter;