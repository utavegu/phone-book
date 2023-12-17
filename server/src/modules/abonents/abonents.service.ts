/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: временно
import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IAbonentsService } from './typespaces/interfaces/IAbonentsService';
import { Abonent, AbonentDocument } from './schemas/abonent.schema';
import { CreateAbonentDto } from './typespaces/dto/create-abonent.dto';
import { IQueryParams } from './typespaces/interfaces/IQueryParams';
import { SortingOrders } from './typespaces/enums/sorting-orders.enum';

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

  async fetchAllAbonents({
    itemsPerPage = '2', // TODO: пусть будет 5 (и на клиенте), но нужно будет расширить базу
    page = '1',
    sortingType = { surname: SortingOrders.ASC },
  }: IQueryParams): Promise<{
    findedAbonents: Abonent[];
    totalAbonents: number;
  }> {
    try {
      const offset = (Number(page) - 1) * Number(itemsPerPage);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const totalAbonents = await this.AbonentModel.find().count();
      const findedAbonents = await this.AbonentModel.find()
        .limit(Number(itemsPerPage))
        .skip(offset)
        .sort(sortingType)
        .select('-__v');
      return { findedAbonents, totalAbonents };
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
