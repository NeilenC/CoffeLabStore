import { Document } from 'mongoose';

export interface Product extends Document {
  readonly _id: string;
  readonly name: string;
  readonly description: string;
  readonly imageURL: string;
  readonly price: number;
  stock: number;
  readonly createdAt: Date;
  category: string;
  subcategory: string;
}
