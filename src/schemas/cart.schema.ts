import { Schema } from 'mongoose';

const CartItemSchema = new Schema({
  productId: { type: String, ref: 'Product' },
  quantity: { type: Number },
});

export const CartSchema = new Schema({
  userId: { type: String, ref: 'Users' },
  items: [CartItemSchema],
  createdAt: { type: Date, default: Date.now }, 
});

