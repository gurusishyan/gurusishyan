import { IMetadata } from '../../entities';

export interface ImploreDTO{
    implore_id:string;
    created:Date;
    implore_by:any;
    implore_as_anonymous:boolean;
    associated_vibe:Array<any>;
    implore_type:"QUESTION" | "NOTES"
    metadata:IMetadata
}