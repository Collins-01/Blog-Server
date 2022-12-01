import { DynamicModule, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';
import EmailOptions from './email-options';
import { EMAIL_CONFIG_OPTIONS } from './constants';
import EmailAsyncOptions from './email-async-options';

// @Module({
//   imports: [ConfigModule],
//   controllers: [],
//   exports: [EmailService],
//   providers: [EmailService],
// })

@Module({})
export class EmailModule {
  static register(options: EmailOptions): DynamicModule {
    return {
      module: EmailModule,
      providers: [
        {
          provide: EMAIL_CONFIG_OPTIONS,
          useValue: options,
        },
        EmailService,
      ],
      exports: [EmailService],
    };
  }

  static registerAsync(options: EmailAsyncOptions): DynamicModule {
    return {
      module: EmailModule,
      imports: options.imports,
      providers: [
        {
          provide: EMAIL_CONFIG_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        EmailService,
      ],
      exports: [EmailService],
    };
  }
}
