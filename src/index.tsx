import React from 'react';
import { createRoot } from 'react-dom/client';
import { App, Providers } from './app';
import { IS_DEV } from '@shared/constants';
import { enableMocking } from '../__mocks__/msw/enable-mocking';

(async () => {
  if (IS_DEV) {
    await enableMocking();
  }

  createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Providers>
        <App />
      </Providers>
    </React.StrictMode>,
  );
})();
