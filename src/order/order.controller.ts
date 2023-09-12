import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from 'src/interfaces/order.interface';
// import { OrderDTO } from 'src/dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post(':userId')
  async createOrder(@Param('userId') userId: string): Promise<Order> {
    try {
      if (userId) {
        console.log('userid', userId);
        return await this.orderService.createOrder(userId);
      }
    } catch (e) {
      console.log('error', e);
      throw new Error();
    }
  }

  //   @Put(':userId/:orderId')
  //   async updateOrderBeforePurchase(

  //   )

  @Put('/userId/:orderId')
  async generatePurchase(
    @Param('orderId') orderId: string,
    @Param('userId') userId: string,
    @Body() paymentData: { status: string; payment: string },
  ): Promise<Order> {
    return await this.orderService.generatePurchase(
      orderId,
      userId,
      paymentData,
    );
  }

  @Get(':userId')
  async getOrder(@Param('userId') userId: string) {
    return await this.orderService.getOrder(userId);
  }
}
