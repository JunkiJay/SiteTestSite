import React, { FC } from 'react';
import { ComponentWithChildren } from '@shared/types/react-types';
import { rootStore } from '@app/model/root-store';
import { Provider } from 'react-redux';

export const RootStoreProvider: FC<ComponentWithChildren> = ({ children }) => (
  <Provider store={rootStore}>{children}</Provider>
);
