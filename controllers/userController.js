const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const userModel = require("../model/userModel")
const validator = require("validator")
const sendMail = require("../server/althMail.js")
const generateRandomString = require("../util/generateRandomString.js")

// login user 
const loginUser = async (req, res) => {
    const { email, password } = req.body; 
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({
                success: false,
                message: "user does not exists"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({
                success: false,
                message: "invaid credentials"
            })
        }

        const token = createToken(user._id);
        res.json({
            success: true,
            message: `login successful`,
            token
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Error"
        })
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

//register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({
                success: false,
                message: "user already exists"
            })
        }

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "please enter a valid email"
            })
        }

        if (password.length < 8) {
            return res.json({
                success: false,
                message: "please enter a strong password"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashingpassword = await bcrypt.hash(password, salt);

        const verificationToken = generateRandomString(10)
        const verificationExp = Date.now() + 30 * 60 * 1000;

        const user = await userModel.create({ ...req.body, password: hashingpassword, verificationToken, verificationExp })
        const token = createToken(user._id);
        sendMail(verificationToken, name, email)
        res.json({
            success: true,
            message: `${req.body.name}, your account as been create successful`,
            token
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error
        })
    }
}

const verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({
                status: "error",
                message: "Verification token is missing",
            });
        }

        const user = await userModel.findOne({ verificationToken: token });

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "Invalid or expired verification token",
            });
        }

        if (Date.now() > parseInt(user.verificationExp)) {
            return res.status(400).json({
                status: "error",
                message: "Verification token has expired",
            });
        }

        const updateuser = await userModel.findByIdAndUpdate(user._id, { verificationExp: null, verificationToken: null, isVerified: true })

        return res.status(200).json({
            status: "success",
            message: "Email verified successfully!",
            updateuser
        });

    } catch (error) {
        console.error(error); 
        return res.status(500).json({
            status: "error",
            message: "Server error while verifying email",
        });
    }
};
 
module.exports = {
    loginUser,
    registerUser,
    verifyEmail
}
 