import { Module } from '@nestjs/common';
import { ImploreService } from './implore.service';
import { ImploreController } from './implore.controller';
import { ImploreRepository } from './implore.repository';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    SharedModule,
    UserModule
  ],
  providers: [ImploreService, ImploreRepository],
  controllers: [ImploreController],
  exports: [ImploreService],
})
export class ImploreModule {}
