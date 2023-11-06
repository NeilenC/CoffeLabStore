import { Document } from 'mongoose';

export interface SubCategory extends Document {
  readonly name: any;
  category: any;
}
