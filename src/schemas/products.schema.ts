import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  name: String,
  description: String,
  imageURL: String,
  price: Number,
  stock: Number,
  createAt: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    allowNull: true,
  },
});
