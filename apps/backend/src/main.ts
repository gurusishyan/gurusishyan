/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import * as mongoose from 'mongoose';
import { Logger, INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { loggerInstance } from '@gurusishyan-logger';
import { AppModule } from './app/app.module';
import { existsSync, mkdirSync } from 'fs';
function bindSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('GuruSishyan')
    .setDescription('To make education simple and free')
    .setVersion('1.0')
    .addTag('API Spec')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}
export const mongooseConnection = mongoose.connect(
  process.env.DB_URL,
  {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      Logger.error(`Error :: ${err}\n`, 'DatabaseConnection');
    } else {
      Logger.log(
        'Succesfully connected to Database\n',
        'DatabaseConnection',
        false
      );
    }
  }
);
async function bootstrap() {
  loggerInstance.log('Initializing Nest Module', 'info');
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  const host = process.env.HOST || '0.0.0.0';
  const protocol = process.env.API_PROTOCOL || 'http';
  if (!existsSync(process.env.BASE_DIR_PATH)) {
    mkdirSync(process.env.BASE_DIR_PATH, { recursive: true });
  }
  if (process.env.NODE_ENV === 'development') {
    bindSwagger(app);
    Logger.log(
      `Swagger running at ${protocol}://${host}:${port}/api-docs`,
      'SwaggerModule'
    );
  }
  await app.listen(port, host, () => {
    Logger.log(
      `Gurusishyan server running at ${protocol}://${host}:${port}/${globalPrefix}`,
      'BootstrapModule',
      false
    );
    loggerInstance.log(
      `Nest App Initialized and successfully running at ${protocol}://${host}:${port}/${globalPrefix}`
    );
  });
}

bootstrap();
