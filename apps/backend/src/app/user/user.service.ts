import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './user.dto';
import { IUserSchema } from '../../entities';
import { SharedService } from '../shared/shared.service';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  commonService = new SharedService();
  findAllUsers = async () => await this.userRepository.findAllUsers();

  findUserWithUserNameAndPassword = async (
    username: string,
    password: string
  ): Promise<IUserSchema> =>
    await this.userRepository.findUserWithUserNameAndPassword(
      username,
      password
    );

  findUserWithID = async (_id: string): Promise<IUserSchema> =>
    await this.userRepository.findUserWithID(_id);

  findUserWithUserName = async (user_name: string): Promise<IUserSchema> =>
    this.userRepository.findUserWithUserName(user_name);

  createUser = async (user: CreateUserDTO) => {
    return await this.userRepository.createUser(user);
  };

  bookmarkImplore = async (user_id: string, implore_id: string) =>
    await this.userRepository.bookmarkImplore(user_id, implore_id);

  bookmarkVibe = async (user_id: string, vibe_id: string) =>
    await this.userRepository.bookmarkVibe(user_id, vibe_id);
}
