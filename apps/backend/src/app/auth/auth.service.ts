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
  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    } else {
      return req.user;
    }
  }

  jwtLogin = async(user:LoginUserDTO):Promise<Partial<UserRO>> => {
    const hashedPassword = this.commonService.createHash(user.password)
    const attempt_user = await this.userService.findUserWithUserNameAndPassword(user.user_name,hashedPassword)
    if(!attempt_user){
      throw new HttpException('Invalid Username/Password',HttpStatus.UNAUTHORIZED)
    }
    else{
      return attempt_user.toResponseObject(false)
    }
  }
}
