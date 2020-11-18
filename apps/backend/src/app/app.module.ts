import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';

import { UserModule } from './user/user.module';
import { ImploreModule } from './implore/implore.module';
import { SharedModule } from './shared/shared.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HttpInterceptor } from './shared/interceptors/http/http.interceptor';
import { HttpErrorFilter } from './shared/filters/http/http.filter';

import { LoggerInterceptor } from './shared/interceptors/logger/logger.interceptor';
import { StaticDataModule } from './static_data/static-data.module';
import { AuthModule } from './auth/auth.module';
import { StaticContentModule } from './static-content/static-content.module';
@Module({
  imports: [
    ImploreModule,
    UserModule,
    SharedModule,
    StaticDataModule,
    AuthModule,
    StaticContentModule,
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
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
