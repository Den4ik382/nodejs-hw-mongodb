import updateContacts from './updateContacts.js';
import { getAllContacts } from './getAllContacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';

const generateContacts = async (number) => {
  const contactList = await getAllContacts();
  const newContact = Array(number).fill(0).map(createFakeContact);
  contactList.push(...newContact);
  await updateContacts(contactList);
};

generateContacts(5);
