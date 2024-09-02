import ContactCollection from '../db/models/contact.js';

export const getAllContacts = () => ContactCollection.find();

export const getContactsById = (id) => ContactCollection.findById(id);
