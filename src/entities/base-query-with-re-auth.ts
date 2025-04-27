import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery } from '@entities/base-query';
import { RootState } from '@app/model';
import { logout, setCredentials } from '@entities/base-api';

export const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);

  const isUnauthorized = result?.meta?.response?.status === 401;
  if (isUnauthorized) {
    const currenRefreshToken = (api.getState() as RootState).session.refreshToken;
    if (currenRefreshToken) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      const refreshResult = await baseQuery(
        { url: '/refreshToken', method: 'GET' },
        { ...api, extra: { isRefresh: true } },
      );

      if (refreshResult.data) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        const { accessToken, refreshToken } = refreshResult.data;
        api.dispatch(setCredentials({ accessToken, refreshToken }));

        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    }
  }

  return result;
};
