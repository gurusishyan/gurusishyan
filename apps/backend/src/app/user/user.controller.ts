import {
  Controller,
  Post,
  Body,
  UsePipes,
  UseGuards,
  Get,
  Put,
  Param,
  Logger,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './user.dto';
import { ValidationPipe } from '../shared/pipes/validator.pipe';
import { AuthGuard } from '../shared/guards/auth.guard';
import { CurrentUser } from '../shared/decorators/user.decorator';

@Controller('user')
export class UserController {
  private logger = new Logger('UserController');

  logData(options: { _id?: string; param?: string; data?: any }) {
    options._id && this.logger.log('_id: ' + options._id);
    options.param && this.logger.log('param: ' + options.param);
    options.data && this.logger.log('data: ' + options.data);
  }
  constructor(private userService: UserService) {}

  @Get()
  // @UseGuards(new AuthGuard())
  async getAllUsers() {
    // this.logData({ _id });
    return await this.userService.findAllUsers();
  }

  @UseGuards(new AuthGuard())
  @Put('bookmark/implore/:id')
  async bookmarkImplore(
    @CurrentUser('_id') user_id: string,
    @Param('id') _id: string
  ) {
    return await this.userService.bookmarkImplore(user_id, _id);
  }

  @UseGuards(new AuthGuard())
  @Put('bookmark/vibe/:id')
  async bookmarkVibe(
    @CurrentUser('_id') user_id: string,
    @Param('id') _id: string
  ) {
    return await this.userService.bookmarkVibe(user_id, _id);
  }
}
