import { Injectable } from '@nestjs/common';
import { ShoppingCartProductRepository } from '../repositories/shopping_cart_product.repository';
import { CreateCartProductDto } from '../dto/shopping_cart_product/create-cart-product.dto';
import { ShoppingCartProduct } from '../entities/shopping_cart_product.entity';
import { ProductInterface } from '../../product/product.interface';
import { RemoveCartProductDto } from '../dto/shopping_cart_product/remove-cart-product.dto';
import { DeleteResult } from 'typeorm';

@Injectable()
export class ShoppingCartProductService {
  constructor(
    private readonly shoppingCartProductRepository: ShoppingCartProductRepository,
    private productInterface: ProductInterface,
  ) {}
  async createCartProduct(
    shoppingCartProductDto: CreateCartProductDto,
  ): Promise<ShoppingCartProduct> {
    const product = await this.productInterface.getProduct(
      shoppingCartProductDto.productId,
    );

    const productExists = await this.shoppingCartProductRepository.findOne({
      where: {
        shoppingCart: { id: shoppingCartProductDto.shoppingCartId },
        productId: shoppingCartProductDto.productId,
      },
    });

    if (productExists) {
      productExists.quantity += shoppingCartProductDto.quantity;
      productExists.price += product.price * shoppingCartProductDto.quantity;

      return await this.shoppingCartProductRepository.save(productExists);
    } else {
      const cartProduct = await this.shoppingCartProductRepository.create({
        price: product.price * shoppingCartProductDto.quantity,
        quantity: shoppingCartProductDto.quantity,
        productId: shoppingCartProductDto.productId,
        shoppingCart: { id: shoppingCartProductDto.shoppingCartId },
      });

      return await this.shoppingCartProductRepository.save(cartProduct);
    }
  }

  async removeCartProduct(
    shoppingCartProductDto: RemoveCartProductDto,
  ): Promise<DeleteResult> {
    return await this.shoppingCartProductRepository.delete({
      shoppingCart: { id: shoppingCartProductDto.shoppingCartId },
      productId: shoppingCartProductDto.productId,
    });
  }
}
