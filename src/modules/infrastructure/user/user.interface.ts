import { Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { FindConditions } from 'typeorm';
import { User } from './entities/user.entity';

export class UserInterface {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  async findOneUser(findData: FindConditions<User>): Promise<User> {
    return this.userService.findOneUser(findData);
  }
  //
  // async updateLastAccess(id: Uuid) {
  //   return await this.userService.updateLastAccess(id);
  // }
  //
  // async createUsuario(
  //   usuarioDto: CreateUsuarioDto,
  //   manager?: EntityManager,
  // ): Promise<Usuario> {
  //   return await this.userService.createUsuario(usuarioDto, manager);
  // }
  //
  // async updateUsuario(
  //   id: Uuid,
  //   usuarioDto: UpdateUsuarioDto,
  //   manager?: EntityManager
  // ) {
  //   return await this.userService.updateUsuario(id, usuarioDto, manager)
  // }
}
