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
} from '@nestjs/common';
import { ImploreService } from './implore.service';
import { AuthGuard } from '../shared/guards/auth.guard';
import { CurrentUser } from '../shared/decorators/user.decorator';
import { CreateImploreDTO } from './implore.dto';
import { ValidationPipe } from '../shared/pipes/validator.pipe';
import { MultipleFormData } from '../shared/decorators/form-data.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
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
  @UseGuards(new AuthGuard())
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
}
