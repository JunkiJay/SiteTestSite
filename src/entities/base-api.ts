import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { baseQueryWithReAuth } from './base-query-with-re-auth';
import { createApi } from '@reduxjs/toolkit/query/react';

interface SessionState {
  accessToken: null | string;
  refreshToken: null | string;
}

interface Credentials {
  accessToken: string;
  refreshToken: string;
}

export const baseApi = createApi({
  baseQuery: baseQueryWithReAuth,
  keepUnusedDataFor: 1,
  endpoints: (builder) => ({
    auth: builder.mutation<Credentials, string>({
      query: (launchParams) => ({ url: '/auth', body: { launchParams }, method: 'POST' }),
    }),
  }),
  tagTypes: ['Company', 'Account', 'Game', 'GameSync', 'Event'],
});
export const { useAuthMutation } = baseApi;

const INITIAL_SESSION_STATE: SessionState = { accessToken: null, refreshToken: null };

export const sessionSlice = createSlice({
  name: 'session',
  initialState: INITIAL_SESSION_STATE,
  reducers: {
    setCredentials: (state, { payload }: PayloadAction<Credentials>) => {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(baseApi.endpoints.auth.matchFulfilled, (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    });
  },
});

export const { setCredentials, logout } = sessionSlice.actions;
