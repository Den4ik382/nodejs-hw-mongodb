import mongoose from 'mongoose';
import { env } from '../utils/env.js';
export const initMongoConnection = async () => {
  try {
    const user = env('MONGODB_USER');
    const password = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');
    const MONGO_DB = `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`;
    await mongoose.connect(MONGO_DB);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log('Mongo connection erorr', error.message);
    throw error;
  }
};
