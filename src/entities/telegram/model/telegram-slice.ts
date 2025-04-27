import { createSlice } from '@reduxjs/toolkit';
import { retrieveLaunchParams } from '@tma.js/sdk';

export const telegramSlice = createSlice({
  name: 'telegram',
  initialState: () => {
    const launchParams = retrieveLaunchParams();

    return {
      ...launchParams,
      initData: { ...launchParams.initData, authDate: launchParams.initData?.authDate.getTime() },
    };
  },
  reducers: {},
  selectors: {
    selectUserId: (sliceState) => sliceState.initData.user?.id,
  },
});

export const { selectUserId } = telegramSlice.selectors;
