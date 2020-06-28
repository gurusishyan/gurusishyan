import { MetadataDTO, VibeEntity } from '../../entities';
import {
  IsUUID,
  IsDateString,
  IsBoolean,
  IsIn,
  IsOptional,
  ValidateNested,
  IsObject,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { globalConfig } from '@gurusishyan-config';
export class ImploreDTO {
  @IsUUID('4', { message: 'Invalid Format: Implore ID' })
  @IsOptional()
  implore_id: string;

  @IsDateString({ message: 'ValidationError: Not a valid Date' })
  @IsOptional()
  created: string;

  @IsUUID('all', { message: 'Invalid Format: User ID' })
  @IsNotEmpty()
  author: string;

  @IsBoolean({ message: 'Required Field Error: Anonymous is a required field' })
  @IsNotEmpty()
  implore_as_anonymous: boolean;

  @IsIn(globalConfig.implore_types, {
    message: 'Invalid Option: Invalid Implore type',
  })
  @IsNotEmpty()
  implore_type: 'QUESTION' | 'NOTES';

  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => VibeEntity)
  associated_vibe: Array<VibeEntity>;

  @IsObject({ message: 'ValidationError: Not a proper metadata object' })
  @ValidateNested({ message: 'ValidationError: Not a proper metadata object' })
  @Type(() => MetadataDTO)
  @IsNotEmpty()
  metadata!: MetadataDTO;

  @IsString({ message: 'Required Field Error: Status is missing' })
  @IsIn([globalConfig.status])
  @IsOptional()
  status: 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
}

export class ImploreRO {
  implore_id: string;
  created: string;
  implore_as_anonymous: boolean;
  implore_type: string;
  associated_vibe: VibeEntity[];
  metadata: MetadataDTO;
  status: string;
  upvotes: number;
  downvotes: number;
  views: number;
}
