class CartItemDTO {
  productId: string;

  quantity: number;
}

export class CartDTO {
  userId: string;

  items: CartItemDTO[];
}
