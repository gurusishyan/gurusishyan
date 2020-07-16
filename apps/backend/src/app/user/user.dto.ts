import {
  IsString,
  IsIn,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';
import { globalConfig } from '@gurusishyan-config';
export class CreateUserDTO {
  @IsString({ message: 'ValidationError: User name is missing' })
  @IsNotEmpty({ message: 'ValidationError: User name is missing' })
  user_name: string;

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

export class LoginUserDTO {
  @IsString({ message: 'ValidationError: User name is missing' })
  @IsNotEmpty({ message: 'ValidationError: User name is missing' })
  user_name: string;

  @IsString({ message: 'Required Field Error: Password is a required field' })
  @IsNotEmpty({ message: 'Required Field Error: Password is a required field' })
  password: string;
}
