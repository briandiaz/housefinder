import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';


async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule, { cors: true });

  const document = SwaggerModule.createDocument(app, new DocumentBuilder()
      .setTitle('HouseFinder API')
      .setDescription('HouseFinder API')
      .setVersion('1.0')
      .addBearerAuth()
      .build());

  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`Running application at port ${port}`);
}
bootstrap();
