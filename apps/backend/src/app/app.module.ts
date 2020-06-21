import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VibeModule } from './vibe/vibe.module';
import { UserModule } from './user/user.module';
import { ImploreModule } from './implore/implore.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import {
  ImploreEntity,
  VibeEntity,
  UserEntity,
  StaticDataEntity,
} from '../entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: true,
      logging: false,
      entities: [ImploreEntity, VibeEntity, UserEntity, StaticDataEntity],
    }),
    ImploreModule,
    VibeModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
