import { SortingOrders } from '../enums/sorting-orders.enum';

export interface IQueryParams {
  itemsPerPage: string;
  page: string;
  sortingType: { [key: string]: SortingOrders };
}
