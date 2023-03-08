import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Simple Shopping Cart')
    .setDescription(
      'The goal of this testing project is to ensure the proper functioning of a web-based shopping cart that allows ' +
        'users to add, remove, and purchase products from a catalog.',
    )
    .setVersion('v0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors({
    origin: process.env.CORS_WHITELIST.split(','),
  });

  await app.listen(process.env.APP_PORT, () =>
    console.log(`Server started on port: ${process.env.APP_PORT}`),
  );
}
bootstrap();
