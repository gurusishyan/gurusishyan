import { InjectRepository } from '@nestjs/typeorm';
import { ImploreEntity } from '../../entities';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { SharedService } from '../shared/shared.service';
import { ImploreRO } from './implore.dto';
import { IErrorMessage } from '../shared/interfaces';
@Injectable()
export class ImploreRepository {
  commonService = new SharedService();
  constructor(
    @InjectRepository(ImploreEntity)
    private imploreRepository: Repository<ImploreEntity>
  ) {}

  getAllImplores = async (): Promise<ImploreRO[] | IErrorMessage> =>
    await this.imploreRepository
      .find()
      .then((implores) => implores.map((implore) => implore.toResponseObject()))
      .catch((err) =>
        this.commonService.sendErrorMessage(err.message || err, true)
      );
}
