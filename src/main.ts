import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, new DocumentBuilder()
      .setTitle('HouseFinder API')
      .setDescription('HouseFinder API')
      .build());

    SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`Running application at port ${port}`);
}
bootstrap();
