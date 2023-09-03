import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/interfaces/product.interface';
import { CreateProductDTO } from 'src/dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') readonly productModel: Model<Product>) {}

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  async getProduct(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    return product;
  }

  async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const product = new this.productModel(createProductDTO); // Creamos el objeto que vamos a guardar.
    return await product.save(); // Aca retornamos el producto guardado con el .save()
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
}
