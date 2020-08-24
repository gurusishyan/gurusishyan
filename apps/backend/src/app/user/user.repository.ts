import { User, IUserSchema } from '../../entities';
import { CreateUserDTO, CreateTeacherDTO } from './user.dto';
import { HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { SharedService } from '../shared/shared.service';
import { loggerInstance } from '@gurusishyan-logger';

export class UserRepository {
  private commonService = new SharedService();
  constructor() {}

  findUserWithID = async (_id: string) =>
    await User.findOne({ _id })
      .then((user) => {
        if (user) return user;
        return null;
      })
      .catch((err) =>
        this.commonService.sendErrorMessage(
          err,
          true,
          HttpStatus.INTERNAL_SERVER_ERROR
        )
      );

  findAllUsers = async (): Promise<IUserSchema[]> =>
    await User.find()
      .populate('bookmarked_vibes')
      .populate('bookmarked_implores')
      .then((users) => users.map((user) => user))
      .catch((err) => this.commonService.sendErrorMessage(err, true));

  findUserWithUserNameAndPassword = async (
    user_name: string,
    password: string
  ): Promise<IUserSchema> => {
    return await User.findOne({ user_name, password })
      .then((user) => {
        return user;
      })
      .catch((err) => this.commonService.sendErrorMessage(err, true));
  };
  findUserWithUserName = async (user_name: string): Promise<IUserSchema> =>
    await User.findOne({ user_name })
      .then((user) => user)
      .catch((err) => this.commonService.sendErrorMessage(err));

  createUser = async (new_user: CreateUserDTO): Promise<IUserSchema> => {
    const user = await User.findOne({ user_name: new_user.user_name });
    if (user) {
      throw new HttpException('User Already Exists', HttpStatus.CONFLICT);
    } else {
      new_user.password = new_user.password
        ? this.commonService.createHash(new_user.password)
        : null;
      return await new User(new_user)
        .save({ validateBeforeSave: true })
        .then((user) => {
          loggerInstance.log(`New User created ${user._id}`);
          return user;
        })
        .catch((err) => {
          loggerInstance.log(`Unable to create user. ${err}`);
          throw new HttpException('Some error occured', 500);
        });
    }
  };

  createTeacher = async (
    newTeacher: CreateTeacherDTO
  ): Promise<IUserSchema> => {
    const checkForExistence = await this.findUserWithUserName(
      newTeacher.user_name
    );
    if (checkForExistence) {
      loggerInstance.log(
        `${checkForExistence.user_name} tried to sign up again`
      );
      throw new BadRequestException('User already Exists');
    }
    return await new User(newTeacher)
      .save({ validateBeforeSave: true })
      .then((user) => {
        loggerInstance.log(`New Teacher created with name ${user.user_name}`);
        return user;
      })
      .catch((err) => {
        loggerInstance.log(`Error Occured. ${err}`, 'error', 'UserRepository');
        throw new HttpException(
          'Some error occured while registration. Please try after some time.',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      });
  };
  bookmarkImplore = async (_id: string, implore_id: string) =>
    await User.findOneAndUpdate(
      { _id },
      { $addToSet: { bookmarked_implores: implore_id } },
      { new: true }
    )
      .then((user) => user)
      .catch((err) => this.commonService.sendErrorMessage(err));

  bookmarkVibe = async (_id: string, vibe_id: string) =>
    await User.findOneAndUpdate(
      { _id },
      { $addToSet: { bookmarked_implores: vibe_id } },
      { new: true }
    )
      .then((user) => user)
      .catch((err) => this.commonService.sendErrorMessage(err));

  updateRole = async (_id: string, role: string) =>
    await User.findOneAndUpdate({ _id }, { user_role: role }, { new: true })
      .then((user) => user)
      .catch((err) => this.commonService.sendErrorMessage(err));

  unBookmarkImplore = async (_id: string, implore_id: string) =>
    await User.findByIdAndUpdate(
      { _id },
      { $pull: { bookmarked_implores: implore_id } },
      { new: true }
    )
      .then((user) => user)
      .catch((err) => this.commonService.sendErrorMessage(err));

  unBookmarkVibe = async (_id: string, vibe_id: string) =>
    await User.findByIdAndUpdate(
      { _id },
      { $pull: { bookmarked_vibes: vibe_id } },
      { new: true }
    )
      .then((user) => user)
      .catch((err) => this.commonService.sendErrorMessage(err));

  deleteUser = async (_id: string) =>
    await User.findOneAndRemove({ _id })
      .then((user) => user)
      .catch((err) => this.commonService.sendErrorMessage(err));
}
