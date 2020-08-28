import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO, CreateTeacherDTO, CreateStudentDTO } from './user.dto';
import { IUserSchema } from '../../entities';
import { SharedService } from '../shared/shared.service';
import { ImploreService } from '../implore/implore.service';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository // private imploreService: ImploreService
  ) {}
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

  findUserWithID = async (_id: string): Promise<IUserSchema> => {
    const user = await this.userRepository.findUserWithID(_id);
    if (!user) {
      this.commonService.sendErrorMessage(
        "Couldn't sign you in!",
        true,
        HttpStatus.NOT_FOUND
      );
    }
    return user;
  };

  findUserWithUserName = async (user_name: string): Promise<IUserSchema> =>
    await this.userRepository.findUserWithUserName(user_name);

  findUserWithEmail = async (user_email: string): Promise<IUserSchema> => {
    const user = await this.userRepository.findUserWithEmail(user_email);
    if (!user) {
      this.commonService.sendErrorMessage(
        'Invalid Email Address',
        true,
        HttpStatus.NOT_FOUND
      );
    }
    return user;
  };

  updatePassword = async (_id: string, password: string) =>
    await this.userRepository.updatePassword(_id, password);

  updateResetPasswordTokenAndTime = async (
    _id: string,
    reset_password_token: string,
    reset_password_token_exp: number
  ): Promise<IUserSchema> =>
    await this.userRepository.updateResetPasswordTokenAndTime(
      _id,
      reset_password_token,
      reset_password_token_exp
    );

  createUser = async (user: CreateUserDTO) => {
    return await this.userRepository.createUser(user);
  };

  bookmarkImplore = async (user_id: string, implore_id: string) =>
    await this.userRepository.bookmarkImplore(user_id, implore_id);

  bookmarkVibe = async (user_id: string, vibe_id: string) =>
    await this.userRepository.bookmarkVibe(user_id, vibe_id);

  updateRole = async (_id: string, user_role: string) => {
    const user = await this.userRepository.updateRole(_id, user_role);
    user.token = this.commonService.signJWT(user);
    return user;
  };

  createTeacher = async (newTeacher: CreateTeacherDTO) =>
    await this.userRepository.createTeacher(newTeacher);

    createStudent = async (newTeacher: CreateStudentDTO) =>
    await this.userRepository.createStudent(newTeacher);

  unBookmarkImplore = async (_id: string, implore_id: string) =>
    await this.userRepository.unBookmarkImplore(_id, implore_id);

  unBookmarkVibe = async (_id: string, vibe_id: string) =>
    await this.userRepository.unBookmarkVibe(_id, vibe_id);

  deleteUser = async (_id: string) => {
    // const implore = await this.imploreService.getImploresForAUser(_id);
    // if (implore.length > 0) {
    //   for (let i = 0; i < implore.length; i++) {
    //     await this.imploreService.deleteImplore(implore[i]._id, _id);
    //   }
    // }
    // TODO Vibe deletion is pending

    return await this.userRepository.deleteUser(_id);
  };
}
