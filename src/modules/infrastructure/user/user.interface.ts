import { Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { FindConditions } from 'typeorm';
import { User } from './entities/user.entity';

export class UserInterface {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  async findOneUser(findData: FindConditions<User>): Promise<User> {
    return this.userService.findOneUser(findData);
  }
}
