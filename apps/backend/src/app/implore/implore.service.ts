import { Injectable } from '@nestjs/common';
import { ImploreRepository } from './implore.repository';

@Injectable()
export class ImploreService {
    constructor(private imploreRepository:ImploreRepository){}


}
