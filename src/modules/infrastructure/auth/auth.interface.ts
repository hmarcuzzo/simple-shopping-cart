import { Inject } from '@nestjs/common';
import { AuthService } from 'src/modules/infrastructure/auth/auth.service';
import { TokenPayloadDto } from 'src/modules/infrastructure/auth/dto/token-payload.dto';
import { UserLoginDto } from 'src/modules/infrastructure/auth/dto/user-login.dto';
import { User } from '../user/entities/user.entity';

export class AuthInterface {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  async createAccessToken(data: { userId: Uuid }): Promise<TokenPayloadDto> {
    return this.authService.createAccessToken(data);
  }

  async validateUser(userLoginDto: UserLoginDto): Promise<User> {
    return this.authService.validateUser(userLoginDto);
  }
}
