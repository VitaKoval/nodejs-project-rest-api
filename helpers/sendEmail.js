const sgMail = require("@sendgrid/mail");

require("dotenv").config;

const { SENDGRID_API_KEY, EMAIL_FROM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY); // sendgrid готовий відправляти пошту

// sgMail
//   .send(email)
//   .then(() => console.log("Verification email sent"))
//   .catch((err) => console.log(err.message));
const sendEmail = async (data) => {
  // {to, subject, html} = data
  const email = { ...data, from: EMAIL_FROM }; //верифікований email зазвичай один для відправки повідомлень!
  await sgMail
    .send(email)
    .then(() => console.log("Verification email sent"))
    .catch((err) => console.log(err.message));
  return true;
};

module.exports = { sendEmail };
