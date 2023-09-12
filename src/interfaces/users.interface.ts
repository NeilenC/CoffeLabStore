import { Document } from 'mongoose';
import { Role } from 'src/commons/enums/rol.enums';

export interface Users extends Document {
  readonly name: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly address: string;
  readonly phoneNumber: string;
  readonly role: {
    type: 'enum';
    default: Role.USER;
    enum: Role;
  };
}
