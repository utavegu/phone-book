import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AbonentsModule } from '../abonents/abonents.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://mongo:27017`, {
      user: 'root',
      pass: 'example',
      dbName: 'phone-book',
    }),
    AbonentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
