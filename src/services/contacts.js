import { ContactCollection } from '../db/models/contactModel.js';

export const getAllContactsService = async () => {
  return await ContactCollection.find();
};

export const getContactByIdService = async (contactId) => {
  return await ContactCollection.findById(contactId);
};

export const createContactService = async (contactData) => {
  return await ContactCollection.create(contactData);
};

export const updateContactService = async (contactId, updatedData) => {
  return await ContactCollection.findByIdAndUpdate(contactId, updatedData, { new: true });
};

export const deleteContactService = async (contactId) => {
  return await ContactCollection.findByIdAndDelete(contactId);
};
