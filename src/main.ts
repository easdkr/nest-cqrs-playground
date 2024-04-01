import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('thingsflow mission')
    .setDescription('hingsflow mission api documentation')
    .setVersion('1.0.0')
    .build();

  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, options));
  await app.listen(3000);
}
bootstrap();
