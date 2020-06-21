import { ImploreDTO } from '../implore/implore.dto';
import { IMetadata } from '../../entities';

export interface VibeDTO{
    vibe_id:string;
    created:Date;
    vibe_by:any;
    vibe_as_anonymous:boolean;
    associated_implore:string | ImploreDTO;
    vibe_type:"ANSWER"|"NOTES"
    metadata:IMetadata
}