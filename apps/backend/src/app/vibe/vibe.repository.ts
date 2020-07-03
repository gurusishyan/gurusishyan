import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { VibeEntity } from '../../entities';

@Injectable()
export class VibeRepository{
    constructor(@InjectRepository(VibeEntity)
    private imploreRepository: Repository<VibeEntity>){}
}