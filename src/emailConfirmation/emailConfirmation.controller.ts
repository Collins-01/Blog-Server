import { Controller, Post } from '@nestjs/common';
import { EmailConfirmationService } from './emailConfirmation.service';

@Controller('email-confirmation')
export class EmailConfirmationController {
  constructor(private emailConfirmationService: EmailConfirmationService) {}
  @Post('send-email')
  async sendEmailConfirmation() {}

  
}
