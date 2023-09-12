import { Document } from 'mongoose';

interface OrderItem {
  productId: string;
  quantity: number;
}

export interface Order extends Document {
  userId: string;
  items: [OrderItem];
  status: string;
  payment: string;
}
