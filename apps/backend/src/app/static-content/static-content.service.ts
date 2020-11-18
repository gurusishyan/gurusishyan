import { Injectable } from '@nestjs/common';
import { StaticContentRepository } from './static-content.repository';

@Injectable()
export class StaticContentService {
  constructor(private staticContentRepository: StaticContentRepository) {}

  getStaticContentForRoute = async (routeName: string, locale: string) =>
    await this.staticContentRepository.getStaticContentForRoute(routeName, locale);
}
