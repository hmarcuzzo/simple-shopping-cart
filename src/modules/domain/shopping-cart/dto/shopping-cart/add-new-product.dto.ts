import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import * as Joi from 'joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class AddNewProductDto {
  @ApiProperty()
  @JoiSchema(['CREATE'], Joi.number().required())
  quantity: number;

  @ApiProperty()
  @JoiSchema(['CREATE'], Joi.string().uuid().required())
  shoppingCartId: Uuid;

  @ApiProperty()
  @JoiSchema(['CREATE'], Joi.string().uuid().required())
  productId: Uuid;
}
