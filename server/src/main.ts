import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './modules/app/app.module';
import { ExtendedException } from './filters/extended-exception.filter';
import { ValidationPipe } from './validation/validation.pipe';
import { clientExternalPort, serverExternalPort } from './config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app
    .setGlobalPrefix('api')
    .useGlobalFilters(new ExtendedException())
    .useGlobalPipes(new ValidationPipe())
    .enableCors({ origin: [`http://localhost:${clientExternalPort}`] });

  await app.listen(serverExternalPort, () =>
    console.log(`Сервер успешно стартанул на ${serverExternalPort} порту!`),
  );
}

bootstrap();
