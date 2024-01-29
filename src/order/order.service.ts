import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartService } from 'src/cart/cart.service';
import { Cart } from 'src/interfaces/cart.interface';
import { Order } from 'src/interfaces/order.interface';
import { Product } from 'src/interfaces/product.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') readonly orderModel: Model<Order>,
    @InjectModel('Product') private productModel: Model<Product>,
    @InjectModel('Cart') readonly cartModel: Model<Cart>,
    private readonly cartService: CartService,
  ) {}

  async createOrder(userId: string, orderData: any): Promise<any> {
    const cart = await this.cartModel.find({ userId }).lean();
    const { userData, shoppingData, paymentData } = orderData;

    if (paymentData.deliveryCharge) {
      cart[0].cartTotal += paymentData.deliveryCharge;
    }
    //NUMERO DE SEGUIMIENTO UNICO MEDIANTE UUID
    const trackingNumber = uuidv4();

    const order = await this.orderModel.create({
      userId,
      cartId: cart,
      totalCart: cart[0].cartTotal,
      shoppingData: shoppingData,
      paymentMethod: paymentData,
      userData: userData,
      createdAt: new Date(),
      status: 'en_proceso',
      trackingNumber: trackingNumber,
    });

    // Reducir el stock de los productos vendidos
    for (const item of cart[0].cart) {
      const product = await this.productModel.findById(item.productId);

      console.log('PRDUCTO', product);
      if (product) {
        product.stock -= item.quantity;
        await product.save();
      }
    }

    await this.cartService.clearCart(userId);

    return order;
  }

  async getOrder(userId: string) {
    const getOrder = await this.orderModel.findOne({ userId }).exec();
    return getOrder;
  }

  async getOrders(userId: string): Promise<Order[]> {
    try {

      const orders = await this.orderModel.find({ userId }).exec();
      return orders;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Error al obtener las órdenes');
    }
  }
  // async createOrder(userId: string): Promise<Order> {
  //   const cart = await this.cartModel.find({ userId }).exec();

  //   if (!cart) {
  //     throw new Error('Carrito no encontrado');
  //   }

  //   console.log('cart', cart);

  //   const firstCart = cart[0];

  //   const newOrder = new this.orderModel({
  //     userId: firstCart.userId,
  //     items: firstCart.items,
  //     status: 'Pendiente',
  //     payment: 'Pendiente',
  //   });

  //   return await newOrder.save();
  // }

  // async generatePurchase(
  //   orderId: string,
  //   userId: string,
  //   paymentData: { status: string; payment: string },
  // ) {
  //   const order = await this.orderModel.findOne({ _id: orderId }).exec();
  //   const cart = await this.cartModel.findOne({ userId }).exec();

  //   if (!cart) {
  //     throw new Error('Carrito no encontrado');
  //   }
  //   if (!order) {
  //     throw new Error('orden no encontrada');
  //   }

  //   const cartItems = cart.items;

  //   // Validar el stock y actualizarlo
  //   for (const cartItem of cartItems) {
  //     const product = await this.productModel
  //       .findOne({ _id: cartItem.productId })
  //       .exec();

  //     if (!product) {
  //       throw new Error(`Producto no encontrado: ${cartItem.productId}`);
  //     }

  //     if (product.stock < cartItem.quantity) {
  //       throw new Error(`No hay suficiente stock para ${product.name}`);
  //     }

  //     // Restar la cantidad comprada del stock
  //     product.stock -= cartItem.quantity;
  //     await product.save();
  //   }
  //   (order.status = paymentData.status), (order.payment = paymentData.payment);

  //   await order.save();

  //   return order;
  // }
}
