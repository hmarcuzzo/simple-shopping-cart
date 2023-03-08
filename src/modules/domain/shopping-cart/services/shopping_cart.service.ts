import { Injectable } from '@nestjs/common';
import { ShoppingCartRepository } from '../repositories/shopping_cart.repository';
import { ShoppingCart } from '../entities/shopping_cart.entity';
import { ShoppingCartDto } from '../dto/shopping-cart/shopping_cart.dto';
import { AddNewProductDto } from '../dto/shopping-cart/add-new-product.dto';
import { ShoppingCartProductInterface } from '../interfaces/shopping_cart_product.interface';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { RemoveProductDto } from '../dto/shopping-cart/remove-product.dto';

@Injectable()
export class ShoppingCartService {
  constructor(
    private readonly shoppingCartRepository: ShoppingCartRepository,
    private shoppingCartProducInterface: ShoppingCartProductInterface,
  ) {}

  async findOneShoppingCart(user_id: Uuid): Promise<ShoppingCartDto> {
    const shoppingCart = await this.shoppingCartRepository.findOne({
      where: {
        user: {
          id: user_id,
        },
      },
      relations: ['user', 'shoppingCartProducts'],
    });

    if (shoppingCart) {
      return new ShoppingCartDto(shoppingCart);
    }

    return new ShoppingCartDto(
      await this.shoppingCartRepository.save({ user: { id: user_id } }),
    );
  }

  async addNewProduct(
    addNewProductDto: AddNewProductDto,
    user_id: Uuid,
  ): Promise<UpdateResult> {
    await this._getShoppingCartByUserAndCartId(
      user_id,
      addNewProductDto.shoppingCartId,
    );

    await this.shoppingCartProducInterface.createShoppingCartProduct(
      addNewProductDto,
    );

    return await this._updateShoppingCartByUserAndCartId(
      user_id,
      addNewProductDto.shoppingCartId,
    );
  }

  async removeProduct(
    removeProductDto: RemoveProductDto,
    user_id: Uuid,
  ): Promise<UpdateResult> {
    await this._getShoppingCartByUserAndCartId(
      user_id,
      removeProductDto.shoppingCartId,
    );

    await this.shoppingCartProducInterface.removeShoppingCartProduct(
      removeProductDto,
    );

    return await this._updateShoppingCartByUserAndCartId(
      user_id,
      removeProductDto.shoppingCartId,
    );
  }

  async _getShoppingCartByUserAndCartId(
    user_id: Uuid,
    cart_id: Uuid,
  ): Promise<ShoppingCart> {
    return await this.shoppingCartRepository.findOneOrFail({
      where: { user: { id: user_id }, id: cart_id },
      relations: ['shoppingCartProducts'],
    });
  }

  async _updateShoppingCartByUserAndCartId(
    user_id: Uuid,
    cart_id: Uuid,
  ): Promise<UpdateResult> {
    const shoppingCart = await this._getShoppingCartByUserAndCartId(
      user_id,
      cart_id,
    );
    shoppingCart.totalPrice = shoppingCart.shoppingCartProducts.reduce(
      (total, product) => total + product.price,
      0,
    );
    shoppingCart.totalQuantity = shoppingCart.shoppingCartProducts.reduce(
      (total, product) => total + product.quantity,
      0,
    );

    return await this.shoppingCartRepository.update(shoppingCart.id, {
      totalPrice: shoppingCart.totalPrice,
      totalQuantity: shoppingCart.totalQuantity,
    });
  }
}
