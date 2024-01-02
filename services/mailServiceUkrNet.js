const nodemailer = require("nodemailer");
require("dotenv").config();

const { UKRNET_MAIL_USER, UKRNET_SMTP_PASSWORD } = process.env;

// create email header and body
const defaultEmail = {
  to: UKRNET_MAIL_USER,
  subject: "Test reply email",
  from: UKRNET_MAIL_USER,
  html: `Test reply email`,
};

// create connection configuration
const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKRNET_MAIL_USER,
    pass: UKRNET_SMTP_PASSWORD,
  },
};

// create connection
const transporter = nodemailer.createTransport(nodemailerConfig);

// verify connection configuration
const verifyConnection = async (error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
};

// send email
const sendEmail = async (data) => {
  const email = { ...defaultEmail, ...data };

  try {
    const info = await transporter.sendMail(email);
    return true;
  } catch (error) {
    throw error;
  }
};

const mailService = {
  verifyConnection,
  sendEmail,
};

module.exports = mailService;
