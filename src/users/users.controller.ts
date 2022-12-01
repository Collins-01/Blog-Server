import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import UsersService  from './users.service';

import { UpdateUserDto } from './dto/update-user.dto';
import { CreateEmailUserDto } from './dto/create-email-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateEmailUserDto) {
    return this.usersService.create(createUserDto);
  }

  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
