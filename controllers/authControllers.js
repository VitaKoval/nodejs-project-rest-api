const { User, subscriptionSchema } = require("../models/user");
const { HttpError } = require("../helpers/HttpError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require('gravatar');
const path = require("path");
const fs = require("fs/promises");
const Jimp = require('jimp');

require("dotenv").config();

const { SECRET_KEY } = process.env;

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

  const newUser = await User.create({ email, password: hashPassword, avatarURL});

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

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

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  // зберігаємо токен в БД при логіні Юзера
  const result = await User.findByIdAndUpdate(user._id, { token });
  // console.log(token);

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
  // console.log(req.file);

  const avatarDir = path.join(__dirname, "../", "public", "avatars");
  const uploadName = `${_id}_${originalname}`;
  const uploadDir = path.join(avatarDir, uploadName);

  await fs.rename(tempDir, uploadDir);

  const avatarURL = path.join("avatars", uploadName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  // console.log("uploadDir", uploadDir);

  res.status(200).json({ avatarURL })
}


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
  login,
  avatar,
  current,
  logout,
  updateSubscription,
};
