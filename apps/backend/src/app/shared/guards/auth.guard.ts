import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../../auth/constants';
@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      return false;
    }
    request.user = this.validateToken(request.headers.authorization);
    return true;
  }

  private validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid Token', HttpStatus.FORBIDDEN);
    }
    const token = auth.split(' ')[1];
    try {
      const decode = jwt.verify(token, jwtConstants.secret, {
        ignoreExpiration: false,
      });
      return decode;
    } catch (error) {
      const message = error.name || error.message || 'Token malformed';
      throw new HttpException(message, HttpStatus.FORBIDDEN);
    }
  }
}
