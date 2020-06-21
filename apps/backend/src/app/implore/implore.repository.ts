import { InjectRepository } from '@nestjs/typeorm';
import { ImploreEntity } from '../../entities';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
@Injectable()
export class ImploreRepository {
  constructor(
    @InjectRepository(ImploreEntity)
    private imploreRepository: Repository<ImploreEntity>
  ) {}
}
