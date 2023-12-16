import { Abonent } from '../../schemas/abonent.schema';
import { CreateAbonentDto } from '../dto/create-abonent.dto';

export interface IAbonentsService {
  createAbonent(data: CreateAbonentDto): Promise<Abonent>;
  fetchAllAbonents(queryParams: any): Promise<Abonent[]>;
  findAbonentById(id: number): Promise<Abonent>;
  deleteAbonent(id: number): Promise<void>;
}

// TODO: Также квери параметры - страница, сортировка, фильтры
