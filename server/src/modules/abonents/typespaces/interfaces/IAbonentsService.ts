import { Abonent } from '../../schemas/abonent.schema';
import { CreateAbonentDto } from '../dto/create-abonent.dto';
import { ID } from '../types/id';
import { IQueryParams } from './IQueryParams';

export interface IAbonentsService {
  createAbonent(data: CreateAbonentDto): Promise<Abonent>;
  fetchAllAbonents(
    queryParams: IQueryParams,
  ): Promise<{ findedAbonents: Abonent[]; totalAbonents: number }>;
  deleteAbonent(id: ID): Promise<void>;
  getUniqueColumnValues(columnName: string): Promise<string[]>;
}
