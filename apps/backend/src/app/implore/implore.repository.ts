import { InjectRepository } from '@nestjs/typeorm';
import { ImploreEntity, UserEntity } from '../../entities';
import { Repository } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SharedService } from '../shared/shared.service';
import { ImploreRO, CreateImploreDTO, UpdateImploreDTO } from './implore.dto';
import { IErrorMessage } from '../shared/interfaces';
import { loggerInstance } from '@gurusishyan-logger';
@Injectable()
export class ImploreRepository {
  commonService = new SharedService();
  constructor(
    @InjectRepository(ImploreEntity)
    private imploreRepository: Repository<ImploreEntity>
  ) {}

  /**
   * Get All the implores present in the database
   *
   * Mostly for admin purpose
   */
  getAllImplores = async (): Promise<ImploreRO[] | IErrorMessage> =>
    await this.imploreRepository
      .find()
      .then((implores) => implores.map((implore) => implore.toResponseObject()))
      .catch((err) =>
        this.commonService.sendErrorMessage(err.message || err, true)
      );

  /**
   *
   * @param author The author of the implores
   *
   * Synchronously gives all the implores associated for the author
   */
  getUserAssociatedImplores = async (
    author: string
  ): Promise<ImploreRO[] | IErrorMessage> =>
    await this.imploreRepository
      .find({ where: { author }, relations: ['upvotes', 'downvotes', 'views'] })
      .then((associated_implores) =>
        associated_implores.map((implore) => implore.toResponseObject())
      )
      .catch((err) =>
        this.commonService.sendErrorMessage(err.message || err, true)
      );

  saveImplore = async (
    data: CreateImploreDTO,
    author: any
  ): Promise<ImploreRO | IErrorMessage> => {
    const entity_instance = this.imploreRepository.create(data);
    entity_instance.author = author;
    return await this.imploreRepository
      .save(entity_instance)
      .then((saved_implore) => saved_implore.toResponseObject())
      .catch((err) => {
        console.log(err);
        return this.commonService.sendErrorMessage(err.message || err, true);
      });
  };

  updateImplore = async (
    data: ImploreRO | UpdateImploreDTO
  ): Promise<ImploreRO | IErrorMessage> => {
    const implore = await this.imploreRepository.findOne({
      where: { implore_id: data.implore_id },
    });
    if (!implore) {
      throw new HttpException(
        'Unable to find an implore.',
        HttpStatus.BAD_REQUEST
      );
    }
    const casted_data = data as UpdateImploreDTO;
    const entity_instance = this.imploreRepository.create(casted_data);
    return await this.imploreRepository
      .save({ implore_id: entity_instance.implore_id, ...entity_instance })
      .then((updated_implore) => {
        return updated_implore.toResponseObject();
      })
      .catch((err) =>
        this.commonService.sendErrorMessage(err.message || err, true)
      );
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
    implore_id: string,
    user: UserEntity
  ): Promise<ImploreRO> => {
    const implore = await this.imploreRepository.findOne({
      where: { implore_id },
      relations: ['upvotes', 'author'],
    });
    if (!implore) {
      throw new HttpException('Implore not found', HttpStatus.NOT_FOUND);
    }

    if (
      implore.upvotes.filter((user_) => user_.user_id === user.user_id)
        .length >= 1 ||
      implore.author.user_id === user.user_id
    ) {
      loggerInstance.log(
        `${user.user_name} already upvoted implore ${implore_id} or ${user.user_name} must be the owner of implore ${implore_id}`
      );
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    } else {
      implore.upvotes.push(user);
      loggerInstance.log(`${user.user_name} upvoted implore ${implore_id}`);
      return await this.imploreRepository
        .save({ ...implore })
        .then((implore) => implore.toResponseObject())
        .catch((err) => {
          const message = err.message || err;
          throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
  };
}
