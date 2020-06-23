import {IsString,Length} from 'class-validator'
export class StaticDataDTO{
    @IsString({"message":"ValidationError - ID is missing"})
    @Length(36,36,{message:'ValidationError - Not a valid ID'})
    static_data_id:string;

    @IsString({message:"ValidationError - Data Label key is missing"})
    data_label_key:string;

    @IsString({message:"ValidationError - Data Label value is missing"})
    data_label_value:string;

    @IsString({message:"ValidationError - Data Label type is missing"})
    data_label_type:string;

}