import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/modules/infrastructure/auth/auth.service';
import { LoginPayloadDto } from 'src/modules/infrastructure/auth/dto/login-payload.dto';
import { UserLoginDto } from 'src/modules/infrastructure/auth/dto/user-login.dto';
import { UserDto } from '../user/dto/user.dto';
import { Auth } from '../../../core/decorators/http.decorators';
import { AuthUser } from '../../../core/decorators/auth-user.decorator';
import { User } from '../user/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { AuthMiddleware } from '../../../core/middlewares/auth.middleware';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async userLogin(
    @Body() userLoginDto: UserLoginDto,
  ): Promise<LoginPayloadDto> {
    const userEntity = await this.authService.validateUser(userLoginDto);

    const token = await this.authService.createAccessToken({
      userId: userEntity.id,
    });

    return new LoginPayloadDto(new UserDto(userEntity), token);
  }

  @Auth()
  @HttpCode(HttpStatus.OK)
  @Get('me')
  getCurrentUser(@AuthUser() user: User): UserDto {
    return new UserDto(user);
  }
}
