import { Inject } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';

export class ProductInterface {
  constructor(
    @Inject(ProductService)
    private readonly productService: ProductService,
  ) {}

  async getProduct(produc_id: Uuid): Promise<ProductDto> {
    return await this.productService.findOneProduct(produc_id);
  }
}
