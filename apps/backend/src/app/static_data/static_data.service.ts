import { Injectable } from '@nestjs/common';
import { StaticDataRepository } from './static_data.repository';

@Injectable()
export class StaticDataService {
    constructor(private staticDataRepository:StaticDataRepository){}
}
