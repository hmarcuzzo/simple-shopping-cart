import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class UpdateProductDto {
  @ApiProperty()
  @JoiSchema(['UPDATE'], Joi.number().optional().allow(null))
  price?: number;
}
