import { apiSlice } from '../../api/api';
import { GetQueryParams, ParcelResponse } from '../../types/api-response';

export const agentControllApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getParcelByAgent: builder.query<ParcelResponse, GetQueryParams>({
      query: ({ pagination, queryParams, sort, globalFilter }) => {
        let url = `/agent/parcel?page=${
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

export const { useGetParcelByAgentQuery } = agentControllApi;
