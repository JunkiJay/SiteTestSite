import { FC, useEffect } from 'react';
import { Fade, styled } from '@mui/material';
import LogoSvg from './assets/images/logo.svg';

interface AppLoadingOverlayProps {
  onComplete: () => void;
}

export const AppLoadingOverlay: FC<AppLoadingOverlayProps> = ({ onComplete }) => {
  useEffect(() => {
    setTimeout(onComplete, 800);
  }, [onComplete]);

  return (
    <Fade in timeout={500}>
      <Wrapper>
        <LogoSvg />
        <LoadingTrack>
          <Value loadingValue={100} />
        </LoadingTrack>
      </Wrapper>
    </Fade>
  );
};

const Wrapper = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-row: 2;
`;

const LoadingTrack = styled('div')`
  width: 80%;
  height: 16px;
  border: 1px solid #fdf9cf;
  background: rgb(57, 55, 49);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 40px;
`;

const Value = styled('div')<{ loadingValue: number }>`
  background: linear-gradient(-90deg, #fdf9cf -1.42%, #a18246 100%);
  height: 12px;
  width: 99%;
  border-radius: 20px;
  transform: translateX(-100%);
  animation: progress 300ms linear forwards;
  animation-delay: 500ms;

  @keyframes progress {
    0% {
      transform: translateX(-100%);
    }
    25% {
      transform: translateX(-75%);
    }
    50% {
      transform: translateX(-50%);
    }
    75% {
      transform: translateX(-15%);
    }
    100% {
      transform: translateX(0);
    }
  }
`;
