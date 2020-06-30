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

  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FilesInterceptor('files[]', 10))
  async getUserAssociatedImplores(
    @UploadedFiles() uploads,
    @CurrentUser('user_id') user: string,
    @Body() data: CreateImploreDTO
  ) {
    this.logData({ user, data });
    return await this.imploreService.saveImplore(uploads, data, user);
  }

  @Put(':id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FilesInterceptor('files[]', 10))
  async updateImplore(@Body() data: UpdateImploreDTO) {
    return data;
  }

  @Put('upvote/:id')
  @UseGuards(new AuthGuard())
  async upvoteImplore(
    @Param('id') implore_id: string,
    @CurrentUser('user_name') user_name: string
  ) {
    this.logData({ user: user_name, id: implore_id });
    loggerInstance.log(`User: ${user_name} to upvote implore ${implore_id}`);
    return await this.imploreService.upvoteImplore(implore_id, user_name);
  }
}
