import { ContactCollection } from '../models/contactModel.js';
import createError from 'http-errors';

export const getContacts = async (req, res) => {
  const contacts = await ContactCollection.find({ userId: req.user.id });
  res.status(200).json({ status: 200, data: contacts });
};

export const createContact = async (req, res) => {
  const { name, email, phone } = req.body;

  const newContact = await ContactCollection.create({
    name,
    email,
    phone,
    userId: req.user.id,
  });

  res.status(201).json({
    status: 201,
    message: 'Contact created successfully!',
    data: newContact,
  });
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  const contact = await ContactCollection.findOneAndUpdate(
    { _id: id, userId: req.user.id },
    { name, email, phone },
    { new: true }
  );

  if (!contact) throw createError(404, 'Contact not found or unauthorized');

  res.status(200).json({ status: 200, message: 'Contact updated!', data: contact });
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;

  const contact = await ContactCollection.findOneAndDelete({ _id: id, userId: req.user.id });

  if (!contact) throw createError(404, 'Contact not found or unauthorized');

  res.status(204).send();
};
