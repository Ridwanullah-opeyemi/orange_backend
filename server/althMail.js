const transporter = require("./transproter.js")

const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL 

const sendMail = async (token, name, email) => {
    const verificationUrl = `${FRONTEND_BASE_URL}/verify/${token}`;

    const mailOption = {
        from: '"Orange Delivery 🍊" <no-reply@orange.com>',
        to: email,
        subject: 'Welcome to Orange Delivery! Verify Your Email Address',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                <h2 style="color: #FF9900;">Welcome to Orange Delivery, ${name}!</h2>
                <p>Thank you for signing up. Please click the link below to confirm your email address and activate your account:</p>
                <p style="margin: 25px 0;">
                    <a href="${verificationUrl}" style="background-color: #FF9900; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Verify My Email
                    </a>
                </p>
                <p>If you did not sign up for Orange Delivery, you can safely ignore this email.</p>
                <p style="margin-top: 30px; font-size: 12px; color: #777;">Thank you,<br>The Orange Team</p>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOption);
        console.log(`Verification email sent to ${email}. Message ID: ${info.messageId}`);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error(`Failed to send verification email to ${email}:`, error);
        throw new Error(`Email sending failed: ${error.message}`);
    }
};

module.exports = sendMail
