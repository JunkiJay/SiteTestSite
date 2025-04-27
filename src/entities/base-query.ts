import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@app/model';

export const baseQuery = fetchBaseQuery({
  baseUrl: env.__API_URL__,
  credentials: 'include',
  prepareHeaders: (headers, config) => {
    const { getState, extra } = config;
    const accessToken = (getState() as RootState).session.accessToken;
    const refreshToken = (getState() as RootState).session.refreshToken;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const isRefresh = extra?.isRefresh;

    if (isRefresh && refreshToken) {
      headers.set('Authorization', `Bearer ${refreshToken}`);
    } else if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return headers;
  },
});
