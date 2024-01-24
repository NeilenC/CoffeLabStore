import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from 'src/interfaces/cart.interface';
import { Product } from 'src/interfaces/product.interface';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('Cart') private readonly cartModel: Model<Cart>,
    @InjectModel('Product') readonly productModel: Model<Product>,
  ) {}

  async addToCart(userId: string, cartItems: any): Promise<Cart> {

    console.log("CARTITEMAS", cartItems)
    try {
      if (!Array.isArray(cartItems.productDetails)) {
        throw new Error(
          'Error al procesar la solicitud: cartItems no es un arreglo',
        );
      }

      let cart = (await this.cartModel.findOne({ userId })) || null;
      const cartItemsArr = cartItems.productDetails;

      if (!cart) {
        cart = await this.cartModel.create({ userId, cart: cartItemsArr });
      } else {
        const prices = await Promise.all(
          cartItemsArr.map(async (item: any) => {
            const product = await this.productModel
              .findById(item.productId)
              .exec();
            if (!product) {
              throw new Error(
                `No se encontró el producto con ID: ${item.productId}`,
              );
            }
            return product.price * item.quantity;
          }),
        );

        const newCartTotal = prices.reduce((total, price) => total + price, 0);

        cart.cartTotal = newCartTotal;

        for (const cartItem of cartItemsArr) {
          const existingCartItem = cart.cart.find(
            (item) => item.productId === cartItem.productId,
          );

          if (existingCartItem) {
            existingCartItem.quantity += cartItem.quantity;
          } else {
            cart.cart.push(cartItem);
          }
        }
      }

      return await cart.save();
    } catch (error) {
      console.error('Error en addToCart:', error);
      throw new Error('Error al procesar la solicitud');
    }
  }

  async getCart(cartId: string): Promise<Cart> {
    return this.cartModel.findOne({ cartId }).exec();
  }

  async clearCart(cartId: string): Promise<void> {
    const cart = await this.cartModel.findOneAndUpdate(
      { cartId },
      { $set: { cart: [] } },
    );
  }
  
  async getCartsByIds(cartIds: string[]): Promise<Cart[]> {
    return this.cartModel.find({ _id: { $in: cartIds } }).exec();
  }

  // async getCart(userId: string): Promise<Cart> {
  //   return this.cartModel.findOne({ userId }).exec();
  // }

  // async addToCart(
  //   userId: string,
  //   productId: string,
  //   quantity: number,
  // ): Promise<Cart> {
  //   const product = await this.productModel.findOne({ _id: productId }).exec();

  //   if (!product) {
  //     throw new Error('Producto no encontrado');
  //   }

  //   if (product.stock < quantity) {
  //     throw new NotFoundException(
  //       `No hay suficiente stock para ${product.name}`,
  //     );
  //   }

  //   const cart = await this.cartModel.findOne({ userId }).exec();

  //   if (!cart) {
  //     const newCart = new this.cartModel({
  //       userId,
  //       items: [{ productId, quantity }],
  //     });
  //     await newCart.save();
  //     console.log('newCart service', newCart);
  //     return newCart;
  //   }

  //   // Comprobar si el producto ya está en el carrito.
  //   const existingItem = cart.items.find(
  //     (item) => item.productId.toString() === productId.toString(),
  //   );

  //   if (existingItem) {
  //     // Si el producto ya está en el carrito, actualizar la cantidad.
  //     existingItem.quantity += quantity;
  //   } else {
  //     // Si el producto no está en el carrito, agrégalo como un nuevo elemento.
  //     cart.items.push({ productId, quantity });
  //   }

  //   // Guardar los cambios en el carrito.
  //   await cart.save();

  //   // Devolver el carrito actualizado.
  //   return cart;
  // }

  // // Modificar la cantidad de un producto desde el carrito
  // async updateCart(
  //   userId: string,
  //   productId: string,
  //   quantity: number,
  // ): Promise<Cart> {
  //   // Buscar el carrito del usuario
  //   const cart = await this.cartModel.findOne({ userId }).exec();

  //   if (!cart) {

  //     throw new Error('Carrito no encontrado');
  //   }

  //   // Buscar el producto en el carrito
  //   const existingItemIndex = cart.items.findIndex(
  //     (item) =>
  //       item.productId &&
  //       productId &&
  //       item.productId.toString() === productId.toString(),
  //   );

  //   if (existingItemIndex !== -1) {
  //     const existingItem = cart.items[existingItemIndex];

  //     if (existingItem.quantity >= quantity) {
  //       existingItem.quantity -= quantity;

  //       if (existingItem.quantity <= 0) {
  //         cart.items.splice(existingItemIndex, 1);
  //       }
  //       await cart.save();
  //     } else {
  //       throw new Error('La cantidad a restar es mayor que la cantidad actual');
  //     }
  //   }
  //   return cart;
  // }

  // async removeFromCart(userId: string, productId: string): Promise<Cart> {
  //   const cart = await this.cartModel.findOne({ userId }).exec();

  //   const existingItemIndex = cart.items.findIndex(
  //     (item) =>
  //       item.productId &&
  //       productId &&
  //       item.productId.toString() === productId.toString(),
  //   );

  //   if (existingItemIndex !== -1) {
  //     cart.items.splice(existingItemIndex, 1);
  //     await cart.save();
  //   } else {
  //     throw new Error('Error al eliminar el producto');
  //   }
  //   return cart;
  // }

  // async deleteCart(userId: string): Promise<Cart> {
  //   const cart = await this.cartModel.findOneAndDelete({ userId }).exec();

  //   if (!cart) {
  //     throw new Error('Carrito no encontrado');
  //   }

  //   return cart;
  // }
}
