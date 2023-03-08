import { BaseDto } from '../../../../../core/common/dto/base.dto';
import { ShoppingCartDto } from '../shopping-cart/shopping_cart.dto';
import { ShoppingCartProduct } from '../../entities/shopping_cart_product.entity';

export class ShoppingCartProductDto extends BaseDto {
  price: number;
  quantity: number;
  productId: Uuid;
  shoppingCart: ShoppingCartDto;

  constructor(shoppingCart: ShoppingCartProduct) {
    super(shoppingCart);

    this.price = shoppingCart.price;
    this.quantity = shoppingCart.quantity;
    this.productId = shoppingCart.productId;
    this.shoppingCart = shoppingCart.shoppingCart
      ? shoppingCart.shoppingCart.toDto()
      : null;
  }
}
