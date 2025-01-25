import express from 'express';
import {
  getContacts,
  getContactById,
  addContact,
} from '../controllers/contactsController.js';

const router = express.Router();

// отримати всі контакти
router.get('/', getContacts);

// отримати контакт по айді
router.get('/:id', getContactById);

router.post('/', addContact);

export default router;
