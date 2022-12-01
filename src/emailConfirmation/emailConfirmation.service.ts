import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import  UsersService  from 'src/users/users.service';
import VerificationTokenPayload from './verification-token-payload';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    // private readonly emailService: EmailService,
    private readonly usersService: UsersService,
  ) {}
  async sendVerificationLink(email: string) {
    const payload: VerificationTokenPayload = { email };
    const token = await this.jwtService.signAsync(payload, {
      secret: '',
      expiresIn: '5m',
    });
  }
}
