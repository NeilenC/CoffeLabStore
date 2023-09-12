import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/interfaces/product.interface';
import { CreateProductDTO } from 'src/dto/products.dto';
// import { Cart } from 'src/interfaces/cart.interface';
// import { CartDTO } from 'src/dto/cart.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') readonly productModel: Model<Product>, // @InjectModel('Cart') readonly cartModel: Model<Cart>,
  ) {}

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
