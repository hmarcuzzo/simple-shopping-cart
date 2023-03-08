import { EntityRepository, Repository } from 'typeorm';
import { ShoppingCart } from '../entities/shopping_cart.entity';

@EntityRepository(ShoppingCart)
export class ShoppingCartRepository extends Repository<ShoppingCart> {}
