import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from 'src/interfaces/cart.interface';
import { Product } from 'src/interfaces/product.interface';
// import { Product } from 'src/interfaces/product.interface';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('Cart') private readonly cartModel: Model<Cart>,
    @InjectModel('Product') readonly productModel: Model<Product>,
  ) {}

  async getCart(userId: string): Promise<Cart> {
    return this.cartModel.findOne({ userId }).exec();
  }

  async addToCart(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart> {
    // 1. Obtener el producto desde la base de datos para verificar el stock.
    const product = await this.productModel.findOne({ _id: productId }).exec();

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    // 2. Comprobar si hay suficiente stock disponible.
    if (product.stock < quantity) {
      throw new NotFoundException(
        `No hay suficiente stock para ${product.name}`,
      );
    }

    // 3. Obtener el carrito actual del usuario desde la base de datos.
    const cart = await this.cartModel.findOne({ userId }).exec();

    // 4. Si el usuario no tiene un carrito, crear uno nuevo.
    if (!cart) {
      const newCart = new this.cartModel({
        userId,
        items: [{ productId, quantity }],
      });
      await newCart.save();
      console.log('newCart service', newCart);
      return newCart;
    }

    // 5. Comprobar si el producto ya está en el carrito.
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId.toString(),
    );

    if (existingItem) {
      // 6. Si el producto ya está en el carrito, actualizar la cantidad.
      existingItem.quantity += quantity;
    } else {
      // 7. Si el producto no está en el carrito, agrégalo como un nuevo elemento.
      cart.items.push({ productId, quantity });
    }

    // 8. Guardar los cambios en el carrito.
    await cart.save();

    // 9. Devolver el carrito actualizado.
    return cart;
  }

  //Modificar la cantidad de un producto desde el carrito
  async updateCart(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart> {
    // Buscar el carrito del usuario
    const cart = await this.cartModel.findOne({ userId }).exec();

    if (!cart) {
      // Si el carrito no existe, puedes manejarlo de acuerdo a tu aplicación (lanzar un error, por ejemplo)
      throw new Error('Carrito no encontrado');
    }

    // Buscar el producto en el carrito
    const existingItemIndex = cart.items.findIndex(
      (item) =>
        item.productId &&
        productId &&
        item.productId.toString() === productId.toString(),
    );

    if (existingItemIndex !== -1) {
      const existingItem = cart.items[existingItemIndex];

      if (existingItem.quantity >= quantity) {
        existingItem.quantity -= quantity;

        if (existingItem.quantity <= 0) {
          cart.items.splice(existingItemIndex, 1);
        }
        await cart.save();
      } else {
        throw new Error('La cantidad a restar es mayor que la cantidad actual');
      }
    }

    return cart;
  }

  async removeFromCart(userId: string, productId: string): Promise<Cart> {
    const cart = await this.cartModel.findOne({ userId }).exec();

    const existingItemIndex = cart.items.findIndex(
      (item) =>
        item.productId &&
        productId &&
        item.productId.toString() === productId.toString(),
    );

    if (existingItemIndex !== -1) {
      cart.items.splice(existingItemIndex, 1);
      await cart.save();
    } else {
      throw new Error('Error al eliminar el producto');
    }
    return cart;
  }

  async deleteCart(userId: string): Promise<Cart> {
    const cart = await this.cartModel.findOneAndDelete({ userId }).exec();

    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    return cart;
  }
}
