import { baseApi } from '@entities/base-api';
import { FetchAccountDataResponse } from '../types';

export const accountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAccountData: builder.query<FetchAccountDataResponse, void>({
      query: () => '/account',
      providesTags: ['Account'],
    }),
  }),
});

export const { useFetchAccountDataQuery, useLazyFetchAccountDataQuery } = accountApi;
