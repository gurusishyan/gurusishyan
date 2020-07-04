import {
  ImploreEntity,
  UserEntity,
  Implore,
  IImploreSchema,
} from '../../entities';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SharedService } from '../shared/shared.service';
import { CreateImploreDTO } from './implore.dto';
import { IErrorMessage } from '../shared/interfaces';
import { loggerInstance } from '@gurusishyan-logger';
@Injectable()
export class ImploreRepository {
  commonService = new SharedService();
  constructor() {}

  /**
   * Get All the implores present in the database
   *
   * Mostly for admin purpose
   */
  getAllImplores = async (): Promise<IImploreSchema[] | IErrorMessage> =>
    await Implore.find()
      .then((implores) => implores)
      .catch((err) => this.commonService.sendErrorMessage(err));

  findImploreWithID = async (_id: string): Promise<IImploreSchema> =>
    await Implore.findOne({ _id })
      .then((implore) => implore)
      .catch((err) => this.commonService.sendErrorMessage(err));
  /**
   *
   * @param author The author of the implores
   *
   * Synchronously gives all the implores associated for the author
   */
  getUserAssociatedImplores = async (
    author: string
  ): Promise<IImploreSchema[]> =>
    await Implore.find({ author })
      .populate('upvotes')
      .populate('downvotes')
      .populate('views')
      .populate('author')
      .then((associated_implores) => associated_implores)
      .catch((err) => this.commonService.sendErrorMessage(err));

  saveImplore = async (
    data: CreateImploreDTO,
    author: any
  ): Promise<IImploreSchema> => {
    data.author = author;
    return await new Implore(data)
      .save({ validateBeforeSave: true })
      .then((saved_implore) => saved_implore)
      .catch((err) => this.commonService.sendErrorMessage(err));
  };

  updateImplore = async (data: any): Promise<IImploreSchema> => {
    const implore = await Implore.findOne({ _id: data._id });
    if (!implore) {
      throw new HttpException(
        'Unable to find an implore.',
        HttpStatus.BAD_REQUEST
      );
    }
    return await Implore.findOneAndUpdate({ _id: data._id }, data, {
      new: true,
    })
      .then((updated_implore) => updated_implore)
      .catch((err) => {
        return this.commonService.sendErrorMessage(err);
      });
  };

  /**
   *
   * @param implore_id Implore id to upvote
   * @param user User entity to register upvote
   *
   *
   * Synchronously updates the upvotes key of implore table. If upvote already present, it's ignored. If user is owner of implore, user cannot upvote the implore.
   */
  upvoteImplore = async (
    implore: IImploreSchema,
    _id: string
  ): Promise<IImploreSchema> => {
    return await Implore.findOneAndUpdate({ _id }, implore, { new: true })
      .then((implore) => implore)
      .catch((err) => this.commonService.sendErrorMessage(err));
  };

  /**
   *
   * @param implore_id Implore id to upvote
   * @param user User entity to register upvote
   *
   *
   * Synchronously updates the downvotes key of implore table. If upvote already present, it's ignored. If user is owner of implore, user cannot downvote the implore.
   */
  downvoteImplore = async (
    implore: IImploreSchema,
    _id: string
  ): Promise<IImploreSchema> =>
    await Implore.findOneAndUpdate({ _id }, implore, { new: true })
      .then((implore) => implore)
      .catch((err) => this.commonService.sendErrorMessage(err));

  viewImplore = async (
    implore: IImploreSchema,
    _id: string
  ): Promise<IImploreSchema> =>
    await Implore.findByIdAndUpdate({ _id }, implore, { new: true })
      .then((implore) => implore)
      .catch((err) => this.commonService.sendErrorMessage(err));

  deleteImplore = async (_id: string): Promise<IImploreSchema> =>
    await Implore.findOneAndDelete({ _id })
      .then((implore) => implore)
      .catch((err) => this.commonService.sendErrorMessage(err));
}
