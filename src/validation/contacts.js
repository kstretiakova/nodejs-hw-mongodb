import Joi from 'joi';
import { CONTACT_TYPES } from '../constants/index.js';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid(...CONTACT_TYPES)
    .required(),
});

export const updateContactSchema = Joi.object({
  userId: Joi.string().length(24),
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().email().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...CONTACT_TYPES),
});
