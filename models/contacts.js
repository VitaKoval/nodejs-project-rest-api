const fs = require("fs/promises");
const path = require("path");
const objectid = require("objectid");

const contactsPath = path.join("./models/contacts.json");

const listContacts = async () => {
  const result = await fs.readFile(contactsPath, "utf8");

  return JSON.parse(result);
};

const getContactById = async (contactId) => {
  const contactsAll = await listContacts();
  const result = await contactsAll.find((contact) => contact.id === contactId);

  return result;
};

const addContact = async ({ name, email, phone }) => {
  const contactsAll = await listContacts();

  const contactNew = {
    id: objectid(),
    name,
    email,
    phone,
  };

  const contactList = JSON.stringify([contactNew, ...contactsAll], null, 2);
  await fs.writeFile(contactsPath, contactList);

  return contactNew;
};

const removeContact = async (contactId) => {
  const contactsAll = await listContacts();
  const index = contactsAll.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const result = contactsAll.splice(index, 1);
  // у JSON.stringify є параметри 1.що саме перетворити в JSON. 2. на що робимо заміну(у нас null), 3. форматування 2 пробіли
  await fs.writeFile(contactsPath, JSON.stringify(contactsAll, null, 2));
  return result;
};

const updateContact = async (contactId, body) => {
  const contactsAll = await listContacts();
  const index = contactsAll.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const { id, name, email, phone } = contactsAll[index];
  contactsAll[index] = { id, name, email, phone, ...body };

  await fs.writeFile(contactsPath, JSON.stringify(contactsAll, null, 2));

  return contactsAll[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
