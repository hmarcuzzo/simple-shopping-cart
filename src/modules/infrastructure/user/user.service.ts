import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserQueryDto } from './dto/user-query.dto';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { FindConditions } from 'typeorm';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { UpdateUserDto } from './dto/update-user.dto';
import { generateHash } from '../../../core/utils/hash.utils';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOneUserQuery(query: UserQueryDto): Promise<User> {
    return await this.userRepository.findOneOrFail({ where: query });
  }

  async findOneUser(findData: FindConditions<User>): Promise<User> {
    return await this.userRepository.findOneOrFail(findData);
  }

  async updateUser(id: Uuid, userDto: UpdateUserDto): Promise<UpdateResult> {
    if (userDto.login) {
      const user = await this.findOneUser({ login: userDto.login });
      if (user && user.id !== id) {
        throw new Error('Login already exists');
      }
    }

    if (userDto.password) {
      userDto.password = generateHash(userDto.password);
    }

    return await this.userRepository.update(id, userDto);
  }

  async createUser(userDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(userDto);
    return await this.userRepository.save(user);
  }
}
