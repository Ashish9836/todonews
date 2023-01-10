import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/todo/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
require('dotenv').config();
import { LocalStrategy } from './local.strategy';
@Module({
  imports:[UserModule,PassportModule,JwtModule.register({
    secret:process.env.JWT_SECRET,
    signOptions:{expiresIn:"6000s"}
  })],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
