const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    },
    verificationToken:{
        type:String
    },
    verificationExp: { 
        type: String
    },
    passwordResetToken: {
        type: String
    }, 
    passwordResetExpires: {
        type: String
    },
    cartData: {
        type: Object,
        default: {}
    }, 
},{minimize:false})

const userModel = mongoose.models.user || mongoose.model("user", userSchema)
module.exports = userModel;