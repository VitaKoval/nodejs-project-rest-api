const express = require("express");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

const schemaAddContacts = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\+|\d[\s\d\-\(\)]*\d$/).required(),
});

const schemaUpdateContacts = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email(),
   phone: Joi.string().pattern(/^\+|\d[\s\d\-\(\)]*\d$/),
}).min(1);

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getContactById(id);

    if (!result) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.json(result);
  } catch (error) {
    // якщо прописую тут next(error), то якщо немає id випадає помилка статусу 500
    // що краще і як ловити тут помилки?
    // next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schemaAddContacts.validate(req.body);

    if (error) {
      return res.status(400).json({ message: "missing required name field" });
    }

    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    // фітча express - якщо в next прокинути помилку, то відбудеться переход в middleware з чотирьма параметрами (з err), у нас це помилка зі статусом 500
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await removeContact(id);

    if (!result) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    // див. 46 рядок
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = schemaUpdateContacts.validate(req.body);

    if (error) {
      res.status(400).json({ message: "missing fields" });
      return;
    }

    const { id } = req.params;
    const result = await updateContact(id, req.body);

    if (!result) {
      res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
