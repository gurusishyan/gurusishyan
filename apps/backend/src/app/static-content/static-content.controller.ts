import { Controller, Get, Param, Query } from '@nestjs/common';
import { StaticContentService } from './static-content.service';

@Controller('static-content')
export class StaticContentController {
  constructor(private staticContentService: StaticContentService) {}

  @Get('label')
  async getLabelForRouteName(
    @Query('routeName') routeName: string,
    @Query('locale') locale: string
  ) {
    return await this.staticContentService.getStaticContentForRoute(
      routeName,
      locale
    );
  }
}
