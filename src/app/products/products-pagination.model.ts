import { Product } from './products.model';

export interface ProductsPagination {
  pageSize: number;
  pageNumber: number;
  sortField: string;
  sortDirection: number;
  pagesQuantity?: number;
  data?: Product[];
  filterField: string;
  filterValue: string;
  totalRows?: number;
}
