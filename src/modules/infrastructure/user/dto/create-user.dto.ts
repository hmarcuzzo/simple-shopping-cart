import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import * as Joi from 'joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class CreateUserDto {
  @ApiProperty()
  @JoiSchema(['CREATE'], Joi.string().required())
  login: string;

  @ApiProperty()
  @JoiSchema(['CREATE'], Joi.string().required())
  password: string;
}
