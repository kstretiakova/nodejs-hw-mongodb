// src/services/contacts.js
import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('src', 'db', 'contacts.json');

export const getAllContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
};

export const getContactById = async (contactId) => {
  const contacts = await getAllContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
};

export const createContact = async (contactData) => {
  const contacts = await getAllContacts();

  const newContact = {
    id: nanoid(),
    ...contactData,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};
