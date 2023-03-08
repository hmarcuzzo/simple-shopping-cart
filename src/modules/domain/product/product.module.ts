import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.schema';
import { ProductService } from './product.service';
import { ProductInterface } from './product.interface';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductInterface],
  exports: [ProductInterface],
})
export class ProductModule {}
