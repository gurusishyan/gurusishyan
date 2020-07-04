import {
  IsString,
  IsPositive,
  IsOptional,
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsArray,
} from 'class-validator';
import * as mongoose from 'mongoose';
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

  @IsString({ message: 'Required Field Error: Additional Notes' })
  @IsOptional()
  additional_notes: string;

  @IsNotEmpty({
    message: 'Required Field Error: Document Attached is mandatory',
  })
  @IsBoolean({
    message: 'Invalid Type: Document Attached should be of type boolean',
  })
  document_attached: boolean;

  @IsOptional()
  @IsArray({ message: 'Required Field Error: Document urls is missing' })
  document_url: Array<string>;
}
export const MetadataSchema = new mongoose.Schema({
  class_of_study: {
    type: String,
    enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    required: true,
  },
  subject_interested: {
    type: String,
    required: true,
  },
  board_of_education: {
    type: String,
    required: true,
  },
  lesson_on_subject: {
    type: String,
    required: false,
  },
  additional_notes: { type: String, required: false },
  document_attached: { type: Boolean, required: true },
  document_url: [
    {
      type: String,
      required: false,
    },
  ],
});
export interface IMetadata {
  class_of_study: string;
  subject_interested: string;
  board_of_education: string;
  lesson_on_subject: string;
  additional_notes?: string;
  document_attached: boolean;
  document_url?: Array<string>;
}
