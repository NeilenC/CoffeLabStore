import { Document } from 'mongoose';
import { Role } from 'src/commons/enums/rol.enums';

export interface Users extends Document {
  readonly name: string;
  readonly lastName: string;
  email: string;
  password: string;
  phoneNumber: number;
  readonly role: {
    type: 'enum';
    default: Role.USER;
    enum: Role;
  };
}
