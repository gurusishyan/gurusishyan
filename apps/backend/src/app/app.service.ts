import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  getData(): { message: string,error:true } {
    return { error:true,"message":"hello"};
  }
}
