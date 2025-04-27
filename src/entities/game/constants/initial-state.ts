import { EBoostType, GameSliceState } from '../types';

export const INITIAL_BOOSTS_STATE: GameSliceState['boosts'] = {
  [EBoostType.maxEnergy]: {
    type: EBoostType.maxEnergy,
    level: 1,
    price: 0,
  },
  [EBoostType.multiTap]: {
    type: EBoostType.multiTap,
    level: 1,
    price: 0,
  },
  [EBoostType.rechargingSpeed]: {
    type: EBoostType.rechargingSpeed,
    level: 1,
    price: 0,
  },
  [EBoostType.autoClicker]: {
    type: EBoostType.autoClicker,
    level: 0,
    price: 0,
  },
};

export const GAME_SLICE_INITIAL_STATE: GameSliceState = {
  energy: 1,
  capital: 0,
  gameEvents: [],
  lastSyncId: 0,
  boosts: INITIAL_BOOSTS_STATE,
  rank: 'student',
};
