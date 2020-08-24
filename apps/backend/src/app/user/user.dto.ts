import {
  IsString,
  IsIn,
  IsNotEmpty,
  IsEmail,
  IsArray,
  IsPhoneNumber,
  IsNumber,
  IsNumberString,
} from 'class-validator';
import { globalConfig } from '@gurusishyan-config';
import { BadRequestException } from '@nestjs/common';
export class CreateUserDTO {
  @IsString({ message: 'ValidationError: User name is missing' })
  @IsNotEmpty({ message: 'ValidationError: User name is missing' })
  user_name: string;

  user_image?:string;
  @IsString({ message: 'User role is missing' })
  @IsIn(globalConfig.roles, { message: 'Invalid option: Invalid user role' })
  @IsNotEmpty({ message: 'User role is missing' })
  user_role?: string;

  @IsString({ message: 'Required Field Error: Password is a required field' })
  @IsNotEmpty({ message: 'Required Field Error: Password is a required field' })
  password?: string;

  @IsEmail({}, { message: 'Invalid Format: Email Address' })
  user_email: string;
}
export class CreateGoogleUserDTO {
  @IsString({ message: 'ValidationError: User name is missing' })
  @IsNotEmpty({ message: 'ValidationError: User name is missing' })
  user_name: string;

  @IsString({ message: 'ValidationError: User Image should be of type string URL' })
  @IsNotEmpty({ message: 'User image is missing' })
  user_image: string;

  @IsEmail({}, { message: 'Invalid Format: Email Address' })
  @IsNotEmpty({message:"RequiredFieldError: Email is mandatory"})
  user_email: string;
}


export class CreateTeacherDTO {
  @IsString({ message: 'ValidationError: Username should be of type string' })
  @IsNotEmpty({
    message: 'Required Field Error: Username is a mandatory field',
  })
  user_name: string;

  @IsString({ message: 'Teaching sector should be of type string' })
  @IsNotEmpty({ message: 'Teaching Sector cannot be empty' })
  teaching_sector: string;

  @IsEmail()
  @IsString({ message: 'ValidationError: Email id should be of type string' })
  user_email: string;

  @IsPhoneNumber('IN', {
    message: (args) => {
      if (args.value && args.value.length != 10) {
        throw new BadRequestException('Not a proper Indian Phone Number');
      }
      return 'ValidationError: Not a proper mobile number';
    },
  })
  @IsNumberString({ no_symbols: true })
  phone: number;

  @IsIn(globalConfig.classes, { message: 'Invalid Option: Class of Study' })
  @IsNotEmpty({
    message:
      'ValidationError: Class of study is mandatory and should be of type string',
  })
  classes_handled: string;

  @IsString({ message: 'Required Field Error: Board Of Education' })
  @IsIn(globalConfig.board_of_education, {
    message: 'Invalid Option: Board Of Education',
  })
  @IsNotEmpty({
    message: 'Board Of Education is mandatory and should be of type string',
  })
  board_of_education_teacher: string;

  @IsNotEmpty({
    message:
      'ValidationError: Subject Handled is mandatory and should be of type string',
  })
  @IsString({ message: 'Required Field Error: Subject Handled' })
  subjects_handled: string;

  @IsNotEmpty({
    message:
      'ValidationError: Password is mandatory and should be of type string',
  })
  @IsString({ message: 'Required Field Error: Password' })
  password: string;

  teacher: boolean
}

export class LoginUserDTO {
  @IsString({ message: 'ValidationError: User name is missing' })
  @IsNotEmpty({ message: 'ValidationError: User name is missing' })
  user_name: string;

  @IsString({ message: 'Required Field Error: Password is a required field' })
  @IsNotEmpty({ message: 'Required Field Error: Password is a required field' })
  password: string;
}
