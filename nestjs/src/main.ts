import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {LoggerMiddleware} from "./middleware/logger.middleware";

async function main() {
  const app = await NestFactory.create(AppModule);
  app.use(new LoggerMiddleware().use);

  const config = new DocumentBuilder()
      .setTitle('Mon API')
      .setDescription('API de mon projet NestJS')
      .setVersion('1.0')
      .addTag('projets')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
main();
