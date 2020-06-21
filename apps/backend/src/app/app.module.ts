import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';

import { VibeModule } from './vibe/vibe.module';
import { UserModule } from './user/user.module';
import { ImploreModule } from './implore/implore.module';
import { SharedModule } from './shared/shared.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HttpInterceptor } from './shared/interceptors/http/http.interceptor';
import { HttpErrorFilter } from './shared/filters/http/http.filter';

import {
  ImploreEntity,
  VibeEntity,
  UserEntity,
  StaticDataEntity,
} from '../entities';
import * as winston from 'winston'
import { LoggerInterceptor } from './shared/interceptors/logger/logger.interceptor';
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
    SharedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide:APP_INTERCEPTOR,
      useClass:LoggerInterceptor
    }
  ],
})
export class AppModule {}
