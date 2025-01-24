import express from 'express';
import {
    getContacts,
    getContactById,
    addContact,
} from '../controllers/contactsController.js';

const router = express.Router();

// отримуєм всі контакти
router.get('/', getContacts);

// отримаєм контакт по id
router.get('/:id', getContactById);

router.post('/', addContact);

export default router;
