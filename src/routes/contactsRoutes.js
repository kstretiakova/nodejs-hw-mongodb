import express from 'express';
import { getContacts, getContactById, addContact } from '../controllers/contactsController.js';

const router = express.Router();


router.get('/', getContacts);


router.get('/:id', getContactById);


router.post('/', addContact);

export default router;
