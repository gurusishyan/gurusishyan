import { Module } from '@nestjs/common';
import { StaticDataService } from './static_data.service';
import { StaticDataController } from './static_data.controller';
import { StaticDataRepository } from './static_data.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaticDataEntity } from '../../entities';

@Module({
  providers: [StaticDataService, StaticDataRepository],
  controllers: [StaticDataController],
  exports: [StaticDataService],
  imports: [TypeOrmModule.forFeature([StaticDataEntity])],
})
export class StaticDataModule {}
