import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './prisma/prisma-client-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // * Swagger Documentation
  //   const config = new DocumentBuilder()
  //   .setTitle('Bookmarks API Documentation')
  //   .setDescription('API Description')
  //   .setVersion('1.0')
  //   .build();
  // const document = await SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  await app.listen(3000);
}
bootstrap();

// git@github.com-personal:Collins-01/Blog-Server.git


// * Core Tech StartUp
// https://medium.com/better-programming/architecture-of-modern-startup-abaec235c2eb