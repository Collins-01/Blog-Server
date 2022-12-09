import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import UsersService from './users.service';

import { Response,Request } from 'express';

import { UpdateUserDto } from './dto/update-user.dto';
import { CreateEmailUserDto } from './dto/create-email-user.dto';
import FindOneParams from 'src/utils/find_one_params';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/auth/decorators/get-current-user.decorator';
import UserModel from './models/user.model';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateEmailUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') { id }: FindOneParams) {
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

  @Get('jj')
  async getMe(@GetUser() user: UserModel, @Res() response: Response,@Req() request:Request) {
    // const userInfo = await this.usersService.findOne(user.id)
    return response.status(200).json({
      status: true,
      data: {
      ...request.user
      },
    });
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@UploadedFile() file: Express.Multer.File) {}
}
