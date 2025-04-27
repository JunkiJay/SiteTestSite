import { EBoostType } from '@entities/game/types';
import { AutoClickerSvg, BatterySvg, FingerSvg, LightningSvg } from '@entities/game/assets';
import { ReactNode } from 'react';

export const BOOST_ICON_BY_TYPE: Record<keyof typeof EBoostType, ReactNode> = {
  [EBoostType.maxEnergy]: <BatterySvg />,
  [EBoostType.multiTap]: <FingerSvg />,
  [EBoostType.rechargingSpeed]: <LightningSvg />,
  [EBoostType.autoClicker]: <AutoClickerSvg />,
};

export const BOOST_TITLE_BY_TYPE: Record<keyof typeof EBoostType, ReactNode> = {
  [EBoostType.maxEnergy]: 'Max energy',
  [EBoostType.multiTap]: 'Multi tap',
  [EBoostType.rechargingSpeed]: 'Recharging Speed',
  [EBoostType.autoClicker]: 'Auto clicker',
};
