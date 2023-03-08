import { Inject } from '@nestjs/common';
import { CreateCartProductDto } from '../dto/shopping_cart_product/create-cart-product.dto';
import { ShoppingCartProductService } from '../services/shopping_cart_product.service';
import { ShoppingCartProduct } from '../entities/shopping_cart_product.entity';
import { RemoveCartProductDto } from '../dto/shopping_cart_product/remove-cart-product.dto';
import { DeleteResult } from 'typeorm';

export class ShoppingCartProductInterface {
  constructor(
    @Inject(ShoppingCartProductService)
    private readonly shoppingCartProductService: ShoppingCartProductService,
  ) {}

  async createShoppingCartProduct(
    shoppingCartProductDto: CreateCartProductDto,
  ): Promise<ShoppingCartProduct> {
    return await this.shoppingCartProductService.createCartProduct(
      shoppingCartProductDto,
    );
  }

  async removeShoppingCartProduct(
    shoppingCartProductDto: RemoveCartProductDto,
  ): Promise<DeleteResult> {
    return await this.shoppingCartProductService.removeCartProduct(
      shoppingCartProductDto,
    );
  }
}
