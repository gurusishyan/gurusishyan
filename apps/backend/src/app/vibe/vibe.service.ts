import { Injectable } from '@nestjs/common';
import { VibeRepository } from './vibe.repository';

@Injectable()
export class VibeService {
    constructor(private vibeRepository:VibeRepository){}
}
