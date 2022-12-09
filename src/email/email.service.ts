import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { EMAIL_CONFIG_OPTIONS } from './constants';
import EmailOptions from './email-options';
// import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailService {
  private nodemailerTransport: Mail;
  constructor(@Inject(EMAIL_CONFIG_OPTIONS) private options: EmailOptions) {
    this.nodemailerTransport = createTransport({
      service: options.service,
      auth: {
        pass: options.password,
        user: options.user,
      },
    });
  }

  async sendEmail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail(options);
  }
}
