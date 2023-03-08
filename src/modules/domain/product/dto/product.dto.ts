import { Product } from '../entities/product.schema';

export class ProductDto {
  id: string;
  price: number;

  constructor(product: Product) {
    this.id = product._id;
    this.price = product.price;
  }
}
