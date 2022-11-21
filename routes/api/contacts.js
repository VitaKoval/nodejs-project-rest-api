const express = require("express");
const {
  list,
  getById,
  create,
  delById,
  updateById,
  updateStatus,
} = require("../../controllers/contactControllers");

const router = express.Router();

router.get("/", list);

router.get("/:id", getById);

router.post("/", create);

router.delete("/:id", delById);

router.put("/:id", updateById);

router.patch("/:id/favorite", updateStatus)

module.exports = router;
