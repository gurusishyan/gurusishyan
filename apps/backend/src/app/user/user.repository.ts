import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

export class UserRepository {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  ) {}

  findUserWithUserNameAndPassword = async (
    user_name: string,
    password: string
  ): Promise<UserEntity> =>
    await this.userRepository.findOne({
      where: { user_name, password },
    });

  findUserWithUserName = async (user_name: string): Promise<UserEntity> =>
    await this.userRepository.findOne({ where: { user_name } });

  createUser = async (
    new_user: CreateUserDTO
  ): Promise<Partial<UserEntity>> => {
    const user = await this.userRepository.findOne({
      where: { user_name: new_user.user_name },
    });
    if (user) {
      throw new HttpException('User Already Exists', HttpStatus.CONFLICT);
    } else {
      const entity_user = this.userRepository.create(new_user);
      const saved_user = await this.userRepository.save(entity_user);
      return saved_user.toResponseObject();
    }
  };
}
