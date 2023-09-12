class OrderItemDTO {
  productId: string;
  quantity: number;
}

export class OrderDTO {
  userId: string;
  items: OrderItemDTO[];
  status: string;
  payment: string;
}
