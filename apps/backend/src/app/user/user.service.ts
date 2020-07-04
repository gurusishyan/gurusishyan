import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './user.dto';
import { IUserSchema, User } from '../../entities';
import { SharedService } from '../shared/shared.service';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  commonService = new SharedService();
  findAllUsers = async () => await this.userRepository.findAllUsers();

  findUserWithUserNameAndPassword = async (
    username: string,
    password: string
  ): Promise<IUserSchema> => {
    return await this.userRepository.findUserWithUserNameAndPassword(
      username,
      password
    );
  };

  findUserWithID = async (_id: string): Promise<IUserSchema> =>
    await User.findOne({ _id })
      .then((user) => user)
      .catch((err) => this.commonService.sendErrorMessage(err));

  findUserWithUserName = async (user_name: string): Promise<IUserSchema> =>
    this.userRepository.findUserWithUserName(user_name);

  createUser = async (user: CreateUserDTO) => {
    return await this.userRepository.createUser(user);
  };
}
