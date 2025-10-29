const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    name: {
        type: String, // Corrected: lowercase 'type'
        required: true
    },
    description: {
        type: String, // Corrected: lowercase 'type'
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: { type: String, required: true }, 
    cloudinary_id: { type: String },
    category: {
        type: String, // Corrected: lowercase 'type'
        required: true
    }
});

// This standard line ensures that the model is only compiled once,
// preventing the 'OverwriteModelError' in development/hot-reloading environments.
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

module.exports = foodModel;