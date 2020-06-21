import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StaticDataEntity } from '../../entities';
import { Repository } from 'typeorm';

@Injectable()
export class StaticDataRepository{
    constructor(@InjectRepository(StaticDataEntity)private staticDataRepository:Repository<StaticDataEntity>){}
}