import ContactCollection from '../db/models/contact.js';

export const getAllContacts = () => ContactCollection.find();

export const getContactsById = (id) => ContactCollection.findById(id);

export const createContacts = (payload) => ContactCollection.create(payload);

export const updateContacts = async (filter, data, options = {}) => {
  const rawResult = await ContactCollection.findOneAndUpdate(filter, data, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });
  if (!rawResult || !rawResult.value) return null;
  return {
    contacts: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContacts = (filter) =>
  ContactCollection.findOneAndDelete(filter);
