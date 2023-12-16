import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AbonentsModule } from '../abonents/abonents.module';
import {
  dbName,
  mongoDbLogin,
  mongoDbPassword,
  mongoInternalPort,
  mongoServiceName,
} from 'src/config';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${mongoServiceName}:${mongoInternalPort}`,
      {
        user: mongoDbLogin,
        pass: mongoDbPassword,
        dbName: dbName,
      },
    ),
    AbonentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
