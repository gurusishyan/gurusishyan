import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ImploreRepository } from './implore.repository';
import { CreateImploreDTO, ImploreRO, UpdateImploreDTO } from './implore.dto';
import { IErrorMessage, IFile } from '../shared/interfaces';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { loggerInstance } from '@gurusishyan-logger';
import { SharedService } from '../shared/shared.service';
import { UserService } from '../user/user.service';

@Injectable()
export class ImploreService {
  constructor(
    private imploreRepository: ImploreRepository,
    private commonService: SharedService,
    private userService: UserService
  ) {}

  /**
   * Synchronously gives all the implores
   */
  getAllImplores = async () => this.imploreRepository.getAllImplores();

  /**
   * @param data Implore response object to update the implore
   *
   * The update operation is performed synchronously
   */
  updateImplore = async (data: ImploreRO) =>
    await this.imploreRepository.updateImplore(data);

  /**
   * The implore is saved asynchronously
   * @param uploads Array of file object to save
   * @param data Implore details to save
   * @param author Author of the implore
   */
  saveImplore = async (
    uploads: IFile[],
    data: CreateImploreDTO,
    author: string
  ): Promise<ImploreRO | IErrorMessage> => {
    const BASE_PATH = process.env.BASE_DIR_PATH;
    const created_implore = await this.imploreRepository.saveImplore(
      data,
      author
    );
    if (created_implore.hasOwnProperty('error')) {
      return created_implore;
    } else {
      const casted_implore = created_implore as ImploreRO;
      loggerInstance.log(
        'Implore ' +
          casted_implore.implore_id +
          ' saved without saving attachments'
      );
      uploads.length
        ? loggerInstance.log(
            'Implore ' +
              casted_implore.implore_id +
              ' has attachments and will be saved'
          )
        : loggerInstance.log(
            'Implore ' + casted_implore.implore_id + ' has no attachments'
          );
      if (casted_implore.metadata.document_attached && uploads.length) {
        const document_paths = this.commonService.writeAttachments(
          uploads,
          BASE_PATH,
          casted_implore.implore_id,
          'Implore'
        );
        casted_implore.metadata.document_url = document_paths;
        return await this.imploreRepository.updateImplore(casted_implore);
      } else {
        return casted_implore;
      }
    }
  };

  /**
   *
   * @param author The author of the implores
   *
   * Synchronously gives all the implores associated for the author
   */
  getImploresForAUser = async (
    author: string
  ): Promise<ImploreRO[] | IErrorMessage> =>
    await this.imploreRepository.getUserAssociatedImplores(author);

  upvoteImplore = async (
    implore_id: string,
    user_name: string
  ): Promise<ImploreRO> => {
    const user = await this.userService.findUserWithUserName(user_name);

    if (!user) {
      throw new HttpException('Unable to find user', HttpStatus.NOT_FOUND);
    }

    return await this.imploreRepository.upvoteImplore(implore_id, user);
  };
}
