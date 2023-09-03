import { Document } from 'mongoose';

export interface Categories extends Document {
  readonly name: string;
  readonly description: string;
}
