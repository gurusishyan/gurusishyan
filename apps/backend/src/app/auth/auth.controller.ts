import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Body,
  UsePipes,
  Param,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginUserDTO,
  CreateUserDTO,
  CreateTeacherDTO,
  CreateGoogleUserDTO,
  ResetPasswordRequestDTO,
  CreateStudentDTO,
} from '../user/user.dto';
import { ValidationPipe } from '../shared/pipes/validator.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard('google'))
  // @Get()
  // googleAuth(@Req() req) {}

  @Post('google/callback')
  @UsePipes(new ValidationPipe())
  async googleAuthRedirect(@Body() userDet: CreateGoogleUserDTO) {
    return this.authService.googleLogin(userDet);
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

  @Post('request-reset-password')
  async requestResetPassword(@Query('email') email_id: string) {
    return await this.authService.requestReserPassword(email_id);
  }
  @Post('reset-password')
  @UsePipes(new ValidationPipe())
  async resetPassword(@Body() data: ResetPasswordRequestDTO) {
    return await this.authService.resetPassword(data);
  }

  @Post('register/student')
  @UsePipes(new ValidationPipe())
  async registerStudent(@Body() data:CreateStudentDTO){
    return data
  }
}
