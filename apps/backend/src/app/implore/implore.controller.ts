import {
  Controller,
  Get,
  UseGuards,
  Logger,
  Post,
  Body,
  UsePipes,
  UseInterceptors,
  UploadedFiles,
  Put,
  Param,
  HttpException,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { ImploreService } from './implore.service';
import { AuthGuard } from '../shared/guards/auth.guard';
import { CurrentUser } from '../shared/decorators/user.decorator';
import { CreateImploreDTO, UpdateImploreDTO } from './implore.dto';
import { ValidationPipe } from '../shared/pipes/validator.pipe';
import { FilesInterceptor } from '@nestjs/platform-express';
import { loggerInstance } from '@gurusishyan-logger';
@Controller('implore')
export class ImploreController {
  private logger = new Logger('ImploreController');
  private logData(options: { id?: string; user?: string; data?: any }) {
    options.id && this.logger.log('id ' + options.id);
    options.user && this.logger.log('user ' + options.user);
    options.data && this.logger.log('data ' + JSON.stringify(options.data));
  }

  constructor(private imploreService: ImploreService) {}

  @Get()
  async getAllImplores() {
    return await this.imploreService.getAllImplores();
  }

  @Get('owner')
  @UseGuards(new AuthGuard())
  async getUserAssociatedImplore(@CurrentUser('user_id') user: string) {
    this.logData({ user });
    return await this.imploreService.getImploresForAUser(user);
  }

  @Get('view/:id')
  @UseGuards(new AuthGuard())
  async viewImplore(
    @Param('id') implore_id: string,
    @CurrentUser('_id') user_id: string
  ) {
    this.logData({ user: user_id, id: implore_id });
    loggerInstance.log(`User: ${user_id} to view implore ${implore_id}`);
    return await this.imploreService.viewImplore(implore_id, user_id);
  }

  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FilesInterceptor('files[]', 10))
  async getUserAssociatedImplores(
    @UploadedFiles() uploads,
    @CurrentUser('_id') user: any,
    @Body() data: CreateImploreDTO
  ) {
    this.logData({ user, data });
    return await this.imploreService.saveImplore(uploads, data, user);
  }

  @Put(':id')
  @UseGuards(new AuthGuard())
  @UseInterceptors(FilesInterceptor('files[]', 10))
  @UsePipes(new ValidationPipe())
  async updateImplore(
    @Body() data: UpdateImploreDTO,
    @UploadedFiles() uploads,
    @CurrentUser('_id') user_id: string
  ) {
    if (data.author !== user_id) {
      throw new HttpException(
        'You are not owner of this implore',
        HttpStatus.BAD_REQUEST
      );
    }
    return await this.imploreService.updateImplore(data, user_id, uploads);
  }

  @Put('upvote/:id')
  @UseGuards(new AuthGuard())
  async upvoteImplore(
    @Param('id') implore_id: string,
    @CurrentUser('_id') user_id: string
  ) {
    this.logData({ user: user_id, id: implore_id });
    loggerInstance.log(`User: ${user_id} to upvote implore ${implore_id}`);
    return await this.imploreService.upvoteImplore(implore_id, user_id);
  }

  @Put('downvote/:id')
  @UseGuards(new AuthGuard())
  async downvoteImplore(
    @Param('id') implore_id: string,
    @CurrentUser('_id') user_id: string
  ) {
    this.logData({ user: user_id, id: implore_id });
    loggerInstance.log(`User: ${user_id} to downvote implore ${implore_id}`);
    return await this.imploreService.downvoteImplore(implore_id, user_id);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  async deleteImplore(
    @Param('id') implore_id: string,
    @CurrentUser('_id') user_id: string
  ) {
    return await this.imploreService.deleteImplore(implore_id, user_id);
  }
}
