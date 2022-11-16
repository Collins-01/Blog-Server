import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateEmailUserDto } from 'src/users/dto/create-email-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';

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
}
