import { Schema } from 'mongoose';

export const CategoriesSchema = new Schema({
  name: String,
  description: String,
  subcategories: Array<string>,
});
