import {
  Controller,
  Post,
  HttpStatus,
  Body,
  Get,
  Res,
  Param,
  NotFoundException,
  Delete,
  Query,
  Put,
  UploadedFile,
} from '@nestjs/common';
import { Category, CreateProductDTO, SubCategory } from '../dto/products.dto';
import { ProductsService } from './products.service';
import { CategoriesService } from 'src/categories/categories.service';
import { CreateCategoriesDTO } from 'src/dto/categories.dto';
import { SubCategoryService } from 'subcategory/subcategory.service';
import Multer from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsModule } from 'subcategory/subcategory.module';
// import { CartService } from 'src/cart/cart.service';
// import { Auth } from 'src/decorators/auth.decorator';
// import { Role } from 'src/commons/enums/rol.enums';

@Controller('products')
export class ProductsController {
  constructor(
    private productService: ProductsService, // private cartService: CartService,
    private categoryService: CategoriesService,
    private subCategoryService: SubCategoryService,
  ) {}

  @Post('/create')
  // @Auth(Role.ADMIN)
  async createPost(
    @Res() res: any,
    @Body() createProductDTO: CreateProductDTO,
    @UploadedFile() imageFile: Multer.File,
  ) {

    const category: Category = {
      id: createProductDTO.category.id,
      name: createProductDTO.category.name,
    };

    if (createProductDTO.subcategory) {
      const subCategories: SubCategory = {
        category: category.id,
        name: createProductDTO.subcategory.name,
        id: createProductDTO.subcategory.id,
      };
      createProductDTO.subcategory = subCategories;
    }

    const newProduct =
      await this.productService.createProduct(createProductDTO);
    console.log('NEW', newProduct);

    return res.status(HttpStatus.OK).send(newProduct);
  }

  // @Get('/:search')
  // async searchProducts(@Res() res: any) {
  //   const results = this.productService.filter((product) =>
  //     product.name.toLowerCase().includes(query.toLowerCase())
  //   );

  //   return results;
  // }

  @Get('/search/:searchTerm')
  async findProducts(@Res() res: any, @Param('searchTerm') searchTerm: string) {
    try {
      const products = await this.productService.searchProducts(searchTerm);

      if (products.length === 0) {
        res.status(404).json({ message: 'No se han encontrado resultados' });
      } else {
        res.json(products);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al realizar la búsqueda' });
    }
  }

  @Get('search/category/:searchTerm')
  async searchProductsByCategory(
    @Param('searchTerm') searchTerm: string,
  ) {
    const products = await this.productService.searchProductsByCategory(searchTerm);
    return { products };
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

  @Post('byIds')
  async getProductsByIds(@Body('productIds') productIds: string[]) {
    const products = await this.productService.getProductsByIds(productIds);
    return products;
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

  @Put('/update/:productID')
  async updateProduct(
    @Res() res: any,
    @Body() body: any,
    @Body() createProductDTO: CreateProductDTO,
    @Param('productID') productID: string,
  ) {
      
      createProductDTO.keys = body.keys;

      const updatedProduct = await this.productService.updateProduct(
        productID,
        createProductDTO,
      );
      if (!updatedProduct) throw new NotFoundException('Producto no existe');
      return res.status(HttpStatus.OK).json({
        message: 'Modificado con éxito',
        updatedProduct,
      });
 
  }

  @Get('byCategory/:category')
  findByCategory(@Param('category') category: string) {
    return this.productService.findByCategory(category);
  }

  @Get('bySubCategory/:subcategory')
  findBySubCategory(@Param('subcategory') subcategory: string) {
    return this.productService.findBySubCategory(subcategory);
  }


}
