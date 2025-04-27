import { createSlice } from '@reduxjs/toolkit';
import { ACCOUNT_SLICE_INITIAL_STATE } from '../constants';
import { accountApi } from '../api';
import { companiesApi } from '@entities/company/api';

export const accountSlice = createSlice({
  name: 'account',
  initialState: ACCOUNT_SLICE_INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(accountApi.endpoints.fetchAccountData.matchFulfilled, (state, { payload }) => payload);
    builder.addMatcher(companiesApi.endpoints.joinCompany.matchFulfilled, (state, { payload }) => {
      state.currentCompany = payload;
    });
    builder.addMatcher(companiesApi.endpoints.leaveCompany.matchFulfilled, (state) => {
      state.currentCompany = null;
    });
    builder.addMatcher(companiesApi.endpoints.createCompany.matchFulfilled, (state, { payload }) => {
      state.currentCompany = payload;
      state.ownerCompanyId = payload.id;
    });
  },
});
