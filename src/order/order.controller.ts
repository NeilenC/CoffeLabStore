import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from 'src/interfaces/order.interface';
import { CartService } from 'src/cart/cart.service';
import { DeliveryMailDto } from 'src/dto/deliveryMail.dto';
// import { OrderDTO } from 'src/dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private cartService: CartService,
  ) {}

  @Post(':userId')
  async createOrder(
    @Param('userId') userId: string,
    @Body() orderData: any,
  ): Promise<any> {
    console.log('Received order data:', orderData);
    const order = await this.orderService.createOrder(userId, orderData);
    console.log("ORDER", order)
    return { message: 'Order created successfully', order };
  }

  @Get(':userId')
  async getOrder(@Param('userId') userId: string) {
    return await this.orderService.getOrder(userId);
  }

  @Get('/get-orders/:userId')
  getOrders(@Param('userId') userId: string) {
    return this.orderService.getOrders(userId);
  }
  

  // async seleccionarEntrega(@Body() body: { selectedValue: string, userId: string, orderData: any }): Promise<{ message: string }> {
  //   const { selectedValue, userId, orderData } = body;
  //   await this.orderService.procesarSeleccion(selectedValue, userId, orderData);
  //   return { message: 'Selección de entrega recibida con éxito' };
  // }

  // @Post()
  // createOrder(@Body() orderData: any) {
  //   // Aquí deberías procesar la información del carrito y crear la orden en la base de datos
  //   const order = this.orderService.createOrder(orderData);
  //   return { success: true, order };
  // }

  // @Post(':userId')
  // async createOrder(@Param('userId') userId: string): Promise<Order> {
  //   try {
  //     if (userId) {
  //       console.log('userid', userId);
  //       return await this.orderService.createOrder(userId);
  //     }
  //   } catch (e) {
  //     console.log('error', e);
  //     throw new Error();
  //   }
  // }

  // //   @Put(':userId/:orderId')
  // //   async updateOrderBeforePurchase(

  // //   )

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
