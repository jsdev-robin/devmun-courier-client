import { apiSlice } from '../../api/api';
import { SuccessResponse } from '../../types';
import {
  AgentResponse,
  CustomerResponse,
  GetQueryParams,
  ParcelResponse,
  ParcelStatusStatResponse,
} from '../../types/api-response';
import { ParcelAssginRequest } from '../../types/parcel';

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
      providesTags: ['AdminParcel'],
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
    }),

    getAgentByAdmin: builder.query<AgentResponse, GetQueryParams>({
      query: ({ pagination, queryParams, sort, globalFilter }) => {
        let url = `/admin/agent?page=${
          (pagination?.pageIndex ?? 0) + 1
        }&limit=${pagination?.pageSize ?? 20}`;
        if (queryParams) url += `&${queryParams}`;
        if (sort) url += `&${sort}`;
        if (globalFilter) url += `&q=${globalFilter}`;
        return { url, method: 'GET' };
      },
    }),

    agentInviteByAdmin: builder.mutation<SuccessResponse, { email: string }>({
      query: (data) => ({
        url: `/admin/agent/invite`,
        method: 'POST',
        body: data,
      }),
    }),

    agentCreate: builder.mutation<SuccessResponse, FormData>({
      query: (data) => ({
        url: `/admin/agent/create`,
        method: 'POST',
        body: data,
      }),
    }),

    parcelAssginByAdmin: builder.mutation<SuccessResponse, ParcelAssginRequest>(
      {
        query: (data) => ({
          url: `/admin/agent/assign`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['AdminParcel'],
      },
    ),

    parcelStatusDistribution: builder.query<ParcelStatusStatResponse, void>({
      query: () => '/admin/analytics/status-distribution',
    }),
  }),
});

export const {
  useGetParcelByAdminQuery,
  useGetCustomerByAdminQuery,
  useGetAgentByAdminQuery,
  useAgentInviteByAdminMutation,
  useAgentCreateMutation,
  useParcelAssginByAdminMutation,
  useParcelStatusDistributionQuery,
} = adminControllApi;
