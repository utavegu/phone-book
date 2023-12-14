import { Module } from '@nestjs/common';
import { AbonentsModule } from '../abonents/abonents.module';

@Module({
  imports: [AbonentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
