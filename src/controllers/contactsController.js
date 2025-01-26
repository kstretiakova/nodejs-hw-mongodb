import { findAllContacts, findContactById } from '../services/contacts.js';


export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await findAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};


export const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await findContactById(contactId);

    if (!contact) {
      return res.status(404).json({
        status: 404,
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully found contact!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};
