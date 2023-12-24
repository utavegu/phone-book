export interface IAbonent {
  _id: string;
  surname: string;
  name: string;
  patronymic?: string;
  phone: string;
  email: string;
  city?: string;
  street?: string;
  house?: number;
  flat?: number;
}
