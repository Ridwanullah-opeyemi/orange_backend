const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", 
    port: 465, 
    secure: true,
    // Add timeout options (e.g., 30 seconds)
    timeout: 30000,
    // Increase connection timeout
    logger: true,
  auth: {
    user: process.env.appEmail,
    pass: process.env.appPassword,
  },
});


transporter.verify((error, success) => {
  if (error) {
    console.error("Error verifying transporter:", error);
  } else {
    console.log("✅ Server is ready to send mail via Gmail.");
  }
});

module.exports = transporter;
