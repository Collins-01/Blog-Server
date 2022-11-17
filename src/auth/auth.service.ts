import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmailUserDto } from 'src/users/dto/create-email-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto';
import * as argon from 'argon2';
import { JwtAuthService } from './jwt/jwt-auth.service';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtAuthService: JwtAuthService,
  ) {}

  async registerWithEmail(dto: CreateEmailUserDto) {
    const data = await this.userService.create(dto);
    const { hash, isEmailConfirmed, ...user } = data;
    const accessToken = this.jwtAuthService.signToken(data);
    return {
      user,
      ...accessToken,
    };
  }

  async loginWithEmail(dto: LoginDto) {
    const res = await this.userService.findOneByEmail(dto.email);
    if (!res) {
      throw new NotFoundException(`No user with ${dto.email} was found.`);
    }
    if (!res.hash) {
      throw new NotFoundException(
        `No user with ${dto.email} was found with email authentication.`,
      );
    }

    const match = await argon.verify(res.hash, dto.password);
    if (!match) {
      throw new BadRequestException('Invalid credentials.');
    }
    const { accessToken } = this.jwtAuthService.signToken(res);
    const { hash, isEmailConfirmed, ...user } = res;
    return {
      accessToken,
      user,
    };
  }
}
