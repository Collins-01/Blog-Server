import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';

@Module({
  controllers: [EmailController],
  exports: [EmailService],
  providers: [EmailService]
})
export class EmailModule {}
