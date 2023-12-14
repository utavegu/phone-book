export interface IAbonentsService {
  createAbonent(data: any): Promise<any>;
  fetchAllAbonents(): Promise<any[]>;
  findAbonentById(id: number): Promise<Omit<any, 'passwordHash'>>;
  updateAbonent(id: number, data: any): Promise<any>;
  deleteAbonent(id: number): Promise<void>;
}

// TODO: ждут модели. Возвращаемые эни - модель абонента. При создании - create-abonent.dto.ts, при редактировании update-user.dto.ts
