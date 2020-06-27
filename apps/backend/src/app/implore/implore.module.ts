import { Module } from '@nestjs/common';
import { ImploreService } from './implore.service';
import { ImploreController } from './implore.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImploreEntity } from '../../entities';
import { ImploreRepository } from './implore.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ImploreEntity])],
  providers: [ImploreService,ImploreRepository],
  controllers: [ImploreController],
  exports:[ImploreService]
})
export class ImploreModule {}
