import { PaginationState } from '@tanstack/react-table';
import { IParcelResponse } from './parcel';

export type GetQueryParams = {
  pagination?: PaginationState;
  sort?: string;
  queryParams?: string;
  globalFilter?: string;
};

export interface PaginatedResponse<T> {
  status: 'success';
  message: string;
  data: T[];
  total: number;
}

export type ParcelResponse = PaginatedResponse<IParcelResponse>;
