import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenType } from '../../../core/constants/enums/token_type';
import { UserInterface } from '../user/user.interface';
import { User } from '../user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userInterface: UserInterface) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(args: { userId: Uuid; type: TokenType }): Promise<User> {
    if (args.type !== TokenType.ACCESS_TOKEN) {
      throw new UnauthorizedException();
    }
    const user = await this.userInterface.findOneUser({
      id: args.userId,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
