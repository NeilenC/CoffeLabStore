import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/interfaces/product.interface';
import { CreateProductDTO, SubCategory } from 'src/dto/products.dto';
import { Categories } from 'src/interfaces/categories.interfaces';
import { ProductsModule } from './products.module';
// import { Cart } from 'src/interfaces/cart.interface';
// import { CartDTO } from 'src/dto/cart.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') readonly productModel: Model<Product>, // @InjectModel('Cart') readonly cartModel: Model<Cart>,
  ) // @InjectModel('SubCategory') readonly subCategoryModel: Model<SubCategory>,
  {}

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  async getProduct(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    return product;
  }

  async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const product = new this.productModel(createProductDTO);
    return await product.save();
  }

  async deleteProduct(productID: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(productID);
    return deletedProduct;
  }

  async updateProduct(
    productID: string,
    createProductDTO: CreateProductDTO,
  ): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      productID,
      createProductDTO,
      { new: true },
    );
    return updatedProduct;
  }

  async findByCategory(category: string): Promise<Product[]> {
    const products = await this.productModel
      .find({ category: category })
      .exec();
    return products;
  }

  async findBySubCategory(subcategory: string): Promise<Product[]> {
    const products = await this.productModel
      .find({ 'subcategory.id': subcategory })
      .exec();
    return products;
  }

  // async searchProducts(query: string) {
  //   const results = this.productModel.filter((product) =>
  //     product.name.toLowerCase().includes(query.toLowerCase())
  //   );

  //   return results;
  // }
  async searchProducts(searchTerm: string): Promise<Product[]> {
    try {
      const searchPatterns = searchTerm
        .split(/\s+/)
        .map((term) => new RegExp(term, 'i'));

      const products = await this.productModel.find({
        $and: searchPatterns.map((pattern) =>  ({
          $or: [
            // { 'category.name': { $regex: pattern } },
            // { 'subcategory.id': { $regex: pattern } },
            { 'keys': { $in: searchPatterns } },
        
          ]
          
        })),
      });

      // const searchPattern = new RegExp(searchTerm, 'i');

      // const products = await this.productModel.find({
      //   $or: [
      //     { 'name': { $regex: searchPattern }  },
      //     { 'category.name': { $regex: searchPattern }  },
      //     { 'subcategory.id': { $regex: searchPattern }   }
      //   ],
      // }).collation({ locale: 'en', strength: 1 });

      return products;
    } catch (error) {
      console.log("error", error)
      throw error;
    }
  }

  async searchProductsByCategory( categoryName: string): Promise<Product[]> {
    try {
      const searchPattern = new RegExp(categoryName, 'i');

      const products = await this.productModel.find({
        'category.name': { $regex: searchPattern },
      }).collation({ locale: 'en', strength: 2 });

      return products;
    } catch (error) {
      throw error;
    }
  }
  

  //Disminuir el stock cuando se realice la compra del producto
  // async decreaseStock(productId: string, quantity: number): Promise<Product> {
  //   const product = await this.getProductById(productId);

  //   if (!product) {
  //     throw new Error('Producto no encontrado');
  //   }

  //   if (product.stock < quantity) {
  //     throw new Error('Stock insuficiente');
  //   }

  //   product.stock -= quantity;
  //   await product.save();

  //   return product;
  // }

  // async getProductById(productId: string): Promise<Product | null> {
  //   return this.productModel.findById(productId).exec();
  // }

  // async addToCart(cartDTO: CartDTO): Promise<Cart> {
  //   const productId = cartDTO.cart; // Supongo que productId se encuentra dentro de cartDTO

  //   const product = await this.productModel.findById(productId);

  //   if (!product) {
  //     throw new Error('Product not found');
  //   }

  //   const newCartItem: Cart = new this.cartModel({
  //     cart: productId,
  //   });

  //   const cartItem = await newCartItem.save();

  //   return cartItem;
  // }
}
