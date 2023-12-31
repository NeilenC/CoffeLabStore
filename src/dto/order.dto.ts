class OrderItemDTO {
  productId: string;
  quantity: number;
}

export class OrderDTO {
  userId: string;
  items: OrderItemDTO[];
  totalCart: number;
  status: string;
  payment: string;
  trackingNumber: string;
}
