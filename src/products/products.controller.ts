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
import { Category, CreateProductDTO, SubCategory } from '../dto/products.dto';
import { ProductsService } from './products.service';
import { CategoriesService } from 'src/categories/categories.service';
import { CreateCategoriesDTO } from 'src/dto/categories.dto';
import { SubCategoryService } from 'subcategory/subcategory.service';
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
    @Body() body:any,
    @Body() createProductDTO: CreateProductDTO,
  ) {
    
    const id = body.category
    // const categoryId = body.category

    // console.log("id CATEGORY", subCategoryId)
    
    const getCategory = await this.categoryService.getCategory(id)
    const getSubCategory = await this.subCategoryService.getByCategory(id)
    const subcategoryId = body.subcategory;

    // Verificar que el ID de la subcategoría en la solicitud coincida con uno de los IDs de subcategorías encontrados
    const matchedSubcategory = getSubCategory.find((subcategory) => subcategory._id.toString() === subcategoryId);
  
    // const subcategoryId = createProductDTO.subcategory.id
    const category: Category = { 
      id: getCategory._id.toString(),
      name: getCategory.name,
    };

    if (matchedSubcategory) {
       const subCategories: SubCategory = {
          category: category.id,
          name: matchedSubcategory.name,
          id: matchedSubcategory._id.toString()
        }
     createProductDTO.subcategory = subCategories;

      };

    createProductDTO.category = category;


    const newProduct =
      await this.productService.createProduct(createProductDTO);
      console.log("NEW", newProduct)
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

  @Put('/update/:productID')
  async updateProduct(
    @Res() res: any,
    @Body() body: any,
    @Body() createProductDTO: CreateProductDTO,
    @Param('productID') productID: string,
  ) {
    const categoryId = body.category;
  
    const getCategory = await this.categoryService.getCategory(categoryId);
  
    const subCategories = await this.subCategoryService.getByCategory(categoryId);
  
    const subcategoryId = body.subcategory;
  
    const matchedSubcategory = subCategories.find((subcategory) => subcategory._id.toString() === subcategoryId);
  
    if (matchedSubcategory) {
      const category: Category = {
        id: getCategory._id.toString(),
        name: getCategory.name,
      };
  
      const subcategory: SubCategory = {
        id: matchedSubcategory._id.toString(),
        name: matchedSubcategory.name,
        category: category.id
      };

      createProductDTO.subcategory = subcategory
  
      const updatedProduct = await this.productService.updateProduct(
        productID,
        createProductDTO,
      );
      if (!updatedProduct) throw new NotFoundException('Producto no existe');
      return res.status(HttpStatus.OK).json({
        message: 'Modificado con éxito',
        updatedProduct,
      });
    } else {
     throw new Error
    }
  }
  
  @Get('byCategory/:category')
  findByCategory(@Param('category') category: string) {
    return this.productService.findByCategory(category);
  }

  @Get('bySubCategory/:subcategory')
  findBySubCategory(@Param('subcategory') subcategory: string) {
    return this.productService.findBySubCategory(subcategory);
  }

  @Get('list')
  async filterProducts(
    @Query() query: string,
    @Res() res: any
  ) {
    try {
      const products = await this.productService.getFilteredProducts(query);
      res.status(200).json(products);
    } catch (error) {
      console.log('error', error);
      res.status(400).json({
        error: 'No se pudoooo'
      });
    }
  }

  // @Post('addToCart')
  // async add(@Body() productId: string) {
  //   try {
  //     // Llama al método addToCart del servicio de productos
  //     const cartItem = this.cartService.addToCart(productId);

  //     // Si todo va bien, puedes devolver el elemento del carrito agregado como respuesta
  //     return cartItem;
  //   } catch (error) {
  //     // Maneja errores como el producto no encontrado o cualquier otro error de negocio aquí
  //     throw new NotFoundException(error.message);
  //   }
  // }
}
