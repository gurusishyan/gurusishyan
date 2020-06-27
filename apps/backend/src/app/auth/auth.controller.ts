import {
  Controller,
  Get,
  UseGuards,
  Req,
  Request,
  Post,
  Body,
  UsePipes,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginUserDTO } from '../user/user.dto';
import { ValidationPipe } from '../shared/pipes/validator.pipe';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('google'))
  @Get()
  googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() data: LoginUserDTO) {
    return await this.authService.jwtLogin(data);
  }
}
