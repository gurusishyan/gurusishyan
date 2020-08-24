import {
  Controller,
  UseGuards,
  Get,
  Put,
  Param,
  Logger,
  Delete,
  forwardRef,
  Inject,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../shared/guards/auth.guard';
import { CurrentUser } from '../shared/decorators/user.decorator';
import { RoleGuard } from '../shared/guards/role.guard';
import { Roles } from '../shared/decorators/roles.decorator';

@Controller('user')
export class UserController {
  private logger = new Logger('UserController');

  logData(options: { _id?: string; param?: string; data?: any }) {
    options._id && this.logger.log('_id: ' + options._id);
    options.param && this.logger.log('param: ' + options.param);
    options.data && this.logger.log('data: ' + options.data);
  }
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService
  ) {}

  @Get()
  // @UseGuards(new AuthGuard())
  async getAllUsers() {
    // this.logData({ _id });
    return await this.userService.findAllUsers();
  }

  @Get('me')
  @UseGuards(new AuthGuard())
  async getMyDetails(@Req() req) {
    return await this.userService.findUserWithID(req.user._id);
  }

  @UseGuards(new AuthGuard())
  @Put('bookmark/implore/:id')
  async bookmarkImplore(
    @CurrentUser('_id') user_id: string,
    @Param('id') _id: string
  ) {
    this.logData({ _id, data: _id });
    return await this.userService.bookmarkImplore(user_id, _id);
  }

  @UseGuards(new AuthGuard(), RoleGuard)
  @Roles('ADMIN')
  @Put('bookmark/vibe/:id')
  async bookmarkVibe(
    @CurrentUser('_id') user_id: string,
    @Param('id') _id: string
  ) {
    this.logData({ _id, data: _id });
    return await this.userService.bookmarkVibe(user_id, _id);
  }

  @UseGuards(new AuthGuard(), RoleGuard)
  @Roles('ADMIN')
  @Put('role/:role')
  async updateRole(
    @CurrentUser('_id') _id: string,
    @Param('role') role: string
  ) {
    this.logData({ _id, data: role });
    return await this.userService.updateRole(_id, role);
  }

  @UseGuards(new AuthGuard(), RoleGuard)
  @Roles('ADMIN', 'OTHERS', 'TEACHER', 'STUDENT')
  @Put('unbookmark/implore/:id')
  async unBookmarkImplore(
    @CurrentUser('_id') _id: string,
    @Param('id') implore_id: string
  ) {
    this.logData({ _id, data: implore_id });
    return await this.userService.unBookmarkImplore(_id, implore_id);
  }

  @UseGuards(new AuthGuard(), RoleGuard)
  @Roles('ADMIN', 'OTHERS', 'TEACHER', 'STUDENT')
  @Put('unbookmark/vibe/:id')
  async unBookmarkVibe(
    @CurrentUser('_id') _id: string,
    @Param('id') vibe_id: string
  ) {
    this.logData({ _id, data: vibe_id });
    return await this.userService.unBookmarkVibe(_id, vibe_id);
  }

  @UseGuards(new AuthGuard(), RoleGuard)
  @Roles('ADMIN', 'OTHERS', 'TEACHER', 'STUDENT')
  @Delete(':id')
  async deleteUser(
    @Param('id') user_id: string,
    @CurrentUser('_id') _id: string
  ) {
    if (_id === user_id) {
      return await this.userService.deleteUser(_id);
    }
    throw new HttpException(
      'You are not allowed to do this.',
      HttpStatus.NOT_IMPLEMENTED
    );
  }
}
