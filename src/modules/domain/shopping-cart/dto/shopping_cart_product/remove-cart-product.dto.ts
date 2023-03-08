import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import * as Joi from 'joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class RemoveCartProductDto {
  @ApiProperty()
  @JoiSchema(['DELETE'], Joi.string().uuid().required())
  shoppingCartId: Uuid;

  @ApiProperty()
  @JoiSchema(['DELETE'], Joi.string().uuid().required())
  productId: Uuid;
}
