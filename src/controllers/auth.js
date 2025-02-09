import bcrypt from 'bcrypt';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import { UserCollection } from '../models/userModel.js';
import { SessionCollection } from '../models/sessionModel.js';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '30d';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await UserCollection.findOne({ email });
  if (existingUser) throw createError(409, 'Email in use');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await UserCollection.create({ name, email, password: hashedPassword });

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: { id: newUser._id, name: newUser.name, email: newUser.email },
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserCollection.findOne({ email });
  if (!user) throw createError(401, 'Invalid credentials');

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw createError(401, 'Invalid credentials');

  const accessToken = jwt.sign({ id: user._id }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
  const refreshToken = jwt.sign({ id: user._id }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

  await SessionCollection.deleteMany({ userId: user._id });
  await SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
    refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken },
  });
};

export const refreshSession = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) throw createError(401, 'No refresh token provided');

  const existingSession = await SessionCollection.findOne({ refreshToken });
  if (!existingSession) throw createError(401, 'Invalid session');

  try {
    const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const accessToken = jwt.sign({ id: payload.id }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
    const newRefreshToken = jwt.sign({ id: payload.id }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

    await SessionCollection.deleteMany({ userId: payload.id });
    await SessionCollection.create({
      userId: payload.id,
      accessToken,
      refreshToken: newRefreshToken,
      accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
      refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully refreshed a session!',
      data: { accessToken },
    });
  } catch (error) {
    throw createError(401, 'Invalid refresh token');
  }
};

export const logoutUser = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) throw createError(401, 'No refresh token provided');

  await SessionCollection.deleteOne({ refreshToken });

  res.clearCookie('refreshToken');
  res.status(204).send();
};
