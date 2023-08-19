const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");


const contactsPath = path.join(__dirname, "./db/contacts.json");

async function read() {
  const data = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(data);
}

function write(data) {
  return fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}


async function getAllContacts() {
  const data = await read();
  return data;
}

async function getContactById(contactId) {
  const contactList = await read();
  const findedContact = contactList.find((contact) => contact.id === contactId);
  if (!findedContact) return null;
  return findedContact;
}

async function removeContact(contactId) {
  const contactList = await read();
  const index = contactList.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  const deletedContact = contactList.splice(index, 1);
  await write(contactList);
  return deletedContact;
}

async function addContact({ name, email, phone }) {
  const contactList = await read();
  const newContact = { name, email, phone, id: crypto.randomUUID() };
  contactList.push(newContact);
  await write(contactList);
  return newContact;
}

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
};
