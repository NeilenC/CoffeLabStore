import { Schema } from 'mongoose';
import { Role } from 'src/commons/enums/rol.enums';

export const UserSchema = new Schema({
  id: String,
  name: String,
  lastName: String,
  address: String,
  phoneNumber: Number,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    default: Role.USER,
    enum: Role,
  },
});
