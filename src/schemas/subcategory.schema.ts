import { Schema } from 'mongoose';

export const SubCategorySchema = new Schema({
  category: String,
  name: String,
});
