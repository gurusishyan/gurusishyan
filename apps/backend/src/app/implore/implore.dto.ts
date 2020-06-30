import { MetadataDTO, VibeEntity, UserEntity } from '../../entities';
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
export class CreateImploreDTO {
  // @IsUUID('4', { message: 'Invalid Format: Implore ID' })
  // @IsOptional()
  // implore_id: string;

  // @IsDateString({ message: 'ValidationError: Not a valid Date' })
  // @IsOptional()
  // created: string;

  // @IsUUID('all', { message: 'Invalid Format: User ID' })
  // @IsOptional()
  // author: string;

  @IsBoolean({ message: 'Invalid Type: Anonymous should be of type boolean' })
  @IsNotEmpty({
    message: 'Required Field Error: Anonymous is a required field',
  })
  implore_as_anonymous: boolean;

  @IsIn(globalConfig.implore_types, {
    message: 'Invalid Option: Invalid Implore type',
  })
  @IsNotEmpty({
    message: 'Required Field Error: Implore type  is a required field',
  })
  implore_type: 'QUESTION' | 'NOTES';

  // @ValidateNested({ each: true })
  // @IsOptional()
  // @Type(() => VibeEntity)
  // associated_vibe: Array<VibeEntity>;

  @IsObject({ message: 'ValidationError: Not a proper metadata object' })
  @ValidateNested({ message: 'ValidationError: Not a proper metadata object' })
  @Type(() => MetadataDTO)
  @IsNotEmpty({ message: 'Required Field Error: Metadata is a required field' })
  metadata!: MetadataDTO;

  // @IsString({ message: 'Required Field Error: Status is missing' })
  // @IsIn([globalConfig.status])
  // @IsOptional()
  // status: 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
}

export class UpdateImploreDTO {
  @IsUUID('4', { message: 'Invalid Format: Implore ID' })
  @IsOptional()
  implore_id: string;

  @IsString({ message: 'ValidationError: Not a valid Date' })
  created: string;

  @IsString({ message: 'Required Field Error: Author is a required field' })
  author: UserEntity;

  @IsBoolean({ message: 'Invalid Type: Anonymous should be of type boolean' })
  @IsNotEmpty({
    message: 'Required Field Error: Anonymous is a required field',
  })
  implore_as_anonymous: boolean;

  @IsIn(globalConfig.implore_types, {
    message: 'Invalid Option: Invalid Implore type',
  })
  @IsNotEmpty({
    message: 'Required Field Error: Implore type  is a required field',
  })
  implore_type: 'QUESTION' | 'NOTES';

  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => VibeEntity)
  associated_vibe: Array<VibeEntity>;

  @IsObject({ message: 'ValidationError: Not a proper metadata object' })
  @ValidateNested({ message: 'ValidationError: Not a proper metadata object' })
  @Type(() => MetadataDTO)
  @IsNotEmpty({ message: 'Required Field Error: Metadata is a required field' })
  metadata!: MetadataDTO;

  @IsString({ message: 'Required Field Error: Status is missing' })
  @IsIn(globalConfig.status)
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
  upvotes: string[];
  downvotes: string[];
  views: string[];
  author: UserEntity;
}
