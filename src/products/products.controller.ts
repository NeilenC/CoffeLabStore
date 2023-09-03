import {
  Controller,
  Post,
  //   Put,
  //   Delete,
  HttpStatus,
  Body,
  Get,
  Res,
  Param,
  NotFoundException,
  Delete,
  Query,
  Put,
  //   Body,
} from '@nestjs/common';
import { CreateProductDTO } from '../dto/products.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post('/create')
  async createPost(
    @Res() res: any,
    @Body() createProductDTO: CreateProductDTO,
  ) {
    //instancia: Clase
    console.log(createProductDTO);
    const newProduct =
      await this.productService.createProduct(createProductDTO);
    return res.status(HttpStatus.OK).send(newProduct);
  }

  @Get('/')
  async getProducts(@Res() res: any) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).send(products);
  }

  @Get('/:productID')
  async getProduct(@Res() res: any, @Param('productID') productID: string) {
    const product = await this.productService.getProduct(productID);
    if (!product) {
      return NotFoundException;
    }
    return res.status(HttpStatus.OK).send(product);
  }

  @Delete('/delete')
  async deleteProduct(@Res() res: any, @Query('productID') productID: string) {
    const deletedProduct = await this.productService.deleteProduct(productID);
    if (!deletedProduct) {
      return NotFoundException;
    }
    return res.status(HttpStatus.OK).json({
      message: 'Producto eliminado',
      deletedProduct,
    });
  }

  @Put('/update')
  async updateProduct(
    @Res() res: any,
    @Body() createProductDTO: CreateProductDTO,
    @Query('productID') productID: string,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      productID,
      createProductDTO,
    );
    if (!updatedProduct) throw new NotFoundException('Producto no existe');
    return res.status(HttpStatus.OK).json({
      message: 'Modificado con exito',
      updatedProduct,
    });
  }
}
