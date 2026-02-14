import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';  // Import the DTO for updating


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    //return this.usersService.findAll();
    const users = await this.usersService.findAll();  // Fetch all users
    console.log(users);  // Log the users to the console
    return users;  // Return the users in the response
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // New PUT route for updating a user
  // @Put(':id')
  // update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(id, updateUserDto);
  // }
   @Put(':id')
   update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
     return this.usersService.update(id, updateUserDto);
   }



  // @Delete(':id')
  // remove(@Param('id') id: number) {
  //   return this.usersService.remove(id);
  // }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
     return this.usersService.remove(id);
   }
}