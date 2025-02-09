import { UserCollection } from '../db/models/userModel.js';
import createError from 'http-errors';
import bcrypt from 'bcrypt';

export const createUser = async (name, email, password) => {
  const existingUser = await UserCollection.findOne({ email });

  if (existingUser) {
    throw createError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await UserCollection.create({
    name,
    email,
    password: hashedPassword,
  });

  return newUser;
};
