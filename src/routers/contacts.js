import express from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { getContacts, createContact, updateContact, deleteContact } from '../controllers/contacts.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getContacts);
router.post('/', createContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

export default router;
