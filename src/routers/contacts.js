import { Router } from 'express';
import {
  getAllContactsController,
  getContactsByIdController,
  createContactsController,
  deleteContactsController,
  upsertContactsController,
  patchContactsController,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  createPactchSchema,
} from '../validation/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get('/:id', isValidId, ctrlWrapper(getContactsByIdController));

contactsRouter.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactsController),
);

contactsRouter.put(
  '/:id',
  isValidId,
  validateBody(createPactchSchema),
  ctrlWrapper(upsertContactsController),
);

contactsRouter.patch(
  '/:id',
  isValidId,
  validateBody(createPactchSchema),
  ctrlWrapper(patchContactsController),
);

contactsRouter.delete('/:id', isValidId, ctrlWrapper(deleteContactsController));
export default contactsRouter;
