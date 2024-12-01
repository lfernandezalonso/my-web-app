import { Color } from './colors.models';

export interface ColorsPagination {
  pageSize: number;
  pageNumber: number;
  sortField: string;
  sortDirection: number;
  data?: Color[];
  filterField: string
  filterValue: string;
  totalRows?: number;
}
