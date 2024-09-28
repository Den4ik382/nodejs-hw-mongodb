import ContactCollection from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactCollection.find();

  if (filter.minReleaseYear) {
    contactsQuery.where('releaseYear').gte(filter.minReleaseYear);
  }
  if (filter.maxReleaseYear) {
    contactsQuery.where('releaseYear').lte(filter.maxReleaseYear);
  }
  if (filter.userId) {
    contactsQuery.where('userId').eq(filter.userId);
  }
  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const contactsCount = await ContactCollection.find().countDocuments();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return {
    data: contacts,
    ...paginationData,
  };
};
export const getContactsById = (filter) => {
  const { _id, userId } = filter;
  return ContactCollection.findOne({ _id, userId });
};
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
