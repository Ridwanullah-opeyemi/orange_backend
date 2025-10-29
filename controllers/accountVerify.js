const userModel = require("../model/userModel")

const verifyAccount = async (req,res,next) => {
    try {
        const {token} = req.params
        
        const user = await userModel.findOne({verificationToken: token});

        if (!user) {
            res.status(400).json({ status: "error", message: "Invalid token" });
            return
        }
        if (user.verificationExp < Date.now()) {
            res.status(400).json({ status: "error", message: "Token expired" });
            return
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationExp = undefined;

        await user.save()

        res.status(200).json({ status: "success", message: "Account verified successfully", user });
    } catch (error) {
        next(error)
    }

}

module.exports = verifyAccount