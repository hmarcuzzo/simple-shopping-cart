import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { JoiPipe } from 'nestjs-joi';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserService } from './user.service';
import { UserQueryDto } from './dto/user-query.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateResult } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from '../../../core/decorators/http.decorators';
import { AuthUser } from '../../../core/decorators/auth-user.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: 200, description: 'When user exists' })
  @ApiResponse({ status: 422, description: 'When user not exists' })
  @Get('/exists')
  @HttpCode(HttpStatus.OK)
  async exists(
    @Query(new JoiPipe({ group: 'EXISTS' })) query: UserQueryDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (Object.keys(query).length === 0)
      throw new BadRequestException('Query must be declared');
    try {
      await this.userService.findOneUserQuery(query);
    } catch {
      response.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
    }
    return;
  }

  @Post('/create')
  async createUser(
    @Body(new JoiPipe({ group: 'CREATE' }))
    createUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }

  @Auth()
  @Put('/update')
  async updateUser(
    @Body(new JoiPipe({ group: 'UPDATE' })) updateUserDto: UpdateUserDto,
    @AuthUser() user: User,
  ): Promise<UpdateResult> {
    return await this.userService.updateUser(user.id, updateUserDto);
  }
}
