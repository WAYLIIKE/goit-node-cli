import { promises as fs } from 'fs';
import path from 'path';

const contactsPath = path.join('db', 'contacts.json');

// Returns contacts array.
export async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
}

// Returns contact object. Returns null, if contact with contactsID was undefined.
export async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const isContact = contacts.find(item => item.id === contactId);
    return isContact || null;
  } catch (error) {
    console.log(error);
  }
}

// Returns deleted contact object. Returns null, if contact with contactsID was undefined.
export async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const deletedContact = await getContactById(contactId);

    if (deletedContact === null) return null;

    const newContacts = contacts.filter(item => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return deletedContact;
  } catch (error) {
    console.log(error);
  }
}

// Returns added contact object with ID.
export async function addContact(name, email, phone) {
  if (!name || !email || !phone) {
    return 'Enter all data';
  }

  try {
    const contacts = await listContacts();
    const newContact = {
      id: `${Date.now()}`,
      name,
      email,
      phone,
    };
    const newContactsArray = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContactsArray));
    return newContact;
  } catch (error) {
    console.log(error);
  }
}
