require("dotenv").config();

const {BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => ({
    to: email,
    subject: "Verify",
    html: `<a target='_blank' href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify you email</a>`,
})

module.exports = {createVerifyEmail}