/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {loggerInstance} from '@gurusishyan-logger'
import { AppModule } from './app/app.module';
async function bootstrap() {
  loggerInstance.log('Initializing Nest Module',"info")
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  const host = process.env.HOST || '0.0.0.0'
  const protocol = process.env.API_PROTOCOL || 'http'
  await app.listen(port, host,() => {
    Logger.log(`Gurusishyan server running at ${protocol}://${host}:${port}/${globalPrefix}\n`,'BootstrapModule',false);
    loggerInstance.log(`Nest App Initialized and successfully running at ${protocol}://${host}:${port}/${globalPrefix}`)
  });
}

bootstrap();
