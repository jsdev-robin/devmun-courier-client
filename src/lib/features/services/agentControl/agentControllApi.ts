import { apiSlice } from '../../api/api';
import { SuccessResponse } from '../../types';
import { GetQueryParams, ParcelResponse } from '../../types/api-response';
import { ParcelStatusUpdateRequest } from '../../types/parcel';

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
      providesTags: ['AgentParcel'],
    }),

    parcelStatusUpdateByAgent: builder.mutation<
      SuccessResponse,
      ParcelStatusUpdateRequest
    >({
      query: ({ parcelId, status, notes }) => ({
        url: `/agent/parcel/${parcelId}`,
        method: 'PUT',
        body: { status, notes },
      }),
      invalidatesTags: ['AgentParcel'],
    }),
  }),
});

export const {
  useGetParcelByAgentQuery,
  useParcelStatusUpdateByAgentMutation,
} = agentControllApi;
