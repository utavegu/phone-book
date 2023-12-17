import { Abonent } from '../../schemas/abonent.schema';
import { CreateAbonentDto } from '../dto/create-abonent.dto';
import { IQueryParams } from './IQueryParams';

export interface IAbonentsService {
  createAbonent(data: CreateAbonentDto): Promise<Abonent>;
  fetchAllAbonents(
    queryParams: IQueryParams,
  ): Promise<{ findedAbonents: Abonent[]; totalAbonents: number }>;
  findAbonentById(id: number): Promise<Abonent>;
  deleteAbonent(id: number): Promise<void>;
}
