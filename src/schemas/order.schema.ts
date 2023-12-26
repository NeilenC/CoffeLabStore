import { Schema } from 'mongoose';

const OrderItems = new Schema({
  productId: { type: String, ref: 'Product' },
  quantity: Number,
});

const DeliveryOption = new Schema({
  deliveryType: { type: String, enum: ['domicilio', 'correo', 'local'] },
});

const UserData = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  dni: { type: Number, required: true },
  phoneNumber: { type: Number, required: true },
  email: { type: String, required: true },
});

const ShoppingData = new Schema({
  address: { type: String },
  apartment: { type: String },
  directionNum: { type: Number, required: true },
  localidad: { type: String, required: true },
});

const PaymentData = new Schema({
  paymentMethod: { type: String, required: true },
  cardNumber: { type: Number },
  delivery: { type: DeliveryOption, required: true },
  deliveryCharge: { type: Number },
});

export const OrderSchema = new Schema({
  userId: { type: String, ref: 'Users' },
  cartId: [OrderItems],
  totalCart: { type: Number },
  userData: { type: UserData },
  shoppingData: { type: ShoppingData },
  PaymentData: { type: PaymentData },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['pendiente', 'en_proceso', 'enviado', 'entregado'],
  },
  trackingNumber: { type: String },
});
