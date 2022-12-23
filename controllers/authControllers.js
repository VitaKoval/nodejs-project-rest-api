const { User } = require("../models/user");
const { HttpError } = require("../helpers/HttpError");
const { sendEmail } = require("../helpers/sendEmail");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

const { SECRET_KEY, BASE_URL } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  // Перевірка чи є людина з таким email
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }
  // хешуємо пароль
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const verificationToken = uuidv4();

  const newUser = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify",
    html: `<a target='_blank' href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify you email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const verify = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.status(200).json({message: 'Verification successful'})
};

const resendVerify = async (req, res) => {

}


const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  // якщо НЕ веріфіковано - користувач не зможе залогінитись
  if (!user.verify) {
    throw HttpError(401, "Email not verify")
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  // зберігаємо токен в БД при логіні Юзера
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      avatarURL: user.avatarURL,
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const avatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempDir, originalname } = req.file;

  const avatarDir = path.join(__dirname, "../", "public", "avatars");
  const uploadName = `${_id}_${originalname}`;
  const uploadDir = path.join(avatarDir, uploadName);

  await fs.rename(tempDir, uploadDir);

  const avatarURL = path.join("avatars", uploadName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({ avatarURL });
};

const current = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204);
};

const updateSubscription = async (req, res) => {
  const { _id, email } = req.user;
  const { subscription } = req.body;

  await User.findByIdAndUpdate(_id, { subscription });
  res.status(200).json({ email, subscription });
};

module.exports = {
  signup,
  verify,
  resendVerify,
  login,
  avatar,
  current,
  logout,
  updateSubscription,
};
