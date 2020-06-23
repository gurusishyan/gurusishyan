import { ImploreDTO } from '../implore/implore.dto';
import { MetadataDTO } from '../../entities';
import {
  IsUUID,
  IsString,
  IsDateString,
  IsBoolean,
  IsIn,
  ValidateNested,
  IsOptional,
  IsObject,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { globalConfig } from '@gurusishyan-config';
export class CreateVibeDTO {
  @IsUUID('4', { message: 'Invalid Format: Vibe ID' })
  @IsOptional()
  vibe_id: string;

  @IsDateString({ message: 'ValidationError: Not a valid Vibe Created Date' })
  @IsOptional()
  created: Date;

  @IsUUID('4', { message: 'Invalid Format: User ID' })
  @IsNotEmpty()
  vibe_by: string;

  @IsBoolean({ message: 'Required Field Error: Anonymous is a required field' })
  @IsNotEmpty()
  vibe_as_anonymous: boolean;

  @IsUUID('4', { message: 'Invalid Implore ID' })
  @IsNotEmpty()
  associated_implore: string;

  @IsIn(globalConfig.vibe_types, { message: 'Invalid Option: Vibe type' })
  @IsNotEmpty()
  vibe_type: 'ANSWER' | 'NOTES';

  @IsObject({ message: 'ValidationError: Not a proper metadata object' })
  @ValidateNested({ message: 'ValidationError: Not a proper metadata object' })
  @Type(() => MetadataDTO)
  @IsNotEmpty()
  metadata: MetadataDTO;
}
