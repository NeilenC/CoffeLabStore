import { Document } from 'mongoose';

interface OrderItem {
  productId: string;
  quantity: number;
}

export interface Order extends Document {
  userId: string;
  items: [OrderItem];
  totalCart: number;
  cartId: Object,
  status: string;
  paymentData: paymentData;
  shoppingData: shoppingData;
  userData: userData;
  trackingNumber: string;
}

interface paymentData {
  paymentMethod: string;
  cardNumber?: number;
}

interface shoppingData {
  address?: string;
  apartment?: string;
  directionNum: number;
  localidad: string;
}

interface userData {
  name: string;
  lastName: string;
  dni: number;
  phoneNumber: number;
  email: string;
}
