const fs = require("node:fs/promises");

const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");

console.log(__dirname);

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactsById = contacts.find((contact) => contact.id === contactId);
    return contactsById || null;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
    const contacts = JSON.parse(data);
    const removedContact = contacts.find((contact) => contact.id === contactId);
    if (!removedContact) return null;

    return removedContact;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();

    const newContact = {
      id: crypto.randomUUID(),
      name,
      email,
      phone,
    };

    const updateContacts = contacts.push(newContact);
    // const updateContacts = [...contacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(updateContacts), {
      encoding: "utf-8",
    });

    return newContact;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
