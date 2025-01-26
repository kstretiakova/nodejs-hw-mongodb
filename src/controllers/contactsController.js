import fs from 'fs';
import path from 'path';
import Contact from '../models/contactModel.js';

const contactsFilePath = path.join(process.cwd(), 'contacts.json');


export const getContacts = async (req, res) => {
  try {
    const contactsData = fs.readFileSync(contactsFilePath, 'utf8');
    const contacts = JSON.parse(contactsData);

    res.status(200).json({
      status: 200,
      message: 'Contacts retrieved successfully',
      data: contacts,
    });
  } catch (error) {
    console.error('Error in getContacts:', error);
    res.status(500).json({
      status: 500,
      message: 'Error retrieving contacts',
      data: null,
    });
  }
};


export const getContactById = async (req, res) => {
  try {
    const contactId = req.params.id;

    const contactsData = fs.readFileSync(contactsFilePath, 'utf8');
    const contacts = JSON.parse(contactsData);

    const contact = contacts.find((contact) => contact.id === contactId);

    if (!contact) {
      return res.status(404).json({
        status: 404,
        message: 'Contact not found',
        data: null,
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Contact retrieved successfully',
      data: contact,
    });
  } catch (error) {
    console.error('Error in getContactById:', error);
    res.status(500).json({
      status: 500,
      message: 'Error retrieving contact',
      data: null,
    });
  }
};


export const addContact = async (req, res) => {
  try {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;

    if (!name || !phoneNumber || !contactType || isFavourite === undefined) {
      return res.status(400).json({
        status: 400,
        message: 'Missing required fields',
        data: null,
      });
    }

    const contactsData = fs.readFileSync(contactsFilePath, 'utf8');
    const contacts = JSON.parse(contactsData);

    const newContact = {
      id: String(contacts.length + 1), 
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    contacts.push(newContact);

    fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2));

    res.status(201).json({
      status: 201,
      message: 'Contact added successfully',
      data: newContact,
    });
  } catch (error) {
    console.error('Error in addContact:', error);
    res.status(500).json({
      status: 500,
      message: 'Error adding contact',
      data: null,
    });
  }
};
