// import { SortingOrders } from '../enums/sorting-orders.enum';

export interface IQueryParams {
  itemsPerPage: string;
  page: string;
  sortingType: string; // { [key: string]: SortingOrders };
  columnName: string;
  columnValues: string;
}
