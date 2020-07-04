import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SharedService } from '../shared/shared.service';
import { CreateUserDTO, LoginUserDTO } from '../user/user.dto';
import { IUserSchema } from '../../entities';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from './constants';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private commonService: SharedService
  ) {}
  private signJWT = (user: IUserSchema) => {
    const { user_name, user_role, user_email, _id } = user;
    return jwt.sign(
      { user_name, user_role, user_email, _id },
      jwtConstants.secret,
      { expiresIn: '7d' }
    );
  };
  googleLogin = async (req: any): Promise<IUserSchema> => {
    if (!req.user) {
      throw new HttpException('Invalid User', HttpStatus.UNAUTHORIZED);
    } else {
      const { user_name, user_email } = req.user;
      const attempt_user = await this.userService.findUserWithUserName(
        user_name
      );
      if (!attempt_user) {
        const user = await this.userService.createUser({
          user_email,
          user_name,
        });
        user.token = this.signJWT(user);
        return user;
      } else {
        attempt_user.token = this.signJWT(attempt_user);
        return attempt_user;
      }
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

    result.token = this.signJWT(attempt_user);
    return result;
  };

  register = async (user: CreateUserDTO): Promise<IUserSchema> => {
    const created_user = await this.userService.createUser(user);
    const { password, ...result } = created_user.toObject();
    result.token = this.signJWT(created_user);
    return result;
  };
}
