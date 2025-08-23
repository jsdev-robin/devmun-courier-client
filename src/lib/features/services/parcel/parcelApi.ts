import { apiSlice } from '../../api/api';
import { SuccessResponse } from '../../types';
import {
  GetParcelResponse,
  GetQueryParams,
  ParcelResponse,
  ParcelStatusResponse,
} from '../../types/api-response';
import { ParcelRequest } from '../../types/parcel';

export const parcelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCustomerBookParcel: builder.mutation<SuccessResponse, ParcelRequest>({
      query: (data) => ({
        url: `/customer/parcel`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Parcel'],
    }),

    getCustomerParcels: builder.query<ParcelResponse, GetQueryParams>({
      query: ({ pagination, queryParams, sort, globalFilter }) => {
        let url = `/customer/parcel?page=${
          (pagination?.pageIndex ?? 0) + 1
        }&limit=${pagination?.pageSize ?? 20}`;
        if (queryParams) url += `&${queryParams}`;
        if (sort) url += `&${sort}`;
        if (globalFilter) url += `&q=${globalFilter}`;
        return { url, method: 'GET' };
      },
      providesTags: ['Parcel'],
    }),

    getCustomerParcelById: builder.query<GetParcelResponse, string>({
      query: (id) => `customer/parcel/${id}`,
    }),

    getAgentParcelById: builder.query<GetParcelResponse, string>({
      query: (id) => `customer/parcel/agent/assign/${id}`,
    }),

    getParcelStatusByAgent: builder.query<ParcelStatusResponse, void>({
      query: () => `customer/parcel/agent/status-counts`,
    }),

    getAgentParcels: builder.query<ParcelResponse, void>({
      query: () => 'customer/parcel/agent/assign',
    }),
  }),
});

export const {
  useCreateCustomerBookParcelMutation,
  useGetCustomerParcelsQuery,
  useGetCustomerParcelByIdQuery,
  useGetAgentParcelByIdQuery,
  useGetParcelStatusByAgentQuery,
  useGetAgentParcelsQuery,
} = parcelApi;
