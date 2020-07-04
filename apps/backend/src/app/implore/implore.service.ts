import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ImploreRepository } from './implore.repository';
import { CreateImploreDTO, UpdateImploreDTO } from './implore.dto';
import { IFile } from '../shared/interfaces';
import { loggerInstance } from '@gurusishyan-logger';
import { SharedService } from '../shared/shared.service';
import { UserService } from '../user/user.service';
import { IImploreSchema } from '../../entities';

@Injectable()
export class ImploreService {
  constructor(
    private imploreRepository: ImploreRepository,
    private commonService: SharedService,
    private userService: UserService
  ) {}

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  checkIfAlreadyViewed = (implore: IImploreSchema, user_id: string) =>
    implore.views.some((user) => user.toString() === user_id.toString());

  checkIfAlreadyUpvoted = (implore: IImploreSchema, user_id: string) =>
    implore.upvotes.some((user) => user.toString() === user_id.toString());

  checkIfOwnerOfImplore = (implore: IImploreSchema, author: string) =>
    implore.author.toString() === author.toString();

  checkIfAlreadyDownvoted = (implore: IImploreSchema, user_id: string) =>
    implore.downvotes.some((user) => user.toString() === user_id.toString());

  checkForNulls = async (implore_id: string, user_id: string) => {
    const user = await this.userService.findUserWithID(user_id);
    if (!user)
      throw new HttpException('Unable to find user', HttpStatus.NOT_FOUND);
    const implore = await this.imploreRepository.findImploreWithID(implore_id);
    if (!implore)
      throw new HttpException('Unable to find implore', HttpStatus.NOT_FOUND);
    return implore;
  };

  private saveAttachments = async (
    BASE_PATH: string,
    implore: any,
    uploads: IFile[]
  ) => {
    uploads.length
      ? loggerInstance.log(
          'Implore ' + implore._id + ' has attachments and will be saved'
        )
      : loggerInstance.log('Implore ' + implore._id + ' has no attachments');
    if (implore.metadata.document_attached && uploads.length) {
      const document_paths = this.commonService
        .writeAttachments(uploads, BASE_PATH, implore._id, 'Implore')
        .concat(implore.metadata.document_url);
      implore.metadata.document_url = document_paths.filter(this.onlyUnique);
      return await this.imploreRepository.updateImplore(implore);
    } else {
      return implore;
    }
  };
  /**
   * Synchronously gives all the implores
   */
  getAllImplores = async () => this.imploreRepository.getAllImplores();

  /**
   * @param data Implore response object to update the implore
   *
   * The update operation is performed synchronously
   */
  updateImplore = async (
    data: UpdateImploreDTO,
    user_id: string,
    uploads?: IFile[]
  ) => {
    const BASE_PATH = process.env.BASE_DIR_PATH;
    const user = await this.userService.findUserWithID(user_id);
    if (user) {
      if (user._id.toString() !== data.author) {
        throw new HttpException(
          'You are not the owner of this implore.',
          HttpStatus.BAD_REQUEST
        );
      }
    }
    const updated_implore = await this.imploreRepository.updateImplore(data);
    return await this.saveAttachments(BASE_PATH, updated_implore, uploads);
  };

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
  ): Promise<IImploreSchema> => {
    const BASE_PATH = process.env.BASE_DIR_PATH;
    const created_implore = await this.imploreRepository.saveImplore(
      data,
      author
    );
    loggerInstance.log(
      'Implore ' + created_implore._id + ' saved without saving attachments'
    );
    return await this.saveAttachments(BASE_PATH, created_implore, uploads);
  };

  /**
   *
   * @param author The author of the implores
   *
   * Synchronously gives all the implores associated for the author
   */

  getImploresForAUser = async (author: string): Promise<IImploreSchema[]> =>
    await this.imploreRepository.getUserAssociatedImplores(author);

  upvoteImplore = async (
    implore_id: string,
    user_id: string
  ): Promise<IImploreSchema> => {
    const implore = await this.checkForNulls(implore_id, user_id);
    if (this.checkIfAlreadyUpvoted(implore, user_id)) {
      loggerInstance.log(`User already upvoted implore ${implore_id}`);
      return implore;
    }
    if (this.checkIfOwnerOfImplore(implore, user_id)) {
      loggerInstance.log(
        `User is the owner of implore ${implore_id}. Hence not upvoted`
      );
      return implore;
    }

    implore.upvotes.push(user_id);
    loggerInstance.log(`${user_id} upvoted implore ${implore_id}`);
    return await this.imploreRepository.upvoteImplore(implore, implore_id);
  };

  downvoteImplore = async (
    implore_id: string,
    user_id: string
  ): Promise<IImploreSchema> => {
    const implore = await this.checkForNulls(implore_id, user_id);
    if (this.checkIfAlreadyDownvoted(implore, user_id)) {
      loggerInstance.log(`User already downvoted implore ${implore_id}`);
      return implore;
    }
    if (this.checkIfOwnerOfImplore(implore, user_id)) {
      loggerInstance.log(
        `User is the owner of implore ${implore_id}. Hence not upvoted`
      );
      return implore;
    }

    implore.downvotes.push(user_id);
    loggerInstance.log(`${user_id} downvoted implore ${implore_id}`);
    return await this.imploreRepository.downvoteImplore(implore, implore_id);
  };

  viewImplore = async (
    implore_id: string,
    user_id: string
  ): Promise<IImploreSchema> => {
    const implore = await this.checkForNulls(implore_id, user_id);
    if (this.checkIfAlreadyViewed(implore, user_id)) {
      loggerInstance.log(`User already viewed implore ${implore_id}`);
      return implore;
    }

    implore.views.push(user_id);
    loggerInstance.log(`${user_id} viewed implore ${implore_id}`);
    return await this.imploreRepository.viewImplore(implore, implore_id);
  };

  deleteImplore = async (implore_id: string, user_id: string) => {
    const implore = await this.checkForNulls(implore_id, user_id);
    if (this.checkIfOwnerOfImplore(implore, user_id)) {
      this.commonService.deleteImages(implore_id);
      return await this.imploreRepository.deleteImplore(implore_id);
    }
    throw new HttpException(
      'You are not owner of this implore',
      HttpStatus.FORBIDDEN
    );
  };
}
