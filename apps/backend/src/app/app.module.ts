import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { VibeEntity } from '../entities/vibes/vibes.entity';
import { ImploreEntity } from '../entities/implore/implore.entity';
import { UserEntity } from '../entities/user/user.entity';
@Module({
  imports: [TypeOrmModule.forRoot({
    "type":"postgres",
    "host":process.env.DB_HOST,
    "port":parseInt(process.env.DB_PORT,10),
    "username":process.env.DB_USERNAME,
    "password":process.env.DB_PASSWORD,
    "database":process.env.DATABASE_NAME,
    "synchronize":true,
    "logging":true
})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
