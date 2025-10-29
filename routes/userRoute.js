const express =require("express")
const { loginUser, registerUser, verifyEmail } = require("../controllers/userController.js")
const verifyAccount = require("../controllers/accountVerify.js")
const { forgotPassword, PasswordResetToken } = require("../controllers/passreset.js")

const userRouter = express.Router()

userRouter.post("/register", registerUser) 
userRouter.post("/login", loginUser)
userRouter.route("/verify-email").get(verifyEmail); 
userRouter.get("/verify/:token", verifyAccount)
userRouter.post("/passwordreset/:token", PasswordResetToken)
userRouter.post("/forgotpassword", forgotPassword)

module.exports = userRouter;