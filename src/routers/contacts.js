import { Router } from 'express';
import {
  getAllContactsController,
  getContactsByIdController,
  createContactsController,
  deleteContactsController,
  upsertContactsController,
  patchContactsController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get('/:id', ctrlWrapper(getContactsByIdController));

contactsRouter.post('/', ctrlWrapper(createContactsController));

contactsRouter.put('/:id', ctrlWrapper(upsertContactsController));

contactsRouter.patch('/:id', ctrlWrapper(patchContactsController));

contactsRouter.delete('/:id', ctrlWrapper(deleteContactsController));
export default contactsRouter;
