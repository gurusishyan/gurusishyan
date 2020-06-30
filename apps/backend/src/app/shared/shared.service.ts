import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { IFile } from './interfaces';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { loggerInstance } from '@gurusishyan-logger';
@Injectable()
export class SharedService {
  constructor() {}
  createHash = (stringToHash: string) =>
    crypto.createHash('sha256').update(stringToHash).digest('hex');

  sendErrorMessage = (message: string, error: boolean) => ({ error, message });

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
      if (!existsSync(join(base_path, id))) {
        mkdirSync(join(base_path, id), {
          recursive: true,
        });
      }
      return {
        name: join(id, file.originalname),
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
      request_type + ' ' + id + ' attachment saved with paths'
    );
    return paths;
  }
}
