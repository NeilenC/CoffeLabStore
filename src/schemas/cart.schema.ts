import { Schema } from 'mongoose';

const CartItemSchema = new Schema({
  productId: { type: String, ref: 'Product' },
  quantity: { type: Number, default: 0 },
});

export const CartSchema = new Schema({
  userId: { type: String, ref: 'Users' },
  items: [CartItemSchema],
});

// import * as mongoose from 'mongoose';

// const CartItemSchema = new mongoose.Schema({
//   productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//   quantity: { type: Number, default: 0 },
// });

// export const CartSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
//   items: [CartItemSchema],
// });

// export const CartModel = mongoose.model('Cart', CartSchema);
