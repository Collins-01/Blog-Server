import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailService {
    // * Import Email Provider
  async sendEmail(dto: SendEmailDto) {}
}
