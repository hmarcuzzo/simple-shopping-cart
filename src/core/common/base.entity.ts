import {
  BaseEntity as TypeOrmBaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseDto } from './dto/base.dto';
import { Constructor } from '../types/_internal';

export interface IBaseEntity<DTO extends BaseDto, O = never> {
  id: Uuid;

  toDto(options?: O): DTO;
}

export abstract class BaseEntity<DTO extends BaseDto = BaseDto, O = never>
  extends TypeOrmBaseEntity
  implements IBaseEntity<DTO, O>
{
  @PrimaryGeneratedColumn('uuid')
  id: Uuid;

  private dtoClass: Constructor<DTO, [BaseEntity, O?]>;

  toDto(options?: O): DTO {
    const dtoClass = this.dtoClass;

    if (!dtoClass) {
      throw new Error(
        `You need to use @UseDto on class (${this.constructor.name}) be able to call toDto function`,
      );
    }

    return new this.dtoClass(this, options);
  }
}
