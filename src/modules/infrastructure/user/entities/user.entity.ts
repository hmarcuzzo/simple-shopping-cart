import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { UseDto } from '../../../../core/decorators/use-dto.decorator';
import { BaseEntity } from '../../../../core/common/base.entity';
import { ShoppingCart } from '../../../domain/shopping-cart/entities/shopping_cart.entity';
import { generateHash } from '../../../../core/utils/hash.utils';

@Entity()
@UseDto(UserDto)
export class User extends BaseEntity<UserDto> {
  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @OneToMany(() => ShoppingCart, (shoppingCart) => shoppingCart.user)
  @JoinColumn({ name: 'shopping_cart_id' })
  shoppingCarts: ShoppingCart[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = generateHash(this.password);
  }
}
