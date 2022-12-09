import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { EmailModule } from './email/email.module';
import DatabaseModule from './database/database.module';
import * as Joi from 'joi';
import { APP_PIPE } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { SubscribersModule } from './subscribers/subscribers.module';
import { DatabaseFilesModule } from './database-files/database-files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        // * Postgres
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        //* Emails
        EMAIL_SERVICE: Joi.string().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),
        // * AWS
        // AWS_REGION: Joi.string().required(),
        // AWS_ACCESS_KEY_ID: Joi.string().required(),
        // AWS_SECRET_ACCESS_KEY: Joi.string().required(),
      }),
    }),
    DatabaseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        host: configService.get('POSTGRES_HOST') ?? 'localhost',
        port: configService.get('POSTGRES_PORT') ?? 5454,
        user: configService.get('POSTGRES_USER') ?? 'postgres',
        password: configService.get('POSTGRES_PASSWORD') ?? '123',
        database: configService.get('POSTGRES_DB') ?? 'nest',
      }),
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    UsersModule,
    AuthModule,
    PostsModule,
    CommentsModule,
    EmailModule.register({
      password: '',
      service: '',
      user: '',
    }),

    EmailModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        service: configService.get<string>('EMAIL_SERVICE') ?? '',
        user: configService.get<string>('EMAIL_USER') ?? '',
        password: configService.get<string>('EMAIL_PASSWORD') ?? '',
      }),
    }),

    SubscribersModule,

    DatabaseFilesModule,
    // DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
      }),
    },
  ],
})
export class AppModule {}
