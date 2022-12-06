const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers/HttpError");
const { ctrlWrapper } = require("../helpers/ctrlWrapper");
const { User } = require("../models/user");

require("dotenv").config();

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    throw HttpError(401, "Not authorized");
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    throw HttpError(401, "Not authorized");
  }
};

const ctrlAuthenticate = ctrlWrapper(authenticate);

module.exports = {
  ctrlAuthenticate,
};
