import {IsUUID,IsString,IsIn, IsNotEmpty} from 'class-validator'
import { globalConfig } from '@gurusishyan-config';
export class CreateUserDTO{
    @IsUUID('all',{message:"Invalid Format: User ID"})
    @IsNotEmpty()
    user_id:string;

    @IsString({message:"ValidationError: User name is missing"})
    @IsNotEmpty()
    user_name:string;

    @IsString({message:"User role is missing"})
    @IsIn(globalConfig.roles,{message:"invalid option: invalid user role"})
    @IsNotEmpty()
    user_role:string
}