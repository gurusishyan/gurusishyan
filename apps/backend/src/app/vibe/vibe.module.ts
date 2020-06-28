import { Module } from '@nestjs/common';
import { VibeController } from './vibe.controller';
import { VibeService } from './vibe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VibeEntity, UserEntity, ImploreEntity } from '../../entities';
import { VibeRepository } from './vibe.repository';

@Module({
  controllers: [VibeController],
  providers: [VibeService, VibeRepository],
  imports: [TypeOrmModule.forFeature([VibeEntity, UserEntity, ImploreEntity])],
  exports: [VibeService],
})
export class VibeModule {}
