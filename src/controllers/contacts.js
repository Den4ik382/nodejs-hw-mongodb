import createHttpError from 'http-errors';

import * as contactServices from '../services/contacts.js';

export const getAllContactsController = async (req, res) => {
  const data = await contactServices.getAllContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await contactServices.getContactsById(id);
  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data,
  });
};

export const createContactsController = async (req, res) => {
  const data = await contactServices.createContacts(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};
export const upsertContactsController = async (req, res, next) => {
  const { id } = req.params;
  const { isNew, data } = await contactServices.updateContacts(
    { _id: id },
    req.body,
    { upsert: true },
  );
  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a contacts!`,
    data,
  });
};

export const patchContactsController = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactServices.updateContacts({ _id: id }, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contacts,
  });
};

export const deleteContactsController = async (req, res) => {
  const { id } = req.params;
  const data = await contactServices.deleteContacts({ _id: id });
  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).send();
};
