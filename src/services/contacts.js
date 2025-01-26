import Contact from '../models/contactModel.js';


export const findAllContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    throw new Error('Error retrieving contacts: ' + error.message);
  }
};


export const findContactById = async (id) => {
  try {
    const contact = await Contact.findById(id);
    return contact;
  } catch (error) {
    throw new Error('Error retrieving contact: ' + error.message);
  }
};
