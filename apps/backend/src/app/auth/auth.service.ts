import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SharedService } from '../shared/shared.service';
import { CreateUserDTO, LoginUserDTO, UserRO } from '../user/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private commonService: SharedService
  ) {}

  googleLogin = async (req: any) => {
    if (!req.user) {
      return 'No user from google';
    } else {
      const { user_name, user_email } = req.user;
      const attempt_user = await this.userService.findUserWithUserName(
        user_name
      );
      if (!attempt_user) {
        return await this.userService.createUser({
          user_email,
          user_name,
        });
      } else {
        return attempt_user;
      }
    }
  };

  jwtLogin = async (user: LoginUserDTO): Promise<Partial<UserRO>> => {
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
    } else {
      return attempt_user.toResponseObject(true);
    }
  };
}
