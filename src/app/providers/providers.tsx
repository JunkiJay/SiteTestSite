import { FC, ReactNode } from 'react';
import { SDKProvider } from '@tma.js/sdk-react';
import { RootStoreProvider, ThemeProvider } from '.';

const compose = (providers: FC<{ children: ReactNode }>[]) =>
  providers.reduce((Prev, Curr) => ({ children }) => (
    <Prev>
      <Curr>{children}</Curr>
    </Prev>
  ));

export const Providers = compose([SDKProvider, RootStoreProvider, ThemeProvider]);
