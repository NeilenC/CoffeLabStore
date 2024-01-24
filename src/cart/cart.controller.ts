import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDTO } from 'src/dto/cart.dto';
import { Cart } from 'src/interfaces/cart.interface';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(':userId')
  addToCart(@Param('userId') userId: string, @Body() cartItems: any): void {
    this.cartService.addToCart(userId, cartItems);
  }

  @Get(':cartId')
  getCart(@Param('cartId') cartId: string): any {
    return this.cartService.getCart(cartId);
  }

  @Post('/get-by-ids')
  async getCartsByIds(@Body() body: { cartIds: string[] }): Promise<Cart[]> {
    const { cartIds } = body;
    return this.cartService.getCartsByIds(cartIds);
  }

  // @Get('/:userId')
  // async getCart(@Param('userId') userId: string) {
  //   return this.cartService.getCart(userId);
  // }

  // @Post('/:userId')
  // async addToCart(
  //   @Body('userId') userId: string,
  //   @Body() addToCartDto: CartDTO,
  // ) {
  //   try{
  //   if (
  //     !addToCartDto ||
  //     !addToCartDto.items ||
  //     addToCartDto.items.length === 0
  //   ) {
  //     return {
  //       message: 'No se proporcionaron elementos para agregar al carrito',
  //     };
  //   }

  // const cart = await this.cartService.addToCart(
  //   userId,
  //   addToCartDto.items[0].productId,
  //   addToCartDto.items[0].quantity,
  //   );

  //   return { cart };
  // }catch(e){
  //   console.log("EERPR CATCH", e)
  //  }
  // }

  // @Patch(':userId')
  // async updateCartItem(
  //   @Param('userId') userId: string,
  //   @Body() updateCartItemDto: CartDTO,
  // ) {
  //   if (
  //     !updateCartItemDto ||
  //     !updateCartItemDto.items ||
  //     updateCartItemDto.items.length === 0
  //   ) {
  //     throw new Error('Solicitud de actualización no válida');
  //   }
  //   const productId = updateCartItemDto.items[0].productId;

  //   if (!productId) {
  //     throw new Error('ID de producto no proporcionado en la solicitud');
  //   }

  //   return this.cartService.updateCart(
  //     userId,
  //     productId,
  //     updateCartItemDto.items[0].quantity,
  //   );
  // }

  // @Delete(':userId')
  // async removeFromCart(
  //   @Param('userId') userId: string,
  //   @Body() deleteCartItemDto: CartDTO,
  // ) {
  //   const productId = deleteCartItemDto.items[0].productId;

  //   return this.cartService.removeFromCart(userId, productId);
  // }

  // @Delete(':userId/deleteCart')
  // async deleteCart(@Param('userId') userId: string) {
  //   return this.cartService.deleteCart(userId);
  // }
}
