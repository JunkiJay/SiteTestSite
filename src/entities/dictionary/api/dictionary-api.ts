import { baseApi } from '@entities/base-api';
import { EarnEvent } from '@entities/dictionary/types';

interface Dictionaries {
  earnEvents: EarnEvent[];
}

export const dictionaryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchDictionaries: builder.query<Dictionaries, void>({ query: () => '/dictionaries', providesTags: ['Event'] }),
  }),
});

export const { useFetchDictionariesQuery, useLazyFetchDictionariesQuery } = dictionaryApi;
