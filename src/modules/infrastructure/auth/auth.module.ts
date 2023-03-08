import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { AuthController } from 'src/modules/infrastructure/auth/auth.controller';
import { AuthInterface } from 'src/modules/infrastructure/auth/auth.interface';
import { AuthService } from 'src/modules/infrastructure/auth/auth.service';
import { JwtStrategy } from 'src/modules/infrastructure/auth/jwt.strategy';
import { UserModule } from '../user/user.module';

dotenv.config();

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: parseInt(process.env.JWT_EXPIRATION_TIME) },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthInterface],
  exports: [JwtModule, AuthInterface],
})
export class AuthModule {}
