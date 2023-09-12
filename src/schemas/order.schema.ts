import { Schema } from 'mongoose';

const OrderItems = new Schema({
  productId: { type: String, ref: 'Product' },
  quantity: Number,
});

export const OrderSchema = new Schema({
  userId: { type: String, ref: 'Users' },
  items: [OrderItems],
  status: String,
  payment: String,
});
