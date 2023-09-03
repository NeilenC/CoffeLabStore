import { Document } from 'mongoose';

export interface Users extends Document {
  readonly name: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly address: string;
  readonly phoneNumber: string;

  readonly role: string;
}
