import { Module } from '@nestjs/common';
import { ImploreService } from './implore.service';
import { ImploreController } from './implore.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImploreEntity, UserEntity, VibeEntity } from '../../entities';
import { ImploreRepository } from './implore.repository';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImploreEntity, UserEntity, VibeEntity]),
    SharedModule,
    UserModule
  ],
  providers: [ImploreService, ImploreRepository],
  controllers: [ImploreController],
  exports: [ImploreService],
})
export class ImploreModule {}
