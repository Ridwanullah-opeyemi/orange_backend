const foodModel = require("../model/foodmodel.js")
const cloudinary = require("../config/cloudinary.js")


// add food item
const addFood = async (req,res) => {
    
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No image provided"
            });
        }

        const imageUrl = req.file.path; 
        const imageId = req.file.filename; 

        const food = await foodModel.create({
            ...req.body,
            image: imageUrl,
            cloudinary_id: imageId 
        });

        res.status(200).json({
            success: true,
            message: "food added successfully",
            food
        }); 

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error uploading items",
        })
    }
}


// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find().sort({ createdAt: -1 }); 
        res.status(200).json({
            success: true, 
            data: foods
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error feching food",
        })
    }
};

//remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id); 
        
        if (!food) {
            return res.json({
                success: false,
                message: "Food item not found"
            });
        }
        
        if (food.cloudinary_id) {
            await cloudinary.uploader.destroy(food.cloudinary_id, (err, result) => {
                if (err) {
                    console.error("Error deleting image from Cloudinary:", err);
                } else {
                    console.log("Image deleted from Cloudinary:", result);
                }
            });
        }
        

        await foodModel.findByIdAndDelete(req.body.id);

        res.status(200).json({
            success: true, 
            message: "Food item removed successfully"
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error removing item",
        })
    }
};


module.exports = {
    addFood,
    listFood,
    removeFood
}