import { Module } from '@nestjs/common';
import { VibeController } from './vibe.controller';
import { VibeService } from './vibe.service';
import { VibeRepository } from './vibe.repository';

@Module({
  controllers: [VibeController],
  providers: [VibeService, VibeRepository],
  exports: [VibeService],
})
export class VibeModule {}
