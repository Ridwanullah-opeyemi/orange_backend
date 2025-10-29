
const bcrypt = require("bcryptjs")
const userModel = require("../model/userModel.js")
const sendResetMail = require("../server/resetpasswrd.js")
const crypto = require("crypto") 

// Forgot Password Controller
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  let user;

  try {
    user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: true,
        message:
          "If an account with that email exists, a password reset link has been sent.",
      });
    }

    // Create token and hashed token for DB
    const resetToken = crypto.randomBytes(32).toString("hex");
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Save hashed token and expiration
    user.passwordResetToken = passwordResetToken;
    user.passwordResetExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save({ validateBeforeSave: false });

    // Send email
    await sendResetMail(resetToken, user.name || user.email, user.email);

    return res.json({
      success: true,
      message: "Password reset link sent successfully to your email.",
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);

    // Cleanup token if sending fails
    if (user) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
    }

    return res.status(500).json({
      success: false,
      message: "Error sending reset email.",
    });
  }
};

// Reset Password Controller
const PasswordResetToken = async (req, res) => {
  const tokenFromUrl = req.params.token;
  const { newpassword } = req.body;

  try {
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(tokenFromUrl)
      .digest("hex");

    const user = await userModel.findOne({
      passwordResetToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid or expired password reset link. Please request a new one.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newpassword, salt);

    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return res.json({
      success: true,
      message: "Password reset successful. You can now log in.",
    });
  } catch (error) {
    console.error("Password Reset Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error processing password reset.",
    });
  }
};

module.exports = { forgotPassword, PasswordResetToken };
