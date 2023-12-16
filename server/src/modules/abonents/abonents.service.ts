/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: временно
import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IAbonentsService } from './typespaces/interfaces/IAbonentsService';
import { Abonent, AbonentDocument } from './schemas/abonent.schema';
import { CreateAbonentDto } from './typespaces/dto/create-abonent.dto';

@Injectable()
export class AbonentsService implements IAbonentsService {
  constructor(
    @InjectModel(Abonent.name) private AbonentModel: Model<AbonentDocument>,
  ) {}

  async createAbonent(data: CreateAbonentDto): Promise<Abonent> {
    try {
      const newAbonent = await this.AbonentModel.create(data);
      return newAbonent;
    } catch (err) {
      throw new HttpException(err.message, err.status || 500);
    }
  }

  async fetchAllAbonents(queryParams: any): Promise<Abonent[]> {
    try {
      const findedAbonents = await this.AbonentModel.find().select('-__v');
      return findedAbonents;
    } catch (err) {
      throw new HttpException(err.message, err.status || 500);
    }
  }

  async findAbonentById(id: number): Promise<Abonent> {
    throw new Error('Method not implemented.');
  }

  async deleteAbonent(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
