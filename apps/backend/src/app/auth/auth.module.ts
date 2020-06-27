import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { UserService } from '../user/user.service';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';

@Module({
  providers: [AuthService, GoogleStrategy],
  imports:[SharedModule,UserModule],
  controllers: [AuthController],
})
export class AuthModule {}
