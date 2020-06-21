import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities';
import { Repository } from 'typeorm';


export class UserRepository{
    constructor(@InjectRepository(UserEntity)private userRepository:Repository<UserEntity>){}
}