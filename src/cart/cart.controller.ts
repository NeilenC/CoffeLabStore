// cart.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  // Post,
  // Body,
  Param,
  Patch,
  Post,
  // Patch,
  // Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDTO } from 'src/dto/cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':userId')
  async getCart(@Param('userId') userId: string) {
    return this.cartService.getCart(userId);
  }

  @Post(':userId')
  async addToCart(
    @Param('userId') userId: string,
    @Body() addToCartDto: CartDTO,
  ) {
    // if (
    //   !addToCartDto ||
    //   !addToCartDto.items ||
    //   addToCartDto.items.length === 0
    // ) {
    //   return {
    //     message: 'No se proporcionaron elementos para agregar al carrito',
    //   };
    // }

    const cart = await this.cartService.addToCart(
      userId,
      addToCartDto.items[0].productId,
      addToCartDto.items[0].quantity,
    );

    return { message: 'Productos agregados exitosamente', cart };
  }

  @Patch(':userId')
  async updateCartItem(
    @Param('userId') userId: string,
    @Body() updateCartItemDto: CartDTO,
  ) {
    if (
      !updateCartItemDto ||
      !updateCartItemDto.items ||
      updateCartItemDto.items.length === 0
    ) {
      // Manejar el caso en el que updateCartItemDto no esté definido o no tenga elementos en items
      throw new Error('Solicitud de actualización no válida');
    }
    const productId = updateCartItemDto.items[0].productId;

    if (!productId) {
      throw new Error('ID de producto no proporcionado en la solicitud');
    }

    return this.cartService.updateCart(
      userId,
      productId,
      updateCartItemDto.items[0].quantity,
    );
  }

  @Delete(':userId')
  async removeFromCart(
    @Param('userId') userId: string,
    @Body() deleteCartItemDto: CartDTO,
  ) {
    const productId = deleteCartItemDto.items[0].productId;

    return this.cartService.removeFromCart(userId, productId);
  }

  @Delete(':userId/deleteCart')
  async deleteCart(@Param('userId') userId: string) {
    return this.cartService.deleteCart(userId);
  }
}
