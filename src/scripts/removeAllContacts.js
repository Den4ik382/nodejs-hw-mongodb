import updateContacts from './updateContacts.js';

export const removeAllContacts = async () => {
  updateContacts([]);
};

removeAllContacts();
