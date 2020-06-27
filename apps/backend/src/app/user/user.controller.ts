import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './user.dto';
import { ValidationPipe } from '../shared/pipes/validator.pipe';

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}
    
    
    @Post()
    @UsePipes(new ValidationPipe())
    async createUser(@Body() user:CreateUserDTO){
        return await this.userService.createUser(user)
    }

}
