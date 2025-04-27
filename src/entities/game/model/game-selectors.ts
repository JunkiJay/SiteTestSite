import { RootState } from '@app/model';
import { formatLongNumber } from '@shared/libs';
import { EBoostType } from '@entities/game/types';
import { createSelector } from '@reduxjs/toolkit';
import { GAME_CONFIG } from '@entities/game/constants/game-config';

export const selectRank = (rootState: RootState) => rootState.game.rank;

export const selectFormattedCapitalValue = (state: RootState) => formatLongNumber(state.game.capital);

export const selectEnergy = (state: RootState) => state.game.energy;

export const selectEnergyPercent = ({ game: { energy, boosts } }: RootState) => {
  const maxEnergyLevel = boosts[EBoostType.maxEnergy].level;
  const maxEnergy = maxEnergyLevel * GAME_CONFIG.energyMultiplier;

  return +((energy / maxEnergy) * 100).toFixed(2);
};

export const selectBoosts = (state: RootState) => state.game.boosts;

export const selectBoostId = (state: RootState, itemId: EBoostType) => itemId;

export const selectBoostById = createSelector([selectBoosts, selectBoostId], (boosts, id) => boosts[id]);

export const selectMaxEnergy = createSelector([selectBoosts], (boosts) => {
  return boosts[EBoostType.maxEnergy].level * GAME_CONFIG.energyMultiplier;
});
