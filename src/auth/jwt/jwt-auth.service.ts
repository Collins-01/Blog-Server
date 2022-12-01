import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import UserModel from 'src/users/models/user.model';
import { JwtPayload } from './jwt-auth.strategy';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  signToken(user: UserModel) {
    const payload: JwtPayload = { email: user.email, sub: `${user.id}` };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
