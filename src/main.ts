import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {AppModule} from './app.module';
import {environment} from './environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prefix = `/api/${environment.version}`;
  app.setGlobalPrefix(prefix);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Story Service')
    .setDescription('The backend service for https://app.clashsoft.de/stories')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(prefix, app, document);

  await app.listen(environment.port);
}

bootstrap();
