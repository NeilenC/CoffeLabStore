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
    private productsServive: ProductsService
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
      const orders: any = await this.orderService.getOrders(userId);

      const cartsIdObj = orders.map((item: any) => item.cartId[0]._id);

      const [carts, productsInCarts] = await Promise.all([
        this.cartService.getCartsByIds(cartsIdObj),
        this.getProductDetailsFromCarts(orders),
      ]);
      console.log("carts", carts);

      console.log("productsInCarts", productsInCarts);

    
    } catch (error) {
      console.error('Error al obtener las órdenes:', error);
    }
  }

  private async getProductDetailsFromCarts(orders: any[]) {
    const productPromises = orders.map(async (order) => {
      const cartsIds = order.cartId[0]._id;
      const cart:any = await this.cartService.getCartsByIds(cartsIds);
      const products = cart.map((item: any) => item.cart)
      const productsWidthQuantity =  products.map((item:any) => item[0].productId)

      console.log("productsWidthQuantity", productsWidthQuantity)

      return this.productsServive.getProductsByIds(productsWidthQuantity);
    });

    return Promise.all(productPromises);
  }


  // carts [
  //   {
  //     _id: new ObjectId("6580490edccd98fcbb742ab9"),
  //     userId: '658046e0dccd98fcbb742aab',
  //     cart: [
  //       [Object], [Object],
  //       [Object], [Object],
  //       [Object], [Object],
  //       [Object], [Object]
  //     ],
  //     createdAt: 2023-12-18T13:28:46.281Z,
  //     __v: 4,
  //     cartTotal: 5600
  //   }
  // ]
  

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
