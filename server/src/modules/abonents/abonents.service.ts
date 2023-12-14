/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: временно
import { Injectable } from '@nestjs/common';
import { IAbonentsService } from './typespaces/interfaces/IAbonentsService';

@Injectable()
export class AbonentsService implements IAbonentsService {
  createAbonent(data: any): Promise<any> {
    throw new Error('Method not implemented.');
  }

  fetchAllAbonents(): Promise<any[]> {
    throw new Error('Method not implemented.');
  }

  findAbonentById(id: number): Promise<Omit<any, 'passwordHash'>> {
    throw new Error('Method not implemented.');
  }

  updateAbonent(id: number, data: any): Promise<any> {
    throw new Error('Method not implemented.');
  }

  deleteAbonent(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
