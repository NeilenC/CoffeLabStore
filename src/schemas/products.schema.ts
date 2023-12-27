import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  name: String,
  description: String,
  imageURL: [String],
  price: Number,
  stock: Number,
  keys: [String],
  createAt: {
    type: Date,
    default: Date.now,
  },
  category: {
    id: String,
    name: String,
    description: String,
  },
  subcategory: {
    id: String,
    name: String,
    category: String,
  },
});
