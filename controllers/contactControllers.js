const { Contacts } = require("../models/contactsModel");

const list = async (req, res) => {
  const { _id: owner } = req.user;
  const { page, limit, favorite } = req.query;

  const skip = (page - 1) * limit;

  const result = await Contacts.find(
    { owner, favorite },
    "-createdAt -updatedAt -__v",
    { skip, limit }
  ).populate("owner", "email subscription");

  res.json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const result = await (
    await Contacts.findOne({ _id: id }, "-__v")
  ).populate("owner", "email subscription");

  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.json(result);
};

const create = async (req, res) => {
  // в міделварі авторизації я записала обʼєкт юзера і тепер у кожному роуті де є міделвара авторизації нам доступний обʼєкт юзера, який робить запит (проходить авторизацію)
  const { _id: owner } = req.user;

  const result = await Contacts.create({ ...req.body, owner });

  res.status(201).json(result);
};

const delById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contacts.findByIdAndRemove({ _id: id });

  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contacts.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (!result) {
    res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(result);
};

const updateStatus = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contacts.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (!result) {
    res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(result);
};

module.exports = {
  list,
  getById,
  create,
  delById,
  updateById,
  updateStatus,
};
