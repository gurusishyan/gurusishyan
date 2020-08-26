import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SharedService } from '../shared/shared.service';
import {
  CreateUserDTO,
  LoginUserDTO,
  CreateTeacherDTO,
  CreateGoogleUserDTO,
  ResetPasswordRequestDTO,
} from '../user/user.dto';
import { IUserSchema } from '../../entities';
import { loggerInstance } from '@gurusishyan-logger';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private commonService: SharedService
  ) { }
  getResetPasswordHTML = (user: any) =>
    this.commonService
      .readResetPasswordHTMLFile()
      .split('%resetlink%')
      .join(process.env.RESETLINK)
      .split('%user_name%')
      .join(user.user_name.charAt(0).toUpperCase() + user.user_name.slice(1))
      .split('[type_of_action]')
      .join('reset password');
  googleLogin = async (userDet: CreateGoogleUserDTO): Promise<IUserSchema> => {
    const { user_name, user_email, user_image } = userDet;
    const attempt_user = await this.userService.findUserWithUserName(user_name);
    if (!attempt_user) {
      const user = await this.userService.createUser({
        user_email,
        user_name,
        user_image,
      });
      user.token = this.commonService.signJWT(user);
      return user;
    } else {
      attempt_user.token = this.commonService.signJWT(attempt_user);
      loggerInstance.log(
        `${attempt_user.user_name} logged in to GS Application`
      );
      return attempt_user;
    }
  };

  jwtLogin = async (user: LoginUserDTO): Promise<IUserSchema> => {
    const hashedPassword = this.commonService.createHash(user.password);
    const attempt_user = await this.userService.findUserWithUserNameAndPassword(
      user.user_name,
      hashedPassword
    );
    if (!attempt_user) {
      throw new HttpException(
        'Invalid Username/Password',
        HttpStatus.UNAUTHORIZED
      );
    }
    const { password, ...result } = attempt_user.toObject();

    result.token = this.commonService.signJWT(attempt_user);
    return result;
  };

  register = async (user: CreateUserDTO): Promise<IUserSchema> => {
    const created_user = await this.userService.createUser(user);
    const { password, ...result } = created_user.toObject();
    result.token = this.commonService.signJWT(created_user);
    return result;
  };

  registerTeacher = async (user: CreateTeacherDTO): Promise<IUserSchema> => {
    user.password = this.commonService.createHash(user.password);
    user.teacher = true;
    const newTeacher = await this.userService.createTeacher(user);
    newTeacher.token = this.commonService.signJWT(newTeacher);
    newTeacher.password = undefined;
    return newTeacher;
  };

  requestReserPassword = async (user_email: string) => {
    const user = await this.userService.findUserWithEmail(user_email);
    if (
      user.reset_password_token ||
      user.reset_password_token_exp ||
      new Date().getTime() <= user.reset_password_token_exp
    ) {
      this.commonService.sendErrorMessage(
        'Already requested for reset password. Kindly check in Inbox/Spam folder',
        true,
        HttpStatus.NOT_ACCEPTABLE
      );
    }
    return await this.commonService
      .sendMail(
        'svvsathyanarayanan@gmail.com',
        `${user.user_email}`,
        `Request for password reset by ${user.user_name}`,
        this.getResetPasswordHTML(user)
      )
      .then(async (res) => {
        return await this.userService.updateResetPasswordTokenAndTime(user._id);
      })
      .catch((err) => {
        this.commonService.sendErrorMessage({ err });
      });
  };

  resetPassword = async (data: ResetPasswordRequestDTO) => {
    const user = await this.userService.findUserWithEmail(data.user_email);

    // Check if user already initiated reset password request
    if (!(user.reset_password_token_exp && user.reset_password_token)) {
      this.commonService.sendErrorMessage(
        `Reset password link is expired. Kindly request again Mr/Mrs ${user.user_name}`
      );
    }

    // Check if token is same as in the db
    if (data.reset_password_token !== user.reset_password_token) {
      this.commonService.sendErrorMessage(
        'Oops this seems to be an invalid request',
        true,
        HttpStatus.BAD_REQUEST
      );
    }

    //Check if the generated token did expire
    if (new Date().getTime() <= user.reset_password_token_exp) {
      const password = this.commonService.createHash(data.password);
      return await this.userService.updatePassword(user._id, password);
    }
    this.commonService.sendErrorMessage(
      `Reset password link is expired. Kindly request again Mr/Mrs ${user.user_name}`
    );
  };
}
