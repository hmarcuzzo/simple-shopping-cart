import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.schema';
import { Model } from 'mongoose';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async updateProduct(
    id: Uuid,
    userDto: UpdateProductDto,
  ): Promise<ProductDto> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return new ProductDto(
      await this.productModel.findByIdAndUpdate(id, userDto, {
        new: true,
      }),
    );
  }

  async createProduct(productDto: CreateProductDto): Promise<ProductDto> {
    const product = new this.productModel(productDto);
    return new ProductDto(await product.save());
  }

  async deleteProduct(id: Uuid): Promise<void> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.productModel.findByIdAndDelete(id);
  }

  async findOneProduct(id: Uuid): Promise<ProductDto> {
    return new ProductDto(await this.productModel.findById(id));
  }

  async findAllProduct(): Promise<ProductDto[]> {
    return (await this.productModel.find()).map(
      (product) => new ProductDto(product),
    );
  }
}
