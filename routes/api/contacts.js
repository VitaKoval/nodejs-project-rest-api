const express = require("express");
const { ctrlWrapper } = require("../../helpers/ctrlWrapper");
const { ctrlAuthenticate } = require("../../middlewares/authenticate");
const { validateBody } = require("../../middlewares/validateBody");
const {
  list,
  getById,
  create,
  delById,
  updateById,
  updateStatus,
} = require("../../controllers/contactControllers");
const {
  schemaUpdateContacts,
  schemaUpdateStatus,
  schemaAddContacts,
} = require("../../models/validateSchema");

const router = express.Router();

router.get("/", ctrlAuthenticate, ctrlWrapper(list));
router.get("/:id", ctrlAuthenticate, ctrlWrapper(getById));
router.post("/", ctrlAuthenticate, validateBody(schemaAddContacts), ctrlWrapper(create));
router.delete("/:id", ctrlAuthenticate, ctrlWrapper(delById));
router.put("/:id", ctrlAuthenticate, validateBody(schemaUpdateContacts), ctrlWrapper(updateById));
router.patch("/:id/favorite", ctrlAuthenticate, validateBody(schemaUpdateStatus), ctrlWrapper(updateStatus));

module.exports = router;
