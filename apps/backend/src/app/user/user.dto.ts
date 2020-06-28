import {
  IsUUID,
  IsString,
  IsIn,
  IsNotEmpty,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { globalConfig } from '@gurusishyan-config';
import { ImploreEntity, VibeEntity } from '../../entities';
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
export class UserRO {
  user_id: string;
  user_name: string;
  created: string;
  token?: string;
  user_role: string;
  user_email: string;
  bookmarked_implores:ImploreEntity[]
  bookmarked_vibes:VibeEntity[]
}
