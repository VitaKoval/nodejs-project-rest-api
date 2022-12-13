const express = require("express");
const { ctrlWrapper } = require("../../helpers/ctrlWrapper");
const { validateBody } = require("../../middlewares/validateBody");
const {
  signupSchema,
  loginSchema,
  subscriptionSchema,
} = require("../../models/user");
const {
  signup,
  login,
  avatar,
  current,
  logout,
  updateSubscription,
} = require("../../controllers/authControllers");
const { ctrlAuthenticate } = require("../../middlewares/authenticate");
const { upload } = require("../../middlewares/upload");

const router = express.Router();

router.post("/signup", validateBody(signupSchema), ctrlWrapper(signup));
router.post("/login", validateBody(loginSchema), ctrlWrapper(login));
router.patch("/avatars", ctrlAuthenticate, upload.single("avatar"), ctrlWrapper(avatar));
router.get("/current", ctrlAuthenticate, ctrlWrapper(current));
router.get("/logout", ctrlAuthenticate, ctrlWrapper(logout));
router.patch("/", ctrlAuthenticate, validateBody(subscriptionSchema), ctrlWrapper(updateSubscription));

module.exports = router;
