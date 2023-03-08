import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import * as Joi from 'joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class CreateProductDto {
  @ApiProperty()
  @JoiSchema(['CREATE'], Joi.number().required())
  price: number;
}
