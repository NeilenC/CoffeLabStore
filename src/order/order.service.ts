import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from 'src/interfaces/cart.interface';
import { Order } from 'src/interfaces/order.interface';
import { Product } from 'src/interfaces/product.interface';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') readonly orderModel: Model<Order>,
    @InjectModel('Product') private productModel: Model<Product>,
    @InjectModel('Cart') readonly cartModel: Model<Cart>,
  ) {}

  async createOrder(userId: string): Promise<Order> {
    const cart = await this.cartModel.find({ userId }).exec();

    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    console.log('cart', cart);

    const firstCart = cart[0];

    const newOrder = new this.orderModel({
      userId: firstCart.userId,
      items: firstCart.items,
      status: 'Pendiente',
      payment: 'Pendiente',
    });

    return await newOrder.save();
  }

  async generatePurchase(
    orderId: string,
    userId: string,
    paymentData: { status: string; payment: string },
  ) {
    const order = await this.orderModel.findOne({ _id: orderId }).exec();
    const cart = await this.cartModel.findOne({ userId }).exec();

    if (!cart) {
      throw new Error('Carrito no encontrado');
    }
    if (!order) {
      throw new Error('orden no encontrada');
    }

    const cartItems = cart.items;

    // Validar el stock y actualizarlo
    for (const cartItem of cartItems) {
      const product = await this.productModel
        .findOne({ _id: cartItem.productId })
        .exec();

      if (!product) {
        throw new Error(`Producto no encontrado: ${cartItem.productId}`);
      }

      if (product.stock < cartItem.quantity) {
        throw new Error(`No hay suficiente stock para ${product.name}`);
      }

      // Restar la cantidad comprada del stock
      product.stock -= cartItem.quantity;
      await product.save();
    }
    (order.status = paymentData.status), (order.payment = paymentData.payment);

    await order.save();

    return order;
  }

  async getOrder(userId: string) {
    const getOrder = await this.orderModel.find({ userId }).exec();

    return getOrder;
  }
}
