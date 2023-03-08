import { BaseDto } from '../../../../../core/common/dto/base.dto';
import { ShoppingCart } from '../../entities/shopping_cart.entity';
import { ShoppingCartProduct } from '../../entities/shopping_cart_product.entity';

export class BasicShoppingCartProductDto {
  productId: Uuid;
  price: number;
  quantity: number;

  constructor(shoppingCartProduct: ShoppingCartProduct) {
    this.productId = shoppingCartProduct.productId;
    this.price = shoppingCartProduct.price;
    this.quantity = shoppingCartProduct.quantity;
  }
}

export class ShoppingCartDto extends BaseDto {
  totalPrice: number;
  totalQuantity: number;
  userId: Uuid;
  products: BasicShoppingCartProductDto[];

  constructor(shoppingCart: ShoppingCart) {
    super(shoppingCart);

    this.totalPrice = shoppingCart.totalPrice;
    this.totalQuantity = shoppingCart.totalQuantity;
    this.userId = shoppingCart.user ? shoppingCart.user.id : null;
    this.products = shoppingCart.shoppingCartProducts.map(
      (product) => new BasicShoppingCartProductDto(product),
    );
  }
}
