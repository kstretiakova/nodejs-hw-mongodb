import { ContactCollection } from '../db/models/contactModel.js';

export const getAllContacts = async ({ page, perPage, sortBy, sortOrder, type, isFavourite }) => {
  const filter = {};
  if (type) filter.contactType = type;
  if (typeof isFavourite !== 'undefined') filter.isFavourite = isFavourite === 'true';

  const totalItems = await ContactCollection.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / perPage);

  const contacts = await ContactCollection.find(filter)
    .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
    .skip((page - 1) * perPage)
    .limit(Number(perPage));

  return {
    data: contacts,
    page: Number(page),
    perPage: Number(perPage),
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
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
