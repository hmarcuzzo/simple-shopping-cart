import { EntityRepository, Repository } from 'typeorm';
import { ShoppingCartProduct } from '../entities/shopping_cart_product.entity';

@EntityRepository(ShoppingCartProduct)
export class ShoppingCartProductRepository extends Repository<ShoppingCartProduct> {}
