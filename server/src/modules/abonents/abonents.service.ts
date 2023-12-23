import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { getFilters } from 'src/helpers/getFilters';
import { IAbonentsService } from './typespaces/interfaces/IAbonentsService';
import { Abonent, AbonentDocument } from './schemas/abonent.schema';
import { CreateAbonentDto } from './typespaces/dto/create-abonent.dto';
import { IQueryParams } from './typespaces/interfaces/IQueryParams';

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
    itemsPerPage = '5',
    page = '1',
    sortingType,
    columnName,
    columnValues,
  }: IQueryParams): Promise<{
    findedAbonents: Abonent[];
    totalAbonents: number;
  }> {
    try {
      // TODO. При использовании $fetch приходит {"surname":"desc"}, а должно {surname: "desc"}. Аксиос парсит сам. Посмотри в настройках фетча.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const parsedSortingType = JSON.parse(sortingType);
      const offset = (Number(page) - 1) * Number(itemsPerPage);
      const filters = getFilters(columnName, columnValues);
      const totalAbonents = await this.AbonentModel.countDocuments(filters);
      const findedAbonents = await this.AbonentModel.find(filters)
        .limit(Number(itemsPerPage))
        .skip(offset)
        .sort(parsedSortingType)
        .select('-__v');
      return { findedAbonents, totalAbonents };
    } catch (err) {
      throw new HttpException(err.message, err.status || 500);
    }
  }

  async deleteAbonent(id: number): Promise<void> {
    try {
      await this.AbonentModel.findByIdAndDelete(id);
      return;
    } catch (err) {
      throw new HttpException(err.message, err.status || 500);
    }
  }

  async getUniqueColumnValues(columnName: string): Promise<string[]> {
    try {
      return await this.AbonentModel.distinct(columnName);
    } catch (err) {
      throw new HttpException(err.message, err.status || 500);
    }
  }
}
