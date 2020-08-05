import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Body,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginUserDTO, CreateUserDTO } from '../user/user.dto';
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
    // console.log(req.user)
    let response_html = "<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, '*');window.close();</script></html>".toString()
    response_html = response_html.replace('%value%', JSON.stringify({
      user: req.user
  }));
  return response_html
    return this.authService.googleLogin(req);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() data: LoginUserDTO) {
    return await this.authService.jwtLogin(data);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async createUser(@Body() user: CreateUserDTO) {
    return await this.authService.register(user);
  }
}
