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
import {
  LoginUserDTO,
  CreateUserDTO,
  CreateTeacherDTO,
} from '../user/user.dto';
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

  @Post('register')
  @UsePipes(new ValidationPipe())
  async createUser(@Body() user: CreateUserDTO) {
    return await this.authService.register(user);
  }

  @Post('register/teacher')
  @UsePipes(new ValidationPipe())
  async registerTeacher(@Body() newTeacher: CreateTeacherDTO) {
    return await this.authService.registerTeacher(newTeacher);
  }
}
