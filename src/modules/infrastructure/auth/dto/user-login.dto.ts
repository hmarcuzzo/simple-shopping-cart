import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class UserLoginDto {
  @ApiProperty()
  @JoiSchema(['LOGIN'], Joi.string().required())
  login: string;

  @ApiProperty()
  @JoiSchema(['LOGIN'], Joi.string().required())
  password: string;
}
