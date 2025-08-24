import { PaginationState } from '@tanstack/react-table';
import { IUser } from './auth';
import { Parcel, ParcelStatusStat } from './parcel';

export type GetQueryParams = {
  pagination?: PaginationState;
  sort?: string;
  queryParams?: string;
  globalFilter?: string;
};

interface GetParcelResponse {
  status: 'success';
  message: string;
  data: {
    parcel: Parcel;
  };
}

export interface PaginatedResponse<T> {
  status: 'success';
  message: string;
  data: {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
  };
  total: number;
}

export type ParcelResponse = PaginatedResponse<Parcel>;
export type CustomerResponse = PaginatedResponse<IUser>;
export type AgentResponse = PaginatedResponse<IUser>;
export type ParcelStatusStatResponse = PaginatedResponse<ParcelStatusStat>;
