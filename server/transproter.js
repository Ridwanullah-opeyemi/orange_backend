const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  service: "Gmail",
  secure: false,
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
