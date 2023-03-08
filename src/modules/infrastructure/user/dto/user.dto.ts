import { User } from '../entities/user.entity';
import { BaseDto } from '../../../../core/common/dto/base.dto';

export class UserDto extends BaseDto {
  login: string;

  constructor(user: User) {
    super(user);

    this.login = user.login;
  }
}
