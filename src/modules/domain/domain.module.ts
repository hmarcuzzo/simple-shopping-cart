import { Module } from '@nestjs/common';
import { ShoppingCartModule } from './shopping-cart/shopping_cart.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ShoppingCartModule, ProductModule],
})
export class DomainModule {}
