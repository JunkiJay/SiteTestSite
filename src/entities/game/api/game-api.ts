import { baseApi } from '@entities/base-api';
import {
  Boost,
  ClaimRewardPayload,
  EBoostType,
  FetchGameDataResponse,
  SyncMutationPayload,
  SyncMutationResponse,
} from '@entities/game/types';

export const gameApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchGameData: builder.query<FetchGameDataResponse, void>({
      query: () => {
        return {
          url: '/game',
          method: 'GET',
        };
      },
      providesTags: ['Game'],
    }),
    batchedSync: builder.mutation<SyncMutationResponse, SyncMutationPayload>({
      query: (body) => {
        return {
          url: '/game/sync',
          body,
          method: 'POST',
        };
      },
    }),
    levelUpBoost: builder.mutation<Boost, EBoostType>({
      query: (boostId) => {
        return {
          url: `/game/boosts/${boostId}`,
          method: 'PATCH',
        };
      },
    }),
    claimReward: builder.mutation<void, ClaimRewardPayload>({
      query: ({ id }) => {
        return {
          url: `/claimReward/${id}`,
          method: 'POST',
        };
      },
      invalidatesTags: ['Event'],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      transformResponse: (
        _: unknown,
        __: unknown,
        arg: ClaimRewardPayload,
      ): Promise<ClaimRewardPayload> | ClaimRewardPayload => arg,
    }),
  }),
});

export const {
  useClaimRewardMutation,
  useBatchedSyncMutation,
  useLevelUpBoostMutation,
  useLazyFetchGameDataQuery,
  useFetchGameDataQuery,
} = gameApi;
