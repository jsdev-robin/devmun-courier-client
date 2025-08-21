import { apiSlice } from '../../api/api';
import { SuccessResponse } from '../../types';
import { GetQueryParams, ParcelResponse } from '../../types/api-response';
import { Parcel } from '../../types/parcel';

export const parcelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCustomerBookParcel: builder.mutation<SuccessResponse, Parcel>({
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
  }),
});

export const {
  useCreateCustomerBookParcelMutation,
  useGetCustomerParcelsQuery,
} = parcelApi;
