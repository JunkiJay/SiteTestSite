import { Boost, EBoostType } from '@entities/game/types';

export const BOOSTS: (Boost & { id: EBoostType })[] = [
  {
    level: 1,
    price: 16000,
    type: EBoostType.multiTap,
    id: EBoostType.multiTap,
  },
  {
    level: 1,
    price: 16000,
    type: EBoostType.rechargingSpeed,
    id: EBoostType.rechargingSpeed,
  },
  {
    level: 1,
    price: 16000,
    type: EBoostType.maxEnergy,
    id: EBoostType.maxEnergy,
  },
  {
    level: 0,
    price: 16000,
    type: EBoostType.autoClicker,
    id: EBoostType.autoClicker,
  },
];
