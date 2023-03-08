import { BaseEntity } from '../base.entity';

export interface BaseDtoOptions {
  excludeFields?: boolean;
}

export class BaseDto {
  id: Uuid;

  constructor(entity: BaseEntity, options?: BaseDtoOptions) {
    if (!options?.excludeFields) {
      this.id = entity.id;
    }
  }
}
