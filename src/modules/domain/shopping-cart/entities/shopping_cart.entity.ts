import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { UseDto } from '../../../../core/decorators/use-dto.decorator';
import { BaseEntity } from '../../../../core/common/base.entity';
import { User } from '../../../infrastructure/user/entities/user.entity';
import { ShoppingCartProduct } from './shopping_cart_product.entity';
import { ShoppingCartDto } from '../dto/shopping-cart/shopping_cart.dto';

@Entity()
@UseDto(ShoppingCartDto)
export class ShoppingCart extends BaseEntity<ShoppingCartDto> {
  @Column({ name: 'total_price', type: 'integer', default: 0 })
  totalPrice: number;

  @Column({ name: 'total_quantity', type: 'float', default: 0.0 })
  totalQuantity: number;

  @ManyToOne(() => User, (user) => user.shoppingCarts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(
    () => ShoppingCartProduct,
    (shoppingCartProducts) => shoppingCartProducts.shoppingCart,
  )
  @JoinColumn({ name: 'shopping_cart_product_id' })
  shoppingCartProducts: ShoppingCartProduct[];
}
