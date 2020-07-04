import {
  Controller,
  Post,
  Body,
  UsePipes,
  UseGuards,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './user.dto';
import { ValidationPipe } from '../shared/pipes/validator.pipe';
import { AuthGuard } from '../shared/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(new AuthGuard())
  async getAllUsers() {
    return await this.userService.findAllUsers();
  }
}
