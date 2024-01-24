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

  async getProductsByIds(body: any): Promise<Product[]> {
      const products = await this.productModel.find({ _id: { $in: body } });
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
      .find({ 'category.id': category })
      .exec();
    return products;
  }

  async findBySubCategory(subcategory: string): Promise<Product[]> {
    const products = await this.productModel
      .find({ 'subcategory.id': subcategory })
      .exec();

    return products;
  }

 
  async searchProducts(searchTerm: string): Promise<Product[]> {
    try {
      const searchPatterns = searchTerm
        .split(/\s+/)
        .map((term) => new RegExp(term, 'i'));

      const products = await this.productModel.find({
        $and: searchPatterns.map((pattern) =>  ({
          $or: [
            { 'category.name': { $regex: pattern } },
            { 'subcategory.id': { $regex: pattern } },
            { 'keys': { $regex: pattern } },
          ]
        })),
      });

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

}
