const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,      // <--- CHANGED TO 465
  service: "Gmail",
  secure: true,
  connectionTimeout: 60000,
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
