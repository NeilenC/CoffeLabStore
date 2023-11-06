import { Document } from 'mongoose';

export interface Categories extends Document {
  readonly name: any;
  readonly description: any;
}
