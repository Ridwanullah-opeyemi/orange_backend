const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  service: "gmail", 
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
