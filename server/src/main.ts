import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api').enableCors({ origin: ['http://localhost:3000'] });

  await app.listen(PORT, () =>
    console.log(`Сервер успешно стартанул на ${PORT} порту!`),
  );
}

bootstrap();
