import express from 'express';
import {
  getContacts,
  getSingleContact,
  createNewContact,
  patchContact,
  removeContact,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema } from '../schemas/contactSchemas.js';

const router = express.Router();

router.get('/', ctrlWrapper(getContacts));
router.get('/:contactId', isValidId, ctrlWrapper(getSingleContact));
router.post('/', validateBody(createContactSchema), ctrlWrapper(createNewContact));
router.patch('/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContact));
router.delete('/:contactId', isValidId, ctrlWrapper(removeContact));

export default router;
