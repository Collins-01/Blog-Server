import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { JwtPayload } from './jwt-auth.strategy';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  signToken(user: User) {
    const payload: JwtPayload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
