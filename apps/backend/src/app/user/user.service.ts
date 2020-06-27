import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './user.dto';
import { UserEntity } from '../../entities';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  findUserWithUserNameAndPassword = async (
    username: string,
    password: string
  ): Promise<UserEntity> =>
    await this.userRepository.findUserWithUserNameAndPassword(
      username,
      password
    );

  findUserWithUserName = async (user_name: string): Promise<UserEntity> =>
    this.userRepository.findUserWithUserName(user_name);

  createUser = async (user: CreateUserDTO) => {
    return await this.userRepository.createUser(user);
  };
}
