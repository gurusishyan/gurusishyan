import { Module } from '@nestjs/common';
import { StaticDataService } from './static_data.service';
import { StaticDataController } from './static_data.controller';
import { StaticDataRepository } from './static_data.repository';
import { StaticDataEntity } from '../../entities';

@Module({
  providers: [StaticDataService, StaticDataRepository],
  controllers: [StaticDataController],
  exports: [StaticDataService],
})
export class StaticDataModule {}
