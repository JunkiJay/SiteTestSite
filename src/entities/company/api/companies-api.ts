import { Company } from '@entities/company/types';
import { baseApi } from '@entities/base-api';

export interface CreateCompanyRequestPayload {
  name: string;
  field: string;
  image?: File;
}

export interface EditCompanyRequestPayload {
  name?: string;
  field?: string;
  image?: File;
  id: string;
}

export const companiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchCompaniesList: builder.query<Company[], void>({
      query: () => '/companies',
      providesTags: (result) =>
        result ? [...result.map(({ id }) => ({ type: 'Company' as const, id })), 'Company'] : ['Company'],
    }),
    fetchCompany: builder.query<Company, string>({
      query: (id) => `/companies/${id}`,
      providesTags: (result, error, arg) => (result ? [{ type: 'Company', id: arg }, 'Company'] : ['Company']),
    }),
    createCompany: builder.mutation<Company, CreateCompanyRequestPayload>({
      query: (payload) => ({ url: `/companies`, method: 'POST', body: payload }),
      invalidatesTags: ['Company'],
    }),
    editCompany: builder.mutation<Company, EditCompanyRequestPayload>({
      query: ({ id, ...companyFields }) => ({ url: `/companies/${id}`, method: 'PUT', body: companyFields }),
      invalidatesTags: (result, error, arg) => [{ type: 'Company', id: arg.id }],
    }),
    joinCompany: builder.mutation<Company, string>({
      query: (id) => ({ url: `/companies/${id}/join`, method: 'PATCH' }),
    }),
    leaveCompany: builder.mutation<Company, string>({
      query: (id) => ({ url: `/companies/${id}/leave`, method: 'PATCH' }),
    }),
  }),
});

export const {
  useJoinCompanyMutation,
  useLeaveCompanyMutation,
  useCreateCompanyMutation,
  useEditCompanyMutation,
  useFetchCompanyQuery,
  useFetchCompaniesListQuery,
} = companiesApi;
