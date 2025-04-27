//TODO неверный ипорт @app/model
import { AppDispatch, RootState } from '@app/model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { approveSyncId } from './';
import { gameApi } from '../api';
import { EGameEventType, SyncMutationPayload } from '../types';

export type ThunkApiConfig = {
  state: RootState;
  dispatch: AppDispatch;
};

export const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkApiConfig>();

const syncFunc = async (args: { dispatch: AppDispatch; getState: () => RootState }) => {
  const { dispatch, getState } = args;
  const state = getState();
  if (state.game.gameEvents.length === 0) {
    return;
  }

  const id = state.game.lastSyncId;

  const batchedChanges = state.game.gameEvents.reduce<SyncMutationPayload>(
    (accum, event) => {
      if (accum[event.type]) {
        accum[event.type] += 1;
      } else {
        accum[event.type] = 1;
      }

      return accum;
    },
    { id, [EGameEventType.tap]: 0, [EGameEventType.regen]: 0, [EGameEventType.autoClick]: 0 },
  );

  const result = await dispatch(
    gameApi.endpoints.batchedSync.initiate(batchedChanges, { fixedCacheKey: 'lastGameSync' }),
  );

  if (result.data) {
    dispatch(approveSyncId(result.data));
  }
};

export const initSyncGame = createAppAsyncThunk('game/init', async (arg, { dispatch, getState }) => {
  const syncTic = async () => {
    setTimeout(async () => {
      await syncFunc({ dispatch, getState });
      await syncTic();
    }, 3000);
  };

  await syncTic();
});
