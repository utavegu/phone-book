import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Abonent, AbonentSchema } from './schemas/abonent.schema';
import { AbonentsController } from './abonents.controller';
import { AbonentsService } from './abonents.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Abonent.name, schema: AbonentSchema }]),
  ],
  controllers: [AbonentsController],
  providers: [AbonentsService],
})
export class AbonentsModule {}
