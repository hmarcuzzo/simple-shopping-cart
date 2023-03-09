import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import * as Joi from 'joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class UpdateProductDto {
  @ApiProperty()
  @JoiSchema(['UPDATE'], Joi.number().optional().allow(null))
  price?: number;
}
