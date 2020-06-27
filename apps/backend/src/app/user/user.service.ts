import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  findUserWithUserNameAndPassword = async (username, password) =>
    await this.userRepository.findUserWithUserNameAndPassword(
      username,
      password
    );

  createUser = async (user: CreateUserDTO) => {
    return await this.userRepository.createUser(user);
  };
}
