import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@app/model';

export const selectOwnerCompanyId = (rootState: RootState) => rootState.account.ownerCompanyId;

export const selectCurrentCompany = (rootState: RootState) => rootState.account.currentCompany;

export const selectIsSomeCompanyMember = createSelector(
  (rootState: RootState) => rootState.account.currentCompany,
  (currentCompany) => Boolean(currentCompany && currentCompany.id),
);

export const selectIsCompanyMemberById = createSelector(
  [(rootState: RootState) => rootState.account.currentCompany?.id, (_, targetCompanyId) => targetCompanyId],
  (currentCompanyId, targetCompanyId) => currentCompanyId && currentCompanyId === targetCompanyId,
);
