import { User, IUserSchema } from '../../entities';
import { CreateUserDTO } from './user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { SharedService } from '../shared/shared.service';

export class UserRepository {
  private commonService = new SharedService();
  constructor() {}

  findUserWithID = async (_id: string) =>
    await User.findOne({ _id })
      .then((user) => user)
      .catch((err) => this.commonService.sendErrorMessage(err));

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
      new_user.password = this.commonService.createHash(new_user.password);
      return await new User(new_user)
        .save({ validateBeforeSave: true })
        .then((user) => user)
        .catch((err) => this.commonService.sendErrorMessage(err, true));
    }
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
}
