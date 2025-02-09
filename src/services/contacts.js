import { ContactCollection } from '../db/models/contactModel.js';

export const getAllContacts = async () => {
  return await ContactCollection.find();
};

export const getContactById = async (contactId) => {
  return await ContactCollection.findById(contactId);
};

export const createContact = async (contactData) => {
  return await ContactCollection.create(contactData);
};

export const updateContact = async (contactId, updateData) => {
  return await ContactCollection.findByIdAndUpdate(contactId, updateData, {
    new: true,
    runValidators: true,
  });
};

export const deleteContact = async (contactId) => {
  return await ContactCollection.findByIdAndDelete(contactId);
};
