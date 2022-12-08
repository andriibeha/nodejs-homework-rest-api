const nodemailer = require("nodemailer");

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465, // available 25, 2255(not must be secure)
  secure: true,
  auth: {
    user: "sad-rabbit@meta.ua",
    pass: META_PASSWORD,
  },
};

const sendEmailVerify = (mail) => {
  const transport = nodemailer.createTransport(nodemailerConfig);
  transport
    .sendMail(mail)
    .then(() => console.log("email send success"))
    .catch((error) => console.log("error:", error.message));
};

module.exports = sendEmailVerify;
