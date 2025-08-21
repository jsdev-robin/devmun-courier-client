import { apiSlice } from '../../api/api';
import { SuccessResponse } from '../../types';
import { Parcel } from '../../types/parcel';

export const parcelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    customerBookParcel: builder.mutation<SuccessResponse, Parcel>({
      query: (data) => ({
        url: `/customer/parcel`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCustomerBookParcelMutation } = parcelApi;
