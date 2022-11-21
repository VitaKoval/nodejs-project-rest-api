const { Contacts } = require("../models/contactsModel");

const listContacts = async () => {
  return Contacts.find({});
};

const getContactById = async (contactId) => {
  return Contacts.findOne({ _id: contactId });
};

const addContact = async ({ name, email, phone }) => {
  return Contacts.create({ name, email, phone });
};

const removeContact = async (contactId) => {
  return Contacts.findByIdAndRemove({ _id: contactId });
};

const updateContact = async (contactId, body) => {
  return Contacts.findByIdAndUpdate({ _id: contactId }, body, { new: true });
};

const updateStatusContact = async (contactId, body) => {
  return Contacts.findByIdAndUpdate({_id: contactId}, body, {new: true})
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}; 
