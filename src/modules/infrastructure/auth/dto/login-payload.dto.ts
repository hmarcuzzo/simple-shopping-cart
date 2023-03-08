import { TokenPayloadDto } from 'src/modules/infrastructure/auth/dto/token-payload.dto';
import { UserDto } from '../../user/dto/user.dto';

export class LoginPayloadDto {
  user: UserDto;

  token: TokenPayloadDto;

  constructor(user: UserDto, token: TokenPayloadDto) {
    this.user = user;
    this.token = token;
  }
}
