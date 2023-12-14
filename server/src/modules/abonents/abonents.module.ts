import { Module } from '@nestjs/common';
import { AbonentsController } from './abonents.controller';
import { AbonentsService } from './abonents.service';

@Module({
  imports: [],
  controllers: [AbonentsController],
  providers: [AbonentsService],
})
export class AbonentsModule {}

/*
  Номер телефона, адрес (Улица, дом, квартира - другая таблица. 1 к 1, так как прописан человек только в одном месте может быть за раз), емэйл, ф, и, о.
  Будет фильтрация по столбцу!
*/
