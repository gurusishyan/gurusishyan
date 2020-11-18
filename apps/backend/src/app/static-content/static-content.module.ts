import { Module } from '@nestjs/common';
import { StaticContentController } from './static-content.controller';
import { StaticContentRepository } from './static-content.repository';
import { StaticContentService } from './static-content.service';

@Module({
  controllers: [StaticContentController],
  providers: [StaticContentService, StaticContentRepository],
})
export class StaticContentModule {}
