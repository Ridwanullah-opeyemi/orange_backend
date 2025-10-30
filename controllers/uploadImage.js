const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const cloudinary = require("./cloudinary")



const newStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "star_images",
        allowFormats: ["jpeg", "png", "jpg"],
        transformation: [{ width: 500, height: 500, crop: "limit" }],
      }
})

const uploadImage = multer({ storage: newStorage });
module.exports = uploadImage;