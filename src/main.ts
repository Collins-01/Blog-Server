import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from 'aws-sdk';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // * Swagger Documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Bookmarks API Documentation')
    .setDescription('API Description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    }),
  );

  const configService = app.get(ConfigService);
  // *AWS Config
  config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
  });
  await app.listen(3000);
}
bootstrap();

// git@github.com-personal:Collins-01/Blog-Server.git

// * Core Tech StartUp
// https://medium.com/better-programming/architecture-of-modern-startup-abaec235c2eb

//* ✅ Methods That are working
//* Methods  That has not been tested, but new refactored ⭐️
