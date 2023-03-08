import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../../../../core/decorators/http.decorators';
import { AuthUser } from '../../../../core/decorators/auth-user.decorator';
import { ShoppingCartService } from '../services/shopping_cart.service';
import { User } from '../../../infrastructure/user/entities/user.entity';
import { ShoppingCartDto } from '../dto/shopping-cart/shopping_cart.dto';
import { JoiPipe } from 'nestjs-joi';
import { AddNewProductDto } from '../dto/shopping-cart/add-new-product.dto';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { DeleteResult } from 'typeorm';
import { RemoveProductDto } from '../dto/shopping-cart/remove-product.dto';

@ApiTags('Shopping Cart')
@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Auth()
  @Get('/user-cart/get')
  async findOne(@AuthUser() user: User): Promise<ShoppingCartDto> {
    return await this.shoppingCartService.findOneShoppingCart(user.id);
  }

  @Auth()
  @Post('/new-product/create')
  async addNewProduct(
    @Body(new JoiPipe({ group: 'CREATE' }))
    addNewProductDto: AddNewProductDto,
    @AuthUser() user: User,
  ): Promise<UpdateResult> {
    return await this.shoppingCartService.addNewProduct(
      addNewProductDto,
      user.id,
    );
  }

  @Auth()
  @Delete('/product/delete')
  async remove(
    @Body(new JoiPipe({ group: 'DELETE' }))
    removeProductDto: RemoveProductDto,
    @AuthUser() user: User,
  ): Promise<DeleteResult> {
    return await this.shoppingCartService.removeProduct(
      removeProductDto,
      user.id,
    );
  }
}
