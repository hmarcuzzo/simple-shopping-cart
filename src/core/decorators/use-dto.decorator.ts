import { Constructor } from '../types/_internal';
import { BaseDto } from '../common/dto/base.dto';
import { BaseEntity } from '../common/base.entity';

export function UseDto(
  dtoClass: Constructor<BaseDto, [BaseEntity, unknown]>,
): ClassDecorator {
  return (ctor) => {
    ctor.prototype.dtoClass = dtoClass;
  };
}
