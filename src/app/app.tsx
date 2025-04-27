import { IS_WEB_DISABLED } from '@src/shared/constants';
import { Router } from '../pages';
import { useInitApp } from './use-init-app';
import { AppLoadingOverlay } from '@app/app-loading-overlay';
import { useBoolean } from '@shared/libs';
import { useLaunchParams } from '@tma.js/sdk-react';
import { styled, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

const Wrapper = styled('div')`
  display: grid;
  height: 100vh;
  width: 100%;
  justify-items: center;
  align-items: center;
`;

export const App = () => {
  return (
    <WithPlatformProtect>
      <MainApp />
    </WithPlatformProtect>
  );
};

const WithPlatformProtect: FC<{ children: ReactNode }> = ({ children }) => {
  const { platform } = useLaunchParams();
  const isMobile = ['android', 'android_x', 'ios'].includes(platform);

  if (!isMobile && IS_WEB_DISABLED) {
    return (
      <Wrapper>
        <Typography variant="h1">Play on your mobile</Typography>
      </Wrapper>
    );
  }

  return children;
};

const MainApp = () => {
  const [isAnimationCompleted, setIsAnimationCompleted] = useBoolean();
  const isInitializedApp = useInitApp();

  return isInitializedApp && isAnimationCompleted ? (
    <Router />
  ) : (
    <AppLoadingOverlay onComplete={setIsAnimationCompleted.on} />
  );
};
