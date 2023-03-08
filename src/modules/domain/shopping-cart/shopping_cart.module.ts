import { Module } from '@nestjs/common';
import { ShoppingCart } from './entities/shopping_cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCartProduct } from './entities/shopping_cart_product.entity';
import { ShoppingCartController } from './controllers/shopping_cart.controller';
import { ShoppingCartService } from './services/shopping_cart.service';
import { ShoppingCartRepository } from './repositories/shopping_cart.repository';
import { ShoppingCartProductRepository } from './repositories/shopping_cart_product.repository';
import { ShoppingCartProductService } from './services/shopping_cart_product.service';
import { ShoppingCartProductInterface } from './interfaces/shopping_cart_product.interface';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ShoppingCart,
      ShoppingCartProduct,
      ShoppingCartRepository,
      ShoppingCartProductRepository,
    ]),
    ProductModule,
  ],
  controllers: [ShoppingCartController],
  providers: [
    ShoppingCartService,
    ShoppingCartProductService,
    ShoppingCartProductInterface,
  ],
  exports: [ShoppingCartProductInterface],
})
export class ShoppingCartModule {}
