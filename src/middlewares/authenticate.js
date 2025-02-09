import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import { SessionCollection } from '../models/sessionModel.js';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError(401, 'Authorization header missing or malformed');
  }

  const accessToken = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    const session = await SessionCollection.findOne({ accessToken });

    if (!session) {
      throw createError(401, 'Session not found');
    }

    req.user = { id: payload.id };
    next();
  } catch (err) {
    throw createError(401, 'Access token expired or invalid');
  }
};
