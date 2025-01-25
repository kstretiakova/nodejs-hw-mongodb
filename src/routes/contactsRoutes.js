import express from 'express';
import {
  getContacts,
  getContactById,
  addContact,
} from '../controllers/contactsController.js';

const router = express.Router();

// отримати всі контакти
router.get('/contacts', getContacts);

// отримати контакт по айді
router.get('/contacts/:id', getContactById);

router.post('/', addContact);

export default router;
