import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../../../core/decorators/http.decorators';
import { JoiPipe } from 'nestjs-joi';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDto } from './dto/product.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Auth()
  @Post('/create')
  async createProduct(
    @Body(new JoiPipe({ group: 'CREATE' }))
    createProductDto: CreateProductDto,
  ): Promise<ProductDto> {
    return await this.productService.createProduct(createProductDto);
  }
  @Auth()
  @Put('/update/:id')
  async updateProduct(
    @Param('id') id: Uuid,
    @Body(new JoiPipe({ group: 'UPDATE' }))
    updateProductDto: UpdateProductDto,
  ): Promise<ProductDto> {
    return await this.productService.updateProduct(id, updateProductDto);
  }

  @Auth()
  @Delete('/delete/:id')
  async deleteProduct(@Param('id') id: Uuid): Promise<void> {
    return await this.productService.deleteProduct(id);
  }

  @Auth()
  @Get('/get')
  async findAll(): Promise<ProductDto[]> {
    return await this.productService.findAllProduct();
  }

  @Auth()
  @Get('/get/:id')
  async findOne(@Param('id') id: Uuid): Promise<ProductDto> {
    return await this.productService.findOneProduct(id);
  }
}
