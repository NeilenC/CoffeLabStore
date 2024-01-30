import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from 'src/interfaces/order.interface';
import { CartService } from 'src/cart/cart.service';
import { DeliveryMailDto } from 'src/dto/deliveryMail.dto';
import { ProductsService } from 'src/products/products.service';
// import { OrderDTO } from 'src/dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private cartService: CartService,
    private productsService: ProductsService
  ) {}

  @Post(':userId')
  async createOrder(
    @Param('userId') userId: string,
    @Body() orderData: any,
  ): Promise<any> {
    const order = await this.orderService.createOrder(userId, orderData);
    return { message: 'Order created successfully', order };
  }

  @Get(':userId')
  async getOrder(@Param('userId') userId: string) {
    return await this.orderService.getOrder(userId);
  }

@Get('/get-orders/:userId')
async getOrders(@Param('userId') userId: string) {
  try {
    // Obtener órdenes
    const orders: any = await this.orderService.getOrders(userId);

    // Obtener IDs de carritos de las órdenes
    const cartsIdObj = orders.map((item: any) => item.cartId[0]._id.toString());

    // Obtener detalles de carritos (incluyendo productos)
    const obtainCarts = await this.cartService.getCartsByIds(cartsIdObj);


    const productIds = obtainCarts.flatMap((cartItem: any) =>
    cartItem.cart.map((item: any) => item.productId)
  );
  
  // Obtener detalles completos de los productos
  const obtainProducts = await this.productsService.getProductsByIds(productIds);
  
  const ordersWithDetails = orders.map((order: any) => {
    // Obtine el ID del carrito desde cartId
    const cartId = order.cartId[0]._id.toString();
  
    // Encuentra el carrito correspondiente en obtainCarts
    const cartItem = obtainCarts.find((cart: any) => cart._id.toString() === cartId);
  
    // Mapea los detalles del carrito directamente
    const cartDetails = cartItem.cart.map((cartProduct: any) => {

    // Encuentra los detalles del producto correspondiente
      const productDetails = obtainProducts.find(
        (product: any) => product._id === cartProduct.productId
      );
  
      return {
        productId: cartProduct.productId,
        quantity: cartProduct.quantity,
        productDetails,
      };
    });

      return {
      orderId: order._id.toString(),
      createdAt: order.createdAt,
      cartTotal: order.totalCart,
      cartDetails,
      userData: order.userData,
      shoppingData: order.shoppingData,
      status: order.status,
      trackingNumber: order.trackingNumber,
    };
  });
  
  
  return ordersWithDetails;
  
  } catch (error) {
    console.error('Error al obtener las órdenes:', error);
    throw new Error('Error al obtener las órdenes');
  }
}
  

  // @Get('/get-orders/:userId')
  // async getOrders(@Param('userId') userId: string) {
  //   const orders: any = await this.orderService.getOrders(userId);

  //   const cartsIdObj = orders.map((item:any) => item.cartId[0]._id)

  //   const carts = await this.cartService.getCartsByIds(cartsIdObj)

  //   const productsInCarts = carts.map((item)=> item.cart)
  //   console.log("productsInCarts", productsInCarts)

  // }
  


  // @Put('/userId/:orderId')
  // async generatePurchase(
  //   @Param('orderId') orderId: string,
  //   @Param('userId') userId: string,
  //   @Body() paymentData: { status: string; payment: string },
  // ): Promise<Order> {
  //   return await this.orderService.generatePurchase(
  //     orderId,
  //     userId,
  //     paymentData,
  //   );
  // }

  // @Get(':userId')
  // async getOrder(@Param('userId') userId: string) {
  //   return await this.orderService.getOrder(userId);
  // }
}
