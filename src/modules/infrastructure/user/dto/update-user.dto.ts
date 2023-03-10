import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import * as Joi from 'joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class UpdateUserDto {
  @ApiProperty()
  @JoiSchema(['UPDATE'], Joi.string())
  login: string;

  @ApiProperty()
  @JoiSchema(['UPDATE'], Joi.string().optional().allow(null))
  password?: string;
}
