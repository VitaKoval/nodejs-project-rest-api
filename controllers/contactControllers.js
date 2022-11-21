const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../services/contactsService");
const {
  schemaAddContacts,
  schemaUpdateContacts,
  schemaUpdateStatus,
} = require("../models/validateSchema");

const list = async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await getContactById(id);

    if (!result) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { error } = schemaAddContacts.validate(req.body);

    if (error) {
      return res.status(400).json({ message: "missing required name field" });
    }

    const result = await addContact(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const delById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await removeContact(id);

    if (!result) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    console.log(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { error } = schemaUpdateContacts.validate(req.body);

    if (error) {
      return res.status(400).json({ message: "missing fields" });
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
};

const updateStatus = async (req, res, next) => {
  try {
    const { error } = schemaUpdateStatus.validate(req.body);

    if (error) {
      return res.status(400).json({ message: "missing field favorite" });
    }

    const { id } = req.params;
    const result = await updateStatusContact(id, req.body);

    if (!result) {
      res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  list,
  getById,
  create,
  delById,
  updateById,
  updateStatus,
};
