import express from 'express';
import {
  getContacts,
  getContactById,
  addContact,
} from '../controllers/contactsController.js';

const router = express.Router();

// отримать всі конт
router.get('/', getContacts);

// Потримати конт по айді
router.get('/:id', getContactById);

router.post('/', addContact);

export default router;
