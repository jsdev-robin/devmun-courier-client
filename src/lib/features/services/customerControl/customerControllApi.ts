import { apiSlice } from '../../api/api';
import { SuccessResponse } from '../../types';
import { GetQueryParams, ParcelResponse } from '../../types/api-response';
import { ParcelRequest } from '../../types/parcel';

export const customerControllApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getParcelByCustomer: builder.query<ParcelResponse, GetQueryParams>({
      query: ({ pagination, queryParams, sort, globalFilter }) => {
        let url = `/customer/parcel?page=${
          (pagination?.pageIndex ?? 0) + 1
        }&limit=${pagination?.pageSize ?? 20}`;
        if (queryParams) url += `&${queryParams}`;
        if (sort) url += `&${sort}`;
        if (globalFilter) url += `&q=${globalFilter}`;
        return { url, method: 'GET' };
      },
      providesTags: ['CustomerParcel'],
    }),

    createCustomerBookParcel: builder.mutation<SuccessResponse, ParcelRequest>({
      query: (data) => ({
        url: `/customer/parcel`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['CustomerParcel'],
    }),
  }),
});

export const {
  useGetParcelByCustomerQuery,
  useCreateCustomerBookParcelMutation,
} = customerControllApi;
