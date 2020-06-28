import { Controller, Get, UseGuards, Logger } from '@nestjs/common';
import { ImploreService } from './implore.service';
import { AuthGuard } from '../shared/guards/auth.guard';

@Controller('implore')
export class ImploreController {
  private logData(options: { id?: string; user?: string; data?: any }) {
    options.id && Logger.log('id ' + options.id);
    options.user && Logger.log('user ' + options.user);
    options.data && Logger.log('data ' + options.data);
  }

  constructor(private imploreService: ImploreService) {}

  @Get()
  @UseGuards(new AuthGuard())
  async getAllImplores() {
      return await this.imploreService.getAllImplores()
  }
}
