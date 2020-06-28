import {
  IsString,
  IsPositive,
  IsOptional,
  IsBoolean,
  IsIn,
  IsNotEmpty,
} from 'class-validator';
import { globalConfig } from '@gurusishyan-config';
export class MetadataDTO {
  @IsString({
    message: 'Class of study is mandatory and should be of type string',
  })
  @IsIn(globalConfig.classes, { message: 'Invalid Option: Class of Study' })
  @IsNotEmpty({
    message: 'Class of study is mandatory and should be of type string',
  })
  class_of_study: string;

  @IsString({ message: 'Required Field Error: Subject Interested' })
  @IsNotEmpty({
    message: 'Subject Interested is mandatory and should be of type string',
  })
  subject_interested: string;

  @IsString({ message: 'Required Field Error: Board Of Education' })
  @IsIn(globalConfig.board_of_education, {
    message: 'Invalid Option: Board Of Education',
  })
  @IsNotEmpty({
    message: 'Board Of Education is mandatory and should be of type string',
  })
  board_of_education: string;

  @IsString({ message: 'Required Field Error: Lesson' })
  @IsOptional()
  lesson_on_subject: string;

  @IsOptional()
  @IsString({ message: 'Required Field Error: Board Of Education' })
  additional_notes: string;

  @IsNotEmpty({
    message: 'Required Field Error: Document Attached is mandatory',
  })
  @IsBoolean({
    message: 'Invalid Type: Document Attached should be of type boolean',
  })
  document_attached: boolean;

  @IsOptional()
  @IsString({ message: 'Required Field Error: Board Of Education' })
  document_url: Array<string>;

  @IsPositive({
    message: 'ValidationError: Upvotes should be a positive number',
  })
  @IsOptional()
  upvotes: number;

  @IsPositive({
    message: 'ValidationError: Downvotes should be a positive number',
  })
  @IsOptional()
  downvotes: number;
}
