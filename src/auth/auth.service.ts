import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmailUserDto } from 'src/users/dto/create-email-user.dto';
import UsersService from 'src/users/users.service';
import { LoginDto, UpdatePasswordDto } from './dto';
import * as argon from 'argon2';
import { JwtAuthService } from './jwt/jwt-auth.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtAuthService: JwtAuthService,
  ) {}

  async registerWithEmail(dto: CreateEmailUserDto) {
    const data = await this.userService.create(dto);
    const { hash, isEmailVerified, ...user } = data;
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
    const { hash, isEmailVerified, ...user } = res;
    return {
      accessToken,
      user,
    };
  }
  //* Change Password

  async updatePassword(dto: UpdatePasswordDto, userId: number) {
    try {
      const user = await this.userService.findOne(userId);
      if (dto.oldPassword === dto.newPassword) {
        throw new ForbiddenException(
          'Old and new passwords must not be the same.',
        );
      }
      const hasMatchOld = await argon.verify(user.hash, dto.oldPassword);
      if (!hasMatchOld) {
        throw new BadRequestException('Old passwords do not match.');
      }
      const newHash = await argon.hash(dto.oldPassword);
      await this.userService.updatePassword(userId, newHash);
    } catch (error) {
      throw new Error(error);
    }
  }

  

  //* Confirm Email
  //* Forgot Password
  // *
}
