import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
@Injectable()
export class SharedService {
  constructor() {}
  createHash = (stringToHash: string) =>
    crypto.createHash('sha256').update(stringToHash).digest('hex');

  sendErrorMessage = (message: string, error: boolean) => ({ error, message });
}
