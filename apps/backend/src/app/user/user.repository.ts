import { User, IUserSchema } from '../../entities';
import { CreateUserDTO } from './user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { SharedService } from '../shared/shared.service';

export class UserRepository {
  private commonService = new SharedService();
  constructor() {}

  findAllUsers = async (): Promise<IUserSchema[]> =>
    await User.find()
      .populate('bookmarked_vibes')
      .populate('upvote')
      .populate('bookmarked_implores')
      .then((users) => users.map((user) => user))
      .catch((err) => this.commonService.sendErrorMessage(err, true));

  findUserWithUserNameAndPassword = async (
    user_name: string,
    password: string
  ): Promise<IUserSchema> => {
    console.log(await User.find());
    return await User.findOne({ user_name, password })
      .then((user) => {
        console.log(user);
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
}
