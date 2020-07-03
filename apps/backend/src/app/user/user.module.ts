import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../entities';

@Module({
  controllers: [UserController],
  providers: [UserService,UserRepository],
  exports:[UserService],
  imports:[TypeOrmModule.forFeature([UserEntity])]
})
export class UserModule {}
