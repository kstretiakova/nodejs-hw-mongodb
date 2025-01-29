import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    email: {
      type: String,
      validate: {
        validator: (v) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
        message: 'Invalid email format',
      },
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: [true, 'Contact type is required'],
    },
  },
  { timestamps: true }
);

export const ContactCollection = model('Contact', contactSchema);
