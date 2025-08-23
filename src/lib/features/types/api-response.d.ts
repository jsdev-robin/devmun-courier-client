import { PaginationState } from '@tanstack/react-table';
import { Parcel } from './parcel';

export type GetQueryParams = {
  pagination?: PaginationState;
  sort?: string;
  queryParams?: string;
  globalFilter?: string;
};

interface GetParcelResponse {
  status: 'success';
  message: string;
  parcel: Parcel;
}

type ParcelStatus =
  | 'booked'
  | 'picked_up'
  | 'in_transit'
  | 'delivered'
  | 'failed';

interface StatusCount {
  _id: ParcelStatus;
  count: number;
}

export interface PaginatedResponse<T> {
  status: 'success';
  message: string;
  data: T[];
  total: number;
}

export type ParcelResponse = PaginatedResponse<Parcel>;
export type ParcelStatusResponse = PaginatedResponse<StatusCount>;
