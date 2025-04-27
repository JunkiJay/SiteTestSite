import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { accountSlice } from '@entities/account/model';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch, useSelector } from 'react-redux';
import { telegramSlice } from '@entities/telegram/model';
import { baseApi, sessionSlice } from '@entities/base-api';
import { IS_DEV } from '@src/shared/constants';
import { gameSlice } from '@entities/game/model';

export type RootState = ReturnType<typeof rootStore.getState>;

export type AppDispatch = typeof rootStore.dispatch;

const slices = [telegramSlice, accountSlice, sessionSlice, gameSlice, baseApi];

const reducer = combineSlices(...slices);

export const rootStore = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
  devTools: IS_DEV,
});

setupListeners(rootStore.dispatch);

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector = useSelector.withTypes<RootState>();
