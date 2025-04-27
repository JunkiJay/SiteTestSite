import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { FC } from 'react';
import { ComponentWithChildren } from '@shared/types';

export const TonConnectProvider: FC<ComponentWithChildren> = ({ children }) => {
  return <TonConnectUIProvider manifestUrl={env.__TON_CONNECT_MANIFEST_URL__}>{children}</TonConnectUIProvider>;
};
