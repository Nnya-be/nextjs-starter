import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get()
    findAllUsers(@Query('role') role?: 'INTERN' | 'ADMIN' | 'ENGINEER'){
        return this.usersService.findAll(role);
    }

    @Get(':id')
    findUserById(@Param('id', ParseIntPipe) id: number){
        return this.usersService.findUser(id);
    }

    @Post()
    createNewUser(@Body(ValidationPipe) createUserDto:CreateUserDto){
        return this.usersService.createUser(createUserDto);
    }

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number , @Body(ValidationPipe) updateUserDto:UpdateUserDto){
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id:number){
        return this.usersService.deleteUser(id);
    }
}
