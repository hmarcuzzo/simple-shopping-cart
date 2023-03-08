import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { validateHash } from 'src/core/utils/hash.utils';
import { TokenPayloadDto } from 'src/modules/infrastructure/auth/dto/token-payload.dto';
import { UserLoginDto } from 'src/modules/infrastructure/auth/dto/user-login.dto';
import { User } from '../user/entities/user.entity';
import { UserInterface } from '../user/user.interface';
import { TokenType } from '../../../core/constants/enums/token_type';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userInterface: UserInterface,
  ) {}

  async createAccessToken(data: { userId: Uuid }): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      expiresIn: parseInt(process.env.JWT_EXPIRATION_TIME),
      accessToken: await this.jwtService.signAsync({
        userId: data.userId,
        type: TokenType.ACCESS_TOKEN,
      }),
    });
  }

  async validateUser(userLoginDto: UserLoginDto): Promise<User> {
    const user = await this.userInterface.findOneUser({
      login: userLoginDto.login,
    });

    const isPasswordValid = await validateHash(
      userLoginDto.password,
      user?.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    return user!;
  }
}
