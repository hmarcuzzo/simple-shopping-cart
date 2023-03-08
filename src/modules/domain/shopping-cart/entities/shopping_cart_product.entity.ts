import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UseDto } from '../../../../core/decorators/use-dto.decorator';
import { BaseEntity } from '../../../../core/common/base.entity';
import { ShoppingCart } from './shopping_cart.entity';
import { ShoppingCartProductDto } from '../dto/shopping_cart_product/shopping_cart_product.dto';

@Entity()
@UseDto(ShoppingCartProductDto)
export class ShoppingCartProduct extends BaseEntity<ShoppingCartProductDto> {
  @Column({ name: 'price', type: 'float', default: 0.0, nullable: false })
  price: number;

  @Column({ name: 'quantity', type: 'integer', default: 0, nullable: false })
  quantity: number;

  @Column({ name: 'product_id', type: 'uuid', nullable: false })
  productId: Uuid;

  @ManyToOne(
    () => ShoppingCart,
    (shoppingCarts) => shoppingCarts.shoppingCartProducts,
  )
  @JoinColumn({ name: 'shopping_cart_id' })
  shoppingCart: ShoppingCart;
}
