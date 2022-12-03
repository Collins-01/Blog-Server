import {
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateEmailUserDto } from 'src/users/dto/create-email-user.dto';
import UserModel from 'src/users/models/user.model';
import FindOneParams from 'src/utils/find_one_params';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-current-user.decorator';
import { LoginDto, UpdatePasswordDto } from './dto';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  async emailRegister(@Body() dto: CreateEmailUserDto, @Res() res: Response) {
    const data = await this.authService.registerWithEmail(dto);
    return res.status(201).json({
      status: true,
      ...data,
    });
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const data = await this.authService.loginWithEmail(dto);
    return res.status(200).json({
      status: true,
      ...data,
    });
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Patch('update-password')
  async updatePassword(
    @Body() dto: UpdatePasswordDto,
    @GetUser() user: UserModel,
  ) {
    return await this.authService.updatePassword(dto, user.id);
  }
}
