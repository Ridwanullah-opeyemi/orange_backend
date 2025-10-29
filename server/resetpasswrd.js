const transporter = require("./transproter.js")

const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;

const sendResetMail = async (token, name, email) => {
    const resetUrl = `${FRONTEND_BASE_URL}/reset-password/${token}`;

    const mailOption = {
        from: '"Orange Delivery 🍊" <no-reply@orange.com>',
        to: email,
        subject: 'Orange Delivery: Password Reset Request',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                <h2 style="color: #FF9900;">Password Reset Request</h2>
                <p>Hello ${name},</p>
                <p>We received a request to reset the password for your account. Please click the button below to set a new password:</p>
                
                <p style="margin: 25px 0;">
                    <a href="${resetUrl}" style="background-color: #FF9900; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Reset My Password
                    </a>
                </p>
                

                <p>This link will expire in **60 minutes** for security reasons.</p>
                <p>If you did not request a password reset, please ignore this email. Your current password will remain unchanged.</p>
                
                <p style="margin-top: 30px; font-size: 12px; color: #777;">Thank you,<br>The Orange Team</p>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOption);
        console.log(`Password Reset email sent to ${email}. Message ID: ${info.messageId}`);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error(`Failed to send password reset email to ${email}:`, error);
        throw new Error(`Email sending failed: ${error.message}`); 
    }
};

module.exports = sendResetMail;