import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as crypto from 'crypto';
import { IFile } from './interfaces';
import { existsSync, mkdirSync, writeFileSync, rmdirSync } from 'fs';
import { join } from 'path';
import { loggerInstance } from '@gurusishyan-logger';
import { IUserSchema } from '../../entities';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../auth/constants';
@Injectable()
export class SharedService {
  constructor() {}
  createHash = (stringToHash: string) =>
    crypto.createHash('sha256').update(stringToHash).digest('hex');

  sendErrorMessage = (message: any, error?: boolean, status?: number) => {
    message = message.message || message;
    throw new HttpException(
      message,
      status || HttpStatus.INTERNAL_SERVER_ERROR
    );
  };

  /**
   *
   * @param uploads Array of documents to store for the implore
   * @param base_path base path of the document to be saved. Usually BASE_PATH_DIR from .env
   * @param id Corresponding implore/vibe id for which the document to be saved
   * @param request_type Usually correspond to request type (Implore / Vibe)
   * @default {UUID}/{filename}
   * @returns Array of paths of default format
   *
   * To upload files to local storage and return the uploaded paths.
   *
   */
  writeAttachments(
    uploads: IFile[],
    base_path: string,
    id: string,
    request_type: string
  ) {
    const file_details = uploads.map((file) => {
      if (!existsSync(join(base_path, id.toString()))) {
        mkdirSync(join(base_path, id.toString()), {
          recursive: true,
        });
      }
      return {
        name: join(id.toString(), file.originalname),
        data: file.buffer,
      };
    });
    let paths: string[] = [];
    for (let i = 0; i < file_details.length; i++) {
      const path_to_write = join(base_path, file_details[i].name);
      writeFileSync(path_to_write, file_details[i].data);
      paths.push(file_details[i].name);
    }
    loggerInstance.log(
      request_type + ' ' + id.toString() + ' attachment saved with paths'
    );
    return paths;
  }

  deleteImages = (_id: string) => {
    const BASE_PATH = process.env.BASE_DIR_PATH;
    try {
      rmdirSync(join(BASE_PATH, _id), { recursive: true });
      loggerInstance.log('Successfully deleted assets ' + join(BASE_PATH, _id));
    } catch (error) {
      loggerInstance.log(
        'Error occured while deleting images ' + error,
        'error'
      );
    }
  };

  signJWT = (user: IUserSchema) => {
    const { user_name, user_role, user_email, _id } = user;
    return jwt.sign(
      { user_name, user_role, user_email, _id },
      jwtConstants.secret,
      { expiresIn: '7d' }
    );
  };
}
