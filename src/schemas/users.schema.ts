import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  name: String,
  lastName: String,
  address: String,
  phoneNumber: Number,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});
