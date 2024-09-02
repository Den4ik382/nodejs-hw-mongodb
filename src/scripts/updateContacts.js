import { PATH_DB } from '../constants/contacts.js';
import * as fs from 'node:fs/promises';

const updateContacts = (contact) =>
  fs.writeFile(PATH_DB, JSON.stringify(contact, null, 2));
export default updateContacts;
