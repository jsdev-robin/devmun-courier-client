import { apiSlice } from '../../api/api';
import {
  CustomerResponse,
  GetQueryParams,
  ParcelResponse,
} from '../../types/api-response';

export const adminControllApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getParcelByAdmin: builder.query<ParcelResponse, GetQueryParams>({
      query: ({ pagination, queryParams, sort, globalFilter }) => {
        let url = `/admin/parcel?page=${
          (pagination?.pageIndex ?? 0) + 1
        }&limit=${pagination?.pageSize ?? 20}`;
        if (queryParams) url += `&${queryParams}`;
        if (sort) url += `&${sort}`;
        if (globalFilter) url += `&q=${globalFilter}`;
        return { url, method: 'GET' };
      },
      providesTags: ['Parcel'],
    }),

    getCustomerByAdmin: builder.query<CustomerResponse, GetQueryParams>({
      query: ({ pagination, queryParams, sort, globalFilter }) => {
        let url = `/admin/customer?page=${
          (pagination?.pageIndex ?? 0) + 1
        }&limit=${pagination?.pageSize ?? 20}`;
        if (queryParams) url += `&${queryParams}`;
        if (sort) url += `&${sort}`;
        if (globalFilter) url += `&q=${globalFilter}`;
        return { url, method: 'GET' };
      },
      providesTags: ['Parcel'],
    }),
  }),
});

export const { useGetParcelByAdminQuery, useGetCustomerByAdminQuery } =
  adminControllApi;
