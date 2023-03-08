import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi';
import * as Joi from 'joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class UserQueryDto {
  @JoiSchema(['FIND_ALL'], Joi.string().uuid().optional())
  id?: Uuid;

  @JoiSchema(['FIND_ALL', 'EXISTS'], Joi.string().optional())
  @JoiSchema(['ORDER_BY'], Joi.string().valid('ASC', 'DESC').optional())
  login?: string;
}
